from src.database.postgres import get_connection
from src.utils.security import convert_bcrypt, validate_password, email_exists, get_connection, is_password_secure, is_valid_email, is_valid_name
from src.utils.email import send_email

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
            
            try:
                send_email(name, email, password)
            except Exception as email_ex:
                print(f"Error al enviar correo: {email_ex}")
            
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
