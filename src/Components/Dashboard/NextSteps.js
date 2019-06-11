import React, { Component } from "react";
import axios from 'axios'
import steps from './steps'
import Step from './Step'
import ProgressBar from './StepsProgressBar'

class NextSteps extends Component {
  constructor() {
    super()

    this.state = {
      stepsCompleted: [],
      displayArray: [],
      steps: [...steps.steps],
      showSteps: [],
      loading: true,
      showAll: false
    }
  }

  async componentDidMount() {
    await this.getThreeSteps()
  }

  getThreeSteps = async () => {
    this.setState({
      showSteps: [],
      displayArray: []
    })
    let stepsCompleted = await axios.get('/api/todos')

    let threeSteps = []

    stepsCompleted.data.forEach((element, index) => {
      if (element === 0 && threeSteps.length < 3) {
        threeSteps.push(index)
      }
    })

    this.setState({
      stepsCompleted: stepsCompleted.data,
      showSteps: threeSteps
    })

    this.state.steps.forEach((element, index) => {
      let displayArray = this.state.displayArray
      if (this.state.showSteps.includes(index)) {
        this.setState({
          displayArray: [...displayArray, element]
        })
      }
    })

    this.setState({
      loading: false
    })
  }

  handleClick = async (i) => {
    let copiedComplete = [...this.state.stepsCompleted]
    if (copiedComplete[i] === 0) {
      copiedComplete[i] = 1
    } else {
      copiedComplete[i] = 0
    }
    this.setState({
      stepsCompleted: copiedComplete
    })

    await axios.post('/api/todos', { stepsCompleted: copiedComplete })

    this.getThreeSteps()
  }

  toggleShow = () => {
    this.setState({
      showAll: !this.state.showAll
    })
  }

  render() {
    return (<div className='next-step-hold'>
      <h3 className='next-step-title'>Next Steps</h3>
        {!this.state.loading && <ProgressBar 
          stepsCompleted={this.state.stepsCompleted}/>}
      <div className='nextSteps'>
        <div className='stepContainer'>
          {!this.state.showAll ? <>{this.state.loading ? <div>loading</div> :
            this.state.displayArray.map(element => {
              return <Step
                key={element.index}
                complete={this.state.stepsCompleted[element.index]}
                stepNumber={element.stepNumber}
                task={element.task}
                handleClick={this.handleClick}
                index={element.index}
                stepsCompleted={this.state.stepsCompleted} />
            })}</> :
            <>
              {this.state.steps.map(element => {
                return <Step
                  key={element.index}
                  complete={this.state.stepsCompleted[element.index]}
                  stepNumber={element.stepNumber}
                  task={element.task}
                  handleClick={this.handleClick}
                  index={element.index}
                  stepsCompleted={this.state.stepsCompleted} />
              })}
            </>}
        </div>
      </div>
      <div>

        {!this.state.showAll ? <p className='show-all-text' onClick={this.toggleShow}>Show All</p> :
          <p className='show-all-text' onClick={this.toggleShow}>Hide</p>}

      </div>
    </div>
    )
  }
}
export default NextSteps