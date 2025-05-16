from flask import Blueprint, jsonify, request
from src.models.lesson import Lesson

main = Blueprint('lessons_blueprint', __name__)

@main.route('/create_lesson', methods=['POST'])
def create_lesson():
    try:
        user_code = int(request.json['user_code'])
        level_code = int(request.json['level_code'])
        visibility_code = int(request.json['visibility_code'])
        title = str(request.json['title'])
        description = str(request.json['description'])
        front_page = str(request.json['front_page'])
        result, resp = Lesson.create_lesson(user_code, level_code, visibility_code, title, description, front_page)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/get_lesson', methods=['POST'])
def get_lesson():
    try:
        lesson_code = int(request.json['lesson_code'])
        result, resp = Lesson.get_lesson(lesson_code)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/update_lesson', methods=['PUT'])
def update_lesson():
    try:
        lesson_code = int(request.json['lesson_code'])
        user_code = int(request.json['user_code'])
        level_code = int(request.json['level_code'])
        visibility_code = int(request.json['visibility_code'])
        title = str(request.json['title'])
        description = str(request.json['description'])
        front_page = str(request.json['front_page'])
        result, resp = Lesson.update_lesson(lesson_code, user_code, level_code, visibility_code, title, description, front_page)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/delete_lesson', methods=['POST'])
def delete_lesson():
    try:
        lesson_code = int(request.json['lesson_code'])
        result, resp = Lesson.delete_lesson(lesson_code)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


# Ejercicios

@main.route('/create_exercise', methods=['POST'])
def create_exercise():
    try:
        lesson_code = int(request.json['lesson_code'])
        title = str(request.json['title'])
        instructions = str(request.json['instructions'])
        content = str(request.json['content'])
        result, resp = Lesson.insert_exercise(lesson_code, title, instructions, content)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/get_exercise', methods=['POST'])
def get_exercise():
    try:
        exercise_code = int(request.json['exercise_code'])
        result, resp = Lesson.get_exercise(exercise_code)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/update_exercise', methods=['PUT'])
def update_exercise():
    try:
        exercise_code = int(request.json['exercise_code'])
        lesson_code = int(request.json['lesson_code'])
        title = str(request.json['title'])
        instructions = str(request.json['instructions'])
        content = str(request.json['content'])
        result, resp = Lesson.update_exercise(exercise_code, lesson_code, title, instructions, content)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/delete_exercise', methods=['POST'])
def delete_exercise():
    try:
        exercise_code = int(request.json['exercise_code'])
        result, resp = Lesson.delete_exercise(exercise_code)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
    
@main.route('/get_levels', methods=['POST'])
def get_levels():
    try:
        result, resp = Lesson.get_levels()
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/get_visibilities', methods=['POST'])
def get_visibilities():
    try:
        result, resp = Lesson.get_visibilities()
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/get_lessons', methods=['POST'])
def get_lessons():
    try:
        user_code = int(request.json['user_code'])
        result, resp = Lesson.get_lessons(user_code)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
