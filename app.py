from flask import Flask, render_template, request, jsonify
import os

# Set root directory for static/template files
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json()
    url = data.get("url", "").strip()

    if not url:
        return jsonify({"error": "Please enter a website URL."}), 400

    try:

        start = time.time()

        response = requests.get(
            url,
            timeout=10,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        end = time.time()

        content_type = response.headers.get("Content-Type", "")

        if "text/html" not in content_type:
            return jsonify({
                "error": "This URL does not contain an HTML webpage."
            }), 400

        soup = BeautifulSoup(response.text, "html.parser")

        title = soup.title.string.strip() if soup.title else "No Title Found"

        meta = soup.find("meta", attrs={"name": "description"})

        meta_description = (
            meta.get("content")
            if meta and meta.get("content")
            else "Not Available"
        )

        h1_count = len(soup.find_all("h1"))

        images = soup.find_all("img")

        missing_alt = len([
            img for img in images
            if not img.get("alt")
        ])

        words = len(soup.get_text(separator=" ").split())

        return jsonify({
            "status": response.status_code,
            "response_time": round(end - start, 2),
            "title": title,
            "meta_description": meta_description,
            "h1_count": h1_count,
            "missing_alt": missing_alt,
            "word_count": words
        })

    except requests.exceptions.MissingSchema:
        return jsonify({
            "error": "Invalid URL format."
        }), 400

    except requests.exceptions.ConnectionError:
        return jsonify({
            "error": "Unable to connect to this website."
        }), 400

    except requests.exceptions.Timeout:
        return jsonify({
            "error": "The website took too long to respond."
        }), 400

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400


if __name__ == "__main__":
    app.run(debug=True)