from flask import Flask, render_template, render_template_string
from flask_socketio import SocketIO, send, emit

# configure
app = Flask(__name__)
app.config.from_object(__name__)
app.config.debug = True
app.config['SECRET_KEY'] = 'U1tr4_S3cr3t_P4ssw*rd'
socketio = SocketIO(app)


# response to messages 
@socketio.on("start")
def handle_message(message):
    print('received message: ' + message)

@socketio.on("test")
def handshake():
    print("handshake")

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    socketio.run(app, debug=True, port=8000)
