from flask import Blueprint, jsonify, request
from src.models.lesson import Lesson

main = Blueprint('lessons_blueprint', __name__)

@main.route('/create_lesson', methods=['POST'])
def create_lesson():
    try:
        data = request.json
        user_code = int(data['user_code'])
        level_code = int(data['level_code'])
        visibility_code = int(data['visibility_code'])
        title = str(data['title'])
        description = str(data['description'])
        front_page = str(data['front_page'])
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
        data = request.json
        lesson_code = int(data['lesson_code'])
        user_code = int(data['user_code'])
        level_code = int(data['level_code'])
        visibility_code = int(data['visibility_code'])
        title = str(data['title'])
        description = str(data['description'])
        front_page = str(data['front_page'])
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
        data = request.json
        lesson_code = int(data['lesson_code'])
        title = str(data['title'])
        instructions = str(data['instructions'])
        content = str(data['content'])
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
        data = request.json
        exercise_code = int(data['exercise_code'])
        lesson_code = int(data['lesson_code'])
        title = str(data['title'])
        instructions = str(data['instructions'])
        content = str(data['content'])
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
