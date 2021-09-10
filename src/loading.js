import React, { Component,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Homestack,Authstack} from './main'
import {View,ActivityIndicator} from 'react-native'
import { updateEmail, updatePassword, login, getUser } from './redux/actions/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Firebase from '../config/firebase'

 function RootNavigator({user}) {
    const [usera, setUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    React.useEffect(() => {
      Firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // console.log(user);
          getUser(user.uid)
          if (user != null) {
            setIsLoading(false)
            setUser(true)
          }else{
            setIsLoading(false)
          }
        }else{
          setIsLoading(false)
        }
      })  
    }, [])
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='#000' />
        </View>
      );
    }
  
    return (
      <NavigationContainer>
        {usera ? <Homestack /> : <Authstack />}
      </NavigationContainer>
    );
  }

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
)(RootNavigator)