bookmyshow/
├── models/
│   ├── Movie
│   ├── Theatre
│   ├── Screen
│   ├── Seat
│   ├── Show
│   ├── User
│   ├── Booking
│   ├── Payment
│   ├── Ticket
│   ├── City
│   ├── Address
│   └── SeatLock
│
├── enums/
│   ├── SeatType
│   ├── SeatStatus
│   ├── BookingStatus
│   ├── PaymentStatus
│   ├── PaymentMethod
│   ├── ShowStatus
│   └── SeatLockStatus
│
├── interfaces/
│   ├── PaymentGateway
│   ├── SeatLockProvider
│   ├── PricingStrategy
│   ├── NotificationService
│   └── SearchStrategy
│
├── services/
│   ├── MovieService
│   ├── TheatreService
│   ├── ShowService
│   ├── SeatService
│   ├── BookingService
│   ├── PaymentService
│   ├── SearchService
│   └── NotificationService
│
├── strategies/
│   ├── MovieSearchStrategy
│   ├── CitySearchStrategy
│   ├── DynamicPricingStrategy
│   └── StandardPricingStrategy
│
├── repositories/
│   ├── MovieRepository
│   ├── TheatreRepository
│   ├── ScreenRepository
│   ├── ShowRepository
│   ├── BookingRepository
│   └── UserRepository
│
└── controllers/
    ├── MovieController
    ├── TheatreController
    ├── ShowController
    ├── BookingController
    └── PaymentController

    Movie
Movie
----------------
- id
- title
- duration
- language
- genre
- releaseDate

+ getDetails()
Theatre
Theatre
----------------
- id
- name
- address
- city
- screens

+ addScreen()
+ removeScreen()
Screen
Screen
----------------
- id
- name
- seats
- theatre

+ addSeat()
+ removeSeat()
Seat
Seat
----------------
- id
- row
- number
- type
- status

+ isAvailable()
+ reserve()
+ release()
Show
Show
----------------
- id
- movie
- screen
- startTime
- endTime
- seats

+ getAvailableSeats()
+ lockSeats()
User
User
----------------
- id
- name
- email
- phone

+ getBookings()
Booking
Booking
----------------
- id
- user
- show
- seats
- amount
- status
- createdAt

+ create()
+ confirm()
+ cancel()
Payment
Payment
----------------
- id
- booking
- amount
- method
- status
- transactionId

+ process()
+ refund()
SeatLock
SeatLock
----------------
- seat
- user
- show
- lockedAt
- expiresAt
- status

+ lock()
+ release()
+ isExpired()