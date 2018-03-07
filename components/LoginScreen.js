import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    ListView,
    Alert,
    AsyncStorage,
    Keyboard,
    Image
} from 'react-native';
import {
    Thumbnail,
    Left,
    Body,
    Icon,
    Title,
    Right,
    Spinner,
    Container,
    Text,
    Button,
    List,
    ListItem,
    Header,
    Content,
    Form,
    Item,
    Input,
    Label
} from 'native-base';

// import {styles} from '../App';
export const transfer = {}
import { Permissions, Notifications } from 'expo';
const PUSH_ENDPOINT = 'http://172.16.1.25:3000/push-token';
const companyLogo = require('../assets/logo.png');

let token = '';

export const newToken = {}

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 25
  },
  content: {
    padding: 10,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  footer: {
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 60,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  }
});

class LoginScreen extends React.Component {
        constructor() {
            super();
            this.state = {
                email: '',
                password: '',
                message: ''
            };

        }

    registerForPushNotificationsAsync = async () => {
        const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);

        let finalStatus = existingStatus;

        // Only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
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
        title: 'In Search of the Horizon'
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
            this.setState({message: 'Invalid Email or Password'});
            return;
        }
        this.setState({message: ''})

        fetch(`http://172.16.1.25:3000/login?email=${this.state.email}&&password=${this.state.password}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson) {
                AsyncStorage.setItem('email', JSON.stringify({email: self.state.email, password: self.state.password}));

                transfer.currentUser = self.state.email;
                fetch(PUSH_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: {
                            value: token
                        },
                        user: {
                            username: self.state.email
                        }
                    })
                });
                this.props.navigation.navigate('Users');
            } else {
                this.setState({message: "Invalid Login"});
            }
        }).catch((error) => {
            this.setState({message: 'Invalid Email or Password'})
        })
    }
    render() {
        return (
            <Container style={styles.topMargin}>
                <Content style={{flex:1, padding: 25}}>
                    <Text>{this.state.message}</Text>
                    <Thumbnail square size={80} style={{alignSelf: "center"}} source={companyLogo} />
                    <Form>
                        <Item floatingLabel>
                          <Label>Username</Label>
                          <Input onChangeText={(text) => this.setState({email: text})} autoCorrect={false} autoCapitalize='none' style={{padding: 15}}/>
                        </Item>
                        <Item floatingLabel last>
                          <Label>Password</Label>
                          <Input secureTextEntry={true} onChangeText={(text) => this.setState({password: text})} style={{padding: 15}}/>
                        </Item>
                      </Form>
                      <Button info onPress={() => {this.login()}} style={{
                                  margin: 15,
                                  marginTop: 25,
                                  width: "60%",
                                  alignSelf: "center",
                                  backgroundColor: "#EE6461"
                                }}>
                            <Text style={{ textAlign: "center", fontSize: 14 }}>Login</Text>
                      </Button>
                      <Button light onPress={() => {this.register()}} style={{
                                  width: "60%",
                                  alignSelf: "center"
                                }}>
                            <Text style={{ textAlign: "center", fontSize: 14 }}>Register</Text>
                      </Button>
                </Content>
            </Container>
        );
    }
}

export default LoginScreen;
