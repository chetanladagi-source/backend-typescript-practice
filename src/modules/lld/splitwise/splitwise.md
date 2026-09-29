splitwise/
├── models/
│   ├── User
│   ├── Expense
│   ├── Split
│   ├── EqualSplit
│   ├── ExactSplit
│   ├── PercentageSplit
│   ├── Balance
│   ├── Group
│   └── Transaction
│
├── enums/
│   ├── SplitType
│   ├── ExpenseStatus
│   └── TransactionStatus
│
├── interfaces/
│   ├── SplitStrategy
│   └── SettlementStrategy
│
├── services/
│   ├── ExpenseService
│   ├── SplitService
│   ├── BalanceService
│   ├── SettlementService
│   └── GroupService
│
├── strategies/
│   ├── EqualSplitStrategy
│   ├── ExactSplitStrategy
│   ├── PercentageSplitStrategy
│   └── SimplifiedSettlementStrategy
│
└── repositories/
    ├── UserRepository
    ├── ExpenseRepository
    └── GroupRepository
Classes
User
----------------
- id
- name
- email
- phone

+ getBalance()
Expense
----------------
- id
- description
- amount
- paidBy
- splits
- date

+ calculateSplits()
Split
----------------
- user
- amount
EqualSplit extends Split
ExactSplit extends Split
PercentageSplit extends Split
Balance
----------------
- fromUser
- toUser
- amount

+ addAmount()
+ settle()
Group
----------------
- id
- name
- members
- expenses

+ addMember()
+ addExpense()
Transaction
----------------
- id
- fromUser
- toUser
- amount
- status

+ settle()
Strategy
SplitStrategy
----------------
+ calculateSplits()

Implementations:

EqualSplitStrategy
ExactSplitStrategy
PercentageSplitStrategy

This is a very good example of:

Interface
   ↓
SplitStrategy
   ↓
EqualSplitStrategy
ExactSplitStrategy
PercentageSplitStrategy