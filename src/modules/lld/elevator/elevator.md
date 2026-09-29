elevator/
├── models/
│   ├── ElevatorSystem
│   ├── Elevator
│   ├── Floor
│   ├── ElevatorRequest
│   ├── ElevatorPanel
│   └── Display
│
├── enums/
│   ├── ElevatorState
│   ├── Direction
│   ├── RequestType
│   └── DoorState
│
├── interfaces/
│   ├── ElevatorSelectionStrategy
│   └── RequestSchedulingStrategy
│
├── services/
│   ├── ElevatorService
│   ├── RequestService
│   └── ElevatorController
│
├── strategies/
│   ├── NearestElevatorStrategy
│   └── ScanStrategy
│
└── repositories/
    └── ElevatorRepository

    Classes
ElevatorSystem
----------------
- elevators
- floors

+ requestElevator()
+ selectElevator()
Elevator
----------------
- id
- currentFloor
- direction
- state
- requests

+ move()
+ stop()
+ openDoor()
+ closeDoor()
+ addRequest()
Floor
----------------
- floorNumber
- upButton
- downButton

+ requestElevator()
ElevatorRequest
----------------
- sourceFloor
- destinationFloor
- direction

+ getSourceFloor()
+ getDestinationFloor()
Enums
Direction
-----------
UP
DOWN
IDLE
ElevatorState
-------------
MOVING
STOPPED
MAINTENANCE
DoorState
---------
OPEN
CLOSED