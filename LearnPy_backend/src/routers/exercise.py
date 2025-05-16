from flask import Blueprint, jsonify, request
from src.models.exercise import Exercise

main = Blueprint('exercises_blueprint', __name__)

@main.route('/create_exercise', methods=['POST'])
def create_exercise():
    try:
        lesson_code = int(request.json['lesson_code'])
        title = str(request.json['title'])
        instructions = str(request.json['instructions'])
        content = str(request.json['content'])
        result, resp = Exercise.insert_exercise(lesson_code, title, instructions, content)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/get_exercise', methods=['POST'])
def get_exercise():
    try:
        exercise_code = int(request.json['exercise_code'])
        result, resp = Exercise.get_exercise(exercise_code)
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
        result, resp = Exercise.update_exercise(exercise_code, lesson_code, title, instructions, content)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/delete_exercise', methods=['POST'])
def delete_exercise():
    try:
        exercise_code = int(request.json['exercise_code'])
        result, resp = Exercise.delete_exercise(exercise_code)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500