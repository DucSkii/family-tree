import React, { useState } from 'react'
import ReactFlow, { Background } from 'react-flow-renderer'
import CircleNode from './CircleNode'
import { useSelector } from 'react-redux'

// SET UP REDUX FOR GLOBAL STATES TO STORE INITIALNODES AND EDGES WHICH WILL CONTINUOUSLY UPDATE
// THIS WILL ALLOW US TO USE LOGIC IN CIRCLE NODE COMPONENT TO FIND THAT AMOUNT OF NODES THERE ARE

const nodeTypes = {
  circleNode: CircleNode,
}

const App = () => {
  const initialNodes = useSelector((state) => state.data.nodes)
  const initialEdges = useSelector((state) => state.data.edges)
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      defaultPosition={[0, 0]}
      defaultZoom={2}
      nodesDraggable={false}
      nodesConnectable={false}
      nodeTypes={nodeTypes}
    >
      <Background variant='lines' color='#b4b4b9' />
    </ReactFlow>
  )
}

export default App
