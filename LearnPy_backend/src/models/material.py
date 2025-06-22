from src.database.postgres import get_connection
from src.drive.service import upload_file_to_drive, delete_file_from_drive
import os

class Material():

    @classmethod
    def create_material(self, topic_code: int, file, material_type_code, material_name: str):
        try:
            if file.filename == '':
                return {'error': 'No selected file'}, 400

            fn = file.filename
            _, ext = os.path.splitext(fn)
            ext = ext.lower().strip().lstrip('.')

            file_path = f"./{file.filename}"
            file.save(file_path)

            uploaded_file = upload_file_to_drive(file_path, file.filename, file.mimetype)
            file_id = uploaded_file.get('id')

            os.remove(file_path)

            conn = get_connection()
            cur = conn.cursor()

            cur.execute(
                "SELECT get_material_type_by_material_type_name(%s)",
                (ext,)
            )
            mtc_result = cur.fetchone()
            cur.close()

            if mtc_result and mtc_result[0]:
                mtc = mtc_result[0]

                cur = conn.cursor()
                cur.execute(
                    "SELECT create_material(%s, %s, %s, %s)",
                    (topic_code, mtc, material_name, file_id)
                )
                new_material_code = cur.fetchone()[0]
                conn.commit()
                cur.close()
                conn.close()

                return {"material_code": new_material_code, "message": "Material creado correctamente"}, 201
            else:
                conn.close()
                return {'error': f"No material type found for extension '{ext}'"}, 400

        except Exception as e:
            return {"error": str(e)}, 500


    @classmethod
    def create_material_of_exercise(self, exercise_code: int, file, material_type_code , material_name: str):
        try:
            # Subir archivo a Google Drive
            if file.filename == '':
                return {'error': 'No selected file'}, 400

            fn = file.filename
            _, ext = os.path.splitext(fn)
            ext = ext.lower().strip().lstrip('.')
            
            file_path = f"./{file.filename}"
            file.save(file_path)

            # Subir a Google Drive            
            uploaded_file = upload_file_to_drive(file_path, file.filename, file.mimetype)
            file_id = uploaded_file.get('id')

            # Eliminar el archivo temporal después de la subida
            os.remove(file_path)



            conn = get_connection()
            cur = conn.cursor()

            cur.execute(
                "SELECT get_material_type_by_material_type_name(%s)",
                (ext,)
            )
            mtc_result = cur.fetchone()
            cur.close()

            if mtc_result and mtc_result[0]:
                mtc = mtc_result[0]

                cur = conn.cursor()
                cur.execute(
                    "SELECT create_exercise_material(%s, %s, %s, %s)",
                    (exercise_code, mtc, material_name, file_id)
                )
                new_material_code = cur.fetchone()[0]
                conn.commit()
                cur.close()
                conn.close()

                return {"material_code": new_material_code, "message": "Material creado correctamente"}, 201
            else:
                conn.close()
                return {'error': f"No material type found for extension '{ext}'"}, 400


        except Exception as e:

            return {"error": str(e)}, 500

    @classmethod
    def delete_material(self, material_code: int, rute: str):
        try:
            # Eliminar archivo de Google Drive
            delete_file_from_drive(rute)

            # Eliminar material de la base de datos
            conn = get_connection()
            cur = conn.cursor()
            cur.execute("SELECT delete_material(%s)", (material_code,))
            conn.commit()
            cur.close()
            conn.close()

            return {"message": "Material eliminado correctamente"}, 200

        except Exception as e:

            return {"error": str(e)}, 500

    @classmethod
    def get_materials_by_topic(self, lesson_code: int):
        try:
            conn = get_connection()
            cur = conn.cursor()

            cur.execute("SELECT * FROM get_materials_by_topic(%s)", (lesson_code,))
            rows = cur.fetchall()
            columns = ['material_code', 'topic_code', 'material_type_name', 'material_name', 'material_rute']
            materials = [dict(zip(columns, row)) for row in rows]

            cur.close()
            conn.close()

            return materials, 200

        except Exception as e:
  
            return {"error": str(e)}, 500


    @classmethod
    def get_material_types(self):
        try:
            conn = get_connection()
            cur = conn.cursor()

            cur.execute("SELECT * FROM get_material_types()")
            rows = cur.fetchall()
            columns = ['material_type_code', 'material_type_name']
            result = [dict(zip(columns, row)) for row in rows]

            cur.close()
            conn.close()

            return result, 200

        except Exception as e:

            return {"error": str(e)}, 500