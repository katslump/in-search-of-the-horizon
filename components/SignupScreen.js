import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ListView,
  Alert,
  Button,
  AsyncStorage,
  Keyboard
} from 'react-native';
import {styles} from '../App';

import {Location, Permissions} from 'expo';

class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: ''
    };
  }
  static navigationOptions = {
    title: 'Register'
  };

  register() {
    fetch('https://hohoho-backend.herokuapp.com/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: this.state.username, password: this.state.password})
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson.success) {
        this.props.navigation.goBack();
      } else {
        this.setState({message: responseJson.error});
      }
    }).catch((err) => {
      this.setState({message: err});
    });
  }

  render() {
    return (<View style={styles.container}>
      <View style={{
          flexDirection: 'column',
          flex: .5,
          justifyContent: 'flex-end'
        }}>
        <Text style={styles.textBig}>Register</Text>
      </View>
      <View style={{
          flexDirection: 'column',
          flex: 1,
          width: '100%',
          justifyContent: 'flex-start'
        }}>
        <View style={styles.inputBlock}>
          <TextInput style={styles.inputBlockEl} placeholder="Enter your username" onChangeText={(text) => this.setState({username: text})}/>
          <TextInput style={styles.inputBlockEl} placeholder="Enter your password" secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
          <View style={styles.inputBlockLine}></View>
        </View>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={() => {
            this.register()
          }}>
          <Text style={styles.buttonLabel}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>)
  }
}

export default SignupScreen;
