const initialState = {
  nodes: [
    {
      id: '1',
      type: 'circleNode',
      data: { parent1: 'Bob', parent2: 'Hannah' },
      position: { x: 401, y: 20 },
      zIndex: 4,
    },

    {
      id: '2',
      type: 'circleNode',
      data: {
        label: (
          <div
            onClick={() => console.log('asdsad')}
            style={{ borderRadius: '20px', backgroundColor: 'red' }}
          >
            Default Node
          </div>
        ),
      },
      position: { x: 414, y: 200 },
      zIndex: 3,
    },
    {
      id: '3',
      type: 'circleNode',
      data: { label: 'Output Node' },
      position: { x: 250, y: 150 },
      zIndex: 3,
    },
  ],
  edges: [
    { id: '1233', source: '1', target: '2', sourceHandle: 'a' },
    { id: '32323', source: '1', target: '3', sourceHandle: 'b' },
  ],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
