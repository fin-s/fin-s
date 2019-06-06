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
      <div className='horizon'>
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
          {props.snapshotList.map((element, index) => {
            if (element.balance) {
              return <li key={`${index}${element._id}`} _id={element._id} className={element.style}>
                <span>{element.nickname}</span>
                <span>{element.month}</span>
                <span>{element.dueDate}</span>
                <span>${element.amount}</span>
                <span>Balance: ${element.balance}</span>
                {/* <span>{element._id}</span> */}
              </li>
            } else {
              return <li key={`${index}${element._id}`}  _id={element._id} className={element.style}>
                <span>{element.nickname}</span>
                <span>{element.month}</span>
                <span>{element.dueDate}</span>
                <span>${element.amount}</span>
                {/* <span>{element._id}</span> */}
              </li>
            }
          })}
        </ul>
      </div>
    )
  }
}
export default HorizonSnapshot