from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from PoetrySlam.database import engine, get_db
from PoetrySlam import schemas, models, crud


router = APIRouter()
models.Base.metadata.create_all(bind=engine)


@router.get("/")
def read_root():
    return {"Hello": "World"}


@router.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@router.get("/name/")
def read_name(first_name: str, last_name: str):
    return {"first_name": first_name, "last_name": last_name}


@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.User, db: Session = Depends(get_db)):
    return crud.create_user(db=db, new_user=user)
