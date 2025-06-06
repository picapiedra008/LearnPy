from flask import Blueprint, jsonify, request
from src.models.lesson import Lesson

main = Blueprint('lessons_blueprint', __name__)

@main.route('/create_lesson', methods=['POST'])
def create_lesson():
    try:

        if 'front_page' not in request.files:
            return jsonify({'error': 'No file part (front_page)'}), 400
        
        user_code = int(request.form.get('user_code'))

        level_code = int(request.form.get('level_code'))

        visibility_code = int(request.form.get('visibility_code'))

        title = str(request.form.get('title'))

        description = str(request.form.get('description'))

        file = request.files['front_page']

        result, resp = Lesson.create_lesson(user_code, level_code, visibility_code, title, description, file)
        return jsonify(result), resp
    except Exception as ex:
        print("Error:", ex)
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

        if 'file' not in request.files:
            return jsonify({'error': 'No file part (front_page)'}), 400
        
        lesson_code = int(request.form.get('lesson_code'))
        level_code = int(request.form.get('level_code'))
        visibility_code = int(request.form.get('visibility_code'))
        title = str(request.form.get('title'))
        description = str(request.form.get('description'))
        front_page = str(request.form.get('front_page'))
        file = request.files['file']
        result, resp = Lesson.update_lesson(lesson_code, level_code, visibility_code, title, description, front_page, file)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/delete_lesson', methods=['POST'])
def delete_lesson():
    try:
        lesson_code = int(request.json['lesson_code'])
        file_id = str(request.json['front_page'])
        result, resp = Lesson.delete_lesson(lesson_code, file_id)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
    
@main.route('/get_levels', methods=['GET'])
def get_levels():
    try:
        result, resp = Lesson.get_levels()
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/get_visibilities', methods=['GET'])
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
