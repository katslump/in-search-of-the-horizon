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
import {StackNavigator} from 'react-navigation';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import UsersScreen from './components/UsersScreen';

//Navigator
export default StackNavigator({
    Login: {
        screen: LoginScreen
    },
    Signup: {
        screen: SignupScreen
    },
    Users: {
        screen: UsersScreen
    }
}, {initialRouteName: 'Login'});

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    containerFull: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    listRow: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
        marginBottom: 10,
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 2,
        padding: 10
    },
    listContainer: {
        margin: 10,
        width: '100%'
    },
    input: {
        margin: 0,
        borderBottomColor: '#212121',
        borderWidth: 1,
        fontSize: 15,
        marginTop: 12,
        width: '100%',
        color: '#212121'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: 'red',
        marginBottom: 5
    },
    textBig: {
        fontSize: 36,
        textAlign: 'center',
        margin: 10
    },
    button: {
        alignSelf: 'stretch',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 2
    },
    buttonRed: {
        backgroundColor: '#FF585B'
    },
    buttonBlue: {
        backgroundColor: '#0074D9'
    },
    buttonGreen: {
        backgroundColor: '#2ECC40'
    },
    buttonLabel: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white'
    },
    inputBlock: {
        width: '80%',
        margin: 30
    },
    inputBlockEl: {
        width: '100%',
        height: 40,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: '#ebebeb',
        marginBottom: 4
    },
    inputBlockLine: {
        top: -2,
        width: 0,
        height: 2,
        position: 'relative',
        backgroundColor: '#FF9800'
    }
});
