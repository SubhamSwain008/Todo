from pydantic import BaseModel
#front end to DB 
class Task(BaseModel):
    # title:str
    fast:str
    # priority:int