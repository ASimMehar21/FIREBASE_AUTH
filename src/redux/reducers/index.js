import { combineReducers } from 'redux'
import { LOGIN, SIGNUP,LOGOUT_REQUEST, UPDATE_EMAIL, UPDATE_PASSWORD,UPDATE_NAME,UPDATE_CONPASSWORD } from '../actions/user'

const initialState = {
	email:'',
	password:'',
	uid:'',
	conpassword:'',
	name:''
};

const user = (state = initialState, action) => {
	
	switch (action.type) {
		case LOGOUT_REQUEST:
			let userState = {...state}
			userState = {
				email:'',
				password:'',
				uid:'',
				conpassword:'',
				name:''
			}

			return userState
				
		case LOGIN:
			let loginState = {...state}
			loginState = action.payload
			return loginState
		case SIGNUP:
			return action.payload
		case UPDATE_EMAIL:
			return { ...state, email: action.payload }
		case UPDATE_NAME:
			return { ...state, name: action.payload }
		case UPDATE_CONPASSWORD:
			return { ...state, conpassword: action.payload }
		case UPDATE_PASSWORD:
			return { ...state, password: action.payload }
		default:
			return state
	}
}

const rootReducer  = combineReducers({
	user:user
})
// const rootReducer = (state, action) => {
// 	// when a logout action is dispatched it will reset redux state
// 	if (action.type === 'LOGOUT_REQUEST') {
// 		console.log("Called");
// 		return appReducer(undefined, action)
// 	}
  
// 	return appReducer(state, action);
//   };

export default rootReducer