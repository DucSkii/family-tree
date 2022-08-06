import React, { useState, useEffect } from 'react'
import Tree from 'react-d3-tree'
import { Input, Button } from '@mui/material'
import Modal from '@mui/material/Modal'
import { findById } from './utils/findById'
import { useTree } from './hooks/useTree'
import { useBooleanState } from './hooks/useBooleanState'
import { v4 as uuidv4 } from 'uuid'
import addButton from './images/add-button.png'
import defaultAvatar from './images/default_avatar.jpg'
import { db } from './firebase'
import './styles.css'

const App = () => {
  const { tree, setTree, treeID, setTreeID, savedTree, setSavedTree } =
    useTree()
  const [modal, modalOpen, modalClose] = useBooleanState(false)
  const [modalNode, setModalNode] = useState({})
  const [person1, setPerson1] = useState('')
  const [person2, setPerson2] = useState('')
  const [personImage, setPersonImage] = useState('')
  const [hoveredNode, setHoveredNode] = useState(1)
  const [enteredID, setEnteredID] = useState('')
  const [changesMade, setChangesMade] = useState(false)

  useEffect(() => {
    if (!treeID) return
    else {
      if (JSON.stringify(tree) !== JSON.stringify(savedTree)) {
        setChangesMade(true)
      } else {
        setChangesMade(false)
      }
    }
  }, [tree, savedTree, treeID])

  const handleModalClose = () => {
    setPerson1('')
    setPerson2('')
    setPersonImage('')
    setModalNode({})
    modalClose()
  }
  const handleModalOpen = (nodeDatum) => {
    setPerson1(nodeDatum.person1)
    setPerson2(nodeDatum.person2)
    setPersonImage(nodeDatum.image)
    setModalNode(nodeDatum)
    modalOpen()
  }

  const handleImage = (e) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      setPersonImage(event.target.result)
    }
    reader.readAsDataURL(e)
  }

  const customNode = ({ nodeDatum }) => {
    return (
      <>
        <g
          onClick={() => handleModalOpen(nodeDatum)}
          onMouseOver={() => setHoveredNode(nodeDatum.id)}
        >
          <circle r='50' strokeWidth={0} fill='#FFFFFF' />
          <foreignObject
            height='100'
            width='100'
            clipPath='url(#myCircle)'
            transform='translate(-50 -50)'
          >
            <img
              alt='icon'
              src={nodeDatum.image || defaultAvatar}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                userSelect: 'none',
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

        {hoveredNode === nodeDatum.id && (
          <>
            <foreignObject
              height='16'
              width='16'
              clipPath='url(#myIcon)'
              transform='translate(45 30)'
              onClick={(e) => handleAddSubmit(nodeDatum.id, e)}
            >
              <img
                alt='icon'
                src={addButton}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  userSelect: 'none',
                }}
              />
            </foreignObject>
            <clipPath id='myIcon'>
              <circle cx='8' cy='8' r='8' fill='#FFFFFF' />
            </clipPath>
          </>
        )}
      </>
    )
  }
  // jjlK5mpPIn5slSmTucwM
  const handleEditSubmit = (id, e) => {
    e.preventDefault()
    let tempTree = tree
    const foundItem = findById(tempTree, id)
    foundItem.person1 = person1
    foundItem.person2 = person2
    foundItem.image = personImage
    setTree([...tempTree])
    handleModalClose()
  }

  const handleAddSubmit = (id, e) => {
    e.preventDefault()
    let tempTree = tree
    const foundItem = findById(tempTree, id)
    let newPerson = {
      person1: '',
      person2: '',
      image: '',
      children: [],
      id: uuidv4(),
      parentId: id,
    }
    foundItem.children.push(newPerson)
    setTree([...tempTree])
    handleModalClose()
  }

  const handleDelete = (id, parentId) => {
    const confirmation = window.confirm(
      'Do you really want to delete this node?'
    )
    if (confirmation) {
      let tempTree = tree
      const foundItem = findById(tempTree, parentId)
      let filteredChildren = foundItem.children.filter((item) => item.id !== id)
      foundItem.children = filteredChildren
      setTree([...tempTree])
      handleModalClose()
    }
  }

  const handleRemoveImage = (id) => {
    let tempTree = tree
    const foundItem = findById(tempTree, id)
    foundItem.image = ''
    setTree([...tempTree])
    handleModalClose()
  }

  const handleClearTree = () => {
    const confirmation = window.confirm(
      'Do you really want to delete this tree?'
    )
    if (confirmation) {
      let tempTree = tree
      const foundItem = findById(tempTree, 1)
      foundItem.person1 = ''
      foundItem.person2 = ''
      foundItem.image = ''
      foundItem.children = []
      foundItem.id = 1
      setTree([...tempTree])
      handleModalClose()
    }
  }

  const handleNewTree = () => {
    db.collection('trees')
      .add({ tree: tree })
      .then((docRef) => {
        setTreeID(docRef.id)
        setSavedTree([
          {
            person1: '',
            person2: '',
            image: '',
            children: [],
            id: 1,
          },
        ])
      })
      .catch((err) => console.log('err', err))
  }

  const handleGetTree = (id, e) => {
    e.preventDefault()
    db.collection('trees')
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.data()) {
          setTree(doc.data().tree)
          setSavedTree(doc.data().tree)
          setTreeID(id)
        } else {
          alert('Invalid ID')
        }
      })
  }

  const saveTree = (tree) => {
    db.collection('trees')
      .doc(treeID)
      .update({ tree: tree })
      .then(() => {
        setSavedTree(tree)
        alert('Tree Saved!')
      })
      .catch((err) => {
        alert(
          'Invalid image was detected: Please remove the image, tree was not saved.'
        )
        setTimeout(() => {
          setTree(tree)
        }, 1000)
      })
  }

  const handleUndoChanges = () => {
    db.collection('trees')
      .doc(treeID)
      .onSnapshot((doc) => {
        setTree(doc.data().tree)
        setSavedTree(doc.data().tree)
      })
  }

  return (
    <>
      {treeID ? (
        <>
          <div className='tree-id'>Tree ID: {treeID} (Take note of this!)</div>
          {changesMade && (
            <div className='buttons'>
              <Button
                variant='contained'
                style={{ marginRight: '20px' }}
                onClick={() => saveTree(tree)}
              >
                Save Changes
              </Button>
              <Button variant='outlined' onClick={() => handleUndoChanges()}>
                Undo Changes
              </Button>
            </div>
          )}
          <Modal open={modal} onClose={() => handleModalClose()}>
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
              <Button onClick={() => handleRemoveImage(modalNode.id)}>
                Remove Image
              </Button>
              <div className='modal-buttons'>
                {modalNode.id === 1 ? (
                  <Button onClick={() => handleClearTree()}>Clear Tree</Button>
                ) : (
                  <Button
                    onClick={() =>
                      handleDelete(modalNode.id, modalNode.parentId)
                    }
                  >
                    Delete Node
                  </Button>
                )}
                <Button onClick={(e) => handleAddSubmit(modalNode.id, e)}>
                  Add New Branch
                </Button>
              </div>
            </div>
          </Modal>
          <Tree
            data={tree}
            collapsible={false}
            orientation='vertical'
            translate={{ x: 920, y: 150 }}
            scaleExtent={{ max: 2.5, min: 0.5 }}
            zoom={1.5}
            renderCustomNodeElement={customNode}
            nodeSize={{ x: 220, y: 220 }}
          />
        </>
      ) : (
        <div className='start-hub-container'>
          <div className='box'>
            <Button onClick={() => handleNewTree()}>Create new tree</Button>
            <form onSubmit={(e) => handleGetTree(enteredID, e)}>
              <Input
                placeholder='Enter tree ID'
                onChange={(e) => setEnteredID(e.target.value)}
              />
              <Button type='submit'>Go</Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default App
