import { StatusBar } from 'expo-status-bar';
import React, { Component,useState } from 'react';
import { StyleSheet, TextInput,Image, Dimensions, TouchableNativeFeedback, TouchableOpacity, ActivityIndicator, Text, View, ScrollView } from 'react-native';
import { SimpleLineIcons, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword,updateName,updateConPassword, signup } from './redux/actions/user'
import Toast from "react-native-tiny-toast";
// import Firebase, {db} from '../config/firebase';

// const auth = Firebase.auth();


const Signup =({updateEmail, updatePassword,updateName,updateConPassword, signup,navigation})=> {
    // constructor(props) {
    //     super(props);
    //     this.state = {
            
    //         isChecked: false,
    //         isLoading: false,
    //     }
    // }

    const [isLoading,setIsLoading ] = useState(false);
    const [error_message,seterror_message ] = useState('');
    const [showpass,setShowpass ] = useState(true);
    const [email,setEmail ] = useState();
    const [name,setName ] = useState();
    const [conpassword,setconpassword ] = useState();
    const [password,setPassword ] = useState();

    async function signup_request   ()  {

        signup()
        navigation.navigate('Home')
    }




    form_validation = () => {
        this.setState({ isLoading: true })
        if (this.state.email === '' || this.state.password === '' || this.state.name === '' || this.state.conpassword === '') {
            this.setState({ error_message: 'All Fields are required', isLoading: false, show_error: true })

        } else if (this.state.password.length < 6) {
            this.setState({ error_message: 'Password Invalid', isLoading: false, show_error: true })
            // console.log("password")

        }
        else if (this.state.conpassword.length < 6) {
            this.setState({ error_message: 'Password Invalid', isLoading: false, show_error: true })
            // console.log("password")

        }
        else if (this.state.password != this.state.conpassword) {
            this.setState({ error_message: 'Password are not matching', isLoading: false, show_error: true })
            // console.log("password")

        }
        else if (!this.ValidateEmail(this.state.email)) {
            this.setState({ error_message: 'Email is not valid', isLoading: false, show_error: true })
        }
        else if (!this.validateUsername(this.state.name)) {
            this.setState({ error_message: 'Please enter a valid name', isLoading: false, show_error: true })
        }
        else {
            // this.setState({isLoading:true})
            this.setState({ error_message: '', show_error: true })
            this.signup_request()
            // alert('called validation done')

        }
        // else {
        //     this.login_request()
        // }
        // console.log("working");
    }

    validateUsername = (email) => {
        if (/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(email)) {
            return (true)
        }

        return (false)
    }

    ValidateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }

        return (false)
    }

    function Signup  ()  {
        setIsLoading(!isLoading)
        // this.setState({ isLoading: true })
        signup_request()
    }


    
        return (
            <View style={styles.container}>

                <StatusBar style="auto" />
                <Image style={{alignSelf:'center',height:140,width:90,marginTop:50}}  source={require('../assets/logog.png')} />

                <ScrollView showsVerticalScrollIndicator={false} style={{  }}>
                    <View style={{ marginBottom: 100 }}>
                        <Text style={{ marginTop: 20, marginLeft: 15, marginBottom: 5, fontWeight: 'bold', color: '#a9a9a9' }}>Name</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#FCCA3F' }}>
                            <FontAwesome style={{ marginLeft: 10 }} name="user-o" size={20} color="#FCCA3F" />
                            <TextInput
                                onChangeText={value => updateName( value )}
                                value={name}
                                style={{ marginLeft: 8, fontSize: 14 }}
                                placeholder={'Enter your name'}
                            />
                        </View>
                        <Text style={{ marginTop: 20, marginLeft: 15, marginBottom: 5, fontWeight: 'bold', color: '#a9a9a9' }}>Email</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#FCCA3F' }}>
                            <FontAwesome style={{ marginLeft: 10 }} name="envelope-o" size={20} color="#FCCA3F" />
                            <TextInput
                                onChangeText={email => updateEmail(email)}
                                value={email}
                                style={{ marginLeft: 8, fontSize: 14 }}
                                placeholder={'Enter your email'}
                            />
                        </View>

                        <Text style={{ marginTop: 20, marginLeft: 15, marginBottom: 5, fontWeight: 'bold', color: '#a9a9a9' }}>Password</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#FCCA3F' }}>
                            <MaterialIcons style={{ marginLeft: 10 }} name="lock-outline" size={24} color="#FCCA3F" />
                            <TextInput
                                onChangeText={password => updatePassword(password)}
                                value={password}
                                secureTextEntry={true}
                                style={{ marginLeft: 8, fontSize: 14, width: '78%' }}
                                placeholder={'Password'}
                            />
                            <Ionicons name="ios-eye-outline" size={20} color="#a9a9a9" />
                        </View>

                        <Text style={{ marginTop: 20, marginLeft: 15, marginBottom: 5, fontWeight: 'bold', color: '#a9a9a9' }}>Confirm Password</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#FCCA3F', marginBottom: 15 }}>
                            <MaterialIcons style={{ marginLeft: 10 }} name="lock-outline" size={24} color="#FCCA3F" />
                            <TextInput
                                onChangeText={conpassword => updateConPassword(conpassword)}
                                value={conpassword}
                                secureTextEntry={true}
                                style={{ marginLeft: 8, fontSize: 14, width: '78%' }}
                                placeholder={'Password'}
                            />
                            <Ionicons name="ios-eye-outline" size={20} color="#a9a9a9" />

                        </View>
                        <Text style={{ textAlign: "center", color: "red", marginTop: 10 }}>
                            {error_message}
                        </Text>

                        {/* <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 0.5, flexDirection: 'row', marginLeft: 15, alignItems: 'center' }}>
                                <CheckBox
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
                                <Text style={{ fontSize: 14, color: '#a9a9a9' }}>Allow Discounted offers</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', marginLeft: 15 }}>
                                <Text>Forgot your password?</Text>
                            </View>
                        </View> */}

                        <View style={{ width: '53%', height: 70, backgroundColor: 'white', elevation: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginBottom: 50, marginTop: 10 }}>
                            <View style={{ justifyContent: "flex-end", alignItems: 'center' }}>
                                {isLoading ? (
                                    <View style={{ justifyContent: 'center' }}>
                                        <View >
                                            {/* <Image source={spinner} style={styles.image} /> */}
                                            <ActivityIndicator size="large" color="black" />
                                        </View>
                                    </View>
                                ) : (
                                    <View style={{ flexDirection: 'row' }}>
                                        {Platform.OS == "android" ? (
                                            <TouchableOpacity
                                                onPress={() => { Signup() }}
                                                style={{ ...styles._LOGIN_Button_Style_IOS }}
                                            >
                                                <Text style={styles._Touchable_Text_Colors}>Sign Up</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableNativeFeedback onPress={() => { Signup() }}>
                                                <View style={{ ...styles._LOGIN_Button_Style_android }}>
                                                    <Text style={styles._Touchable_Text_Colors}>Sign Up</Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                        )}
                                    </View>
                                )}
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>
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
	return bindActionCreators({ updateEmail, updatePassword,updateName,updateConPassword, signup }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup)