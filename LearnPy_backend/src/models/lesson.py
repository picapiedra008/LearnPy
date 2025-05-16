from src.database.postgres import get_connection
from src.utils.security import convert_bcrypt, validate_password, email_exists, get_connection, is_password_secure, is_valid_email, is_valid_name

class Lesson():
    
    
    @classmethod
    def create_lesson(self, user_code: int, level_code: int, visibility_code: int,
                      lesson_title: str, lesson_description: str, lesson_front_page: str):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT create_lesson(%s, %s, %s, %s, %s, %s);
            ''', (user_code, level_code, visibility_code,
                  lesson_title, lesson_description, lesson_front_page))
            db.commit()
            result = cursor.fetchone()

            if result is None:
                return {"message": "Lesson not created"}, 400

            lesson_code = result[0]

            return {"lesson_code": lesson_code, "message": "Lesson created successfully."}, 201

        except Exception as ex:
            return {"error": f"Error creating lesson: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()
    
    @classmethod
    def delete_lesson(self, lesson_code: int):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT delete_lesson(%s);
            ''', (lesson_code,))

            db.commit()
            return {"message": "Lesson deleted successfully."}, 200

        except Exception as ex:
            return {"error": f"Error deleting lesson: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()

    @classmethod
    def update_lesson(self, lesson_code: int, user_code: int, level_code: int, visibility_code: int,
                      lesson_title: str, lesson_description: str, lesson_front_page: str):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT update_lesson(%s, %s, %s, %s, %s, %s, %s);
            ''', (
                lesson_code,
                user_code,
                level_code,
                visibility_code,
                lesson_title,
                lesson_description,
                lesson_front_page
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