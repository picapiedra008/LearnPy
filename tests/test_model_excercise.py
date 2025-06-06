import pytest
from unittest.mock import patch, MagicMock
from src.models.exercise import Exercise

@patch("src.models.exercise.get_connection")
def test_insert_exercise_success(mock_get_connection):
    mock_conn = MagicMock()
    mock_cursor = MagicMock()
    mock_get_connection.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor

    mock_cursor.fetchone.return_value = [42]  # ID retornado
    result, status = Exercise.insert_exercise(1, "Título", "Instrucciones", "Contenido")

    assert status == 201
    assert result["exercise_code"] == 42
    mock_cursor.execute.assert_called_once()
    mock_conn.commit.assert_called_once()

@patch("src.models.exercise.get_connection")
def test_update_exercise_success(mock_get_connection):
    mock_conn = MagicMock()
    mock_cursor = MagicMock()
    mock_get_connection.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor

    mock_cursor.fetchone.return_value = [99]
    result, status = Exercise.update_exercise(1, 1, "Nuevo", "Nueva", "Nuevo contenido")

    assert status == 200
    assert result["exercise_code"] == 99
    mock_cursor.execute.assert_called_once()

@patch("src.models.exercise.get_connection")
def test_delete_exercise_success(mock_get_connection):
    mock_conn = MagicMock()
    mock_cursor = MagicMock()
    mock_get_connection.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor

    result, status = Exercise.delete_exercise(1)
    assert status == 200
    assert "Exercise deleted successfully." in result["message"]
    mock_cursor.execute.assert_called_once()

@patch("src.models.exercise.get_connection")
def test_get_exercises_success(mock_get_connection):
    mock_conn = MagicMock()
    mock_cursor = MagicMock()
    mock_get_connection.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor

    mock_cursor.fetchone.return_value = [1, "Título", "Instrucciones", "Contenido"]
    result, status = Exercise.get_exercises(1)

    assert status == 200
    assert result["exercise_code"] == 1
    assert result["exercise_title"] == "Título"
    mock_cursor.execute.assert_called_once()

@patch("src.models.exercise.get_connection")
def test_get_exercises_empty(mock_get_connection):
    mock_conn = MagicMock()
    mock_cursor = MagicMock()
    mock_get_connection.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor

    mock_cursor.fetchone.return_value = None
    result, status = Exercise.get_exercises(1)

    assert status == 204
    assert result == {}
