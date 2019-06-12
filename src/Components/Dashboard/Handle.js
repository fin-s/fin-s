import React from 'react'

export default function Handle({ // your handle component
  handle: { id, value, percent }, 
  getHandleProps
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#B3A97A',
        color: '#333'
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: 'Roboto', color: '#DACE94', fontSize: 20, marginTop: -35 }}>
        {`$${value}`}
      </div>
    </div>
  )
}