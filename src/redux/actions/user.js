import Firebase, { db } from '../../../config/firebase'

// define types

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_NAME = 'UPDATE_NAME'
export const UPDATE_CONPASSWORD = 'UPDATE_CONPASSWORD'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const CLEAR = 'CLEAR'

// actions

export const clear = () => {
	return {
		type: CLEAR
	}
}
export const updateEmail = email => {
	return {
		type: UPDATE_EMAIL,
		payload: email
	}
}

export const updatePassword = password => {
	return {
		type: UPDATE_PASSWORD,
		payload: password
	}
}

export const updateName = name => {
	return {
		type: UPDATE_NAME,
		payload: name
	}
}

export const updateConPassword = conpassword => {
	return {
		type: UPDATE_CONPASSWORD,
		payload: conpassword
	}
}

export const login = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password } = getState().user
			const response = await Firebase.auth().signInWithEmailAndPassword(email, password)
			
			dispatch(getUser(response.user.uid))
		} catch (e) {
			alert("login screen error : "+e)
		}
	}
}


export const getUser = uid => {
	return async (dispatch, getState) => {
		try {
			const user = await db
				.collection('users')
				.doc(uid)
				.get()

			dispatch({ type: LOGIN, payload: user.data() })
		} catch (e) {
			alert(e)
		}
	}
}

export const requestLogout = () => {
	return {
        type: 'LOGOUT_REQUEST',
      }
}

export const signup = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password,name,conpassword } = getState().user
			const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
			if (response.user.uid) {
				const user = {
					uid: response.user.uid,
					email: email,
					name:name,
					conpassword:conpassword
				}

				db.collection('users')
					.doc(response.user.uid)
					.set(user)

				dispatch({ type: SIGNUP, payload: user })
			}
		} catch (e) {
			alert(e)
		}
	}
}