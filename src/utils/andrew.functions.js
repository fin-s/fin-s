const axios = require('axios')
const {steps} = require('../Components/Dashboard/steps')
let stepsCompleted = [1,0,1,1,0,1,0,0,0,1,1,0]

module.exports = {
  axiosPost: (endpoint, req) => {
  return (axios.post(endpoint, req)
    .then(res => {
      return res.data
    }))
    .catch(err => {
      return err
    })
  },

  axiosGet: (endpoint) => {
  return (axios.get(endpoint)
    .then(res => {
      return res.data
    }))
    .catch(err => {
      return err
    })
  },

  getThreeSteps:  () => {
    let threeSteps = []

    stepsCompleted.forEach((element, index) => {
      if (element === 0 && threeSteps.length < 3) {
        threeSteps.push(index)
      }
    })

    return threeSteps
  },

  getStepText: () => {
    const displayArray = []

    const getThreeSteps = () => {
      let threeSteps = []

    stepsCompleted.forEach((element, index) => {
      if (element === 0 && threeSteps.length < 3) {
        threeSteps.push(index)
      }
    })

    return threeSteps
    }

    let stepNumber = getThreeSteps()

    steps.forEach((element) => {
      if (stepNumber.includes(element.index)) {
        displayArray.push(element.task)
      }
    })

    return displayArray
  }
}