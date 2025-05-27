from flask import Blueprint, jsonify, request
from functools import wraps
from src.models.lesson import Lesson

main = Blueprint('lessons_blueprint', __name__)

# Decorador
def handle_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as ex:
            print("Error:", ex)
            return jsonify({'message': str(ex)}), 500
    return wrapper

# Funciones auxiliares
def get_param(name, cast_type=str):
    return cast_type(request.json[name])

def get_form_param(name, cast_type=str):
    return cast_type(request.form.get(name))

@main.route('/create_lesson', methods=['POST'])
@handle_exceptions
def create_lesson():
    if 'front_page' not in request.files:
        return jsonify({'error': 'No file part (front_page)'}), 400
    
    user_code = get_form_param('user_code', int)
    level_code = get_form_param('level_code', int)
    visibility_code = get_form_param('visibility_code', int)
    title = get_form_param('title')
    description = get_form_param('description')
    file = request.files['front_page']

    result, resp = Lesson.create_lesson(user_code, level_code, visibility_code, title, description, file)
    return jsonify(result), resp

@main.route('/get_lesson', methods=['POST'])
@handle_exceptions
def get_lesson():
    lesson_code = get_param('lesson_code', int)
    result, resp = Lesson.get_lesson(lesson_code)
    return jsonify(result), resp

@main.route('/update_lesson', methods=['PUT'])
@handle_exceptions
def update_lesson():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part (file)'}), 400

    lesson_code = get_form_param('lesson_code', int)
    level_code = get_form_param('level_code', int)
    visibility_code = get_form_param('visibility_code', int)
    title = get_form_param('title')
    description = get_form_param('description')
    front_page = get_form_param('front_page')
    file = request.files['file']

    result, resp = Lesson.update_lesson(lesson_code, level_code, visibility_code, title, description, front_page, file)
    return jsonify(result), resp

@main.route('/delete_lesson', methods=['POST'])
@handle_exceptions
def delete_lesson():
    lesson_code = get_param('lesson_code', int)
    file_id = get_param('front_page')
    result, resp = Lesson.delete_lesson(lesson_code, file_id)
    return jsonify(result), resp

@main.route('/get_levels', methods=['GET'])
@handle_exceptions
def get_levels():
    result, resp = Lesson.get_levels()
    return jsonify(result), resp

@main.route('/get_visibilities', methods=['GET'])
@handle_exceptions
def get_visibilities():
    result, resp = Lesson.get_visibilities()
    return jsonify(result), resp

@main.route('/get_lessons', methods=['POST'])
@handle_exceptions
def get_lessons():
    user_code = get_param('user_code', int)
    result, resp = Lesson.get_lessons(user_code)
    return jsonify(result), resp
