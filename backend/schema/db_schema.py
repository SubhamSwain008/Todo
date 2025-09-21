# this is to covert Mongoobject to python dict

def task(item)->dict:

    return{
        "id":str(item["_id"]),
        "title":item["title"],
        "dec":item["dec"],
        "priority":item["priority"]
    }

def taskLists(items)->list:

    return [task(item) for item in items]