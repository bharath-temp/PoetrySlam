from typing import Optional, List
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from PoetrySlam.database import engine, get_db, SessionLocal
from PoetrySlam.deps import oauth2_scheme, pwd_context, \
                            ACCESS_TOKEN_EXPIRE_MINUTES, \
                            SECRET_KEY, ALGORITHM, create_access_token
from PoetrySlam import schemas, models, crud


router = APIRouter()
models.Base.metadata.create_all(bind=engine)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user(SessionLocal(), user_name=token_data.username)
    if user is None:
        raise credentials_exception
    return user


def fake_decode_token(token):
    user = crud.get_user(SessionLocal(), token)
    return user


def fake_hash_password(password: str):
    return "fakehashed" + password


async def get_current_active_user(current_user:
                                  schemas.User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@router.get("/item/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}


@router.post("/users", response_model=schemas.User)
def create_user(user: schemas.User, db: Session = Depends(get_db)):
    return crud.create_user(db=db, new_user=user)


@router.get("/users", response_model=List[schemas.User])
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db=db)


@router.get("/users/me")
async def read_users_me(current_user:
                        schemas.User = Depends(get_current_active_user)):
    return current_user


@router.get("/users/me/poems")
async def read_users_me(db: Session = Depends(get_db),
                        current_user:
                        schemas.User = Depends(get_current_active_user)):
    return crud.get_user_poems(current_user.id, db=db)


@router.post("/users/me/post", response_model=schemas.Poem)
def create_post(new_poem: schemas.Poem,
                current_user:
                schemas.User = Depends(get_current_active_user),
                db: Session = Depends(get_db)):
    return crud.create_post(db=db, current_user=current_user,
                            new_poem=new_poem)


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(),
                db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
