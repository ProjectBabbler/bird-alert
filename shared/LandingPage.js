import React, {Image, View, Text} from 'react-native';
var {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');
import Button from 'apsl-react-native-button'


var SignUpForm = React.createClass({
  render() {
    return (
        <View style={{flex: 1, alignItems: 'center',}}>
            <Image source={require('../images/logo.png')} />
            <View style={{flexDirection: 'row'}}>
                <Button
                    textStyle={{color: 'white'}}
                    style={{
                        marginRight: 10,
                        width: 100,
                        backgroundColor: 'teal',
                    }}>
                    Log in
                </Button>
                <Button
                    textStyle={{color: 'white'}}
                    style={{
                        marginLeft: 10,
                        width: 100,
                        backgroundColor: 'teal'
                    }}
                    onPress={() => {
                    this.props.navigator.push({
                        name: 'signup',
                    });
                }}>Sign Up</Button>
            </View>
        </View>
    );
  }
});

module.exports = SignUpForm;