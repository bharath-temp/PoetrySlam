from PoetrySlam.api.v1.endpoints import poetryslam_routes

from fastapi import APIRouter


api_router = APIRouter()
api_router.include_router(poetryslam_routes.router)
