parking-lot/
├── models/
│   ├── ParkingLot
│   ├── ParkingFloor
│   ├── ParkingSpot
│   ├── Vehicle
│   ├── Car
│   ├── Bike
│   ├── Truck
│   ├── EntranceGate
│   ├── ExitGate
│   ├── Ticket
│   ├── Payment
│   └── ParkingAttendant
│
├── enums/
│   ├── VehicleType
│   ├── ParkingSpotType
│   ├── ParkingSpotStatus
│   ├── GateType
│   ├── PaymentStatus
│   └── PaymentMethod
│
├── interfaces/
│   ├── PricingStrategy
│   ├── ParkingSpotAssignmentStrategy
│   └── PaymentProcessor
│
├── services/
│   ├── ParkingService
│   ├── TicketService
│   ├── PaymentService
│   └── ParkingSpotService
│
├── strategies/
│   ├── NearestSpotStrategy
│   ├── FirstAvailableSpotStrategy
│   ├── HourlyPricingStrategy
│   └── FlatPricingStrategy
│
└── repositories/
    ├── ParkingLotRepository
    ├── ParkingSpotRepository
    └── TicketRepository

Core classes

ParkingLot
----------------
- id
- name
- floors
- entrances
- exits

+ parkVehicle()
+ unparkVehicle()
+ findAvailableSpot()

ParkingFloor
----------------
- id
- floorNumber
- spots

+ addSpot()
+ removeSpot()
+ getAvailableSpots()
ParkingSpot
----------------
- id
- spotNumber
- type
- status
- vehicle

+ assignVehicle()
+ removeVehicle()
+ isAvailable()
Vehicle
----------------
- licenseNumber
- type

+ getVehicleType()
Car extends Vehicle
Bike extends Vehicle
Truck extends Vehicle
Ticket
----------------
- id
- vehicle
- parkingSpot
- entryTime
- exitTime

+ closeTicket()
Payment
----------------
- id
- amount
- method
- status
- timestamp

+ pay()


ParkingLot
   |
   └── ParkingFloor
          |
          └── ParkingSpot
                 |
                 └── Vehicle