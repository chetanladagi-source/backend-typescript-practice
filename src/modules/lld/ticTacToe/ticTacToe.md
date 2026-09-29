tic-tac-toe/
├── models/
│   ├── Game
│   ├── Board
│   ├── Cell
│   ├── Player
│   └── Move
│
├── enums/
│   ├── GameStatus
│   ├── PlayerSymbol
│   └── PlayerType
│
├── interfaces/
│   ├── WinningStrategy
│   └── MoveStrategy
│
├── services/
│   ├── GameService
│   ├── BoardService
│   └── PlayerService
│
├── strategies/
│   ├── RowWinningStrategy
│   ├── ColumnWinningStrategy
│   ├── DiagonalWinningStrategy
│   └── RandomMoveStrategy
│
└── repositories/
    └── GameRepository

    Classes
Game
----------------
- board
- players
- currentPlayer
- status
- moves

+ start()
+ makeMove()
+ checkWinner()
+ nextTurn()
+ restart()
Board
----------------
- size
- cells

+ placeSymbol()
+ isFull()
+ getCell()
Cell
----------------
- row
- column
- symbol

+ isEmpty()
Player
----------------
- id
- name
- symbol
- type

+ makeMove()
Move
----------------
- player
- row
- column
- symbol
Winning strategy
WinningStrategy
----------------
+ checkWinner()

Implementations:

RowWinningStrategy
ColumnWinningStrategy
DiagonalWinningStrategy