import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="learnpy_db",
        user="learnpy_db_user",
        password="UWoCM3iaAGR3x4Eagh6CWbQvXQpfupZl",
        host="dpg-d04pcauuk2gs73dttt4g-a.oregon-postgres.render.com",
        port="5432"
    )