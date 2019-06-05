import React from 'react'

function HorizonSnapshot(props){
  if(props.loadingSnapshot){
    return (
      <div>
        <h3>Horizon Snapshot</h3>
        <h4>Loading...</h4>
      </div>
    )
  } else {
      return (
        <div>
          <h3>Horizon Snapshot</h3>
          {props.snapshotList.map((ele) => {
            return (
              <section>
                <h4>{ele.nickname} Balance Change: {ele.amount} on: {ele.dueDate} </h4>
              </section>
            )
          })}
        </div>
      )
  }
}
export default HorizonSnapshot