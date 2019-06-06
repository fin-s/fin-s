import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../Lotties/animation-w360-h240.json'

function HorizonSnapshot(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    resizeMode: 'cover'
  }
  if (props.loadingSnapshot) {
    return (
      <div>
        {/* <h3>Horizon Snapshot</h3>
        <h4>Loading...</h4> */}
        <Lottie options={defaultOptions} />
      </div>
    )
  } else {

    return (
      <div>
        <h3>Horizon Snapshot</h3>
        <ul>
          {props.snapshotList.map(element => {
            if (element.balance) {
              return <li className={element.style}>
                <span>{element.nickname}</span>
                <span>{element.month}</span>
                <span>{element.dueDate}</span>
                <span>${element.amount}</span>
              </li>
            } else {
              return <li className={element.style}>
                <span>{element.nickname}</span>
                <span>{element.month}</span>
                <span>{element.dueDate}</span>
                <span>${element.amount}</span>
                <span>Balance: ${element.balance}</span>
              </li>
            }
          })}
        </ul>
      </div>
    )
  }
}
export default HorizonSnapshot