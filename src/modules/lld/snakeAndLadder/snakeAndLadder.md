snake-ladder/
├── models/
│   ├── Game
│   ├── Board
│   ├── Cell
│   ├── Player
│   ├── Snake
│   ├── Ladder
│   └── Dice
│
├── enums/
│   ├── GameStatus
│   └── PlayerStatus
│
├── interfaces/
│   ├── DiceStrategy
│   └── BoardMovementStrategy
│
├── services/
│   ├── GameService
│   ├── BoardService
│   └── PlayerService
│
├── strategies/
│   ├── StandardDiceStrategy
│   └── StandardMovementStrategy
│
└── repositories/
    └── GameRepository

    Classes
Game
----------------
- id
- board
- players
- dice
- currentPlayer
- status

+ start()
+ playTurn()
+ nextTurn()
+ checkWinner()
Board
----------------
- size
- cells

+ getCell()
+ movePlayer()
Cell
----------------
- position
- snake
- ladder
Player
----------------
- id
- name
- currentPosition
- status

+ move()
Snake
----------------
- head
- tail

+ getDestination()
Ladder
----------------
- start
- end

+ getDestination()
Dice
----------------
- numberOfDice
- sides

+ roll()