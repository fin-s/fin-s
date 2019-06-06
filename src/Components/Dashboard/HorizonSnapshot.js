import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../Lotties/animation-w360-h240.json'

function HorizonSnapshot(props){
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    resizeMode: 'cover'
  }
  if(props.loadingSnapshot){
    return (
      <div>
        {/* <h3>Horizon Snapshot</h3>
        <h4>Loading...</h4> */}
        <Lottie options={defaultOptions}/>
      </div>
    )
  } else {
    let showList = []
    {
      props.snapshotList.map(element => {
        element.dueDates.map(date => {
          let balance 
          if(date.balance){
            balance = `Remaining balance: $${date.balance}`
          } else {
            balance = ''
          }
          showList.push(`${element.month} ${date.dueDate}: ${date.nickname}  $${date.amount}.  ${balance}`)
        })
      })
    }
      return (
        <div>
          <h3>Horizon Snapshot</h3>
          <ul>{showList.map(element => {
          return <li>{element}</li>
          })}</ul>
        </div>
      )
  }
}
export default HorizonSnapshot