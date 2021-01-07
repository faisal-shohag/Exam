/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * FirebaseUI initialization to be used in a Single Page application context.
 */

/**
 * @return {!Object} The FirebaseUI config.
 */


 var userUID, phone;
 var escore = 0;
 var epscore = 0;
 var etotalExam = 0;
 var etotalPracExam =0;
function getUiConfig() {
    return {
      'callbacks': {
        // Called when the user has been successfully signed in.
        'signInSuccessWithAuthResult': function(authResult, redirectUrl) {
         if (authResult.user) {
          handleSignedInUser(authResult.user);
        }
         if (authResult.additionalUserInfo){
         if(authResult.additionalUserInfo.isNewUser){
         authResult.user
            db.ref('jachai/users/'+authResult.user.uid+'/').update({
              phoneNumber: authResult.user.phoneNumber,
              setStatus: false,
                score: 0,
                practiceScore: 0,
                totalPracExam: 0,
                totalExam: 0,
                examScoreTotal: 0,
                notification: {
                  key123:{
                    text: 'Welcome to Jachai!',
                    time: getTimea()
                  }
                },
                notificationStatus: true
          });
        }
      }
          // Do not redirect.
          return false;
        }
      },
      // Opens IDP Providers sign-in flow in a popup.
      'signInFlow': 'popup',
      'signInOptions': [
        // TODO(developer): Remove the providers you don't need for your app.
        // {
        //   provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //   // Required to enable ID token credentials for this provider.
        // },
        // {
        //   provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //   scopes :[
        //     'public_profile',
        //     'email',
        //     'user_likes',
        //     'user_friends'
        //   ]
        // },
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // {
        //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //   // Whether the display name should be displayed in Sign Up page.
        //   requireDisplayName: true,
        //   signInMethod: getEmailSignInMethod()
        // },
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            size: getRecaptchaMode()
          },
        },
        // {
        //   provider: 'microsoft.com',
        //   loginHintKey: 'login_hint'
        // },
        // {
        //   provider: 'apple.com',
        // },
       // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      'tosUrl': 'https://www.google.com',
      // Privacy policy url.
      'privacyPolicyUrl': 'https://www.google.com',
    };
  }
  
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // Disable auto-sign in.
//i.disableAutoSignIn();


  
  /**
   * Redirects to the FirebaseUI widget.
   */
  // var signInWithRedirect = function() {
  //   window.location.assign(getWidgetUrl());
  // };
  
  
  /**
   * Open a popup with the FirebaseUI widget.
   */
  // var signInWithPopup = function() {
  //   window.open(getWidgetUrl(), 'Sign In', 'width=985,height=735');
  // };
  
  
  /**
 
  
  
  /**
   * Displays the UI for a signed out user.
   */
  
  
  // Listen to change in auth state so it displays the correct UI for when
  // the user is signed in or not.
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        //console.log('Signed In');
        $('.signBtn').show();
        $('.logState').html(``);
        //router.navigate('/');
        userUID = user.uid;
        db.ref('jachai/users/'+user.uid).on('value', set=>{
            if(set.val().setStatus === false){
                //console.log('User is not ready!');
                router.navigate('/setprofile');
            }else{
              $('.avatar').html(`<div class="logo" style="background: ${logoColor(
                firstLetter(set.val().username)
              )}">${firstLetter(set.val().username)}</div>`)
              $('.tsc').text(set.val().score);
              $('.psc').text(set.val().practiceScore);
               
            }
        
          

        })
      
    }else{
        console.log('Signed out');
        $('.signBtn').hide();
        $('.logState').html(`<h5>তুমি এখন লগ আউট! লগইন করো জলদি!</h5>`)
    }
  });

  
  

  
  /**
   * Deletes the user's account.
   */

  
  
  /**
   * Handles when the user changes the reCAPTCHA or email signInMethod config.
   */
  
  
  
  /**function handleConfigChange() {
    var newRecaptchaValue = document.querySelector(
        'input[name="recaptcha"]:checked').value;
    var newEmailSignInMethodValue = document.querySelector(
        'input[name="emailSignInMethod"]:checked').value;
    location.replace(
        location.pathname + '#recaptcha=' + newRecaptchaValue +
        '&emailSignInMethod=' + newEmailSignInMethodValue);
  
    // Reset the inline widget so the config changes are reflected.
    ui.reset();
    ui.start('#firebaseui-container', getUiConfig());
  }
   * Initializes the app.
   */


  function getTimea(){
    let date = new Date();
    return date.toString();
  }
  