from typing import Optional
from fastapi import APIRouter
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()


@router.get("/")
def read_root():
    return {"Hello": "World"}


@router.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@router.get("/name/")
def read_name(first_name: str, last_name: str):
    return {"first_name": first_name, "last_name": last_name}
