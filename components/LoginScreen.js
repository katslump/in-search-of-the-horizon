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

class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            message: ''
        };

    }
    static navigationOptions = {
        title: 'Login'
    };

    componentDidMount() {

    }

    register() {
        this.props.navigation.navigate('Signup');
    }

    login(email, password) {
        let self = this;
        // console.log(this.state.email, this.state.password)
        fetch(`http://10.2.105.66:3000/login?email=${this.state.email}&&password=${this.state.password}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson) {
                AsyncStorage.setItem('email', JSON.stringify({email: self.state.email, password: self.state.password}));
                // console.log(self.state.email)
                myShit.currentUser = self.state.email;
                this.props.navigation.navigate('Users');
            } else {
                this.setState({message: responseJson.error});
            }
        }).catch((err) => {
            console.log(err)
            this.setState({message: err});
        });

    }
    render() {
        return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={{
                        flexDirection: 'column',
                        flex: .5,
                        justifyContent: 'flex-end'
                    }}>
                    <Text style={styles.textBig}>In Search of the Horizon</Text>
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
