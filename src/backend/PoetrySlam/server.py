from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from PoetrySlam import settings
from PoetrySlam.api.v1 import api_router as api_router_v1

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router_v1)


@app.get("/health")
def health_check():
    """Endpoint to check whether the service is health and is ready for
    traffic.
    """
    return {"healthy": True}


@app.get("/ping")
def ping():
    """Endpoint used to check if the service is alive and reachable.
    """
    return {"message": "pong"}


def server():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.port, log_level="info")
