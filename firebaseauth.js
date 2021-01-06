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
         console.log(authResult);
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
   * @return {string} The URL of the FirebaseUI standalone widget.
   */
  function getWidgetUrl() {
    return '/widget#recaptcha=' + getRecaptchaMode() + '&emailSignInMethod=' +
        getEmailSignInMethod();
  }
  
  
  /**
   * Redirects to the FirebaseUI widget.
   */
  var signInWithRedirect = function() {
    window.location.assign(getWidgetUrl());
  };
  
  
  /**
   * Open a popup with the FirebaseUI widget.
   */
  var signInWithPopup = function() {
    window.open(getWidgetUrl(), 'Sign In', 'width=985,height=735');
  };
  
  
  /**
   * Displays the UI for a signed in user.
   * @param {!firebase.User} user
   */
  var handleSignedInUser = function(user) {
    $('#loading').hide();
    $('#loaded').show();
    //   console.log(user);
    //   db.ref('jachai/users/'+user.uid+'/').update({
    //       phoneNumber: user.phoneNumber,
    //       creationTime: user.metadata.creationTime,
    //       lastSignInTime: user.metadata.lastSignInTime,
    //     setStatus: false
    // });
    $('#user-signed-in').show();
   $('#user-signed-out').hide();
    // document.getElementById('name').textContent = user.displayName;
    // document.getElementById('email').textContent = user.email;
    $('#phone').html(`
  <b><i class="icofont-smart-phone prefix"></i> Phone:</b> ${user.phoneNumber}`);

    if (user.photoURL) {
      var photoURL = user.photoURL;
      // Append size to the photo URL for Google hosted images to avoid requesting
      // the image with its original resolution (using more bandwidth than needed)
      // when it is going to be presented in smaller size.
      if ((photoURL.indexOf('googleusercontent.com') != -1) ||
          (photoURL.indexOf('ggpht.com') != -1)) {
        photoURL = photoURL + '?sz=' +
            document.getElementById('photo').clientHeight;
      }
      document.getElementById('photo').src = photoURL;
      document.getElementById('photo').style.display = 'block';
    } else {
      //$('#photo').style.display = 'none';
    }
  };
  
  
  /**
   * Displays the UI for a signed out user.
   */
  var handleSignedOutUser = function() {
    $('#user-signed-in').hide;
    $('#user-signed-out').show;
    ui.start('#firebaseui-container', getUiConfig());
  };
  
  // Listen to change in auth state so it displays the correct UI for when
  // the user is signed in or not.
  firebase.auth().onAuthStateChanged(function(user) {
    $('#loading').hide();
    $('#loaded').show();
    user ? handleSignedInUser(user) : handleSignedOutUser();

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
              $('.mi').html(`<i class="icofont-school-bag prefix"></i> <b>Class:</b> ${set.val().stdclass}</br>
              <i class="icofont-group" prefix></i> <b>Group:</b> ${set.val().group}</br>
              <i class="icofont-group-students prefix"></i> <b>Gender:</b> ${set.val().gender}
              `)
             $('#rusername').val(set.val().username);
             $('#rschool').val(set.val().school);
             $('#gender').val(set.val().gender);
             $('#rclasss').val(set.val().stdclass);
             $('#rgroup').val(set.val().group);
             $('#rdistrict').val(set.val().district);
             $('.group').html(`<i class="icofont-ui-user-group"></i> ${set.val().group}`)
             $('.username').text(set.val().username);
            if(set.val().gender === 'male'){
              $('.user-gender-icon').html(`<i class="icofont-student-alt"></i>`)
            }else{
              $('.user-gender-icon').html(`<i class="icofont-student"></i>`)
            }
            }
           $('.tsc').text(set.val().score);
           escore = set.val().score;
           $('.psc').text(set.val().practiceScore);
           epscore = set.val().practiceScore;
           etotalExam = set.val().totalExam;
           etotalPracExam = set.val().totalPracExam;
            $('.state').html(`
        <div class="state-item">
        <i class="icofont-paperclip"></i> মোট লাইভ এক্সাম দিয়েছোঃ <span class="count ex"> ${set.val().totalExam} </span> 
        </div>
        <div class="state-item">
        <i class="icofont-badge"></i> তোমার লাইভ এক্সাম স্কোরঃ  <span class="count sc"> ${set.val().score} </span> 
        </div>
        <div class="state-item">
        <i class="icofont-thunder-light"></i> মোট প্রাকটিস এক্সাম দিয়েছোঃ <span class="count ex"> ${set.val().totalPracExam} </span> 
        </div>
        <div class="state-item">
        <i class="icofont-hand-thunder"></i> তোমার প্রাকটিস এক্সাম স্কোরঃ  <span class="count sc"> ${set.val().practiceScore} </span> 
        </div>
            `)
        })
    }else{
        console.log('Signed out');
        $('.signBtn').hide();
        $('.logState').html(`<h5>তুমি এখন লগ আউট! লগইন করো জলদি!</h5>`)
       // router.navigate('/login');
    }

  });

  
  

  
  /**
   * Deletes the user's account.
   */
  var deleteAccount = function() {
    firebase.auth().currentUser.delete().catch(function(error) {
      if (error.code == 'auth/requires-recent-login') {
        // The user's credential is too old. She needs to sign in again.
        firebase.auth().signOut().then(function() {
          // The timeout allows the message to be displayed after the UI has
          // changed to the signed out state.
          setTimeout(function() {
            alert('Please sign in again to delete your account.');
          }, 1);
        });
      }
    });
  };
  
  
  /**
   * Handles when the user changes the reCAPTCHA or email signInMethod config.
   */
  function handleConfigChange() {
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
  
  
  /**
   * Initializes the app.
   */
  var initApp = function() {
   // console.log(window.location.hash)
    if(window.location.hash === '#!/login'){
    document.getElementById('sign-out').addEventListener('click', function() {
    
      firebase.auth().signOut();
      window.location.reload();
    });
    document.getElementById('delete-account').addEventListener(
        'click', function() {
          deleteAccount();
          window.location.reload();
        });
    }
  };
  
  window.addEventListener('load', initApp);

  function getTimea(){
    let date = new Date();
    return date.toString();
  }
  