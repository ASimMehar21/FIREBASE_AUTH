import React,{useState} from 'react'
import { View, Text, StyleSheet,FlatList,ActivityIndicator, Button,TouchableOpacity,TextInput } from 'react-native'
import { connect } from 'react-redux'
import Firebase, {db} from '../config/firebase'
import { requestLogout } from './redux/actions/user'
import { bindActionCreators } from 'redux'
import { List, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import Toast from "react-native-tiny-toast";
import { toUpper } from 'lodash'
import {getUser,fetchUsers} from './redux/actions/firebase'

const chats = ({user,navigation}) => {


    // console.log(user.uid)
	const [users,setUsers ] = useState([]);
	const [other_id,setOther_id ] = useState([]);
	const [isLoading,setIsLoading ] = useState(false);
	const [threads, setThreads] = useState([]);

    React.useEffect(() => {
		// fetchGroupByUserID()
		getUsers()

		// navigation.addListener("focus", () => {
		// 	// getUser()
		// })
	}, [])


    async function getUsers   ()  {
		setIsLoading(true)
		getUser(user)
		fetchGroupByUserID()
	  };

   
	async function fetchGroupByUserID (){
	setIsLoading(true)
		fetchUsers().onSnapshot(querySnapshot => {
			const Threads = querySnapshot.docs.map(documentSnapshot => {
				return {
					_id: documentSnapshot.id,
					// give defaults
					name: '',
		
					latestMessage: {
					text: ''
					},
					...documentSnapshot.data()
				};
			})
			console.log("Threads");
			const obj  = [];
				Threads.forEach((item)=>{
				if(item.name != user.name ){
					obj.push(item)
				}
			})
			setThreads(obj)
			setTimeout(() => {
				setIsLoading(false)
			}, 1500);
			return () => unsubscribe();
		});
	}



    return (
        <View>
            {isLoading?
					<View style={{flex:5,marginTop:150,alignSelf:'center'}}>
						<ActivityIndicator animating size="large" color="#1B0B2B"/>
					</View>
                    :
					<>
					<Text style={{margin:20}}>Chat List:</Text>
					<FlatList
						data={threads}
						keyExtractor={item => item._id}
						ItemSeparatorComponent={() => <Divider />}
						renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => navigation.navigate('Chatting', { thread: item })}
						>
							<List.Item
							title={item.name}
							description={item.latestMessage.text}
							titleNumberOfLines={1}
							titleStyle={styles.listTitle}
							descriptionStyle={styles.listDescription}
							descriptionNumberOfLines={1}
							/>
						</TouchableOpacity>
						)}
					/>
					</> 
				}
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
	  backgroundColor: '#f5f5f5',
	  flex: 1
	},
	listTitle: {
	  fontSize: 22
	},
	listDescription: {
	  fontSize: 16
	}
  });

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ requestLogout }, dispatch)
}

const mapStateToProps = state => {
	return {
		
		user: state.user
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(chats)