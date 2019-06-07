const { getList } = require('../server/controllers/getList')




const incomes = [
    {
        "interval": {
            "frequency": "monthly",
            "incomeDate1": 5,
            "incomeDate2": null,
            "incomeWeekday": null
        },
        "_id": "5cf805c47033a844c89d3d4f",
        "nickname": "monthly",
        "type": "monthly",
        "amount": 500,
        "notes": "hello"
    },
    {
        "interval": {
            "frequency": "weekly",
            "incomeDate1": null,
            "incomeDate2": null,
            "incomeWeekday": 4
        },
        "_id": "5cf805c47033a844c89d3d50",
        "nickname": "weekly",
        "type": "monthly",
        "amount": 500,
        "notes": "hello"
    }
]
const debts = [
    {
        "_id": "5cf805c57033a844c89d3d53",
        "nickname": "Credit card 1",
        "balance": 1500,
        "interestRate": 2930,
        "dueDate": 15,
        "minimumPayment": 50,
        "actualPayment": 100,
        "notes": "note 1"
    },
    {
        "_id": "5cf805c57033a844c89d3d54",
        "nickname": "Credit card 2",
        "balance": 3000,
        "interestRate": 1529,
        "dueDate": 10,
        "minimumPayment": 100,
        "actualPayment": 500,
        "notes": "note 1"
    }
]
const expenses = [
    {
        "_id": "5cf805c57033a844c89d3d57",
        "nickname": "Water",
        "dueDate": 7,
        "amount": 20,
        "notes": "note 2"
    },
    {
        "_id": "5cf805c57033a844c89d3d58",
        "nickname": "Electricity",
        "dueDate": 10,
        "amount": 100,
        "notes": "note 2"
    }
]

test('Array length should be 3', () => {
    let list = getList(incomes, debts, expenses)
    expect(list.length).toBe(3)
})

test('Array length should not be 2 or 4', () => {
    let list = getList(incomes, debts, expenses)
    expect(list.length).not.toBe(2)
    expect(list.length).not.toBe(4)
})
