from src.database.postgres import get_connection
from src.utils.security import convert_bcrypt, validate_password, email_exists, get_connection, is_password_secure, is_valid_email, is_valid_name

class User():

    @classmethod
    def login(self, email: str, password: str, type: int):
        try:
            db = get_connection()
            cursor = db.cursor()
            cursor.execute('''
                SELECT user_code, user_password
                FROM get_login_data(%s, %s);
            ''', (email, type))
            result = cursor.fetchone()
            if result is None:
                return {"message": "User not found"}, 401
            code, password_recovered = result
            if not validate_password(password, password_recovered):
                return {"message": "Incorrect password"}, 401
            return {"user_code": code}, 200
        except Exception as ex:
            return {"error": f"login error: {str(ex)}"}, 500
        finally:
            cursor.close()
            db.close()
    
    @classmethod
    def get_users(self, type: int):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT user_code, user_name, user_email
                FROM get_users_by_type(%s);
            ''', (type,))

            users = cursor.fetchall()

            user_list = [
                {
                    "code": int(row[0]),
                    "name": str(row[1]).strip(),
                    "email": str(row[2]).strip()
                }
                for row in users
            ]

            if not user_list:
                return [], 204

            return user_list, 200

        except Exception as ex:
            return {"error": f"Error in get_users: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()
    
    @classmethod
    def get_user(self, code: int):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT user_code, user_name, user_email
                FROM get_user_by_code(%s);
            ''', (code,))

            row = cursor.fetchone()

            if row is None:
                return {}, 204

            user = {
                "code": int(row[0]),
                "name": str(row[1]).strip(),
                "email": str(row[2]).strip(),
                "type": int(row[0])
            }

            return user, 200

        except Exception as ex:
            return {"error": f"Error in get_user: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()

    @classmethod
    def delete_user(self, code: int):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('SELECT delete_user_by_code(%s);', (code,))
            db.commit()

            return {"message": "Successfully deleted user"}, 200

        except Exception as ex:
            return {"error": f"Error deleting user: {str(ex)}"}, 500

        finally:
            if cursor:
                cursor.close()
            if db:
                db.close()

    @classmethod
    def delete_users(self, codes: list):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('SELECT delete_users_by_codes(%s);', (codes,))

            db.commit()

            if cursor.rowcount == 0:
                return {"message": "No users found or users were not deleted."}, 404

            return {"message": "Users deleted successfully."}, 200

        except Exception as ex:
            return {"error": f"Error deleting users: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()

    @classmethod
    def register_user(self, name: str, email: str, password: str, type_user_code: int):
        try:
            db = get_connection()
            cursor = db.cursor()
            invalidations = [is_password_secure(password), is_valid_name(name), is_valid_email(email), email_exists(email, 0)]
            if False in invalidations:
                return {"message": invalidations}, 400
            hashed_password_hex = convert_bcrypt(password)
            cursor.execute('''
                SELECT register_user(%s, %s, %s, %s);
            ''', (name, email, hashed_password_hex, type_user_code))
            db.commit()
            return {"message": "User registered successfully."}, 201
        except Exception as ex:
            return {"error": f"Error registering user: {str(ex)}"}, 500
        finally:
            cursor.close()
            db.close()

    @classmethod
    def edit_user(self, user_code: int, name: str, email: str, type_user_code: int):
        try:            
            invalidations = [is_valid_name(name), is_valid_email(email), email_exists(email, user_code)]
            if False in invalidations:
                return {"errors": invalidations}, 404
            db = get_connection()
            cursor = db.cursor()
            cursor.execute('''
                SELECT update_user(%s, %s, %s, %s);
            ''', (user_code, name, email, type_user_code))
            db.commit()
            return {"message": "User updated successfully."}, 200
        except Exception as ex:
            return {"error": f"Error updating user: {str(ex)}"}, 500
        finally:
            cursor.close()
            db.close()

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
    def insert_exercise(self, lesson_code: int, title: str, instructions: str, content: str):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT insert_exercises(%s, %s, %s, %s);
            ''', (lesson_code, title, instructions, content))

            new_code = cursor.fetchone()[0]
            db.commit()

            return {"exercise_code": new_code}, 201

        except Exception as ex:
            return {"error": f"Error inserting exercise: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()


    @classmethod
    def update_exercise(self, exercise_code: int, lesson_code: int, title: str, instructions: str, content: str):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT update_exercises(%s, %s, %s, %s, %s);
            ''', (exercise_code, lesson_code, title, instructions, content))

            updated_code = cursor.fetchone()[0]
            db.commit()

            return {"exercise_code": updated_code}, 200

        except Exception as ex:
            return {"error": f"Error updating exercise: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()

    @classmethod
    def delete_exercise(self, exercise_code: int):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('SELECT delete_exercises(%s);', (exercise_code,))
            db.commit()

            return {"message": "Exercise deleted successfully."}, 200

        except Exception as ex:
            return {"error": f"Error deleting exercise: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()

    @classmethod
    def get_exercise(self, exercise_code: int):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT exercise_code, lesson_code, exercise_title, 
                       exercise_instructions, exercise_content
                FROM get_exercises(%s);
            ''', (exercise_code,))

            row = cursor.fetchone()

            if row is None:
                return {}, 204

            exercise = {
                "exercise_code": int(row[0]),
                "lesson_code": int(row[1]),
                "exercise_title": str(row[2]).strip(),
                "exercise_instructions": str(row[3]).strip(),
                "exercise_content": str(row[4]).strip()
            }

            return exercise, 200

        except Exception as ex:
            return {"error": f"Error retrieving exercise: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()