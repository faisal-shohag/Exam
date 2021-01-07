let Colors = {
  0: "var(--primary)",
  1: "var(--blue)",
  2: "var(--indigo)",
  3: "var(--purple)",
  4: "var(--pink)",
  5: "var(--red)",
  6: "var(--orange)",
  7: "var(--green)",
  8: "var(--teal)",
  9: "var(--info)",
  10: "var(--dark)",
};



  
 var router = new Navigo(null, true, "#!");

 firebase.auth().onAuthStateChanged(function(user) {
  if(!user){
      router.navigate('/login');
    }
  });

// Random Color
$(".header").css("background-color", Colors[Math.floor(Math.random() * 11)]);
$(".lds-ellipsis div").css(
  "background-color",
  Colors[Math.floor(Math.random() * 11)]
);

$(document).ready(function(){
  $('.sidenav').sidenav();
});
$(document).ready(function(){
  $('select').formSelect();
});
      

//console.log(Colors[Math.floor(Math.random()*11)])
(function (window, Navigo) {
  const Router = (function (root, useHash, hash, Navigo) {
    class Router extends Navigo {
      constructor(root, useHash, hash) {
        super(root, useHash, hash);
        this.init();
      }

      init() {
        document.body.addEventListener(
          "click",
          (e) => {
            if (e.target !== e.currentTarget && e.target.nodeName === "A") {
              e.preventDefault();
              this.navigate(e.target.pathname);
            }

            e.stopPropagation();
          },
          false
        );
      }

      set routes(routes) {
        routes = routes || {};
        this.on(routes);
        this.resolve();
      }
    }

    return new Router(root, useHash, hash);
  })(null, true, "#!", Navigo);

  const init = () => {
    const app = document.getElementById("app");

    Router.routes = {
      "/": function () {
        app.innerHTML = `
        <div class="card">
        <div class="menu-title"><i class="icofont-read-book"></i> বিষয়</div>
        <div class="menu">
       
        <a href="#!"><div class="item" style="border-top: 2px solid var(--purple);"><div>
        <div class="bfontIcon">ব</div>
        <div>বাংলা</div>
        </div></div></a>

        

        <a href="#!"><div class="item" style="border-top: 2px solid var(--purple);"><div>
        <center><div class="bfontIcon">E</div></center>
        <div style="text-align: center;">English</div>
        </div></div></a>

        <a href="#!"><div class="item" style="border-top: 2px solid var(--purple);"><div>
        <center><div class="bfontIcon">ত</div></center>
        <div style="text-align: center;">ICT</div>
        </div></div></a>

         <a href="#!"><div class="item" style="border-top: 2px solid var(--purple);"><div>
        <center><div class="bfontIcon">সা</div></center>
        <div style="text-align: center;">সা.জ্ঞান</div>
        </div></div></a>

        <a href="#!"><div class="item" style="border-top: 2px solid var(--purple);"><div>
        <center><div class="bfontIcon">আ</div></center>
        <div style="text-align: center;">আই.কিউ</div>
        </div></div></a>

        <a href="/#!/exams/practice"><div class="item" style="border-top: 2px solid var(--purple);"><div>
        <center><div class="bfontIcon">অ</div></center>
        <div style="text-align: center;">অন্যান্য</div>
        </div></div></a>
        </div>
        </div>
        `;
      },
     "/chapter/:id": function name(params) {

       
     },
      //Other EXAM LISTS
      "/exams/:id": function (params) {
        db.ref("jachai/exams/"+params.id).on("value", (pracs) => {
          var allExams = [];
          var examsKeys = [];
          pracs.forEach((prac) => {
            allExams.push(prac.val());
            examsKeys.push(prac.key);
          });
          app.innerHTML = `
            <div class="menu-title"><i class="icofont-read-book"></i> অন্যান্য</div>
 <div class="examLists"></div>
  `;
   for (let i = allExams.length - 1; i >= 0; i--) { 
  document.querySelector('.examLists').innerHTML += `
 
  <div class="exam">
  <div class="at">${getRelativeTime(allExams[i].details.at)}</div>
  <div class="class">${allExams[i].details.class}</div>
      <div class="logo" style="background: ${logoColor(
        firstLetter(allExams[i].details.sub)
      )}">${firstLetter(allExams[i].details.sub)}</div>
      <div class="details">
          <div class="title">${allExams[i].details.name}</div>
          <div class="others">প্রশ্নঃ ${
            allExams[i].questions.length
          } টি | সময়ঃ ${allExams[i].details.duration} মিনিট | স্কোরঃ ${
              allExams[i].questions.length
            } | নেগেটিভঃ ${allExams[i].details.negative}</div>
          <small class="author"><i>author: ${allExams[i].details.author}</i></small></br>
          <a  href="#!/exam/${examsKeys[i]}"> <button class="btn red"><i class="icofont-ui-play left"></i>অংশগ্রহণ</button> </a>
          <a  href="#!/leaderboard/${examsKeys[i]}"> <button class="btn green"><i class="icofont-users-alt-5 left"></i>লিডারবোর্ড</button> </a>
      </div>
  </div>
  `
          }
        });
      },
      // EACH EXAM
      "/exam/:id": function (params) {
        db.ref("jachai/exams/practice/" + params.id).on("value", (exam) => {
          let myexam = exam.val();
          app.innerHTML = `
          <div class="exam-container">
          <div class="exam-title">${myexam.details.name}</div>
          <div style="display: none;" class="score">
          <div class="mark"></div>
          <div class="score-wa"></div>
          <div class="score-na"></div>
          <div class="score-time"></div>
          </div>
          <div id="again" class="exam-title" onClick="window.location.reload()">আবার দাও!</div>
          <div class="exam-nb"></div>
          <div class="questions"></div>
          <div class="submit" id="submit">সাবমিট করো! </div>
          </div>
      `;
      $('.exam-title').css('background', Colors[Math.floor(Math.random() * 11)]);
      $('#submit').css('background', Colors[Math.floor(Math.random() * 11)]);
          var ans = [],
            exp = [],
            userAns = [],
            score = 0,
            wrong = 0,
            na = 0,
            questions = shuffleArray(myexam.questions);
         
          $(".exam-nb").html(`${myexam.details.nb}`);

          for (let q = 0; q < myexam.questions.length; ++q) {
            $(".score").hide();
            ans.push((questions[q].ans + q * 4).toString());
            exp.push(questions[q].ex);
            document.querySelector(".exam-container .questions").innerHTML += `
           <div class="q-wrap">
                  <div class="q-logo"></div>
              <div class="question">
                 ${q + 1}. ${questions[q].q}
              </div>
              <div class="option">
                  <div class="opt" id="${
                    q + 1 + q * 3
                  }"><div class="st"></div>${questions[q].options[0]}</div>
                  <div class="opt" id="${
                    q + 2 + q * 3
                  }"><div class="st"></div>${questions[q].options[1]}</div>
                  <div class="opt" id="${
                    q + 3 + q * 3
                  }"><div class="st"></div>${questions[q].options[2]}</div>
                  <div class="opt" id="${
                    q + 4 + q * 3
                  }"><div class="st"></div>${questions[q].options[3]}</div>
              </div>
              <div class="explanation" id="exp-${q}"></div>
          </div>
           `;
          }

          $(".opt").on("click", function () {
            userAns.push($(this)[0].id);
            $($(this)[0].parentNode.children[0]).off("click");
            $($(this)[0].parentNode.children[1]).off("click");
            $($(this)[0].parentNode.children[2]).off("click");
            $($(this)[0].parentNode.children[3]).off("click");
            $($(this)[0]).css({
              background: "var(--dark)",
              color: "var(--light)",
              "font-weight": "bold",
            });
          });

          //timer
          var sec = 0;
          var minute = myexam.details.duration;
          var initialMin = myexam.details.duration;
          var timer = setInterval(function () {
            if (sec === 0) {
              minute--;
              sec = 60;
            }
            sec--;
            if (minute <= 0 && sec <= 0) {
              $("#submit").click();
              $(".header .title").html(`<small>Ended!</small>`);
              clearInterval(timer);
            } else {
              $(".header .title").html(
                `<div class="timer">${minute} : ${sec}</div>`
              );
            }
          }, 1000);

          jQuery(document).ready(function($) {

            if (window.history && window.history.pushState) { 
             // window.history.pushState('forward', null, './#forward');       
              $(window).on('popstate', function() {
                clearInterval(timer);
                $('.timer').html('');
              });
          
            }
          });
          
          
          $("#submit")
            .off()
            .click(function () {
              let foundKey = false;
            db.ref('jachai/users/'+userUID+'/practiceExams/'+myexam.details.sub+'/'+params.id).on('value', keyMatch=>{
            //console.log(keyMatch.val());
             if(keyMatch.val()===null){
                 foundKey = true;
             }

             if(foundKey){
              Swal.fire({
              title: `তুমি কি নিশ্চিত?`,
              text: `তোমার স্কোর সাবমিট হবে। এই পরীক্ষাটির জন্য দ্বিতীয়বার তোমার স্কোর আর যোগ হবে না!`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'হ্যাঁ',
              cancelButtonText: 'না'
              }).then(result=>{
                if(result.isConfirmed){
                  clearInterval(timer);
              $("html, body").animate({ scrollTop: 0 }, "slow");
              $('#submit').hide();
              $('#again').show();
              let e;
              $(".explanation").show();
              for (let k = 0; k < ans.length; ++k) {
                e = k;
                e = "#exp-" + e;
                $(e).html(`<b style="color: green;">Solution:</b><br>${exp[k]}`);
                // $('#'+ans[k]).css({'background': 'var(--success)', 'color': 'var(--light)'});
                $("#" + ans[k] + " .st").addClass("cr");
                $($($($("#" + ans[k])[0].parentNode)[0].parentNode)[0]
                    .children[0]
                ).html('<div class="not-ans"> <span class="material-icons">error</span></div>');
              }
              for(let i=0; i<userAns.length; ++i){
                found = false;
                for(let j=0; j<ans.length; ++j){
                   if(userAns[i] === ans[j]){
                    score++;
                    // $('#'+userAns[i]).css({'background': 'var(--success)', 'color': 'var(--light)'});
                    $('#'+userAns[i] + ' .st').addClass('cr');
                    $($($($('#'+userAns[i])[0].parentNode)[0].parentNode)[0].children[0]).html('<div class="correct"> <span class="material-icons">verified</span> </div>');
                    found = true;
                    break;
                   }else found =false;
                }

                if(!found){
                  wrong++; 
                  // $('#'+userAns[i]).css({'background': 'var(--danger)', 'color': 'var(--light)'}); 
                  $('#'+userAns[i] + ' .st').addClass('wa');
                  //console.log($($('#'+userAns[i])[0].parentNode)[0].parentNode)
                  $($($($('#'+userAns[i])[0].parentNode)[0].parentNode)[0].children[0]).html('<div class="wrong"> <span class="material-icons">highlight_off</span>  </div>');
                }
              }
       
              $('.score').show();
      $('.mark').html(`স্কোর </br> <span class="score-num">${score}/${questions.length}</span>`);
      $('.score-wa').html(`ভুল </br> <span class="score-num">${wrong}</span>`);
      $('.score-na').html(`ফাঁকা </br> <span class="score-num">${questions.length-(score+wrong)}</span>`);
      $('.score-time').html(`সময় <br> <span class="score-num">${(initialMin-1)-minute}:${60-sec}</span>`);

      db.ref('jachai/users/'+userUID+'/practiceExams/'+myexam.details.sub+'/'+params.id).push({
        score: score,
        totalQ: questions.length,
        wrong: wrong,
        na: questions.length-(score+wrong),
        time: {
         min: (initialMin-1)-minute,
         sec: 60-sec
        }
      });
      db.ref('jachai/users/'+userUID).update({practiceScore: epscore+score, totalPracExam: etotalPracExam+1});
                  Swal.fire('সাবমিট হয়েছে!', '', 'success');
                }
              })
              //end
            }else{
              clearInterval(timer);
              $("html, body").animate({ scrollTop: 0 }, "slow");
              $('#submit').hide();
              $('#again').show();
              let e;
              $(".explanation").show();
              for (let k = 0; k < ans.length; ++k) {
                e = k;
                e = "#exp-" + e;
                $(e).html(`<b style="color: green;">Solution:</b><br>${exp[k]}`);
                // $('#'+ans[k]).css({'background': 'var(--success)', 'color': 'var(--light)'});
                $("#" + ans[k] + " .st").addClass("cr");
                $($($($("#" + ans[k])[0].parentNode)[0].parentNode)[0]
                    .children[0]
                ).html('<div class="not-ans"> <span class="material-icons">error</span></div>');
              }
              for(let i=0; i<userAns.length; ++i){
                found = false;
                for(let j=0; j<ans.length; ++j){
                   if(userAns[i] === ans[j]){
                    score++;
                    // $('#'+userAns[i]).css({'background': 'var(--success)', 'color': 'var(--light)'});
                    $('#'+userAns[i] + ' .st').addClass('cr');
                    $($($($('#'+userAns[i])[0].parentNode)[0].parentNode)[0].children[0]).html('<div class="correct"> <span class="material-icons">verified</span> </div>');
                    found = true;
                    break;
                   }else found =false;
                }
                if(!found){
                  wrong++; 
                  // $('#'+userAns[i]).css({'background': 'var(--danger)', 'color': 'var(--light)'}); 
                  $('#'+userAns[i] + ' .st').addClass('wa');
                  //console.log($($('#'+userAns[i])[0].parentNode)[0].parentNode)
                  $($($($('#'+userAns[i])[0].parentNode)[0].parentNode)[0].children[0]).html('<div class="wrong"> <span class="material-icons">highlight_off</span>  </div>');
                }
              }
       
              $('.score').show();
      $('.mark').html(`স্কোর </br> <span class="score-num">${score}/${questions.length}</span>`);
      $('.score-wa').html(`ভুল </br> <span class="score-num">${wrong}</span>`);
      $('.score-na').html(`ফাঁকা </br> <span class="score-num">${questions.length-(score+wrong)}</span>`);
      $('.score-time').html(`সময় <br> <span class="score-num">${(initialMin-1)-minute}:${60-sec}</span>`);

              Swal.fire({
                title: `তুমি পরীক্ষাটি আগেও দিয়েছিলে। এবার আর তোমার স্কোর যোগ হবে না!`,
                icon: 'success',
                confirmButtonText: 'আচ্ছা!',
                })
            }
         })
            });
        });
      },
      "/user/:id": function (id) {
        app.innerHTML = `<h2>User Profile</h2>`;
      },
      "/profile/:id": function (id) {
        app.innerHTML = `<h2>Logged in user's profile</h2>`;
      },

      "/login": function () {
        app.innerHTML = ` 
        <div class="login">
        <h5> <i class="icofont-unlocked"></i> সাইনইন/সাইন আউট</h5>   
  <div id="loaded" class="hidden">
    <div id="main">
      <div id="user-signed-in" class="hidden">
        <div id="user-info">
          <div id="photo-container">
            <img id="photo">
          </div>
          <a href="/"><i class="icofont-ui-home"></i> হোম পেইজ</a>
          <div id="name"></div>
          <div id="email"></div>
          <div id="phone" class="phone"></div>
          <div id="is-new-user"></div>
          <div class="clearfix"></div>
        </div>
        <div class="signBtn">
        <p>
          <button class="btn orange" id="sign-out">সাইন আউট</button>
          <button class="btn red" id="delete-account">অ্যাকাউন্ট ডিলিট</button>
        </p>
       </div>
      </div>
      <div class="logState"></div>
      <div id="user-signed-out" class="hidden">
        <div id="firebaseui-spa">
          <div id="firebaseui-container"></div>
        </div>
      </div>
    </div>
  </div>
</div>
        `;

          /**
   * @return {string} The URL of the FirebaseUI standalone widget.
   */
  function getWidgetUrl() {
    return '/widget#recaptcha=' + getRecaptchaMode() + '&emailSignInMethod=' +
        getEmailSignInMethod();
  }
  

          /**
   * Displays the UI for a signed in user.
   * @param {!firebase.User} user
   */
       var handleSignedInUser = function(user) {
         $('#loading').hide();
         $('#loaded').show();
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
         }
       };

        var handleSignedOutUser = function() {
          $('#user-signed-in').hide;
          $('#user-signed-out').show;
          ui.start('#firebaseui-container', getUiConfig());
        };

        firebase.auth().onAuthStateChanged(function(user) {
          $('#loading').hide();
          $('#loaded').show();
          user ? handleSignedInUser(user) : handleSignedOutUser();
        })

        var deleteAccount = function() {
          firebase.auth().currentUser.delete().catch(function(error) {
            if (error.code == 'auth/requires-recent-login') {
              // The user's credential is too old. She needs to sign in again.
              firebase.auth().signOut().then(function() {
                setTimeout(function() {
                  alert('Please sign in again to delete your account.');
                }, 1);
              });
            }
          });
        };

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

          var initApp = function() {
    document.getElementById('sign-out').addEventListener('click', function() {
      firebase.auth().signOut();
      window.location.reload();
    });
    document.getElementById('delete-account').addEventListener(
        'click', function() {
          deleteAccount();
          window.location.reload();
        });
  };
  
  window.addEventListener('load', initApp);


        
      },
      "/setprofile": function () {
        app.innerHTML = `
        <div class="login">
        <h5> <i class="icofont-ui-edit"></i>প্রোফাইল সেট</h5>
        <div id="phone"></div>
        <div class="mi">
        <center>
        <div class="loader"><div class="preloader-wrapper small active">
        <div class="spinner-layer spinner-green-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
      </center>
      </div>

        <div class="warning"></div>
        <div class="input-field">
        <i class="icofont-user prefix"></i>
        <input type="text"  id="rusername">
        <label for="rusername">Name</label>
        </div>
        <div class="input-field">
        <i class="icofont-institution prefix"></i>
        <input type="text" id="rschool" />
        <label for="rschool">Institution</label>
        </div>

        <div class="input-field">
        <i class="icofont-school-bag prefix"></i>
        <select id="rclass">
        <option value="" disabled selected>Select your Class:</option>
          <option value="11">Eleven</option>
          <option value="12">Twelve</option>
        </select>
        <label>Class</label>
      </div>

      <div class="input-field">
      <i class="icofont-group prefix"></i>
        <select id="rgroup">
        <option value="" disabled selected>Select your Group:</option>
          <option value="science">Science</option>
          <option value="humanity">Humanity</option>
          <option value="commerce">Commerce</option>
        </select>
        <label>Group</label>
      </div>
        
      <div class="input-field">
      <i class="icofont-group-students prefix"></i>
        <select id="gender">
        <option value="" disabled selected>Select your Gender:</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label>Gender</label>
      </div>

        <div class="input-field">
        <span class="material-icons prefix">location_city</span>
        <input type="text" id="rdistrict" />
        <label for="rdistrict">District</label>
        </div>

      

       <button class="btn green" id="registration"><i class="icofont-check left"></i>সাবমিট</div>
        </div>
        `;

        $(document).ready(function(){
          $('select').formSelect();
        });

        $('#registration').click(function(){
          let username = $('#rusername').val();
           let school = $('#rschool').val();
            let stdclass = $('#rclass').val();
            let group = $('#rgroup').val();
            let gender = $('#gender').val();
            let district = $('#rdistrict').val();
            if(!validation(username)){
              console.log('Please filled out!');
              $('#rusername').focus();
              $('.warning').html(`<b>Username</b> should not be empty!`);
            }else if(!validation(school)){
              $('#rschool').focus();
              $('.warning').html(`<b>Institution</b> should not be empty!`);
            }else if(!validation(stdclass)){
              $('#rclass').focus();
              $('.warning').html(`<b>Class</b> should not be empty!`);
            }else if(!validation(group)){
              $('#rgroup').focus();
              $('.warning').html(`<b>Group</b> should not be empty!`);
            }else if(!validation(gender)){
              $('#gender').focus();
              $('.warning').html(`<b>Gender</b> should not be empty!`);
            }else if(!validation(district)){
              $('#rdistrict').focus();
              $('.warning').html(`<b>District</b> should not be empty!`);
            }else{
              let registrationInfo={
                username: username,
                school: school,
                stdclass: stdclass,
                district: district,
                gender: gender,
                group: group,
                setStatus: true,
                lastEditTime: getTime(),
              }
              db.ref('jachai/users/'+userUID).update(registrationInfo);
              Swal.fire({
                title: 'প্রোফাইল সেট করা হয়েছে!',
                icon: 'success',
              }).then(result=>{
                if(result.isConfirmed){
                  router.navigate('/');
                }
              })
              
              console.log(userUID);
            } 
        });

  firebase.auth().onAuthStateChanged(function(user) {
          if(user){
        db.ref('jachai/users/'+userUID).on('value', set=>{
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
       });
      }
      })
        
      },
      "/profile": function() {
        app.innerHTML=`
        <div class="login">
        <a href="#!/setprofile"><div style="float:right; color: #000; font-size: 14px; margin-left: 10px;">
        <i class="icofont-edit"></i>প্রোফাইল সেট</div></a> 
        <a href="#!/login"><div style="float:right; color: #000; font-size: 14px;">
        <i class="icofont-logout"></i> সাইনআউট </div></a>
        <h5>
        </span>
        <i class="icofont-bars"></i>প্রোফাইল পরিসংখ্যান</h5>
        <h6 class="userName">
        <span class="user-gender-icon"></span> 
        <span class="username"></span>
        </br>
        <span class="group"></span>
        </h6>     
<div class="state">
  <center>
  <div class="preloader-wrapper active">
    <div class="spinner-layer spinner-red-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  </center>
        </div>
        </div>
        `
        firebase.auth().onAuthStateChanged(function(user) {
          if(user){
  db.ref('jachai/users/'+userUID).on('value', set=>{    
            $('.group').html(`<i class="icofont-ui-user-group"></i> ${set.val().group}`)
            $('.username').text(set.val().username);
           if(set.val().gender === 'male'){
             $('.user-gender-icon').html(`<i class="icofont-student-alt"></i>`)
           }else{
             $('.user-gender-icon').html(`<i class="icofont-student"></i>`)
           }
          escore = set.val().score;
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
      }
    });


      }
    };

    //Page not found!
    // Router.notFound(function () {
    //   app.innerHTML = `404; Opps! You're in a wrong place!`;
    // });

    //Hooks
    Router.hooks({
      before: function (done, params) {
        // let Hash = (window.location.hash).split('/');
        // Hash = Hash[Hash.length-1];
        // if(Hash === 'login'){
        //   location.reload();
        // }
        done();
      
      },
      after: function (params, query) {
        //console.log('after');
      },
      leave: function(params) {
        //console.log('left');
        //window.location.reload();
      }
    });
  };

  window.addEventListener("load", init, false);
})(window, Navigo);


      

//first letter picker
function firstLetter(str) {
  str = str.split("");
  return str[0];
}

// moment js for time counting
function getRelativeTime(date) {
  const d = new Date(date);
  return moment(d).fromNow();
}

function logoColor(lett) {
  if (lett === "G") return "var(--orange)";
  else if (lett === "B") return "var(--success)";
  else if (lett === "E") return "var(--pink)";
  else if (lett === "O") return "var(--secondary)";
  else return "var(--teal)";
}

//suffle questions
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}


function getTime(){
  let date = new Date();
  return date.toString();
}

function validation(string){
   if(string == null){
     return false;  
   }else if(string.match(/^\s*$/g)){
    return false;
  }else{
    return true;
  }

}

function reload(){
  location.reload();
}