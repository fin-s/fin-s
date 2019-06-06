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
        <h2 className='title'>horizon snapshot</h2>
        <Lottie options={defaultOptions} />
      </div>
    )
  } else {
    let showList = []

    return (
      <>
        <h2 className='title'>horizon snapshot</h2>
        <div className='innerInfo'>
          {/* {props.snapshotList.map((ele) => {
            return (
              <section>
                <h4>{ele.nickname} Balance Change: {ele.amount} on: {ele.dueDate} </h4>
              </section>
            )
          })} */}
          {/* <ul>{showList.map(element => {
            return <li>{element}</li>
          })}</ul> */}

          {
            props.snapshotList.map(element => {
              element.dueDates.map(date => {
                let balance
                if (date.balance) {
                  balance = `Remaining balance: $${date.balance}`
                } else {
                  balance = ''
                }
                // showList.push(`${<span className='span'>{element.month}</span>} ${date.dueDate}: ${date.nickname}  $${date.amount}.  ${balance}`)
                return <div><span>{element.month}</span>
                  <span>{date.dueDate}: </span>
                  <p>{date.nickname}</p>
                  <span>{date.amount}</span>
                  <p>{balance}</p>
                </div>
              })
            })
          }
        </div>
      </>
    )
  }
}
export default HorizonSnapshot