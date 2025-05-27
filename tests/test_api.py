import requests

BASE_URL = "http://127.0.0.1:5000"  # Cambia al dominio global si es necesario

def test_login_success():
    response = requests.post(f"{BASE_URL}/login", json={
        "email": "usuario@ejemplo.com",
        "password": "123456",
        "type": 2
    })
    assert response.status_code == 200
    assert "autenticado" in response.text.lower()


def test_register_user():
    response = requests.post(f"{BASE_URL}/register_user", json={
        "name": "Juan Pérez",
        "email": "juan@ejemplo.com",
        "password": "123456",
        "type": 2
    })
    assert response.status_code == 200
    assert "registrado" in response.text.lower()


def test_get_users():
    response = requests.post(f"{BASE_URL}/get_users", json={"type": 1})
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_user():
    response = requests.post(f"{BASE_URL}/get_user", json={"code": 12})
    assert response.status_code == 200
    assert "email" in response.json()


def test_edit_user():
    response = requests.put(f"{BASE_URL}/edit_user", json={
        "code": 123,
        "name": "Juan Pérez",
        "email": "juan@ejemplo.com",
        "type": 3
    })
    assert response.status_code == 200
    assert "actualizado" in response.text.lower()


def test_delete_user():
    response = requests.post(f"{BASE_URL}/delete_user", json={"code": 123})
    assert response.status_code == 200
    assert "eliminado" in response.text.lower()


def test_delete_multiple_users():
    response = requests.post(f"{BASE_URL}/delete_users", json={"codes": [2, 4, 5]})
    assert response.status_code == 200
    assert "eliminados" in response.text.lower()
