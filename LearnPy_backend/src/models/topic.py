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
