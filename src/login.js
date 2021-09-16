import { StatusBar } from 'expo-status-bar';
import React, { Component,useState } from 'react';
import { StyleSheet, TextInput,Image, AsyncStorage, Dimensions, TouchableNativeFeedback, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Toast from "react-native-tiny-toast";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from './redux/actions/user'
import Firebase from '../config/firebase'


const Login = ({navigation,user,updateEmail, updatePassword, login, getUser}) => {

    const [isLoading,setIsLoading ] = useState(false);
    const [error_message,seterror_message ] = useState('');
    const [showpass,setShowpass ] = useState(true);
    

    console.log(user);
    


    React.useEffect(() => {
        Firebase.auth().onAuthStateChanged(user => {
			if (user) {
                // console.log(user);
				getUser(user.uid)
				if (user != null) {
					navigation.replace('Home')
				}
			}
		})  
        
    }, [])


    form_validation = () => {
        this.setState({ isLoading: true })
        if (this.state.email === '' || this.state.password === '') {
            this.setState({ error_message: 'All Fields are required', isLoading: false, show_error: true })

        } else if (this.state.password.length < 6) {
            this.setState({ error_message: 'Password Invalid', isLoading: false, show_error: true })
            // console.log("password")

        } else if (!this.ValidateEmail(this.state.email)) {
            this.setState({ error_message: 'Email is not valid', isLoading: false, show_error: true })
        }
        else {
            // this.setState({isLoading:true})
            this.setState({ error_message: '', show_error: true })
            this.login_request()

        }
       
    }

    ValidateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }

        return (false)
    }

    
    
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Image style={{alignSelf:'center',height:140,width:90,marginTop:50}}  source={require('../assets/logog.png')} />
                <View style={{justifyContent:'center',flex:0.8}}>
                    <Text style={{ marginTop: 20, marginLeft: 15, marginBottom: 5, fontWeight: 'bold', color: '#a9a9a9' }}>Email</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#FCCA3F' }}>
                        <FontAwesome style={{ marginLeft: 10 }} name="envelope-o" size={20} color="#FCCA3F" />
                        <TextInput
                            onChangeText={email => updateEmail(email)}
                            defaultValue={user.email}
                            style={{ marginLeft: 8, fontSize: 14 }}
                            placeholder={'Enter your email'}
                        />
                    </View>
                    <Text style={{ marginTop: 20, marginLeft: 15, marginBottom: 5, fontWeight: 'bold', color: '#a9a9a9' }}>Password</Text>
                    {showpass ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#FCCA3F' }}>
                            <MaterialIcons style={{ marginLeft: 10 }} name="lock-outline" size={24} color="#FCCA3F" />
                            <TextInput
                                onChangeText={password => updatePassword(password)}
                                defaultValue={user.password}
                                style={{ marginLeft: 8, fontSize: 14, width: '78%' }}
                                placeholder={'Password'}
                                secureTextEntry={true}
                                maxLength={20}
                            />
                            <TouchableOpacity onPress={() => {setShowpass(!showpass)}}>
                                <Ionicons name="eye-off" size={20} color="#a9a9a9" />
                            </TouchableOpacity>

                        </View>
                        :
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#a9a9a9' }}>
                            <MaterialIcons style={{ marginLeft: 10 }} name="lock-outline" size={24} color="#FCCA3F" />
                            <TextInput
                                onChangeText={password => updatePassword(password)}
                                defaultValue={user.password}
                                // onFocus={value => this.setState({ show_error: '' })}
                                style={{ marginLeft: 8, fontSize: 14, width: '78%' }}
                                placeholder={'Password'}
                                maxLength={20}
                            />
                            <TouchableOpacity onPress={() => {setShowpass(!showpass)}}>
                                <Ionicons name="eye" size={20} color="#33A1DE" />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <Text style={{ textAlign: "center", color: "red", marginTop: 10 }}>
                    {error_message}
                </Text>
                <View style={{flexDirection:'row'}}>
                    <View style={{ flex: 0.9, flexDirection: 'row', marginLeft: 15, alignItems: 'center' }}>
                        {/* <CheckBox
                            style={{ padding: 5 }}
                            onClick={() => {
                                this.setState({
                                    isChecked: !this.state.isChecked
                                })
                            }}
                            isChecked={this.state.isChecked}
                            checkBoxColor="rgb(173,0,22)"
                            uncheckedCheckBoxColor="#a9a9a9"
                        />
                        <Text style={{ fontSize: 14, color: '#a9a9a9' }}>Remember me</Text> */}
                    </View> 
                    <View style={{ justifyContent: 'center', marginLeft: 15,marginBottom:15 }}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Signup')}}>
                            <Text>Create an account?</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ width: '65%', height: 70, backgroundColor: 'white', elevation: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginBottom: 10, marginTop: 10 }}>
                    <View style={{ justifyContent: "flex-end", alignItems: 'center' }}>
                        {isLoading ? (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{}}>
                                    {/* <Image source={spinner} style={styles.image} /> */}
                                    <ActivityIndicator size="large" color="black" />
                                </View>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row' }}>
                                {Platform.OS != "android" ? (
                                    <TouchableOpacity
                                        onPress={() => login()}
                                        // onPress={() => this.props.navigation.navigate('Dashboard')}
                                        style={{ ...styles._LOGIN_Button_Style_IOS }}
                                    >
                                        <Text style={styles._Touchable_Text_Colors}>Log In</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableNativeFeedback onPress={() => login()}>
                                    {/* // <TouchableNativeFeedback onPress={() => this.login()}>*/}
                                        <View style={{ ...styles._LOGIN_Button_Style_android }}>
                                            <Text style={styles._Touchable_Text_Colors}>Log In</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                )}
                            </View>
                        )}
                    </View>

                </View>
            </View >
        );
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    openButton1: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 15,
        elevation: 2
    },
    text: {
        fontSize: 15,
        color: "#000000",
        fontWeight: "bold",
        letterSpacing: 2,
    },
    image: {
        width: 35,
        height: 35,
    },
    button_view: {
        flex: 1,
        top: -10,
        alignItems: "center",
        justifyContent: "center",
    },
    _TextInput_Style: {
        borderBottomWidth: 1,
        backgroundColor: "#ffff",
        borderBottomColor: "#dddddd",
        padding: 5,
        marginVertical: 10,
        width: 300,
    },
    _Forgot_Password: {
        textAlign: "right",
        fontSize: 16,
        marginVertical: 5,
        color: "#1B0B2B",
        marginRight: 20,
    },
    _Touchable_Text_Colors: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        letterSpacing: 2,
    },
    _LOGIN_Button_Style_IOS: {
        width: 200,
        height: 50,
        backgroundColor: "#FDA612",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        // marginBottom: 10,
    },
    _LOGIN_Button_Style_android: {
        width: "90%",
        height: 50,
        backgroundColor: "#FDA612",
        borderRadius: 5,
        // borderWidth:2,
        // borderColor:'#E48565',
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginVertical: 5,
        // marginBottom: 10,
    },
    _LOGIN_Button_Style_IOS_camera: {
        width: 90,
        height: 50,
        backgroundColor: "#1B0B2B",
        borderRadius: 5,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        // marginBottom: 10,
    },
    _LOGIN_Button_Style_android_camera: {
        marginLeft: 5,
        width: "20%",
        height: 50,
        backgroundColor: "#1B0B2B",
        borderRadius: 10,
        // borderWidth:2,
        // borderColor:'#E48565',
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginVertical: 5,
        // marginBottom: 10,
    },
    _LOGIN_Button_Style_IOS_video: {
        width: 70,
        height: 50,
        marginRight: 10,
        backgroundColor: "#1B0B2B",
        borderRadius: 10,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        // marginBottom: 10,
    },
    _LOGIN_Button_Style_android_video: {
        marginLeft: 5,
        width: "20%",
        marginRight: 10,
        height: 50,
        backgroundColor: "#1B0B2B",
        borderRadius: 10,
        // borderWidth:2,
        // borderColor:'#E48565',
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginVertical: 5,
        // marginBottom: 10,
    },
   

});


const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)