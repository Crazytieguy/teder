import string
import csv
import random

from enum import Enum, auto
from datetime import datetime
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

from dataclasses_json import dataclass_json, LetterCase
from flask import json


room_id_to_room = {}
player_id_to_player = {}
ID_LENGTH = 5
prompts_file = Path(__file__).parent / "prompts.csv"


@dataclass_json(letter_case=LetterCase.CAMEL)
@dataclass(frozen=True)
class Prompt:
    low: str
    high: str


prompts = [
    Prompt(**row) for row in csv.DictReader(prompts_file.read_text().splitlines())
]


@dataclass_json(letter_case=LetterCase.CAMEL)
@dataclass(frozen=True)
class Player:
    id: int
    name: str
    room_id: str


def generate_height():
    return round(random.uniform(0, 1), 2)


@dataclass_json(letter_case=LetterCase.CAMEL)
@dataclass(frozen=True)
class Teder:
    prompt: Prompt
    hinter: Player
    actual_height: float = field(default_factory=generate_height)
    hint: Optional[str] = None
    guessed_height: float = 0.5
    guess_is_final: bool = False


def new_id():
    chars = string.ascii_uppercase + string.digits
    id = "".join(random.sample(chars, ID_LENGTH))
    if id not in room_id_to_room:
        return id
    return new_id()


class AutoName(Enum):
    def _generate_next_value_(name, start, count, last_values):
        return name


class RoomState(AutoName):
    WAITING = auto()
    HINTING = auto()
    GUESSING = auto()
    SCORING = auto()
    CLOSED = auto()


@dataclass_json(letter_case=LetterCase.CAMEL)
@dataclass
class Room:
    id: str = field(default_factory=new_id)
    state: RoomState = RoomState.WAITING
    players: list[Player] = field(default_factory=list)
    tedarim: list[Teder] = field(default_factory=list)
    last_updated: datetime = field(default_factory=datetime.now)

    def __post_init__(self):
        room_id_to_room[self.id] = self

    # Needed for serializing of RoomStates
    def to_socket_json(self):
        return json.loads(self.to_json())


player_id_to_player: dict[str, Player]
room_id_to_room: dict[str, Room]
