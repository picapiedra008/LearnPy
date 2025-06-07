from src.database.postgres import get_connection
from src.utils.security import  get_connection
from src.drive.service import  delete_file_from_drive

class Exercise_Material():
   

    @classmethod
    def delete_exercise_material(self, exercise_material_code: int, rute: str):
        try:

            delete_file_from_drive(rute)

            db = get_connection()
            cursor = db.cursor()

            cursor.execute('SELECT delete_exercise_material(%s);', (exercise_material_code))
            db.commit()

            return {"message": "Exercise Material deleted successfully."}, 200

        except Exception as ex:
            return {"error": f"Error deleting exercise material: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()

