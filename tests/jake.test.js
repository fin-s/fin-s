const jakeFunc = require('../src/utils/jake.functions.js')

test('getDebtData should return an array of numbers', () => {
  expect(jakeFunc.getDebtData(0, 500, 100)).toEqual([500, 400, 300, 200, 100, 0, 500]) // to see if it subtracts 
})
test(`the second to last number in the array should be zero`, () => {
  expect(jakeFunc.getDebtData(1000, 600, 100)[jakeFunc.getDebtData(1000, 600, 100).length - 2]).toEqual(0)
})

test('getDataLabels should return a array the same length as the one passed to it', () => {
  expect (jakeFunc.getDataLabels([{data:[1, 2, 3, 4]}]).length).toEqual(4)
})

test('getDataLabels should return an array the same length as the longest array in the data set', () => {
  expect (jakeFunc.getDataLabels([{data:[1,2,3,4,5]}, {data:[1,2,3,4]}]).length).toEqual(5)
})
function testMonth(month){
let year = new Date().getFullYear()
switch (month) {
  case 0:
    return(`january ${year}`);
  case 1:
    return(`february ${year}`);
  case 2:
    return(`march ${year}`);
  case 3:
    return(`april ${year}`);
  case 4:
    return(`may ${year}`);
  case 5:
    return(`june ${year}`);
  case 6:
    return(`july ${year}`);
  case 7:
    return(`august ${year}`);
  case 8:
    return(`september ${year}`);
  case 9:
    return(`october ${year}`);
  case 10:
    return(`november ${year}`);
  case 11:
    return(`december ${year}`);
    default:
      break
}
}

test('getDataLabels should return an array with the starting element as the string of the current month and the current year', () => {
expect (jakeFunc.getDataLabels([{data:[1,2,3,4,5]}])[0]).toEqual(testMonth(new Date().getMonth()))
})