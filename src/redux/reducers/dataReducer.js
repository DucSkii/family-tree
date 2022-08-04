export const setNodes = (nodes) => {
  return {
    type: 'SET_NODES',
    nodes,
  }
}

const initialState = {
  nodes: [
    {
      // person1: 'bob',
      children: [
        // {
        //   person1: 'alex',
        //   id: 2,
        // },
      ],
      id: 1,
      // person1: 'Bob',
      // person2: '',
      // children: [
      //   {
      //     person1: 'George',
      //     person2: 'Hannah',
      //     children: [
      //       {
      //         person1: 'Tina',
      //         children: [
      //           {
      //             person1: 'Jaden',
      //           },
      //         ],
      //       },
      //       {
      //         person1: 'Adam',
      //         children: [
      //           {
      //             person1: 'Mark',
      //             person2: 'Jess',
      //             children: [
      //               {
      //                 person1: 'Lucas',
      //               },
      //               {
      //                 person1: 'Anna',
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    },
  ],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NODES':
      return {
        // ...state,
        nodes: action.nodes,
      }
    default:
      return state
  }
}
