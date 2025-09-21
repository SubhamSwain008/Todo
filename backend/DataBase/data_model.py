from pydantic import BaseModel

class Task(BaseModel):
    title:str
    dec:str
    priority:int