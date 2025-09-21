from fastapi import APIRouter

from config.db_connect import client 
from DataBase.data_model import Task

from schema.db_schema import task ,taskLists

Route=APIRouter()

@Route.get("/")
def read_root():
    try:
        docs=client.fast.fast.find({})
        # print(taskLists(docs))
        task=taskLists(docs)
        return {"fast":task}
    except:
        print("failed to fetch data")
        return {"fast": "connected but data cannot be fecthed"}
    
# @Route.post("/")
# def add_note