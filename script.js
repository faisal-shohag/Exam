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

// Random Color
$(".header").css("background-color", Colors[Math.floor(Math.random() * 11)]);
$(".lds-ellipsis div").css(
  "background-color",
  Colors[Math.floor(Math.random() * 11)]
);

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
        <div class="menu-title">বিষয়</div>
        <div class="menu">
        <a href="#!"><div class="item">বাংলা</div></a>
        <a href="#!"><div class="item">English</div></a>
        <a href="#!"><div class="item">ICT</div></a>
        <a href="#!"><div class="item">সাধারণ জ্ঞান</div></a>
        <a href="#!/practices/"><div class="item">প্রাকটিস</div></a>
        </div>
        `;
        return 0;
      },
      "/login": function () {
        app.innerHTML = `<h2>Login</h2>`;
      },
      "/registration": function () {
        app.innerHTML = `<h2>Registration</h2>`;
      },
      // EXAM LISTS
      "/practices": function () {
        $(".ld").show();
        db.ref("jachai/exams/practice").on("value", (pracs) => {
          $(".ld").hide();
          var allExams = [];
          var examsKeys = [];
          pracs.forEach((prac) => {
            allExams.push(prac.val());
            examsKeys.push(prac.key);
          });

          for (let i = allExams.length - 1; i >= 0; i--) {
            app.innerHTML += `
  <a  href="#!/exam/${examsKeys[i]}">
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
          <small class="author"><i>by ${allExams[i].details.author}</i></small>
      </div>
  </div></a>
  `;
          }
        });
      },
      // EACH EXAM
      "/exam/:id": function (params) {
        $(".ld").show();
        db.ref("jachai/exams/practice/" + params.id).on("value", (exam) => {
          let myexam = exam.val();
          $(".ld").hide();
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

          $("#submit")
            .off()
            .click(function () {
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

            });
        });
      },
      "/user/:id": function (id) {
        app.innerHTML = `<h2>User Profile</h2>`;
      },
      "/profile/:id": function (id) {
        app.innerHTML = `<h2>Logged in user's profile</h2>`;
      },
    };

    //Page not found!
    // Router.notFound(function () {
    //   app.innerHTML = `404; Opps! You're in a wrong place!`;
    // });

    //Hooks
    Router.hooks({
      before: function (done, params) {
        //console.log('Pre-route hook');
        window.location.reload();
        done();
      },
      after: function (params, query) {},
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
