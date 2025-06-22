from flask import Flask
from flask_cors import CORS
import subprocess
import os
import signal
import atexit

# Rutas Flask
from src.routers import user, exercise, lesson, material, exercise_material, topic

# --- Inicia el servidor de Socket.io (Node.js) ---
node_process = subprocess.Popen(
    ["node", "server.js"],
    cwd=os.path.dirname(os.path.abspath(__file__)),  # Asegura que corra en el mismo dir
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

# --- Manejador de cierre para matar el proceso Node.js ---
def cleanup():
    print("Cerrando servidor Node.js...")
    if node_process.poll() is None:
        os.kill(node_process.pid, signal.SIGTERM)

atexit.register(cleanup)

# --- Configura el servidor Flask ---
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024

CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "http://localhost:5174", "https://siloroll.netlify.app"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

app.register_blueprint(user.main, url_prefix='/user')
app.register_blueprint(lesson.main, url_prefix='/lesson')
app.register_blueprint(exercise.main, url_prefix='/exercise')
app.register_blueprint(material.main, url_prefix='/material')
app.register_blueprint(topic.main, url_prefix='/topic')
app.register_blueprint(exercise_material.main, url_prefix='/exercise_material')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
