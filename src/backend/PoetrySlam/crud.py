import logging
import json

from PoetrySlam.database import engine, SessionLocal
from PoetrySlam import deps
from PoetrySlam import models, schemas

logger = logging.getLogger()
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
logger.addHandler(handler)


def create_user(db: SessionLocal, new_user: schemas.User):
    db_user = models.User(**new_user.dict())
    logger.info(new_user.dict())
    db_user.hashed_password = deps.pwd_context.encrypt(db_user.hashed_password)
    try:
        db.add(db_user)
        logger.info(f'User: {new_user.username} was successfully added to DB')
    except Exception as e:
        db.rollback()
        db.flush()
        logger.info("User could not be aded to DB")
        return None

    db.commit()
    return db_user


def create_post(db: SessionLocal, current_user: schemas.User,
                new_poem: schemas.Poem):
    db_poem = models.Poem(**new_poem.dict())
    logger.info(new_poem.dict())
    try:
        db.add(db_poem)
        logger.info(f'User: {new_poem.title} was successfully added to DB')
    except Exception as e:
        db.rollback()
        db.flush()
        logger.info("User could not be aded to DB")
        return None

    db.commit()
    return db_poem


def get_users(db: SessionLocal):
    try:
        users = db.query(models.User).all()
        logger.info(users)
        for user in users:
            logger.info(f'User found in the DB: {user}')
    except Exception as e:
        logger.info("No users were found in the DB")
        return None
    return users


def get_user(db: SessionLocal, user_name: str):
    logger.info(user_name)
    try:
        user_dict = db.query(models.User).filter_by(username=user_name).one()
        logger.info(f'User found in the DB: {user_name}')
        return user_dict
    except Exception as e:
        logger.info("No users were found in the DB")
        return None


def get_user_poems(curr_user_id, db: SessionLocal):
    logger.info(curr_user_id)
    try:
        poem_dict = db.query(models.Poem). \
                    filter_by(author_id=curr_user_id).all()
        return poem_dict
    except Exception as e:
        logger.info("No users were found in the DB")
        return None


def authenticate_user(db: SessionLocal, user_name: str, password: str):
    user = get_user(db, user_name)
    if not user:
        return False
    if not deps.verify_password(password, user.hashed_password):
        return False
    return user
