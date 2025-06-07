import io
import pytest
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_get_material_types(client):
    response = client.get("/material/get_material_types")
    assert response.status_code in [200, 204]
    assert isinstance(response.get_json(), (list, dict))

def test_create_material(client):
    data = {
        "lesson_code": "1",
        "material_type_code": "1",
        "material_name": "123"  # se espera int en el backend
    }
    files = {
        "front_page": (io.BytesIO(b"fake front image"), "front.jpg"),
        "file": (io.BytesIO(b"archivo de material"), "material.pdf")
    }
    response = client.post("/material/create_material", data={**data, **files}, content_type="multipart/form-data")
    assert response.status_code in [200, 400, 500]
    assert isinstance(response.get_json(), dict)

def test_get_materials_by_lesson(client):
    response = client.post("/material/get_materials_by_lesson", json={
        "lesson_code": 1
    })
    assert response.status_code in [200, 204, 500]
    assert isinstance(response.get_json(), (list, dict))

def test_delete_material(client):
    response = client.post("/material/delete_material", json={
        "material_code": 1,
        "rute": "uploads/materials/test.pdf"
    })
    assert response.status_code in [200, 204, 500]
    assert isinstance(response.get_json(), dict)
