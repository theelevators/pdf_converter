import os
import shutil
from dotenv import load_dotenv, find_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId
import json


load_dotenv(find_dotenv())

api_ip = os.environ.get("API_IP")

def get_page_path(client, id):
    collection = client.fwt_project.routes
    doc = collection.find_one({'accessCode': id})
    return {"route": doc['route']}
    

    
def upload_new_form(client, name, components):
    collection = client.fwt_project.forms
    
    document = {
        "name": name,
        "components": components
    }
    try:
        collection.insert_one(document).inserted_id
        return {"success": "Form Uploaded"}
    except Exception as err:
        return {"error": err}
    
    
def update_saved_form(client, name, components):
    
    collection = client.fwt_project.forms
    
    myquery =  {'name': name} 
    newvalues = { "$set": { "components": components } }
       
    try:
        collection.update_one( myquery, newvalues)
        return {"message": "Form has been succesfully saved."}
    except Exception as err:
        return {"error": err}



def upload_generic_form(client, data):
    collection = client.fwt_project.general_submissions
    document = json.loads(data)
    form_id = collection.insert_one(document).inserted_id
    form_id = str(form_id)
    return form_id



def get_saved_form(client, name):
    collection = client.fwt_project.forms
    record = collection.find_one({'name': name})
    components = record['components']
    return components
    

def insert_submission_form(client, document):
    collection = client.fwt_project.submissions
    collection.insert_one(document).inserted_id


def create_file_location(main_path, files_path, files):
    if os.path.exists(files_path) == False:
        os.makedirs(files_path)
    for file in files:
        try:
            with open(file.filename, 'wb') as f:
                shutil.copyfileobj(file.file, f)
            file_path = os.path.join(main_path, file.filename)
            shutil.move(file_path, os.path.join(files_path, file.filename))
        except Exception as err:
            return {"message": "There was an error uploading the file(s)"}
        finally:
            file.file.close()




