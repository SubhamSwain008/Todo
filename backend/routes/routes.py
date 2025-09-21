from fastapi import APIRouter

from config.db_connect import client 
from DataBase.data_model import Task

from schema.db_schema import task ,taskLists

Route=APIRouter()