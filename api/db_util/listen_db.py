import os
import pymongo
from dotenv import load_dotenv, find_dotenv
from bson.objectid import ObjectId
from db_utilities import *

load_dotenv(find_dotenv())
client = pymongo.MongoClient(os.environ['DB_CONNECTION'])

change_stream = client.fwt_project.submissions.watch([{
    '$match': {
        'operationType': {'$in': ['insert', 'update']}
    }
}])

for change in change_stream:
    
    operation_type = change['operationType']
    
    if operation_type == 'insert':
        id = ObjectId(change["fullDocument"]["_id"])
        name = change["fullDocument"]["name"]
        address = change["fullDocument"]["address"]
        email = change["fullDocument"]["email"]
        agent = change["fullDocument"]["agent"]
        agent_comments = change["fullDocument"]["agent_comments"]
        additional_comments = change["fullDocument"]["additional_comments"]
        files_location = change["fullDocument"]["files_location"]

        pdf_location = create_pdf_file(address=address, location=files_location, id=id)
        
        response = send_id(id, pdf_location)
        
    if operation_type == 'update':
        submit_email(id)
        
        