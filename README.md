# 🚀 Page Pulse

Page Pulse is a website analyzer built using Flask, HTML, CSS, and JavaScript.

## Features

- Analyze any website URL
- HTTP Status
- Response Time
- Page Title
- Meta Description
- H1 Tag Count
- Images Missing Alt Text
- Approximate Word Count
- Responsive UI
- Error Handling

## Technologies Used

- Python
- Flask
- HTML
- CSS
- JavaScript
- BeautifulSoup
- Requests

## Installation

```bash
pip install -r requirements.txt
```

Run the application:

```bash
python app.py
```

Open:

```
http://127.0.0.1:5000
```

## API

### POST /analyze

Request

```json
{
    "url":"https://example.com"
}
```

Response

```json
{
    "status":200,
    "response_time":0.25,
    "title":"Example Domain"
}
```

## Design Decisions

- Flask was chosen because it is lightweight and easy to maintain.
- BeautifulSoup was used for parsing HTML content.
- A responsive interface was created to support desktop and mobile devices.