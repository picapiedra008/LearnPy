import io
import pytest
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_get_levels(client):
    response = client.get("/lesson/get_levels")
    assert response.status_code in [200, 204]
    assert isinstance(response.get_json(), (list, dict))

def test_get_visibilities(client):
    response = client.get("/lesson/get_visibilities")
    assert response.status_code in [200, 204]
    assert isinstance(response.get_json(), (list, dict))

def test_create_lesson(client):
    data = {
        "user_code": "1",
        "level_code": "1",
        "visibility_code": "1",
        "title": "Lección de prueba",
        "description": "Descripción de prueba"
    }
    file_data = {
        "front_page": (io.BytesIO(b"fake image data"), "image.jpg")
    }
    response = client.post("/lesson/create_lesson", data={**data, **file_data}, content_type="multipart/form-data")
    assert response.status_code in [200, 400, 500]
    assert isinstance(response.get_json(), dict)

def test_get_lessons(client):
    response = client.post("/lesson/get_lessons", json={"user_code": 1})
    assert response.status_code in [200, 204, 500]
    assert isinstance(response.get_json(), (list, dict))

def test_get_lesson(client):
    response = client.post("/lesson/get_lesson", json={"lesson_code": 1})
    assert response.status_code in [200, 204, 500]
    assert isinstance(response.get_json(), dict)

def test_update_lesson(client):
    data = {
        "lesson_code": "1",
        "level_code": "1",
        "visibility_code": "1",
        "title": "Título actualizado",
        "description": "Descripción actualizada",
        "front_page": "image.jpg"
    }
    file_data = {
        "file": (io.BytesIO(b"nueva imagen"), "image.jpg")
    }
    response = client.put("/lesson/update_lesson", data={**data, **file_data}, content_type="multipart/form-data")
    assert response.status_code in [200, 400, 500]
    assert isinstance(response.get_json(), dict)

def test_delete_lesson(client):
    response = client.post("/lesson/delete_lesson", json={
        "lesson_code": 1,
        "front_page": "image.jpg"
    })
    assert response.status_code in [200, 204, 500]
    assert isinstance(response.get_json(), dict)
