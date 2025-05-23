from googleapiclient.http import MediaFileUpload
from src.drive.credential import get_drive_credentials


def upload_file_to_drive(file_path: str, filename: str, mimetype: str) -> dict:
    drive_service, folder_id = get_drive_credentials()

    file_metadata = {
        'name': filename,
        'parents': [folder_id]
    }

    media = MediaFileUpload(file_path, mimetype=mimetype, resumable=True)

    try:
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

        # Hacer el archivo público
        drive_service.permissions().create(
            fileId=file_id,
            body={
                'role': 'reader',
                'type': 'anyone'
            }
        ).execute()

        return response

    except Exception as e:
        print(f"Error al subir el archivo: {e}")
        return {}


def delete_file_from_drive(file_id: str) -> bool:
   
    drive_service, _ = get_drive_credentials()

    try:
        drive_service.files().delete(fileId=file_id).execute()
        return True
    except Exception as e:
        print(f"Error al eliminar el archivo: {e}")
        return False
