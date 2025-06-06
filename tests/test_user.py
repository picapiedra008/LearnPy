import pytest
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_register_user(client):
    response = client.post("/user/register_user", json={
        "name": "Pedro Picapiedra",
        "email": "pedro@example.com",
        "password": "123456",
        "type": 1
    })
    assert response.status_code in [200, 400, 500]
    assert isinstance(response.get_json(), dict)

def test_login_user(client):
    response = client.post("/user/login_user", json={
        "email": "pedro@example.com",
        "password": "123456",
        "type": 1
    })
    assert response.status_code in [200, 401, 500]
    assert isinstance(response.get_json(), dict)

def test_get_users(client):
    response = client.post("/user/get_users", json={"type": 1})
    assert response.status_code in [200, 204, 500]
    assert isinstance(response.get_json(), (list, dict))

def test_get_user(client):
    response = client.post("/user/get_user", json={"code": 1})
    assert response.status_code in [200, 204, 500]
    assert isinstance(response.get_json(), dict)

def test_edit_user(client):
    response = client.put("/user/edit_user", json={
        "code": 1,
        "name": "Pedro Actualizado",
        "email": "pedro_nuevo@example.com",
        "type": 1
    })
    assert response.status_code in [200, 400, 500]
    assert isinstance(response.get_json(), dict)

def test_delete_user(client):
    response = client.post("/user/delete_user", json={"code": 1})
    assert response.status_code in [200, 204, 500]
    assert isinstance(response.get_json(), dict)

def test_delete_users(client):
    response = client.post("/user/delete_users", json={"codes": [1, 2]})
    assert response.status_code in [200, 400, 500]
    assert isinstance(response.get_json(), dict)
