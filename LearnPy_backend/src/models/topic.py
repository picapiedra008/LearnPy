from src.database.postgres import get_connection
from src.utils.security import  get_connection

class Topic():
   

    @classmethod
    def delete_topic(self, topic_code: int):
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('SELECT delete_topic(%s);', (topic_code,))
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

            if topics:
                return topics, 200
            else:
                return [], 200
    
        except Exception as ex:
            return {"error": f"Error geting topic: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()



    @classmethod
    def update_topic(cls, topic_code: int, topic_index: int, topic_title: str, topic_description: str):
        
        db = None
        cursor = None
        try:
            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT update_topic(%s, %s, %s, %s);
            ''', (
                topic_code,
                topic_index,
                topic_title,
                topic_description
            ))

            db.commit()
            return {"message": "Topic updated successfully."}, 200

        except Exception as ex:
            return {"error": f"Error updating topic: {str(ex)}"}, 500

        finally:
            cursor.close()
            db.close()



    @classmethod
    def create_topic(self, lesson_code: int, topic_index: int, topic_title: str, topic_description: str):

        db = None
        cursor = None

        try:

            db = get_connection()
            cursor = db.cursor()

            cursor.execute('''
                SELECT create_topic(%s, %s, %s, %s);
            ''', (lesson_code, topic_index, topic_title,
                topic_description))
            db.commit()
            result = cursor.fetchone()

            if result is None:
                return {"message": "Topic not created"}, 400
            print(result)
            return {"topic_code": result[0], "message": "Topic created successfully."}, 201
        
        except Exception as ex:
            return {"error": f"Error creating Topic: {str(ex)}"}, 500

        finally:

            if cursor:
                cursor.close()
            if db:
                db.close()