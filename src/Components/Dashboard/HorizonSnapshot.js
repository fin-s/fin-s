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
        <Lottie options={defaultOptions} />
      </div>
    )
  } else {

    return (
      <>
        <h3 className='horizon'>horizon snapshot</h3>
        <ul className='horizonList'>
          {props.snapshotList.map((element, index) => {
            if (element.balance) {
              return <div key={`${index}${element._id}`} _id={element._id} className={element.style}>
                <div>
                  <p className='month'><u>{element.month}   {element.dueDate} </u>
                  </p>
                  <p className='nickname'>{element.nickname} </p>
                </div>
                <p className='amount'>${element.amount} </p>
                <p className='balance'>Balance: ${element.balance}</p>
              </div>
            } else {
              return <div key={`${index}${element._id}`} _id={element._id} className={element.style}>
                <u className='month'>{element.month} {element.dueDate}</u>
                <p className='nickname'>{element.nickname} </p>
                <p className='amount'>${element.amount} </p>
              </div>
            }
          })}
        </ul>
        </>
    )
  }
}
export default HorizonSnapshot