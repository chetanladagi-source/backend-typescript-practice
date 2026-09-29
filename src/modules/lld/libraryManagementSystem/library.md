library/
├── models/
│   ├── Library
│   ├── Book
│   ├── BookItem
│   ├── Author
│   ├── Member
│   ├── Librarian
│   ├── LibraryCard
│   ├── BookReservation
│   ├── BookIssue
│   └── Fine
│
├── enums/
│   ├── BookStatus
│   ├── MemberStatus
│   ├── ReservationStatus
│   ├── IssueStatus
│   └── FineStatus
│
├── interfaces/
│   ├── SearchStrategy
│   ├── FineCalculationStrategy
│   └── NotificationService
│
├── services/
│   ├── BookService
│   ├── MemberService
│   ├── IssueService
│   ├── ReservationService
│   ├── FineService
│   └── SearchService
│
├── strategies/
│   ├── SearchByTitleStrategy
│   ├── SearchByAuthorStrategy
│   └── SearchByISBNStrategy
│
└── repositories/
    ├── BookRepository
    ├── MemberRepository
    └── IssueRepository


    Classes
Book
----------------
- isbn
- title
- authors
- publisher
- category

+ getDetails()
BookItem
----------------
- id
- book
- status
- rackNumber

+ checkout()
+ returnBook()
Member
----------------
- id
- name
- email
- libraryCard
- borrowedBooks

+ borrowBook()
+ returnBook()
+ reserveBook()
Author
----------------
- id
- name
BookReservation
----------------
- id
- book
- member
- status
- reservationDate

+ reserve()
+ cancel()
BookIssue
----------------
- id
- bookItem
- member
- issueDate
- dueDate
- returnDate

+ issue()
+ returnBook()
Fine
----------------
- id
- amount
- issue
- status

+ calculate()
+ pay()