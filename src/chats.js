import React,{useState} from 'react'
import { View, Text, StyleSheet,FlatList,ActivityIndicator, Button,TouchableOpacity,TextInput } from 'react-native'
import { connect } from 'react-redux'
import Firebase, {db} from '../config/firebase'
import { getUser, requestLogout } from './redux/actions/user'
import { bindActionCreators } from 'redux'
import { List, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import Toast from "react-native-tiny-toast";
import { toUpper } from 'lodash'

const chats = ({user,navigation}) => {


    // console.log(user.uid)
	const [users,setUsers ] = useState([]);
	const [other_id,setOther_id ] = useState([]);
	const [isLoading,setIsLoading ] = useState(false);
	const [threads, setThreads] = useState([]);

    React.useEffect(() => {
		fetchGroupByUserID()
		getUser()

		navigation.addListener("focus", () => {
			getUser()
		})
	}, [])


    async function getUser   ()  {
		setIsLoading(true)
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
		await setUsers(list)
		setTimeout(() => {
			// console.log(users);
		}, 1000);
		setTimeout(() => {
			setIsLoading(false)
		}, 1500);
	  };

   
	  async function fetchGroupByUserID (){
		setIsLoading(true)

		  console.log("callinf");
		const unsubscribe = db
		.collection('MESSAGE_THREADS')
		.orderBy('latestMessage.createdAt', 'desc')
		.onSnapshot(querySnapshot => {
		  const threads = querySnapshot.docs.map(documentSnapshot => {
			return {
			  _id: documentSnapshot.id,
			  // give defaults
			  name: '',
  
			  latestMessage: {
				text: ''
			  },
			  ...documentSnapshot.data()
			};
		  });
  
		  setThreads(threads);
  
		  setTimeout(() => {
			setIsLoading(false)
		}, 1500);
		});
  
	  /**
	   * unsubscribe listener
	   */
	  return () => unsubscribe();
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