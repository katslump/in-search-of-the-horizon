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
export const myShit = {}
import { Permissions, Notifications } from 'expo';
const PUSH_ENDPOINT = 'http://10.2.110.153:3000/push-token';

let token = '';

export const newToken = {}

class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            message: ''
        };

    }

     registerForPushNotificationsAsync = async() => {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }

      // Get the token that uniquely identifies this device
      token = await Notifications.getExpoPushTokenAsync();
      newToken.token = token;
    }

    static navigationOptions = {
        title: 'Login'
    };

    componentDidMount() {
      this.registerForPushNotificationsAsync();
    }

    register() {
        this.props.navigation.navigate('Signup');
    }

    login(email, password) {
        let self = this;
        if (!self.state.email || !self.state.password) {
          this.setState({
            message:'Invalid Email or Password'
          });
          return;
        }
        this.setState({
          message:''
        })
        // console.log(this.state.email, this.state.password)
        fetch(`http://10.2.110.153:3000/login?email=${this.state.email}&&password=${this.state.password}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson) {
                AsyncStorage.setItem('email', JSON.stringify({email: self.state.email, password: self.state.password}));
                // console.log(self.state.email)
                myShit.currentUser = self.state.email;
                fetch(PUSH_ENDPOINT, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    token: {
                      value: token,
                    },
                    user: {
                      username: self.state.email,
                    },
                  }),
                });
                this.props.navigation.navigate('Users');
            } else {
                this.setState({message: "Invalid Login"});
            }
        }).catch((error) => {
          this.setState({
            message: 'Invalid Email or Password'
          })
        })
    }
    render() {
        return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={{
                        flexDirection: 'column',
                        flex: .4,
                        justifyContent: 'center'
                    }}>
                    <Text style={styles.textBig}>In Search of the Horizon</Text>
                    <Text>{this.state.message}</Text>
                </View>
                <View style={{
                        flexDirection: 'column',
                        flex: 1,
                        width: '100%',
                        justifyContent: 'flex-start'
                    }}>
                    <View style={styles.inputBlock}>
                        <TextInput style={styles.inputBlockEl} placeholder="Enter your email" onChangeText={(text) => this.setState({email: text})}/>
                        <TextInput style={styles.inputBlockEl} placeholder="Enter your password" secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                        <View style={styles.inputBlockLine}></View>
                    </View>
                    <TouchableOpacity onPress={() => {
                            this.login()
                        }} style={[styles.button, styles.buttonGreen]}>
                        <Text style={styles.buttonLabel}>Tap to Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={() => {
                            this.register()
                        }}>
                        <Text style={styles.buttonLabel}>Tap to Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>)
    }
}

export default LoginScreen;
