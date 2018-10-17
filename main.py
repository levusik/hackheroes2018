from flask import Flask, render_template, render_template_string
from flask_socketio import SocketIO, send, emit
from geopy.geocoders import Nominatim

# configure
app = Flask(__name__)
app.config.from_object(__name__)
app.config.debug = True
app.config['SECRET_KEY'] = 'U1tr4_S3cr3t_P4ssw*rd'
socketio = SocketIO(app)

# initialize geolocator
geolocator = Nominatim(user_agent="hackheroes2018")
print(geolocator.reverse('52.509669, 13.376294'))

@socketio.on("handshake")
def handshake(pos):
    print(pos)


@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    socketio.run(app, debug=True, port=8000)
