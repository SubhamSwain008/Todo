from pymongo import MongoClient 

try :
    client = MongoClient("mongodb+srv://subhamswain8456:Subham811@cluster0.lth1sip.mongodb.net/")
    print("DB Connected")
except:
    print("failed to connect to db")