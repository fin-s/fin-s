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
        <p className='horizonList'>
          <ul>
            {props.snapshotList.map((element, index) => {
              if (element.balance) {
                return <p key={`${index}${element._id}`} _id={element._id} className={element.style}>
                  <p>
                    <p className='month'><u>{element.month}   {element.dueDate} </u>
                      {/* <p className='dueDate'><u> { element.dueDate}</u> </p> */}
                    </p>
                    <p className='nickname'>{element.nickname} </p>
                  </p>
                  <p className='amount'>${element.amount} </p>
                  <p className='balance'>Balance: ${element.balance}</p>
                </p>
              } else {
                return <p key={`${index}${element._id}`} _id={element._id} className={element.style}>
                  <p className='month'><u>{element.month} {element.dueDate}</u>
                    {/* <p className='dueDate'><u> {element.dueDate}</u> </p> */}
                  </p>
                  <p className='nickname'>{element.nickname} </p>
                  <p className='amount'>${element.amount} </p>
                </p>
              }
            })}
          </ul>
        </p>
      </>
    )
  }
}
export default HorizonSnapshot