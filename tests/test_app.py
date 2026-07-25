import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_home(client):
    response = client.get("/")
    assert response.status_code == 200


def test_empty_url(client):
    response = client.post("/analyze", json={"url": ""})
    assert response.status_code == 400


def test_invalid_url(client):
    response = client.post("/analyze", json={"url": "abcd"})
    assert response.status_code == 400