from flask import Blueprint, jsonify, request
from functools import wraps
from src.models.exercise import Exercise

main = Blueprint('exercises_blueprint', __name__)

def handle_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as ex:
            return jsonify({'message': str(ex)}), 500
    return wrapper

# Función auxiliar para obtener parámetros del JSON
def get_param(name, cast_type=str):
    return cast_type(request.json[name])

@main.route('/create_exercise', methods=['POST'])
@handle_exceptions
def create_exercise():
    topic_code = get_param('topic_code', int)
    title = get_param('title')
    instructions = get_param('instructions')
    content = get_param('content')
    result, resp = Exercise.insert_exercise(topic_code, title, instructions, content)
    return jsonify(result), resp

@main.route('/get_exercises', methods=['POST'])
@handle_exceptions
def get_exercises():
    topic_code = get_param('topic_code', int)
    result, resp = Exercise.get_exercises(topic_code)
    return jsonify(result), resp

@main.route('/update_exercise', methods=['PUT'])
@handle_exceptions
def update_exercise():
    exercise_code = get_param('exercise_code', int)
    topic_code = get_param('topic_code', int)
    title = get_param('title')
    instructions = get_param('instructions')
    content = get_param('content')
    result, resp = Exercise.update_exercise(exercise_code, topic_code, title, instructions, content)
    return jsonify(result), resp

@main.route('/delete_exercise', methods=['POST'])
@handle_exceptions
def delete_exercise():
    exercise_code = get_param('exercise_code', int)
    result, resp = Exercise.delete_exercise(exercise_code)
    return jsonify(result), resp
