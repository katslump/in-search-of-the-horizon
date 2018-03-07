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
  Keyboard
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
const companyLogo = require('../assets/logo.png');
// import {styles} from '../App';
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

class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      f_name:'',
      l_name:'',
      email: '',
      password: '',
      message: '',
      phone: '',
      bio: '',
      repeat: '',
      year: '',
      season: '',
      type: ''
    };
  }
  static navigationOptions = {
    title: 'Register'
  };
  register() {
    fetch('http://172.16.1.25:3000/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          bio: this.state.bio,
          cohort: {
              year: this.state.year,
              season: this.state.season,
              program: this.state.type
          },
          phone: this.state.phone,
          email: this.state.email,
          password: this.state.password,
          f_name: this.state.f_name,
          l_name: this.state.l_name})
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
      this.setState({message: err});
    });
  }
  render() {
    return (<Container style={styles.topMargin}>
      <Content style={{flex:1, padding: 25}}>
          <Text>{this.state.message}</Text>
          <Thumbnail square size={80} style={{alignSelf: "center"}} source={companyLogo} />
          <Form>
              <Item floatingLabel>
                <Label>First Name</Label>
                <Input onChangeText={(text) => this.setState({f_name: text})} autoCorrect={false} style={{padding: 15}}/>
              </Item>
              <Item floatingLabel last>
                <Label>Last Name</Label>
                <Input onChangeText={(text) => this.setState({l_name: text})} autoCorrect={false} style={{padding: 15}}/>
              </Item>
              <Item floatingLabel last>
                <Label>Email Address</Label>
                <Input onChangeText={(text) => this.setState({email: text})} autoCapitalize='none' autoCorrect={false} style={{padding: 15}}/>
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input secureTextEntry={true} onChangeText={(text) => this.setState({password: text})} autoCorrect={false} style={{padding: 15}}/>
              </Item>
              <Item floatingLabel last>
                <Label>Repeat Password</Label>
                <Input secureTextEntry={true} onChangeText={(text) => this.setState({repeat: text})} autoCorrect={false} style={{padding: 15}}/>
              </Item>
              <Item floatingLabel last>
                <Label>Mobile Phone</Label>
                <Input onChangeText={(text) => this.setState({phone: text})} autoCapitalize='none' autoCorrect={false} style={{padding: 15}}/>
              </Item>
              <Item floatingLabel last>
                <Label>Cohort Year</Label>
                <Input onChangeText={(text) => this.setState({year: text})} autoCapitalize='none' autoCorrect={false} style={{padding: 15}}/>
              </Item>
              <Item floatingLabel last>
                <Label>Cohort Season</Label>
                <Input onChangeText={(text) => this.setState({season: text})} autoCapitalize='none' autoCorrect={false} style={{padding: 15}}/>
              </Item>
              <Item floatingLabel last>
                <Label>Cohort Type</Label>
                <Input onChangeText={(text) => this.setState({type: text})} autoCapitalize='none' autoCorrect={false} style={{padding: 15}}/>
              </Item>
              <Item floatingLabel last>
                <Label>Short Bio</Label>
                <Input multiline={true} onChangeText={(text) => this.setState({bio: text})} autoCapitalize='none' autoCorrect={false} style={{padding: 15, height: 150}}/>
                </Item>
            </Form>
            <Button info onPress={() => {this.register()}} style={{
                margin: 15,
                marginTop: 25,
                width: "60%",
                alignSelf: "center",
                backgroundColor: "#EE6461"
              }}>
              <Text style={{ textAlign: "center", fontSize: 14 }}>Register</Text>
            </Button>
      </Content>
    </Container>)
  }
}

export default SignupScreen;
