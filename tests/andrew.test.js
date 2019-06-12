const andrewFunc = require('../src/utils/andrew.functions')

test('/auth/login should return user object', () => {
    expect(andrewFunc.axiosPost('http://localhost:8989/auth/login', { email: 'h', password: 'h' })).resolves.toEqual({"__v": 0, "_id": "5d0162087bbe861020e087f5", "debts": [{"_id": "5d01624d7bbe861020e087fa", "actualPayment": 100, "balance": 1500, "dueDate": 15, "interestRate": 29.3, "minimumPayment": 50, "nickname": "Credit card 1", "notes": "note 1"}, {"_id": "5d01624d7bbe861020e087fb", "actualPayment": 500, "balance": 3000, "dueDate": 10, "interestRate": 15.29, "minimumPayment": 100, "nickname": "Credit card 2", "notes": "note 1"}], "email": "h", "expenses": [{"_id": "5d01624d7bbe861020e087fe", "amount": 20, "dueDate": 7, "nickname": "Water", "notes": "note 2"}, {"_id": "5d01624d7bbe861020e087ff", "amount": 100, "dueDate": 10, "nickname": "Electricity", "notes": "note 2"}], "firstName": "Test", "incomes": [{"_id": "5d01624d7bbe861020e087f6", "amount": 500, "interval": {"frequency": "monthly", "incomeDate1": 5, "incomeDate2": null, "incomeWeekday": null}, "nickname": "monthly", "notes": "hello", "type": "monthly"}, {"_id": "5d01624d7bbe861020e087f7", "amount": 500, "interval": {"frequency": "weekly", "incomeDate1": null, "incomeDate2": null, "incomeWeekday": 4}, "nickname": "weekly", "notes": "hello", "type": "monthly"}], "lastName": "Test"})
})

test('Redirect if not logged in when attempting to fetch list', ()=> {
    expect(andrewFunc.axiosGet('http://localhost:8989/api/list'))
    .resolves.toBe('User not logged in')
})

test('Get three steps should return 3 steps', () => {
    expect(andrewFunc.getThreeSteps().length).toBe(3)
})

test('Get three steps should return the correct 3 steps', () => {
    expect(andrewFunc.getThreeSteps()).toContain(1,4,6)
})

test('Get step text returns the correct steps', () => {
    expect(andrewFunc.getStepText()).toContain("Set all payments on auto-pay to avoid late fees and penalties", "Set all debt payments to the minimum except the smallest", "Once you have paid off the smallest debt roll that payment to the next smallest debt"
    )
})
