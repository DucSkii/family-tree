import React, { useState, useEffect } from 'react'
import Tree from 'react-d3-tree'
import { Input, Button } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { findById } from './utils/findById'
import { setNodes } from './redux/reducers/dataReducer'
import './styles.css'

const App = () => {
  const dispatch = useDispatch()
  const nodes = useSelector((state) => state.data.nodes)
  const [nodesState, setNodesState] = useState(nodes)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalNode, setModalNode] = useState({})
  const [toggle, setToggle] = useState(false)
  const [person1, setPerson1] = useState('')
  const [person2, setPerson2] = useState('')
  const [personImage, setPersonImage] = useState('')
  const [newPerson1, setNewPerson1] = useState('')
  const [newPerson2, setNewPerson2] = useState('')
  const [newPersonImage, setNewPersonImage] = useState('')

  const handleModalClose = () => {
    setPerson1('')
    setPerson2('')
    setPersonImage('')
    setNewPerson1('')
    setNewPerson2('')
    setNewPersonImage('')
    setModalOpen(false)
    setModalNode({})
  }
  const handleModalOpen = (nodeDatum) => {
    setPerson1(nodeDatum.person1)
    setPerson2(nodeDatum.person2)
    setPersonImage(nodeDatum.image)
    setModalNode(nodeDatum)
    setModalOpen(true)
  }

  const handleImage = (e, newPerson) => {
    console.log('newPerson', newPerson)
    const reader = new FileReader()
    reader.onload = (event) => {
      if (newPerson) {
        setNewPersonImage(event.target.result)
      } else {
        setPersonImage(event.target.result)
      }
    }
    reader.readAsDataURL(e)
  }

  const customNode = ({ nodeDatum }) => {
    return (
      <>
        <g onClick={() => handleModalOpen(nodeDatum)}>
          <circle r='50' strokeWidth={0} fill='#FFFFFF' />
          <foreignObject
            height='100'
            width='100'
            clipPath='url(#myCircle)'
            transform='translate(-50 -50)'
          >
            <img
              alt='icon'
              src={
                nodeDatum.image ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEl37SzwbG35Np8_TGtNxNUs4msuEKPSaeTg&usqp=CAU'
              }
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </foreignObject>
          <clipPath id='myCircle'>
            <circle cx='50' cy='50' r='50' fill='#FFFFFF' />
          </clipPath>
          <text
            strokeWidth={0.5}
            fill='#000000'
            x={60}
            y={nodeDatum.person1 && nodeDatum.person2 ? -15 : 0}
          >
            {nodeDatum.person1}
          </text>
          <text
            strokeWidth={0.5}
            fill='#000000'
            x={60}
            y={nodeDatum.person1 && nodeDatum.person2 ? 15 : 0}
          >
            {nodeDatum.person2}
          </text>
        </g>
      </>
    )
  }

  const handleEditSubmit = (id, e) => {
    e.preventDefault()
    let tempNodes = nodes
    const foundItem = findById(tempNodes, id)
    foundItem.person1 = person1
    foundItem.person2 = person2
    foundItem.image = personImage
    console.log(foundItem)
    dispatch(setNodes(tempNodes))
    if (toggle === false) {
      setNodesState([tempNodes[0]])
      setToggle(!toggle)
    } else {
      setNodesState(tempNodes)
      setToggle(!toggle)
    }
    handleModalClose()
  }

  const handleAddSubmit = (id, e) => {
    e.preventDefault()
    if (newPerson1 === '' && newPerson2 === '') {
      return alert('Please enter a name')
    }

    let tempNodes = nodes
    const foundItem = findById(tempNodes, id)
    let newPerson = {
      person1: newPerson1 !== '' ? newPerson1 : undefined,
      person2: newPerson2 !== '' ? newPerson2 : undefined,
      image: newPersonImage !== '' ? newPersonImage : undefined,
      children: [],
      id: id + 1,
    }
    foundItem.children.push(newPerson)
    dispatch(setNodes(tempNodes))
    if (toggle === false) {
      setNodesState([tempNodes[0]])
      setToggle(!toggle)
    } else {
      setNodesState(tempNodes)
      setToggle(!toggle)
    }
    handleModalClose()
  }

  // console.log('nodesState', nodesState)
  return (
    <>
      <Modal open={modalOpen} onClose={() => handleModalClose()}>
        <div className='modal'>
          <p>Edit Current</p>
          <form
            className='modal-edit'
            onSubmit={(e) => handleEditSubmit(modalNode.id, e)}
          >
            <Input
              className='name-input'
              defaultValue={modalNode.person1}
              placeholder='Name'
              onChange={(e) => setPerson1(e.target.value)}
            />
            <Input
              className='name-input'
              defaultValue={modalNode.person2}
              placeholder='Name'
              onChange={(e) => setPerson2(e.target.value)}
            />
            <Input
              type='file'
              onChange={(e) => handleImage(e.target.files[0])}
            />
            <Button type='submit'>Submit</Button>
          </form>
          <p>Add New</p>
          <form
            className='modal-add'
            onSubmit={(e) => handleAddSubmit(modalNode.id, e)}
          >
            <Input
              className='name-input'
              placeholder='Name'
              onChange={(e) => setNewPerson1(e.target.value)}
            />
            <Input
              className='name-input'
              placeholder='Name'
              onChange={(e) => setNewPerson2(e.target.value)}
            />
            <Input
              type='file'
              onChange={(e) => handleImage(e.target.files[0], true)}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </div>
      </Modal>
      <Tree
        data={nodesState}
        collapsible={false}
        orientation='vertical'
        translate={{ x: 920, y: 150 }}
        scaleExtent={{ max: 2.5, min: 0.5 }}
        zoom={1}
        renderCustomNodeElement={(nodeProps) => customNode({ ...nodeProps })}
        nodeSize={{ x: 220, y: 220 }}
      />
    </>
  )
}

export default App
