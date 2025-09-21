from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient 
from bson import ObjectId
app = FastAPI()
try :
    client = MongoClient("mongodb+srv://subhamswain8456:Subham811@cluster0.lth1sip.mongodb.net/")
    print("DB Connected")
except:
    print("failed to connect to db")
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



class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None


@app.get("/")
def read_root():
    try:
        docs=client.fast.fast.find_one({})
        print(docs["fast"])
        return {"fast":docs["fast"]}
    except:
        print("failed to fetch data")
        return {"fast": "connected but data cannot be fecthed"}
    


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}