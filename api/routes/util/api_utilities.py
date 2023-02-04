import os
import shutil
from dotenv import load_dotenv, find_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId
import smtplib
from email.message import EmailMessage
import pandas as pd
import json

load_dotenv(find_dotenv())
api_ip = os.environ.get("API_IP")


def get_page_path(client, id):
    collection = client.fwt_project.routes
    doc = collection.find_one({'accessCode': id})
    return {"route": doc['route']}
    # print(cursor['route'])


def convert_id(id):
    return str(id)
    
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
    









def get_saved_form(client, name):
    collection = client.fwt_project.forms
    record = collection.find_one({'name': name})
    components = record['components']
    return components
    

def get_all_submissions(client):
    collection = client.fwt_project.submissions
    headers = ['id','Address', 'Agent Name','Contact Email', 'Team Member','Agent Comments', 'Additional Comments', 'Photo Location', 'PDF Location']
    query = {"pdf_path": {"$exists": "true"}}
    try: 
        docs = []
        for doc in collection.find(query):
           docs.append( [ str(doc['_id']),
            doc['address'],
            doc['name'],
            doc['email'],
            doc['agent'],
            doc['agent_comments'],
            doc['additional_comments'],
            doc['files_location'],
            doc['pdf_path']])
            
        data = pd.DataFrame(docs)
        data.columns = headers
        data = data.to_json(orient="records")
        response = json.loads(data)
        return {"success": response}
    except Exception as err:
        return {"error": err}
    
    

def insert_submission_form(client, document):
    collection = client.fwt_project.submissions
    collection.insert_one(document).inserted_id


def create_file_location(main_path, files_path, files):
    if os.path.exists(files_path) == False:
        os.makedirs(files_path)
    for file in files:
        
        try:
            print(file.filename)
            with open(file.filename, 'wb') as f:
                print(file.filename)
                shutil.copyfileobj(file.file, f)
            file_path = os.path.join(main_path, file.filename)
            shutil.move(file_path, os.path.join(files_path, file.filename))
        except Exception as err:
            print(err)
            return {"message": "There was an error uploading the file(s)"}
        finally:
            file.file.close()


def update_pdf_path(client, id, pdf_path):
    collection = client.fwt_project.submissions
    try:
        collection.update_one({'_id': ObjectId(id)},  {'$set': {"pdf_path": pdf_path}}) 
        
    except Exception as err:
        return {"error message":err}
    return {"pdf_path": pdf_path}




def send_email(client, id):
    collection = client.fwt_project.submissions
    
    record = collection.find_one({'_id': ObjectId(id)})
    recipient = record['email']
    # Open the plain text file whose name is in textfile for reading.
    s = smtplib.SMTP(host=os.environ.get("EMAIL_HOST"), port=os.environ.get("EMAIL_PORT"))
    s.starttls()
    s.login(os.environ.get("EMAIL_ADDR"),os.environ.get("EMAIL_PWD") )
    html = f"""<a href="{api_ip}pdf/?id={id}"><p>Here is your submission</p></a>"""
    msg = EmailMessage()
    msg.set_content(html, subtype='html')
    msg['Subject'] = "Test" 
    msg['From'] = os.environ.get("EMAIL_ADDR")
    msg['To'] = recipient 

    # Send the message via our own SMTP server.
    try:
        s.send_message(msg)
        s.quit()
    except Exception as err:
        return {"error message":err}
    return {"message": "email sent!"}
    
def get_pdf(client, id):
    collection = client.fwt_project.submissions
    record = collection.find_one({'_id': ObjectId(id)})
    pdf_file = record['pdf_path']
    return pdf_file
    
    