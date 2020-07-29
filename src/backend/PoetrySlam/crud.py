import logging
import json

from PoetrySlam.database import engine, SessionLocal
from PoetrySlam import models, schemas

logger = logging.getLogger()
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
logger.addHandler(handler)


def create_user(db: SessionLocal, new_user: schemas.User):
    db_user = models.User(**new_user.dict())
    try:
        db.add(db_user)
        logger.info(f'User: {new_user.user_name} was successfully added to DB')
    except Exception as e:
        db.rollback()
        db.flush()
        logger.info("User could not be aded to DB")
        return None

    db.commit()
    return db_user
