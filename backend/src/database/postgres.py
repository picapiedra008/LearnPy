import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="learnpy_db_ff9a",
        user="learnpy_db_ff9a_user",
        password="AHrnr5KAJY69AloJuX5fyHfm9mvtCE3A",
        host="dpg-d1fck0re5dus73frk5rg-a.oregon-postgres.render.com",
        port="5432"
    )