import { useState, useMemo } from 'react'
import { DEFAULT_TREE } from './const'

export const useTree = () => {
  const [tree, setTree] = useState(DEFAULT_TREE)
  const [savedTree, setSavedTree] = useState(undefined)
  const [treeID, setTreeID] = useState(undefined)
  return useMemo(
    () => ({
      tree,
      setTree,
      treeID,
      setTreeID,
      savedTree, setSavedTree
    }),
    [tree, setTree, treeID, setTreeID, savedTree, setSavedTree]
  )
}
