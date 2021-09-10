import React,{useState} from 'react'
import { View, Text, StyleSheet,FlatList,ActivityIndicator, Button,TouchableOpacity,TextInput } from 'react-native'
import { connect } from 'react-redux'
import Firebase, {db} from '../config/firebase'
import { getUser, requestLogout } from './redux/actions/user'
import { bindActionCreators } from 'redux'
import { ScrollView } from 'react-native-gesture-handler'
import Toast from "react-native-tiny-toast";
import { toUpper } from 'lodash'


const Home = ({requestLogout,navigation,user}) => {
	

	const [email,setEmail ] = useState();
    const [name,setName ] = useState();
    const [phone,setPhone ] = useState();
	const [isLoading,setIsLoading ] = useState(false);
	const [add,setAdd ] = useState(false);
	const [users,setUsers ] = useState([]);


	React.useEffect(() => {
		navigation.addListener("focus", () => {
			getUser()
		})
	}, [])

	async function getUser   ()  {
		setIsLoading(true)
		var list = [];
		db.collection("userList")
		.onSnapshot((querySnapshot) => {
			querySnapshot.forEach((doc) => {
			// console.log(doc.id);
			// list.push(doc.data(),doc.id)
			const { name, email, mobile } = doc.data();
			list.push({
				key: doc.id,
				doc,
				name,
				email,
				mobile,
			});
			});
		});
		await setUsers(list)
		setTimeout(() => {
			// console.log(users);
		}, 500);
		setTimeout(() => {
			setIsLoading(false)
		}, 1500);
	  };

	

	  function storeUser() {
		  setIsLoading(true)
		if(name === ''){
		 alert('Fill at least your name!')
		} else {
		  db.collection('userList').add({
			name: name,
			email: email,
			mobile: phone,
		  }).then((res) => {
			  setName()
			  setEmail()
			  setPhone()
			  setIsLoading(false)
			  setAdd(false)
			  setUsers([])
			  getUser()
			  Toast.show('User Added Sucessfully')
			// this.setState({
			//   name: '',
			//   email: '',
			//   mobile: '',
			//   isLoading: false,
			// });
			// this.props.navigation.navigate('UserScreen')
		  })
		  .catch((err) => {
			console.error("Error found: ", err);
			this.setState({
			  isLoading: false,
			});
		  });
		}
	  }
	

	 function handleSignout  ()  {
		requestLogout()
		console.log(user);
		Firebase.auth().signOut()
		navigation.replace('Login')
	}

	function handleButtonPress () {
		// if (roomName.length > 0) {
		  // create new thread using firebase & firestore
		var list = [];
		  db.collection("users")
			.onSnapshot((querySnapshot) => {
				querySnapshot.forEach((doc) => {
				// console.log(doc.id);
				// list.push(doc.data(),doc.id)
				const { name, email, mobile } = doc.data();
				list.push({
					key: doc.id,
					doc,
					name,
					email,
					mobile,
				});
				});
			});

		  db
			.collection('MESSAGE_THREADS')
			.add({
				
				name: user.name,
				latestMessage: {
					text: `${user.name} created. Welcome!`,
					createdAt: new Date().getTime()
				}
			})
			.then((docRef) => {
				docRef.collection('MESSAGES').add({
					text: `You have joined the room ${user.name}.`,
					createdAt: new Date().getTime(),
					system: true
				  });
				navigation.navigate('Chat')
			})
		// }
	}
		return (
			<View style={styles.container}>
				<View style={{padding:20}}>
					<Text style={{fontSize:18}}>Welcome {user.name},{'\n'} You logged in with {user.email} from firebase.</Text>
				</View>

				{!add?
					<View style={{ marginTop: 20, flexDirection: 'row' }}>
						<Text style={{ margin: 20, alignSelf: 'flex-start', marginTop: -5 }}>Add Users:</Text>
						<View style={{ flex: 1, marginRight: 15 }}>
						<TouchableOpacity onPress={()=>{setAdd(!add)}} style={{ backgroundColor: '#a2a2a2', width: 50, height: 50, borderRadius: 10, alignSelf: 'flex-end', justifyContent: 'center' }} >
							<Text style={{ alignSelf: 'center', color: 'white' }}>Add</Text>
						</TouchableOpacity>
						</View>
					</View>
				:
					<View style={{marginBottom:10,}}>
						<Text style={{ margin: 20, alignSelf: 'flex-start', marginTop: -5 }}>Name :</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#FCCA3F' }}>
                        <TextInput
                            onChangeText={name => setName(name)}
                            value={name}
                            style={{ marginLeft: 8, fontSize: 14 }}
                            placeholder={'Name'}
                        />
                    </View>

						<Text style={{ margin: 20, alignSelf: 'flex-start', marginTop: 15 }}>Email :</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#FCCA3F' }}>
                        <TextInput
                            onChangeText={email => setEmail(email)}
                            value={email}
                            style={{ marginLeft: 8, fontSize: 14 }}
                            placeholder={'Email'}
                        />
						</View>

						<Text style={{ margin: 20, alignSelf: 'flex-start', marginTop: 15 }}>Phone Number :</Text>
						<View style={{ marginBottom:10,flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#FCCA3F' }}>
                        <TextInput
                            onChangeText={phone => setPhone(phone)}
                            value={phone}
                            style={{ marginLeft: 8, fontSize: 14 }}
                            placeholder={'Phone'}
                        />
						</View>

						<TouchableOpacity onPress={()=>storeUser()} style={{borderRadius:10,marginTop:20,alignSelf:'center',height:40,width:150,backgroundColor:'#FDA612',justifyContent:'center'}}>
							<Text style={{color:'white',fontSize:14,alignSelf:'center',fontWeight:'bold'}}>Add User</Text>
						</TouchableOpacity>

					</View>
				}

				<View style={{ marginTop: 10, flexDirection: 'row' }}>
						<Text style={{ margin: 20, alignSelf: 'flex-start', marginTop: -5 }}>Get Chats:</Text>
						<View style={{ flex: 1, marginRight: 15 }}>
						<TouchableOpacity onPress={()=>handleButtonPress()} style={{ backgroundColor: '#a2a2a2', width: 50, height: 50, borderRadius: 10, alignSelf: 'flex-end', justifyContent: 'center' }} >
							<Text style={{ alignSelf: 'center', color: 'white' }}>Get</Text>
						</TouchableOpacity>
						</View>
					</View>

				{isLoading?
					<View style={{flex:5,marginTop:150,alignSelf:'center'}}>
						<ActivityIndicator animating size="large" color="#1B0B2B"/>
					</View>
                    :
					<>
					<Text style={{margin:20}}>User List:</Text>
					<FlatList
					showsVerticalScrollIndicator={false}
					data={users}
					renderItem={({ item, index }) =>
					<TouchableOpacity onPress={()=>navigation.navigate('Detail',{index:item.key})} style={{flexDirection:'row',width:'90%',height:80,borderRadius:10,borderWidth:1,backgroundColor:'#fff',borderColor:'#FCCA3F',shadowOpacity:0.1,margin:20,alignSelf:'center'}}>
						<View style={{flex:0.4,justifyContent:'center',alignContent:'center'}}>
							<Text style={{margin:10,fontSize:18,fontWeight:'bold'}}>{item.name}</Text>	
						</View>
						<View style={{flex:0.8,marginTop:10,justifyContent:'center'}}>
							<Text >{item.email}</Text>	
							<Text>{item.mobile}</Text>	
						</View>
					</TouchableOpacity>
					
					}/>
					</> 
				}
				<View style={{alignSelf:'center',marginTop:10,marginBottom:20}}>
					<Button title='Logout' onPress={handleSignout} />
				</View>
			</View>
		)
	}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center'
	}
})



  const mapDispatchToProps = dispatch => {
	return bindActionCreators({ requestLogout }, dispatch)
}

const mapStateToProps = state => {
	return {
		
		user: state.user
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)