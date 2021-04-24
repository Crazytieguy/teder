import random

from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room

from .models import (
    Room,
    RoomState,
    player_id_to_player,
    room_id_to_room,
    prompts,
    Teder,
    Player,
)

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")


@app.route("/create/", methods=["POST"])
def create():
    room = Room()
    return room.to_json()


@socketio.on("message")
def message(data):
    print(f"{data=}, {request.namespace=}, {request.sid=}")


@socketio.event
def join(data):
    player = Player.from_dict(data)
    room_id = data["roomId"]
    room = room_id_to_room[room_id]
    join_room(room_id)
    player_id_to_player[player.id] = player
    if player not in room.players:
        room.players.append(player)
    emit("update-room", room.to_socket_json(), to=room.id)
    return room.to_socket_json()


@socketio.event
def start(player_id):
    initiator = player_id_to_player[player_id]
    room = room_id_to_room[initiator.room_id]
    join_room(room.id)
    if room.state is RoomState.WAITING:
        room.state = RoomState.HINTING
        room.tedarim = [
            Teder(prompt, player)
            for prompt, player in zip(
                random.sample(prompts, len(room.players)), room.players
            )
        ]
        emit("update-room", room.to_socket_json(), to=room.id)
    else:
        return room.to_socket_json()


if __name__ == "__main__":
    socketio.run(app)
