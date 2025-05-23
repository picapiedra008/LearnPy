import os
from dotenv import load_dotenv
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

load_dotenv()

def get_drive_credentials():
    return build(
        'drive', 
        'v3', 
        credentials = Credentials.from_service_account_file(os.getenv('SERVICE_ACCOUNT_FILE'), scopes=[os.getenv('SCOPES')])
    ), os.getenv('FOLDER_ID')