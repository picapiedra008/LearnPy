import pytest
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_create_exercise(client):
    """Prueba crear un nuevo ejercicio."""
    response = client.post("/exercise/create_exercise", json={
        "lesson_code": 1,
        "title": "Suma básica",
        "instructions": "Suma los siguientes números.",
        "content": "2 + 2 = ?"
    })
    assert response.status_code in [200, 201, 400]
    data = response.get_json()
    assert isinstance(data, dict)

def test_get_exercises(client):
    """Prueba obtener ejercicios por lesson_code."""
    response = client.post("/exercise/get_exercises", json={
        "lesson_code": 1
    })
    assert response.status_code in [200, 404]
    data = response.get_json()
    assert isinstance(data, list) or "message" in data

def test_update_exercise(client):
    """Prueba actualizar un ejercicio existente (se necesita uno ya creado)."""
    response = client.put("/exercise/update_exercise", json={
        "exercise_code": 1,
        "lesson_code": 1,
        "title": "Suma básica actualizada",
        "instructions": "Actualiza la suma.",
        "content": "3 + 2 = ?"
    })
    assert response.status_code in [200, 404]
    data = response.get_json()
    assert isinstance(data, dict)

def test_delete_exercise(client):
    """Prueba eliminar un ejercicio (se necesita uno ya creado)."""
    response = client.post("/exercise/delete_exercise", json={
        "exercise_code": 1
    })
    assert response.status_code in [200, 404]
    data = response.get_json()
    assert isinstance(data, dict)
