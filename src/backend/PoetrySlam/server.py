from fastapi import FastAPI

from PoetrySlam import settings
from PoetrySlam.api.v1 import api_router as api_router_v1

app = FastAPI()

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
