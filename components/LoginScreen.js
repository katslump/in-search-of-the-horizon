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

class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
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

    login(username, password) {
        let self = this;
        return fetch('https://hohoho-backend.herokuapp.com/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username || this.state.username,
                password: password || this.state.password
            })
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.success) {
                AsyncStorage.setItem('user', JSON.stringify({username: self.state.username, password: self.state.password}));
                this.props.navigation.navigate('Users');
            } else {
                this.setState({message: responseJson.error});
            }
        }).catch((err) => {
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
                        <TextInput style={styles.inputBlockEl} placeholder="Enter your username" onChangeText={(text) => this.setState({username: text})}/>
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
