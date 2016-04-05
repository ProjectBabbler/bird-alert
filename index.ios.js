/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Navigator,
} from 'react-native';

var SignUpForm = require('./shared/SignUpForm');
var LandingPage = require('./shared/LandingPage');


class birdalert extends Component {
  render() {
    return (
        <Navigator
            initialRoute={{name: 'landing'}}
            renderScene={(route, navigator) => {
                switch (route.name) {
                    case 'landing':
                        return <LandingPage navigator={navigator}/>;
                    case 'signup':
                        return <SignUpForm onSignup={() => {
                            navigator.pop();
                        }} />;
                }
            }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('birdalert', () => birdalert);
