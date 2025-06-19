from src.database.postgres import get_connection
from src.utils.security import  get_connection

class Exercise():
    
    @classmethod
    def insert_exercise(self, topic_code: int, title: str, instructions: str, answer: str, initial_code: str, with_python_code: bool):
        try:
            db = get_connection()
            cursor = db.cursor()
            cursor.execute('SELECT insert_exercise(%s, %s, %s, %s, %s, %s);', (topic_code, title, instructions, answer, initial_code, with_python_code))
            new_code = cursor.fetchone()[0]
            db.commit()

            return {"exercise_code": new_code}, 201

        except Exception as ex:
            return {"error": f"Error inserting exercise: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()


    @classmethod
    def update_exercise(self,exercise_code, topic_code: int, title: str, instructions: str, answer: str, initial_code: str, with_python_code: bool):
        try:
            db = get_connection()
            cursor = db.cursor()
            cursor.execute('SELECT update_exercises(%s, %s, %s, %s, %s, %s, %s);', (exercise_code,topic_code, title, instructions, answer, initial_code, with_python_code))
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
    def get_exercises(self, topic_code: int):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT *
                FROM get_exercises(%s);
            ''', (topic_code,))

            rows = cursor.fetchall()
            exercises = []
            for row in rows:
                exercises.append({
                "exercise_code": int(row[0]),
                "exercise_title": str(row[1]).strip(),
                "exercise_instructions": str(row[2]).strip(),
                "exercise_answer": str(row[3]).strip(),
                "exercise_intial_python_code":str(row[4]).strip(),
                "with_python_code":bool(row[5])
                })
            


            return exercises, 200 if exercises else 204

        except Exception as ex:
            return {"error": f"Error retrieving exercise: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()