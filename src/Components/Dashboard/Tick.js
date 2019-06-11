import React from 'react'

export default function Tick({ tick, count }) {  // your own tick component
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 52,
          marginLeft: -0.5,
          width: 1,
          height: 8,
          backgroundColor: '#DACE94',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 60,
          color: '#DACE94',
          fontSize: 20,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {tick.value}
      </div>
    </div>
  )
}