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
        print(task)
        return {"fast":task}
    except:
        print("failed to fetch data")
        return {"fast": "connected but data cannot be fecthed"}
    
@Route.post("/add")
def add_task(ctask:Task):
    inserted_task=str(client.fast.fast.insert_one(dict(ctask)))

    return inserted_task

@Route.delete("/del")
def del_task(ctask:Task):
    deleted=client.fast.fast.delete_one(dict(ctask))
    return deleted.deleted_count
