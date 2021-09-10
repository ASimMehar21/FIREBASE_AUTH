import React,{useState} from 'react'
import { View, Text,Alert, StyleSheet,FlatList,ActivityIndicator, Button,TouchableOpacity,TextInput } from 'react-native'
import { connect } from 'react-redux'
import Firebase, {db} from '../config/firebase'
import { getUser, requestLogout } from './redux/actions/user'
import { bindActionCreators } from 'redux'
import { ScrollView } from 'react-native-gesture-handler'
import Toast from "react-native-tiny-toast";
import { toUpper } from 'lodash'

 function edit_dlt({route,navigation}) {
     
    const [email,setEmail ] = useState();
    const [name,setName ] = useState();
    const [phone,setPhone ] = useState();  
    const [key,setKey ] = useState();  
	const [isLoading,setIsLoading ] = useState(true);
    const { index } = route.params
    //  console.log(index);
    
    React.useEffect(() => {
        db.collection('userList').doc(index)
        .get().then((res) => {
        if (res.exists) {
            const user = res.data();
            setKey( res.id)
            setEmail(user.email)
            setName(user.name)
            setPhone(user.mobile)
		    setIsLoading(false)
           
        } else {
            console.log("Document does not exist!");
        }
        });
    }, [])
    

    function updateUser() {
        setIsLoading(true)

        const updateDBRef = db.collection('userList').doc(key);
        updateDBRef.set({
          name: name,
          email: email,
          mobile: phone,
        }).then((docRef) => {
            setName()
            setEmail()
            setPhone()
            setKey()
            setIsLoading(false)
        //     this.setState({
        //     key: '',
        //     name: '',
        //     email: '',
        //     mobile: '',
        //     isLoading: false,
        //   });
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.error("Error: ", error);
        setIsLoading(false)
         
        });
      }
    
      function deleteUser() {
        const dbRef = db.collection('userList').doc(index)
          dbRef.delete().then((res) => {
              console.log('Item removed from database')
              navigation.navigate('Home');
          })
      }
    
      function openTwoButtonAlert(){
        Alert.alert(
          'Delete User',
          'Are you sure?',
          [
            {text: 'Yes', onPress: () => deleteUser()},
            {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
          ],
          { 
            cancelable: true 
          }
        );
      }
    
     return (
        <View>
            {isLoading?
            <View style={{flex:5,marginTop:150,alignSelf:'center'}}>
                <ActivityIndicator animating size="large" color="#1B0B2B"/>
            </View>
            :      
             <View style={{marginTop:30}}>
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

                <TouchableOpacity onPress={()=>updateUser()} style={{borderRadius:10,marginTop:20,alignSelf:'center',height:40,width:150,backgroundColor:'#FDA612',justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:14,alignSelf:'center',fontWeight:'bold'}}>Update User</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>openTwoButtonAlert()} style={{borderRadius:10,marginTop:20,alignSelf:'center',height:40,width:150,backgroundColor:'red',justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:14,alignSelf:'center',fontWeight:'bold'}}>Delete User</Text>
                </TouchableOpacity>

            </View>
            }
        </View>
    )
}
export default edit_dlt;