import React, { useState, useEffect } from 'react'
import { Handle } from 'react-flow-renderer'
import { useSelector } from 'react-redux'

const CircleNode = ({ id, data, zIndex }) => {
  const [targeted, setTargeted] = useState(false)
  const edges = useSelector((state) => state.data.edges)
  const findSourceNumber = (id) => {
    let arr = []
    edges.forEach((edge) => {
      if (edge.source === id) {
        arr.push('Connected')
      }
    })
    return arr.length
  }
  const findIfTargeted = (id) => {
    edges.forEach((edge) => {
      if (edge.target === id) setTargeted(true)
    })
  }

  useEffect(() => {
    findIfTargeted(id)
  }, [])

  const sourceNumber = findSourceNumber(id)

  const findCircleSize = (zIndex) => {
    let circleSize
    switch (zIndex) {
      case 4:
        circleSize = '126px'
        return circleSize
      case 3:
        circleSize = '100px'
        return circleSize
      case 2:
        circleSize = '74px'
        return circleSize
      case 1:
        circleSize = '48px'
        return circleSize
      default:
        return circleSize
    }
  }
  const circleSize = findCircleSize(zIndex)

  return (
    <div
      style={{
        border: '1px solid black',
        width: circleSize,
        height: circleSize,
        borderRadius: '100px',
      }}
      onClick={() => console.log(zIndex)}
    >
      {targeted ? (
        <Handle type='target' position='top' isConnectable={false} />
      ) : (
        <></>
      )}
      <Handle type='source' position='bottom' id='a' isConnectable={false} />
      <Handle type='source' position='left' id='b' isConnectable={false} />
    </div>
  )
}

export default CircleNode
