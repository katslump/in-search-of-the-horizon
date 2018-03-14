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
    Switch,
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

class SettingsScreen extends React.Component {
        constructor() {
            super();
            this.state = {
                message: ''
            };

        }
        static navigationOptions = {
          title: 'Settings'
        };

    render() {
        return (
            <Container>
        <Content>
          <List>
            <ListItem icon>
              <Left>
                <Icon name="plane" />
              </Left>
              <Body>
                <Text>Airplane Mode</Text>
              </Body>
              <Right>
                <Switch value={false} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="wifi" />
              </Left>
              <Body>
                <Text>Wi-Fi</Text>
              </Body>
              <Right>
                <Text>GeekyAnts</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="bluetooth" />
              </Left>
              <Body>
                <Text>Bluetooth</Text>
              </Body>
              <Right>
                <Text>On</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>

        );
    }
}

export default SettingsScreen;
