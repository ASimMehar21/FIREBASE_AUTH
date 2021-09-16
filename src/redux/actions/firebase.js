import Firebase, { db } from '../../../config/firebase'
// import React,{useState} from 'react'

// const [threads, setThreads] = useState([]);

export const getUser = (user) => {
		
		db.collection("users").onSnapshot((querySnapshot)=>{
				querySnapshot.forEach((doc)=>{
					if(doc.data().uid ==user.uid){
						fetchUsers(user)
					}else{
						const { name, email, mobile,uid } = doc.data();
							const userRef = db.collection('MESSAGE_THREADS')
							// userRef.add({
							// 	uid: uid,
							// 	name: name,
							// 	latestMessage: {
							// 		text: `Say hi to your friend`,
							// 		createdAt: new Date().getTime()
							// 	},
							// 	email: email,
							// })
							userRef.doc(uid).set({
								uid: uid,
								name: name,
								latestMessage: {
									text: `Say hi to your friend`,
									createdAt: new Date().getTime()
								},
								email: email,
								})
								.then(() => {
									// console.log(docRef);
								collection('MESSAGES').add({
									text: `You have joined the room ${name}.`,
									createdAt: new Date().getTime(),
									system: true
								})
							});
					}
				})
			})
		// setTimeout(() => {
		// }, 1000);
		setTimeout(() => {
			fetchUsers()
		}, 1500);
}

export const fetchUsers = () => {
    return db
	.collection('MESSAGE_THREADS')
	.orderBy('latestMessage.createdAt', 'desc')
	

	/**
	 * unsubscribe listener
	 */
}

export const storeUsers = (name,email,phone) => {
	return db.collection('userList').add({
		name: name,
		email: email,
		mobile: phone,
	  })
}

export const Logout = () =>{
	return Firebase.auth().signOut()
}

export const getMessages = (thread) =>{
	return db
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
}

export const handleSendfb = (thread) =>{
	return db
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')

	}