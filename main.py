from flask import Flask, render_template, render_template_string
from flask_socketio import SocketIO, send, emit
from geopy.geocoders import Nominatim

# configure
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SECRET_KEY'] = 'U1tr4_S3cr3t_P4ssw*rd'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    socketio.run(app, port=80)
