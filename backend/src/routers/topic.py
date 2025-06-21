from flask import Blueprint, jsonify, request
from functools import wraps
from src.models.topic import Topic

main = Blueprint('topics_blueprint', __name__)

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
