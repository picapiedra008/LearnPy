from src.database.postgres import get_connection
from src.drive.service import upload_file_to_drive, delete_file_from_drive
import os

class Lesson():

    @classmethod
    def create_lesson(self, user_code: int, level_code: int, visibility_code: int,
                    lesson_title: str, lesson_description: str, file):

        db = None
        cursor = None

        try:
            if file.filename == '':
                return {'error': 'No selected file'}, 400

            file_path = f"./{file.filename}"
            file.save(file_path)

            # Subir a Google Drive            
            uploaded_file = upload_file_to_drive(file_path, file.filename, file.mimetype)
            file_id = uploaded_file.get('id')

            # Eliminar el archivo temporal después de la subida
            os.remove(file_path)

            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT create_lesson(%s, %s, %s, %s, %s, %s);
            ''', (user_code, level_code, visibility_code,
                lesson_title, lesson_description, file_id))
            db.commit()
            result = cursor.fetchone()

            if result is None:
                return {"message": "Lesson not created"}, 400

            return {"lesson_code": result[0], "message": "Lesson created successfully."}, 201
        
        except Exception as ex:
            return {"error": f"Error creating lesson: {str(ex)}"}, 500

        finally:

            if cursor:
                cursor.close()
            if db:
                db.close()

    @classmethod
    def create_lesson_with_topics(self, lesson_code: int, topics: list):

        db = None
        cursor = None

        try:
            db = get_connection()
            cursor = db.cursor()

            for topic in topics:
                index = topic.get("index")
                topic_title = topic.get("topic_title")
                topic_description = topic.get("topic_description")
                material_code = topic.get("material_code")
                exercises = topic.get("exercises")

                cursor.execute("""
                    insert into topics (lesson_code, topic_index, topic_title, topic_description)
                    values (%s, %s, %s, %s)
                    returning topic_code;
                """, (lesson_code, index, topic_title, topic_description))

                topic_code = cursor.fetchone()[0]

                for exercise in exercises:
                    cursor.execute("""
                        update exercises
                        set topic_code = %s
                        where exercise_code = %s;            
                    """, (topic_code, exercise))

                if material_code:
                    cursor.execute("""
                        update materials 
                        set topic_code = %s
                        where material_code = %s;       
                    """, (topic_code, material_code))
                
            db.commit()
            return {
                "message": "Topicos creados satisfactoriamentes"
            }, 201
       
        except Exception as ex:
            return {"error": f"Error creando topicos: {str(ex)}"}, 500

        finally:
            if cursor:
                cursor.close()
            if db:
                db.close()
    
    @classmethod
    def delete_lesson(self, lesson_code: int, file_id: str):
        try:
            # Intentar eliminar el archivo de Google Drive
            delete_file_from_drive(file_id)

            db = get_connection()
            with db.cursor() as cursor:
                # Ejecutar la función para eliminar la lección
                cursor.execute('delete from lessons where lesson_code = (%s);', (lesson_code,))
                db.commit()
                result = cursor.fetchone()
                
                if result and result[0] == 1:
                    return {
                        "success": True,
                        "message": "Lesson deleted successfully"
                    }, 200
                else:
                    return {
                        "error": "Lesson not found or already deleted"
                    }, 404

        except Exception as e:
            return {'error': str(e)}, 500

    @classmethod
    def delete_lessons(self, data: list):
        results = []
        for lesson in data:
            code = lesson.get('code')
            file_id = lesson.get('front_page')
            if code is None or file_id is None:
                results.append({
                    "code": code,
                    "success": False,
                    "error": "Missing code or front_page"
                })
                continue

            result, status = self.delete_lesson(code, file_id)
            results.append({
                "code": code,
                "success": status == 200,
                "message": result.get('message') if status == 200 else result.get('error')
            })

        return {
            "results": results
        }, 200

    @classmethod
    def update_lesson(cls, lesson_code: int, level_code: int, visibility_code: int, title: str, description:str, front_page: str, file):
        
        db = None
        cursor = None
        try:
            db = get_connection()
            cursor = db.cursor()
            print("file:", file)
            print("file.filename:", file.filename if file else "None")
            if file and file.filename:
                delete_file_from_drive(front_page)

                file_path = f"./{file.filename}"
                file.save(file_path)

                # Subir a Google Drive
                uploaded_file = upload_file_to_drive(file_path, file.filename, file.mimetype)
                file_id = uploaded_file.get('id')

                # Eliminar el archivo temporal después de la subida
                os.remove(file_path)

                front_page = file_id

            cursor.execute('''
                SELECT update_lesson(%s, %s, %s, %s, %s, %s);
            ''', (
                lesson_code,
                level_code,
                visibility_code,
                title,
                description,
                front_page
            ))

            db.commit()
            return {"message": "Lesson updated successfully."}, 200

        except Exception as ex:
            return {"error": f"Error updating lesson: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()


    @classmethod
    def get_lesson(self, lesson_code: int):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT * FROM get_lesson(%s);
            ''', (lesson_code,))

            row = cursor.fetchone()

            if row is None:
                return {}, 204

            lesson = {
                "lesson_code": int(row[0]),
                "user_code": int(row[1]),
                "level_code": int(row[2]),
                "visibility_code": int(row[3]),
                "lesson_title": str(row[4]).strip(),
                "lesson_description": str(row[5]).strip(),
                "lesson_front_page": str(row[6]).strip()
            }

            return lesson, 200

        except Exception as ex:
            return {"error": f"Error retrieving lesson: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()

    @classmethod
    def get_levels(self):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT level_code, level_name FROM get_levels();
            ''')

            rows = cursor.fetchall()

            levels = []
            for row in rows:
                levels.append({
                    "level_code": int(row[0]),
                    "level_name": str(row[1]).strip()
                })

            return levels, 200 if levels else 204

        except Exception as ex:
            return {"error": f"Error retrieving levels: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()

    @classmethod
    def get_visibilities(self):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT visibility_code, visibility_name FROM get_visibilities();
            ''')

            rows = cursor.fetchall()

            visibilities = []
            for row in rows:
                visibilities.append({
                    "visibility_code": int(row[0]),
                    "visibility_name": str(row[1]).strip()
                })

            return visibilities, 200 if visibilities else 204

        except Exception as ex:
            return {"error": f"Error retrieving visibilities: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()

    @classmethod
    def get_lessons(self, user_code: int):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT lesson_code, lesson_title, lesson_front_page, 
                       level_name, visibility_name
                FROM get_lessons(%s);
            ''', (user_code,))

            rows = cursor.fetchall()

            lessons = []
            for row in rows:
                lessons.append({
                    "lesson_code": int(row[0]),
                    "lesson_title": str(row[1]).strip(),
                    "lesson_front_page": str(row[2]).strip(),
                    "level_name": str(row[3]).strip(),
                    "visibility_name": str(row[4]).strip()
                })

            return lessons, 200 if lessons else 204

        except Exception as ex:
            return {"error": f"Error retrieving lessons: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()