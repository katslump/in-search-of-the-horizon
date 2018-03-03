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

class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      f_name:'',
      l_name:'',
      email: '',
      password: '',
      message: ''
    };
  }
  static navigationOptions = {
    title: 'Register'
  };
  register() {
    fetch('http://10.2.110.153:3000/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: this.state.email, password: this.state.password, f_name: this.state.f_name, l_name: this.state.l_name})
    })
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      if (responseJson) {
        this.props.navigation.goBack();
      } else {
        this.setState({message: responseJson.error});
      }
    }).catch((err) => {
      console.log("probably", err)
      this.setState({message: err});
    });
    // console.log(this.state.f_name, this.state.l_name, this.state.email, this.state.password)
  }
  render() {
    return (<View style={styles.container}>
      <View style={{
          flexDirection: 'column',
          flex: .5,
          justifyContent: 'flex-end'
        }}>
        <Text style={styles.textBig}>Horizonite Register</Text>
      </View>
      <View style={{
          flexDirection: 'column',
          flex: 1,
          width: '100%',
          justifyContent: 'flex-start'
        }}>
        <View style={styles.inputBlock}>
          <TextInput style={styles.inputBlockEl} placeholder="Enter your First Name" onChangeText={(text) => this.setState({f_name: text})}/>
          <TextInput style={styles.inputBlockEl} placeholder="Enter your Last Name" onChangeText={(text) => this.setState({l_name: text})}/>
          <TextInput style={styles.inputBlockEl} placeholder="Enter your email" onChangeText={(text) => this.setState({email: text})}/>
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
