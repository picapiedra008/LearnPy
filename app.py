from flask import Flask
from flask_cors import CORS
from src.routers import user

app = Flask(__name__)

CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "https://siloroll.netlify.app"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

app.register_blueprint(user.main, url_prefix='/user')

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)