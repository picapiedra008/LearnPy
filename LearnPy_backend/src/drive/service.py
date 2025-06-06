import io
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from src.drive.credential import get_drive_credentials


def upload_file_to_drive(file_path, filename, mimetype):
    drive_service, folder_id = get_drive_credentials()
    file_metadata = {
        'name': filename,
        'parents': [folder_id]
    }
    media = MediaFileUpload(file_path, mimetype=mimetype, resumable=True)
    request = drive_service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id, name'
    )
    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"Subiendo: {int(status.progress() * 100)}%")
    file_id = response.get('id')
    # Hacer archivo público
    drive_service.permissions().create(
        fileId=file_id,
        body={
            'role': 'reader',
            'type': 'anyone'
        }
    ).execute()
    return response

def delete_file_from_drive(file_id):
    drive_service, folder_id = get_drive_credentials()
    drive_service.files().delete(fileId=file_id).execute()