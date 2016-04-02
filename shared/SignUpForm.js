import React, {Image, View} from 'react-native';
var {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');

var SignUpForm = React.createClass({
  render() {
    return (
      <GiftedForm
        formName='signupForm' // GiftedForm instances that use the same name will also share the same states
        openModal={(route) => {
          navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
        }}
        clearOnClose={false} // delete the values of the form when unmounted
        validators={{
          fullName: {
            title: 'Full name',
            validate: [{
              validator: 'isLength',
              arguments: [1]
            }]
          },
          emailAddress: {
            title: 'Email address',
            validate: [{
              validator: 'isEmail',
            }]
          }
        }}
      >
        <View style={{flex: 1, alignItems: 'center',}}>
            <Image source={require('../images/logo.png')} />
        </View>
        <GiftedForm.TextInputWidget
          name='fullName' // mandatory
          title='Full name'
          placeholder='Marco Polo'
          clearButtonMode='while-editing'
        />


        <GiftedForm.TextInputWidget
          name='ebird_username'
          title='Ebird Username'
          placeholder='MarcoPolo'
          clearButtonMode='while-editing'
        />

        <GiftedForm.TextInputWidget
          name='password' // mandatory
          title='Ebird Password'
          placeholder='******'
          clearButtonMode='while-editing'
          secureTextEntry={true}
        />

        <GiftedForm.TextInputWidget
          name='emailAddress' // mandatory
          title='Email address'
          placeholder='example@nomads.ly'
          keyboardType='email-address'
          clearButtonMode='while-editing'
        />

        <GiftedForm.SubmitWidget
          title='Sign up'
          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            if (isValid === true) {
              /* Implement the request to your server using values variable
              ** then you can do:
              ** postSubmit(); // disable the loader
              ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
              */
            }
          }}

        />

        <GiftedForm.NoticeWidget
          title='By signing up, you agree to the Terms of Service and Privacy Policity.'
        />
      </GiftedForm>
    );
  }
});

module.exports = SignUpForm;