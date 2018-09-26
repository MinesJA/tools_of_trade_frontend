import { ADD_TOOL, TOOLS_LOADING, FETCH_TAGS, FETCH_TOOLS, SAVE_TOOL, ADD_ERROR, ADD_SUCCESS } from '../actions/toolsActions'


const initialState = {toolLoading: false, tools: [], tags: [], errors: []}


export default function Tools(state = initialState, action) {
  switch(action.type) {

    case TOOLS_LOADING:
      return Object.assign({}, state, {toolLoading: true})

    case ADD_TOOL:
      return Object.assign({}, state, {tools: [...state, action.payload]})

    case FETCH_TOOLS:
      return Object.assign({}, state, {tools: action.payload, toolLoading: false})

    case FETCH_TAGS:
      return Object.assign({}, state, {tags: action.payload, toolLoading: false})

    case SAVE_TOOL:
      let index = state.tools.findIndex(item=>item.id == action.payload)
      let newItem = Object.assign({}, state.tools[index])
      let copyArray = [...state.tools]
      newItem.saves++
      copyArray.splice(index, 1, newItem)

      return Object.assign({}, state, {tools: copyArray})

    case ADD_ERROR:
      return Object.assign({}, state, {errors: action.payload})

    case ADD_SUCCESS:
      return Object.assign({}, state, {success: action.payload})

    default:
      return {...state}
  }
}
