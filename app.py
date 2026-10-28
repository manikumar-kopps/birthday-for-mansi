import os
from flask import Flask, send_from_directory

# Serve the production Vite React build from dist directory
DIST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "dist"))

app = Flask(__name__, static_folder=DIST_DIR, static_url_path="")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_static(path):
    # If the requested file exists in dist, serve it
    file_path = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(file_path) and os.path.isfile(file_path):
        return send_from_directory(app.static_folder, path)

    # For SPA (Single Page Application) routing, fallback to index.html
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
