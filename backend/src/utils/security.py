from src.database.postgres import get_connection
import bcrypt, re, binascii


def convert_bcrypt(password):
    password_bytes = password.encode('utf-8')
    salt_rounds = 12
    salt = bcrypt.gensalt(salt_rounds)
    hashed_password_bytes = bcrypt.hashpw(password_bytes, salt)
    hashed_password_hex = binascii.hexlify(hashed_password_bytes).decode('utf-8')
    print(binascii.unhexlify(hashed_password_hex.encode('utf-8')))
    return hashed_password_hex

def validate_password(password_entered, password_recovered_hex):
    password_bytes = password_entered.encode('utf-8')
    hashed_password_bytes = binascii.unhexlify(password_recovered_hex.encode('utf-8'))
    return bcrypt.checkpw(password_bytes, hashed_password_bytes)

def is_password_secure(password):
    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$'
    return re.match(pattern, password) is not None

def is_valid_name(name):
    pattern = r'^[a-zA-Z][a-zA-Z0-9_ .]{2,40}$'
    return re.match(pattern, name) is not None

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@gmail\.com$'
    return re.match(pattern, email) is not None

def email_exists(email: str, code: int):
    if len(email) <= 320:
        db = get_connection()
        cursor = db.cursor()
        if code == 0:
            query = "SELECT 1 FROM users WHERE user_email = %s;"
            params = (email,)
        else:
            query = "SELECT 1 FROM users WHERE user_email = %s AND user_code <> %s;"
            params = (email, code)
        cursor.execute(query, params)
        exists = cursor.fetchone() is None
        cursor.close()
        db.close()
        return exists
    return False


