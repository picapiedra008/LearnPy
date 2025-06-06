import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="learnpy_db_n5ko",
        user="learnpy_db_n5ko_user",
        password="gd8BR4uxeSQ6gBlp9OYm1AwegDGScUyX",
        host="dpg-d0r75aadbo4c73a34vag-a.oregon-postgres.render.com",
        port="5432"
    )