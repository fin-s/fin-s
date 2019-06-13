module.exports = {
  getDataLabels: userDataSets => {
    let longestPayoff = 0;
    userDataSets.forEach(current => {
      if (current.data.length > longestPayoff) {
        longestPayoff = current.data.length;
      }
    });
    let labelArr = [];
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    for (let i = 0; i < longestPayoff; i++) {
      switch (month) {
        case 0:
          labelArr.push(`january ${year}`);
          break;
        case 1:
          labelArr.push(`february ${year}`);
          break;
        case 2:
          labelArr.push(`march ${year}`);
          break;
        case 3:
          labelArr.push(`april ${year}`);
          break;
        case 4:
          labelArr.push(`may ${year}`);
          break;
        case 5:
          labelArr.push(`june ${year}`);
          break;
        case 6:
          labelArr.push(`july ${year}`);
          break;
        case 7:
          labelArr.push(`august ${year}`);
          break;
        case 8:
          labelArr.push(`september ${year}`);
          break;
        case 9:
          labelArr.push(`october ${year}`);
          break;
        case 10:
          labelArr.push(`november ${year}`);
          break;
        case 11:
          labelArr.push(`december ${year}`);
          break;
          default:
            break
      }
      if (month === 11) {
        year++;
        month = -1;
      }
      month++;
    }
    return labelArr;
  },

  getDebtData: (interestRate, balance, payment) => {
    let payments = [balance];
    let paymentTotal=0
    while (balance > 0) {
      paymentTotal += payment
      let interestPayment = (interestRate / 120000) * balance;
      let principlePayment = payment - interestPayment;
      balance -= principlePayment;
      if (balance < 0) {
        paymentTotal += balance
        balance = 0;
      }
      payments.push(Math.floor(balance));
    }
    payments.push(Math.floor(paymentTotal))
    return payments;
  }
}