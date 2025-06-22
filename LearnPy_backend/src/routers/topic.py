from flask import Blueprint, jsonify, request
from functools import wraps
from src.models.topic import Topic

main = Blueprint('topics_blueprint', __name__)
def get_form_param(name, cast_type=str):
    return cast_type(request.form.get(name))

def handle_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as ex:
            return jsonify({'message': str(ex)}), 500
    return wrapper

def get_param(name, cast_type=str):
    return cast_type(request.json[name])


@main.route('/delete_topic', methods=['POST'])
@handle_exceptions
def delete_topic():
    topic_code = get_param('topic_code', int)
    result, resp = Topic.delete_topic(topic_code)
    return jsonify(result), resp


@main.route('/get_topics', methods=['POST'])
@handle_exceptions
def get_topics():
    lesson_code = get_param('lesson_code', int)
    result, resp = Topic.get_topics(lesson_code)
    return jsonify(result), resp

@main.route('/update_topic', methods=['PUT'])
@handle_exceptions
def update_topic():
    
    topic_code = get_form_param('topic_code', int)
    topic_index = get_form_param('topic_index', int)
    topic_title = get_form_param('topic_title')
    topic_description = get_form_param('topic_description')
   

    result, resp = Topic.update_topic(topic_code, topic_index, topic_title, topic_description)
    return jsonify(result), resp


@main.route('/create_topic', methods=['POST'])
@handle_exceptions
def create_topic():
   
    
    lesson_code = get_form_param('lesson_code', int)
    topic_index = get_form_param('topic_index', int)
    topic_title = get_form_param('topic_title')
    topic_description = get_form_param('topic_description')

    result, resp = Topic.create_topic(lesson_code, topic_index, topic_title, topic_description)
    return jsonify(result), resp

