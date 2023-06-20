
import {createStore,combineReducers} from "redux"
import { loginReducer,menuReducer } from "./reducers/login"
// import thunk from "redux-thunk"

const rootReducers = combineReducers({
    loginReducer,
    menuReducer
})
const store = createStore(rootReducers)

export default store