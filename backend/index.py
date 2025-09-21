from typing import Union
from config.db_connect import client 
from fastapi import FastAPI
from routes.routes import Route
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.include_router(Route)

origins = [
    "http://localhost:5173",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    try:
        docs=client.fast.fast.find_one({})
        print(docs["fast"])
        return {"fast":docs["fast"]}
    except:
        print("failed to fetch data")
        return {"fast": "connected but data cannot be fecthed"}
    
