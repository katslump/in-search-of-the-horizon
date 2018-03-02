'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNavigation = require('react-navigation');

var _expo = require('expo');

var _LoginScreen = require('./components/LoginScreen');

var _LoginScreen2 = _interopRequireDefault(_LoginScreen);

var _SignupScreen = require('./components/SignupScreen');

var _SignupScreen2 = _interopRequireDefault(_SignupScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Navigator
exports.default = (0, _reactNavigation.StackNavigator)({
  Login: {
    screen: _LoginScreen2.default
  },
  Signup: {
    screen: _SignupScreen2.default
  }
}, { initialRouteName: 'Login' });
var styles = exports.styles = _reactNative.StyleSheet.create({
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
    borderBottomColor: '#ebebeb'
  },
  inputBlockLine: {
    top: -2,
    width: 0,
    height: 2,
    position: 'relative',
    backgroundColor: '#FF9800'
  }
});
//# sourceMappingURL=App.js.map