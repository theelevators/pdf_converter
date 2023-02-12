import os
import shutil
import hashlib
from dotenv import load_dotenv, find_dotenv



import json


load_dotenv(find_dotenv())

api_ip = os.environ.get("API_IP")

def get_page_path(client, id):
    collection = client.fwt_project.forms
    try:
        doc = collection.find_one({'code': id})
        return {"route": doc['path']}
    except:
        return {"error": "Entry Not Found"}
    

def verify_new_user(client, username, email):
    collection = client.fwt_project.users
    try:
        doc = collection.find_one({'username': username})
        if doc:
            return False
    except Exception as err:
        return False
    try:
        doc = collection.find_one({'email': email})
        if doc:
            return False
    except Exception as err:
        return False
    
    return True


def create_new_user(client, username, email, password):
    collection = client.fwt_project.users
    document = {
        "username": username,
        "email": email,
        "password": hashlib.sha256(bytes(password, 'utf-8')).hexdigest()
    }
    try:
        doc_id = collection.insert_one(document).inserted_id
        return {"message": "User has been created!"}
    except:
        return {"error": "Unable to create user"}
    


def verify_login(client, username, password):
    collection = client.fwt_project.users
    try:
        doc = collection.find_one({'username': username})
        if hashlib.sha256(bytes(password, 'utf-8')).hexdigest() == doc['password']:
            return True
    except:
        return False

def get_users(client):
    collection = client.fwt_project.users
    users =[]
    try:
        
        for doc in collection.find():
            users.append(doc['username'])

    except Exception as err:
        return err
    return users

    
def upload_new_form(client, data):
    collection = client.fwt_project.forms
    
    document = {
        "username": data.username,
        "code": data.code,
        "formName": data.formname,
        "components": data.components,
        "path" : f"/forms/{data.formname}"
    }
    try:
        collection.insert_one(document).inserted_id
        return {"success": "Form Uploaded"}
    except Exception as err:

        return {"error": err}
    
def update_form_auth_code(client, data):
    collection = client.fwt_project.forms
    myquery =  {'formName': data.formname} 
    newvalues = { "$set": { "code": data.code, "token": "" } }
    try:
        collection.update_one( myquery, newvalues)
        return {"message": "Form has been succesfully updated."}
    except Exception as err:
        
        return {"error": err}


def update_form_auth_token(client, data):
    collection = client.fwt_project.forms
    myquery =  {'formName': data.formname} 
    newvalues = { "$set": { "token": data.token } }
    try:
        collection.update_one( myquery, newvalues)
        return {"message": "Form has been succesfully updated."}
    except Exception as err:
        return {"error": err}




def update_saved_form(client, data):
    
    collection = client.fwt_project.forms
    
    
    myquery =  {'formName': data.formname} 
    newvalues = { "$set": { "components": data.components } }
    
    try:
        collection.update_one( myquery, newvalues)
        
        return {"message": "Form has been succesfully saved."}
    except Exception as err:
        
        return {"error": err}



def upload_generic_form(client, data):
    collection = client.fwt_project.general_submissions

    
    try:
        
        document = json.loads(data)
        if document:
            
            form_id = collection.insert_one(document).inserted_id
            form_id = str(form_id)

            return form_id
        return {"error": "Form not found."}
    except Exception as err:
        return {"error": err}


def get_saved_form(client, name):
    collection = client.fwt_project.forms
    record = collection.find_one({'formName': name})
    
    if record:
        components = record['components']
        
        return components
       
    else:
        
        return {"error": "Form Not Found"}
    

async def insert_share_code(client, data):
    collection = client.fwt_project.access_codes
    document = dict(data)
    try:
        collection.insert_one(document)
        return "OK"
    except:
        return "ERROR"

        
def check_share_code(client, data):
    collection = client.fwt_project.access_codes
    try:
        record = collection.find_one({'code': data.code})
        if record:
            return True
        return False
    except:
        return False


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
            file.file.close()
            return {"message": "Form has been submitted!"}
        except Exception as err:
            return {"message": "There was an error uploading the file(s)"}
        finally:
            file.file.close()




