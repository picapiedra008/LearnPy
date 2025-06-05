from flask import Flask
from flask_cors import CORS
from src.routers import user, exercise, lesson, material
app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024

CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "https://siloroll.netlify.app"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

app.register_blueprint(user.main, url_prefix='/user')
app.register_blueprint(lesson.main, url_prefix='/lesson')
app.register_blueprint(exercise.main, url_prefix='/exercise')
app.register_blueprint(material.main, url_prefix='/material')
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)