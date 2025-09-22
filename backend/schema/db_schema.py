# this is to covert Mongoobject to python dict
#db to frontend

def task(item)->dict:

    return{
        "id":str(item["_id"]),
        "dec":item["fast"],
        
    }

def taskLists(items)->list:

    return [task(item) for item in items]