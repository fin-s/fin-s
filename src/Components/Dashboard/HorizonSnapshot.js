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
        <h3 className ='horizon'>horizon snapshot</h3>
        <ul>
          {props.snapshotList.map((element, index) => {
            if (element.balance) {
              return <li key={`${index}${element._id}`} _id={element._id} className={element.style}>
                <span className='nickname'>{element.nickname}</span>
                <span className='month'>{element.month}</span>
                <span className='dueDate'>{element.dueDate}</span>
                <span className='amount'>${element.amount}</span>
                <span className='balance'>Balance: ${element.balance}</span>
              </li>
            } else {
              return <li key={`${index}${element._id}`} _id={element._id} className={element.style}>
                <span className='nickname'>{element.nickname}</span>
                <span className='month'>{element.month} </span>
                <span className='dueDate'>{element.dueDate}</span>
                <span className='amount'>${element.amount}</span>
              </li>
            }
          })}
        </ul>
      </div>
    )
  }
}
export default HorizonSnapshot