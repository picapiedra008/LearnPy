from src.database.postgres import get_connection
from src.utils.security import  get_connection

class Topic():
   

    @classmethod
    def delete_topic(self, topic_code: int):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('SELECT delete_topic(%s);', (topic_code))
            db.commit()

            return {"message": "Topic deleted successfully."}, 200

        except Exception as ex:
            return {"error": f"Error deleting topic: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()


    @classmethod
    def get_topics(self, lesson_code: int):
        try:
            db = get_connection()
            cursor = db.cursor()
            cursor.execute('''
                SELECT * FROM get_topics(%s);
            ''', (lesson_code,))
            rows = cursor.fetchall()


            topics = []
            for row in rows:
                topics.append({
                    "topic_code": int(row[0]),
                    "topic_index": int(row[1]),
                    "topic_title": str(row[2]).strip(),
                    "topic_description": str(row[3]).strip()
                })

            return topics, 200 if topics else 204
    
        except Exception as ex:
            return {"error": f"Error geting topic: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()

