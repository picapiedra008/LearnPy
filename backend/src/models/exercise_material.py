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
    @classmethod
    def get_exercise_materials_by_exercise(self, exercise_code: int):
        try:

            db = get_connection()
            cursor = db.cursor()
            cursor.execute('''
                SELECT * FROM get_exercise_materials_by_exercise(%s);
            ''', (exercise_code,))
            rows = cursor.fetchall()


            exercise_materials = []
            for row in rows:
                exercise_materials.append({
                    "material_code": int(row[0]),
                    "exercise_code": int(row[1]),
                    "material_type_name": str(row[2]).strip(),
                    "material_name": str(row[3]).strip(),
                    "material_rute": str(row[4]).strip(),
                })

            return exercise_materials, 200 if exercise_materials else 204

        except Exception as ex:
            return {"error": f"Error geting exercise material: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()

