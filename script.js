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
// $(".header").css("background-color", Colors[Math.floor(Math.random() * 11)]);
$(".lds-ellipsis div").css(
  "background-color",
  Colors[Math.floor(Math.random() * 11)]
);



let subName = {
  bangla: "বাংলা",
  english: "English",
  ict: "তথ্য ও যোগাযোগ প্রযুক্তি",
  civics1: "পৌরনীতি ১ম পত্র",
  civics2: "পৌরনীতি ২য়  পত্র",
  economics1: "অর্থনীতি ১ম পত্র",
  economics2: "অর্থনীতি ২য় পত্র",
};

var router = new Navigo(null, true, "#!");
firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    setTimeout(function(){
      $('.splash').hide('fast');
      }, 2000);
    router.navigate("/login");
  }else{
    setTimeout(function(){
      $('.splash').hide('fast');
      }, 2000);
    $(document).ready(function () {
      $(".sidenav").sidenav();
    });
    
    $(document).ready(function () {
      $("select").formSelect();
    });
    
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }
});

if (window.location.hash === "") {
  window.location.hash = "#!";
}

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
        $('.footer').show();
        $('.footertext').hide();
        $('.footerIcon').removeClass('footerIconActive');
        if($('.hm')[0].classList[3] === undefined){
          $('.hm').addClass('footerIconActive');
          $($($('.hm')[0].parentNode)[0].lastElementChild).show();
        }
        app.innerHTML = `
        <div class="card">
        <div class="input-field col s12">
        <div style="font-size: 21px;" class="menu-title"><i style="font-size: 30px;" class="icofont-book"></i> বিষয়ভিত্তিক পরীক্ষা </div>
        <div class="menu">
       
        <a href="#!/chapter/bangla"><div class="item" style="border-top: 2px solid var(--purple);"><div>
        <div class="bfontIcon">ব</div>
        <div>বাংলা</div>
        </div></div></a>

        <a href="#!/chapter/ict"><div class="item" style="border-top: 2px solid var(--purple);"><div>
        <center><div class="bfontIcon">ত</div></center>
        <div style="text-align: center;">ICT</div>
        </div></div></a>


        <a href="#!/chapter/civics1"><div class="item" style="border-top: 2px solid var(--purple);"><div>
        <center><div class="bfontIcon">প</div></center>
        <div style="text-align: center;">পৌরনীতি ১ম পত্র</div>
        </div></div></a>

        <a href="#!/chapter/civics2"><div class="item" style="border-top: 2px solid var(--purple);"><div>
        <center><div class="bfontIcon">প</div></center>
        <div style="text-align: center;">পৌরনীতি ২য়  পত্র</div>
        </div></div></a>

        <a href="/#!/exams/practice"><div class="item" style="border-top: 2px solid var(--purple);"><div>
        <center><div class="bfontIcon">অ</div></center>
        <div style="text-align: center;">অন্যান্য</div>
        </div></div></a>
        </div>
        </div>
        `;
        $(document).ready(function () {
          $("select").formSelect();
        });

       
          
          
      

  

        //$('#groupSelect').click(function() {
      
       
        //})
        
      },
      "/chapter/:id": function name(params) {
        $('.footer').show();
        app.innerHTML = `
      <div class="menu-title"><i class="icofont-read-book"></i> ${
        subName[params.id]
      }</div>
<div class="chapterList">
<center><div class="preloader-wrapper active">
<div class="spinner-layer spinner-red-only">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>
</div></center>
</div>
`;
        db.ref("jachai/exams/" + params.id).on("value", (exams) => {
          $(".chapterList").html("");
          exams.forEach((exam) => {
            document.querySelector(".chapterList").innerHTML += `
            <a href="#!/chapter/examlist/${params.id}|${exam.key}|${
                  exam.val().name
                }">
            <div class="chapters">
            <div class="logo" style="background: ${logoColor(
              firstLetter(exam.val().name)
            )}">${firstLetter(exam.val().name)}</div>
            <div class="details">
          <div class="title">${exam.val().name}</div>
          </div>
          </div></a>`;
          });
        });
      },
      //subject EXAM LISTS
      "/chapter/examlist/:id": function (params) {
        $('.footer').show();

        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
        var addr = params.id.split("|");
        //console.log(params)
        db.ref("jachai/exams/" + addr[0] + "/" + addr[1] + "/exams").on(
          "value",
          (pracs) => {
            var allExams = [];
            var examsKeys = [];
            var userExamKey = [];
            app.innerHTML = `
              <div class="menu-title"><i class="icofont-read-book"></i> ${
                subName[addr[0]]
              }<i class="icofont-bubble-right"></i>${addr[2]}</div>
   <div class="examLists"></div>
    `;
            pracs.forEach((prac) => {
              allExams.push(prac.val());
              examsKeys.push(prac.key);
            });

            db.ref('jachai/users/'+ user.uid+'/practiceExams/'+addr[0]).on('value', examKey=>{
              examKey.forEach(ek=>{
               // console.log(ek.key);
                userExamKey.push(ek.key);
              })
            });


        for (let i = allExams.length - 1; i >= 0; i--) {
              let given = false;
        for(let p=0; p<userExamKey.length; p++){
            if(userExamKey[p] === examsKeys[i]){
            given = true;
          }
        }


        if(given){
              document.querySelector(".examLists").innerHTML += `
      <div class="exam">
      <div class="class"><i class="icofont-ui-rate-add"></i> ${
        allExams[i].questions.length
      }</div>
          <div class="logo" style="color: var(--success); background: none;"><i style="font-size: 40px" class="material-icons">verified</i></div>
          <div class="details">
              <div class="title">${allExams[i].details.name}</div>
              <div class="others">প্রশ্নঃ ${
                allExams[i].questions.length
              } টি | সময়ঃ ${allExams[i].details.duration} মিনিট | স্কোরঃ ${
                allExams[i].questions.length
              } | নেগেটিভঃ ${allExams[i].details.negative}</div>
              <small class="author"><i class="icofont-wall-clock"></i> ${getRelativeTime(
                allExams[i].details.at
              )} <i class="icofont-fountain-pen"></i> <i>author: ${
                allExams[i].details.author
              }</i></small></br>
              <a  href="#!/chapter/exam/${params.id}|${
                examsKeys[i]
              }"> <button class="btn red"><i class="icofont-ui-play left"></i>অংশগ্রহণ</button> </a>
              <a  href="#!/leaderboard/${
                examsKeys[i]
              }"> <button class="btn green"><i class="icofont-users-alt-5 left"></i>স্কোর বোর্ড</button> </a>
          </div>
      </div>
      `;
            }else{
              document.querySelector(".examLists").innerHTML += `
              <div class="exam">
              <div class="class"><i class="icofont-ui-rate-add"></i> ${
                allExams[i].questions.length
              }</div>
                  <div class="logo" style="background: ${logoColor(
                    firstLetter(allExams[i].details.name)
                  )}">${firstLetter(allExams[i].details.name)}</div>
                  <div class="details">
                      <div class="title">${allExams[i].details.name}</div>
                      <div class="others">প্রশ্নঃ ${
                        allExams[i].questions.length
                      } টি | সময়ঃ ${allExams[i].details.duration} মিনিট | স্কোরঃ ${
                        allExams[i].questions.length
                      } | নেগেটিভঃ ${allExams[i].details.negative}</div>
                      <small class="author"><i class="icofont-wall-clock"></i> ${getRelativeTime(
                        allExams[i].details.at
                      )} <i class="icofont-fountain-pen"></i> <i>author: ${
                        allExams[i].details.author
                      }</i></small></br>
                      <a  href="#!/chapter/exam/${params.id}|${
                        examsKeys[i]
                      }"> <button class="btn red"><i class="icofont-ui-play left"></i>অংশগ্রহণ</button> </a>
                      <a  href="#!/leaderboard/${
                        examsKeys[i]
                      }"> <button class="btn green"><i class="icofont-users-alt-5 left"></i>স্কোর বোর্ড</button> </a>
                  </div>
              </div>
              `;
            
            }
            }
          }
        );
          }
        });
      },
      "leaderboard/:id": function (params) {
        $('.footer').show();
        app.innerHTML = `
      <h5><i class="icofont-users-alt-5"></i> স্কোর বোর্ড </h5>
      <small style="color: var(--danger)"><b class="pos"></b></small>
      <div class="scoreboard"></div>
      `;
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
        db.ref("jachai/leaderboard/" + params.id).on("value", (scores) => {
          let scoreArr = [];
          let scorehtml = document.querySelector(".scoreboard");
          scorehtml.innerHTML = "";
          if(scores.val()=== null){
            scorehtml.innerHTML = `
            <div class="empty">
            <div>
            <div class="emp-icon"><i class="icofont-foot-print"></i></div>
            <div class="emp-text">কোথাও কেউ নেই!</div>
            </div>
            </div>
            `
          }
          scores.forEach((score) => {
            //console.log(score.val());
            scoreArr.push(score.val());
          });

          scoreArr.sort(function (a, b) {
            return b.score - a.score;
          });
          for (let s = 0; s < scoreArr.length; s++) {
            let k = s + 1;
            if(user.uid === scoreArr[s].userKey){
              $('.pos').html(`তোমার অবস্থান: ${k}`);
              scorehtml.innerHTML += `
        <a href="#!/user/${scoreArr[s].userKey}"> <div style="background: var(--danger); color: #fff;" class="scoreboard-score">
          <div class="position">${k}</div>
          <div class="logo" style="background: ${logoColor(
            firstLetter(scoreArr[s].username)
          )}">${firstLetter(scoreArr[s].username)}</div>
           <div class="score-details">
           <div class="score-username">${scoreArr[s].username}</div>
           <div class="time">${scoreArr[s].time.min}:${
              scoreArr[s].time.sec
            }</div>
           </div>
           <div class="score-obtained">${scoreArr[s].score}</div>
          </div></a>
          `;
            }else{
            scorehtml.innerHTML += `
        <a href="#!/user/${scoreArr[s].userKey}"> <div class="scoreboard-score">
          <div class="position">${k}</div>
          <div class="logo" style="background: ${logoColor(
            firstLetter(scoreArr[s].username)
          )}">${firstLetter(scoreArr[s].username)}</div>
           <div class="score-details">
           <div class="score-username">${scoreArr[s].username}</div>
           <div class="time">${scoreArr[s].time.min}:${
              scoreArr[s].time.sec
            }</div>
           </div>
           <div class="score-obtained">${scoreArr[s].score}</div>
          </div></a>
          `;
            }
          }

          //console.log(scoreArr)
        });
      }
    })
      },
      "chapter/exam/:id": function (params) {
        let eAddr = params.id.split("|");
        $('.footer').hide();
        db.ref(
          "jachai/exams/" + eAddr[0] + "/" + eAddr[1] + "/exams/" + eAddr[3]
        ).on("value", (exam) => {
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
          $(".exam-title").css(
            "background",
            Colors[Math.floor(Math.random() * 11)]
          );
          $("#submit").css(
            "background",
            Colors[Math.floor(Math.random() * 11)]
          );
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
              $(".header .title").html(`<small>সময় শেষ!</small>`);
              clearInterval(timer);
            } else {
              $(".header .title").html(
                `<div class="timer"><i class="icofont-stopwatch"></i></i> ${minute} : ${sec}</div>`
              );
            }
          }, 1000);

          jQuery(document).ready(function ($) {
            if (window.history && window.history.pushState) {
              // window.history.pushState('forward', null, './#forward');
              $(window).on("popstate", function () {
                clearInterval(timer);
                $(".timer").html("");
              });
            }
          });

          $("#submit")
            .off()
            .click(function () {
              //console.log(eAddr[0])
              let foundKey = false;
              db.ref(
                "jachai/users/" +
                  userUID +
                  "/practiceExams/"+eAddr[0]+'/'+
                  eAddr[3]
              ).on("value", (keyMatch) => {
               // console.log(keyMatch.val());
                if (keyMatch.val() === null) {
                  foundKey = true;
                }

                if (foundKey) {
                  Swal.fire({
                    title: `তুমি কি নিশ্চিত?`,
                    text: `তোমার স্কোর সাবমিট হবে। এই পরীক্ষাটির জন্য দ্বিতীয়বার তোমার স্কোর আর যোগ হবে না!`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "হ্যাঁ",
                    cancelButtonText: "না",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      clearInterval(timer);
                      $("html, body").animate({ scrollTop: 0 }, "slow");
                      $("#submit").hide();
                      $("#again").show();
                      let e;
                      $(".explanation").show();
                      for (let k = 0; k < ans.length; ++k) {
                        e = k;
                        e = "#exp-" + e;
                        $(e).html(
                          `<b style="color: green;">Solution:</b><br>${exp[k]}`
                        );
                        // $('#'+ans[k]).css({'background': 'var(--success)', 'color': 'var(--light)'});
                        $("#" + ans[k] + " .st").addClass("cr");
                        $(
                          $($($("#" + ans[k])[0].parentNode)[0].parentNode)[0]
                            .children[0]
                        ).html(
                          '<div class="not-ans"> <span class="material-icons">error</span></div>'
                        );
                      }
                      for (let i = 0; i < userAns.length; ++i) {
                        found = false;
                        for (let j = 0; j < ans.length; ++j) {
                          if (userAns[i] === ans[j]) {
                            score++;
                            // $('#'+userAns[i]).css({'background': 'var(--success)', 'color': 'var(--light)'});
                            $("#" + userAns[i] + " .st").addClass("cr");
                            $(
                              $(
                                $($("#" + userAns[i])[0].parentNode)[0]
                                  .parentNode
                              )[0].children[0]
                            ).html(
                              '<div class="correct"> <span class="material-icons">verified</span> </div>'
                            );
                            found = true;
                            break;
                          } else found = false;
                        }

                        if (!found) {
                          wrong++;
                          // $('#'+userAns[i]).css({'background': 'var(--danger)', 'color': 'var(--light)'});
                          $("#" + userAns[i] + " .st").addClass("wa");
                          //console.log($($('#'+userAns[i])[0].parentNode)[0].parentNode)
                          $(
                            $(
                              $($("#" + userAns[i])[0].parentNode)[0].parentNode
                            )[0].children[0]
                          ).html(
                            '<div class="wrong"> <span class="material-icons">highlight_off</span>  </div>'
                          );
                        }
                      }

                      $(".score").show();
                      $(".mark").html(
                        `স্কোর </br> <span class="score-num">${score}/${questions.length}</span>`
                      );
                      $(".score-wa").html(
                        `ভুল </br> <span class="score-num">${wrong}</span>`
                      );
                      $(".score-na").html(
                        `ফাঁকা </br> <span class="score-num">${
                          questions.length - (score + wrong)
                        }</span>`
                      );
                      $(".score-time").html(
                        `সময় <br> <span class="score-num">${
                          initialMin - 1 - minute
                        }:${60 - sec}</span>`
                      );

                      db.ref(
                        "jachai/users/" +
                          userUID +
                          "/practiceExams/" +
                          myexam.details.sub +
                          "/" +
                          eAddr[3]
                      ).update({
                        score: score,
                        totalQ: questions.length,
                        wrong: wrong,
                        na: questions.length - (score + wrong),
                        time: {
                          min: initialMin - 1 - minute,
                          sec: 60 - sec,
                        },
                      });
                      db.ref("jachai/users/" + userUID).update({
                        practiceScore: epscore + score,
                        totalPracExam: etotalPracExam + 1,
                      });

                      db.ref("jachai/leaderboard/" + eAddr[3]).push({
                        score: score,
                        totalQ: questions.length,
                        wrong: wrong,
                        userKey: userUID,
                        username: myusername,
                        na: questions.length - (score + wrong),
                        time: {
                          min: initialMin - 1 - minute,
                          sec: 60 - sec,
                        },
                      });

                      Swal.fire("সাবমিট হয়েছে!", "", "success");
                    }
                  });
                  //end
                } else {
                  clearInterval(timer);
                  $("html, body").animate({ scrollTop: 0 }, "slow");
                  $("#submit").hide();
                  $("#again").show();
                  let e;
                  $(".explanation").show();
                  for (let k = 0; k < ans.length; ++k) {
                    e = k;
                    e = "#exp-" + e;
                    $(e).html(
                      `<b style="color: green;">Solution:</b><br>${exp[k]}`
                    );
                    // $('#'+ans[k]).css({'background': 'var(--success)', 'color': 'var(--light)'});
                    $("#" + ans[k] + " .st").addClass("cr");
                    $(
                      $($($("#" + ans[k])[0].parentNode)[0].parentNode)[0]
                        .children[0]
                    ).html(
                      '<div class="not-ans"> <span class="material-icons">error</span></div>'
                    );
                  }
                  for (let i = 0; i < userAns.length; ++i) {
                    found = false;
                    for (let j = 0; j < ans.length; ++j) {
                      if (userAns[i] === ans[j]) {
                        score++;
                        // $('#'+userAns[i]).css({'background': 'var(--success)', 'color': 'var(--light)'});
                        $("#" + userAns[i] + " .st").addClass("cr");
                        $(
                          $(
                            $($("#" + userAns[i])[0].parentNode)[0].parentNode
                          )[0].children[0]
                        ).html(
                          '<div class="correct"> <span class="material-icons">verified</span> </div>'
                        );
                        found = true;
                        break;
                      } else found = false;
                    }
                    if (!found) {
                      wrong++;
                      // $('#'+userAns[i]).css({'background': 'var(--danger)', 'color': 'var(--light)'});
                      $("#" + userAns[i] + " .st").addClass("wa");
                      //console.log($($('#'+userAns[i])[0].parentNode)[0].parentNode)
                      $(
                        $($($("#" + userAns[i])[0].parentNode)[0].parentNode)[0]
                          .children[0]
                      ).html(
                        '<div class="wrong"> <span class="material-icons">highlight_off</span>  </div>'
                      );
                    }
                  }

                  $(".score").show();
                  $(".mark").html(
                    `স্কোর </br> <span class="score-num">${score}/${questions.length}</span>`
                  );
                  $(".score-wa").html(
                    `ভুল </br> <span class="score-num">${wrong}</span>`
                  );
                  $(".score-na").html(
                    `ফাঁকা </br> <span class="score-num">${
                      questions.length - (score + wrong)
                    }</span>`
                  );
                  $(".score-time").html(
                    `সময় <br> <span class="score-num">${
                      initialMin - 1 - minute
                    }:${60 - sec}</span>`
                  );

                  Swal.fire({
                    title: `তুমি পরীক্ষাটি আগেও দিয়েছিলে। এবার আর তোমার স্কোর যোগ হবে না!`,
                    icon: "success",
                    confirmButtonText: "আচ্ছা!",
                  });
                }
              });
            });
        });
      },
      //Other EXAM LISTS
      "/exams/:id": function (params) {
        $('.footer').show();
        db.ref("jachai/exams/" + params.id).on("value", (pracs) => {
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
            document.querySelector(".examLists").innerHTML += `
  <div class="exam">
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
            <small class="author"><i class="icofont-wall-clock"></i> ${getRelativeTime(
              allExams[i].details.at
            )} <i class="icofont-fountain-pen"></i> <i>author: ${
              allExams[i].details.author
            }</i></small></br>
          <a  href="#!/exam/${
            examsKeys[i]
          }"> <button class="btn red"><i class="icofont-ui-play left"></i>অংশগ্রহণ</button> </a>
      </div>
  </div>
  `;
          }
        });
      },
      // other EXAM
      "/exam/:id": function (params) {
        $('.footer').hide();
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
          $(".exam-title").css(
            "background",
            Colors[Math.floor(Math.random() * 11)]
          );
          $("#submit").css(
            "background",
            Colors[Math.floor(Math.random() * 11)]
          );
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

          jQuery(document).ready(function ($) {
            if (window.history && window.history.pushState) {
              // window.history.pushState('forward', null, './#forward');
              $(window).on("popstate", function () {
                clearInterval(timer);
                $(".timer").html("");
              });
            }
          });

          $("#submit")
            .off()
            .click(function () {
                  clearInterval(timer);
                  $("html, body").animate({ scrollTop: 0 }, "slow");
                  $("#submit").hide();
                  $("#again").show();
                  let e;
                  $(".explanation").show();
                  for (let k = 0; k < ans.length; ++k) {
                    e = k;
                    e = "#exp-" + e;
                    $(e).html(
                      `<b style="color: green;">Solution:</b><br>${exp[k]}`
                    );
                    // $('#'+ans[k]).css({'background': 'var(--success)', 'color': 'var(--light)'});
                    $("#" + ans[k] + " .st").addClass("cr");
                    $(
                      $($($("#" + ans[k])[0].parentNode)[0].parentNode)[0]
                        .children[0]
                    ).html(
                      '<div class="not-ans"> <span class="material-icons">error</span></div>'
                    );
                  }
                  for (let i = 0; i < userAns.length; ++i) {
                    found = false;
                    for (let j = 0; j < ans.length; ++j) {
                      if (userAns[i] === ans[j]) {
                        score++;
                        // $('#'+userAns[i]).css({'background': 'var(--success)', 'color': 'var(--light)'});
                        $("#" + userAns[i] + " .st").addClass("cr");
                        $(
                          $(
                            $($("#" + userAns[i])[0].parentNode)[0].parentNode
                          )[0].children[0]
                        ).html(
                          '<div class="correct"> <span class="material-icons">verified</span> </div>'
                        );
                        found = true;
                        break;
                      } else found = false;
                    }
                    if (!found) {
                      wrong++;
                      // $('#'+userAns[i]).css({'background': 'var(--danger)', 'color': 'var(--light)'});
                      $("#" + userAns[i] + " .st").addClass("wa");
                      //console.log($($('#'+userAns[i])[0].parentNode)[0].parentNode)
                      $(
                        $($($("#" + userAns[i])[0].parentNode)[0].parentNode)[0]
                          .children[0]
                      ).html(
                        '<div class="wrong"> <span class="material-icons">highlight_off</span>  </div>'
                      );
                    }
                  }

                  $(".score").show();
                  $(".mark").html(
                    `স্কোর </br> <span class="score-num">${score}/${questions.length}</span>`
                  );
                  $(".score-wa").html(
                    `ভুল </br> <span class="score-num">${wrong}</span>`
                  );
                  $(".score-na").html(
                    `ফাঁকা </br> <span class="score-num">${
                      questions.length - (score + wrong)
                    }</span>`
                  );
                  $(".score-time").html(
                    `সময় <br> <span class="score-num">${
                      initialMin - 1 - minute
                    }:${60 - sec}</span>`
                  );

                  Swal.fire({
                    title: `এই পরীক্ষাটির স্কোর যোগ হবে না!`,
                    icon: "success",
                    confirmButtonText: "আচ্ছা!",
                  });
                
            });
        });
      },
      "/user/:id": function (params) {
        $('.footer').show();
        app.innerHTML = `
        <div class="login">
        <h5>
        </span>
        <i class="icofont-bars"></i>প্রোফাইল পরিসংখ্যান</h5>
        <h6 class="userName">
        <span class="user-gender-icon"></span> 
        <span style="font-size: 17px" class="username"></span>
        </br>
        <span class="school"></span>
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
        `;
        db.ref("jachai/users/" + params.id).on("value", (set) => {
          $(".group").html(
            `<i class="icofont-ui-user-group"></i> ${set.val().group}`
          );
          $(".username").text(set.val().username);
          if (set.val().gender === "male") {
            $(".user-gender-icon").html(`<i class="icofont-student-alt"></i>`);
          } else {
            $(".user-gender-icon").html(`<i class="icofont-student"></i>`);
          }
          $(".school").html(
            `<i class="icofont-institution"></i> ${set.val().school}`
          );
          $(".state").html(`
       <div class="state-item">
       <i class="icofont-paperclip"></i> মোট লাইভ এক্সামঃ <span class="count ex"> ${
         set.val().totalExam
       } </span> 
       </div>
       <div class="state-item">
       <i class="icofont-badge"></i> লাইভ এক্সাম স্কোরঃ  <span class="count sc"> ${
         set.val().score
       } </span> 
       </div>
       <div class="state-item">
       <i class="icofont-thunder-light"></i> প্রাকটিস এক্সামঃ <span class="count ex"> ${
         set.val().totalPracExam
       } </span> 
       </div>
       <div class="state-item">
       <i class="icofont-hand-thunder"></i>প্রাকটিস এক্সাম স্কোরঃ  <span class="count sc"> ${
         set.val().practiceScore
       } </span> 
       </div>
           `);
        });
      },

      "/login": function () {
        $('.footer').hide();
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
          return (
            "/widget#recaptcha=" +
            getRecaptchaMode() +
            "&emailSignInMethod=" +
            getEmailSignInMethod()
          );
        }

        /**
         * Displays the UI for a signed in user.
         * @param {!firebase.User} user
         */
        var handleSignedInUser = function (user) {
          $("#loading").hide();
          $("#loaded").show();
          $("#user-signed-in").show();
          $("#user-signed-out").hide();
          // document.getElementById('name').textContent = user.displayName;
          // document.getElementById('email').textContent = user.email;
          $("#phone").html(`
       <b><i class="icofont-smart-phone prefix"></i> Phone:</b> ${user.phoneNumber}`);

          if (user.photoURL) {
            var photoURL = user.photoURL;
            // Append size to the photo URL for Google hosted images to avoid requesting
            // the image with its original resolution (using more bandwidth than needed)
            // when it is going to be presented in smaller size.
            if (
              photoURL.indexOf("googleusercontent.com") != -1 ||
              photoURL.indexOf("ggpht.com") != -1
            ) {
              photoURL =
                photoURL +
                "?sz=" +
                document.getElementById("photo").clientHeight;
            }
            document.getElementById("photo").src = photoURL;
            document.getElementById("photo").style.display = "block";
          }
        };

        var handleSignedOutUser = function () {
          $("#user-signed-in").hide;
          $("#user-signed-out").show;
          ui.start("#firebaseui-container", getUiConfig());
        };

        firebase.auth().onAuthStateChanged(function (user) {
          $("#loading").hide();
          $("#loaded").show();
          user ? handleSignedInUser(user) : handleSignedOutUser();
        });

        var deleteAccount = function () {
          firebase
            .auth()
            .currentUser.delete()
            .catch(function (error) {
              if (error.code == "auth/requires-recent-login") {
                // The user's credential is too old. She needs to sign in again.
                firebase
                  .auth()
                  .signOut()
                  .then(function () {
                    setTimeout(function () {
                      alert("Please sign in again to delete your account.");
                    }, 1);
                  });
              }
            });
        };

        function handleConfigChange() {
          var newRecaptchaValue = document.querySelector(
            'input[name="recaptcha"]:checked'
          ).value;
          var newEmailSignInMethodValue = document.querySelector(
            'input[name="emailSignInMethod"]:checked'
          ).value;
          location.replace(
            location.pathname +
              "#recaptcha=" +
              newRecaptchaValue +
              "&emailSignInMethod=" +
              newEmailSignInMethodValue
          );

          // Reset the inline widget so the config changes are reflected.
          ui.reset();
          ui.start("#firebaseui-container", getUiConfig());
        }

        document
          .getElementById("sign-out")
          .addEventListener("click", function () {
            firebase.auth().signOut();
            window.location.reload();
          });
        document
          .getElementById("delete-account")
          .addEventListener("click", function () {
            deleteAccount();
            window.location.reload();
          });
      },
      "/setprofile": function () {
        $('.footer').hide();

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

        $(document).ready(function () {
          $("select").formSelect();
        });

        $("#registration").click(function () {
          let username = $("#rusername").val();
          let school = $("#rschool").val();
          let stdclass = $("#rclass").val();
          let group = $("#rgroup").val();
          let gender = $("#gender").val();
          let district = $("#rdistrict").val();
          if (!validation(username)) {
            console.log("Please filled out!");
            $("#rusername").focus();
            $(".warning").html(`<b>Username</b> should not be empty!`);
          } else if (!validation(school)) {
            $("#rschool").focus();
            $(".warning").html(`<b>Institution</b> should not be empty!`);
          } else if (!validation(stdclass)) {
            $("#rclass").focus();
            $(".warning").html(`<b>Class</b> should not be empty!`);
          } else if (!validation(group)) {
            $("#rgroup").focus();
            $(".warning").html(`<b>Group</b> should not be empty!`);
          } else if (!validation(gender)) {
            $("#gender").focus();
            $(".warning").html(`<b>Gender</b> should not be empty!`);
          } else if (!validation(district)) {
            $("#rdistrict").focus();
            $(".warning").html(`<b>District</b> should not be empty!`);
          } else {
            let registrationInfo = {
              username: username,
              school: school,
              stdclass: stdclass,
              district: district,
              gender: gender,
              group: group,
              setStatus: true,
              lastEditTime: getTime(),
            };
            db.ref("jachai/users/" + userUID).update(registrationInfo);
            Swal.fire({
              title: "প্রোফাইল সেট করা হয়েছে!",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                router.navigate("/");
              }
            });

            console.log(userUID);
          }
        });

        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            db.ref("jachai/users/" + userUID).on("value", (set) => {
              $(".mi")
                .html(`<i class="icofont-school-bag prefix"></i> <b>Class:</b> ${
                set.val().stdclass
              }</br>
               <i class="icofont-group" prefix></i> <b>Group:</b> ${
                 set.val().group
               }</br>
               <i class="icofont-group-students prefix"></i> <b>Gender:</b> ${
                 set.val().gender
               }
               `);
              $("#rusername").val(set.val().username);
              $("#rschool").val(set.val().school);
              $("#gender").val(set.val().gender);
              $("#rclasss").val(set.val().stdclass);
              $("#rgroup").val(set.val().group);
              $("#rdistrict").val(set.val().district);
            });
          }
        });
      },
      "/scores": function () {
        $('.footer').show();
        $('.footertext').hide();
        $('.footerIcon').removeClass('footerIconActive');

        if($('.scr')[0].classList[3] === undefined){
          $('.scr').addClass('footerIconActive');
          $($($('.scr')[0].parentNode)[0].lastElementChild).show();
        }

        app.innerHTML = `
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
        <span style="font-size: 17px" class="username"></span>
        </br>
        <span class="school"></span>
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

</br>
<b><i class="icofont-chart-histogram"></i> প্রাকটিস প্রোগ্রেস</b>
</br>
<center><div class="bar-cont">

<div class="container">
  <div class="box">
  <div id="pracExam">
  <div class="preloader-wrapper small active">
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
  </div>
    <h5>এক্সাম</h5>
  </div>
  </div>

<div class="container">
  <div class="box">
    <div id="pracScore">
    <div class="preloader-wrapper small active">
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
    </div>
    <h5>স্কোর</h5>
  </div>
  </div>
  </div></center>
  
 
        `;

        // $('.collap-header').click(function() {
        //   $('.collap-body').hide(200);
        //   $('.collap-header').removeClass('collap-active');
        //   $($($(this)[0].parentNode)[0].children[1]).show(300);
        //   $($($(this)[0].parentNode)[0].children[1]).addClass('collap-active');
        //   //console.log($($($($(this)[0].parentNode)[0].children[1]))[0].classList[1])
        // });

      firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            db.ref("jachai/users/" + user.uid).on("value", (set) => {
              $(".group").html(
                `<i class="icofont-ui-user-group"></i> ${set.val().group}`
              );
              $(".username").text(set.val().username);
              if (set.val().gender === "male") {
                $(".user-gender-icon").html(
                  `<i class="icofont-student-alt"></i>`
                );
              } else {
                $(".user-gender-icon").html(`<i class="icofont-student"></i>`);
              }
              $(".school").html(
                `<i class="icofont-institution"></i> ${set.val().school}`
              );
              db.ref('jachai/total').on('value', s=>{
                
             
              $(".state").html(`
             
       <div class="state-item">
       <i class="icofont-paperclip"></i> মোট লাইভ এক্সাম দিয়েছোঃ <span class="count ex"> ${
         set.val().totalExam
       }/${s.val().liveExam} </span> 
       </div>
       <div class="state-item">
       <i class="icofont-badge"></i> তোমার লাইভ এক্সাম স্কোরঃ  <span class="count sc"> ${
         set.val().score
       }/${s.val().liveScore} </span> 
       </div>
       <div class="state-item">
       <i class="icofont-thunder-light"></i> মোট প্রাকটিস এক্সাম দিয়েছোঃ <span class="count ex"> ${
         set.val().totalPracExam
       }/${s.val().practiceExam} </span> 
       </div>
       <div class="state-item">
       <i class="icofont-hand-thunder"></i> তোমার প্রাকটিস এক্সাম স্কোরঃ  <span class="count sc"> ${
         set.val().practiceScore
       }/${s.val().practiceScore} </span> 
       </div>
           `);
           $('#pracScore').html(`
           <div class="chart" data-percent="${((set.val().practiceScore/s.val().practiceScore)*100)}" data-scale-color="#ffb400">${parseInt((set.val().practiceScore/s.val().practiceScore)*100)}%</div>
           `)

           $('#pracExam').html(`
           <div class="chart" data-percent="${((set.val().totalPracExam/s.val().practiceExam)*100)}" data-scale-color="#ffb400">${Math.floor((set.val().totalPracExam/s.val().practiceExam)*100)}%</div>
           `)
           $(function() {
            $('.chart').easyPieChart({
              size: 80,
              barColor: "red",
              scaleLength: 0,
              lineWidth: 10,
              trackColor: "#373737",
              lineCap: "circle",
              animate: 1000,
            });
          });
          })
            });

            
          }
        });
      },
      "/ranks": function(){
        $('.footer').show();

        $('.footertext').hide();
        $('.footerIcon').removeClass('footerIconActive');
        if($('.rns')[0].classList[3] === undefined){
          $('.rns').addClass('footerIconActive');
          $($($('.rns')[0].parentNode)[0].lastElementChild).show();
        }
        app.innerHTML = `
        <h5><i class="icofont-users-alt-5"></i> র‍্যাঙ্কস</h5>
        <small style="color: var(--danger)"><b class="pos"></b></small>
        <div class="scoreboard"></div>
        `;
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
          db.ref("jachai/users/").on("value", (scores) => {
            let scoreArr = [];
            //let keys = [];
            let scorehtml = document.querySelector(".scoreboard");
            scorehtml.innerHTML = "";
            scores.forEach((score) => {scoreArr.push(score.val());});
            scoreArr.sort(function (a, b) {return b.practiceScore - a.practiceScore;});
            for (let s = 0; s < scoreArr.length; s++) {
              let k = s + 1;
              if(user.uid === scoreArr[s].key){
                $('.pos').html(`তোমার অবস্থান: ${k}`);
                scorehtml.innerHTML += `
          <a href="#!/user/${scoreArr[s].key}"> <div style="background: var(--danger); color: #fff;" class="scoreboard-score">
            <div class="position">${k}</div>
            <div class="logo" style="background: ${logoColor(
              firstLetter(scoreArr[s].username)
            )}">${firstLetter(scoreArr[s].username)}</div>
             <div class="score-details">
             <div class="score-username">${scoreArr[s].username}</div>
             <div class="time">${scoreArr[s].totalPracExam}</div>
             </div>
             <div class="score-obtained">${scoreArr[s].practiceScore}</div>
            </div></a>
            `;
              }else{
              scorehtml.innerHTML += `
          <a href="#!/user/${scoreArr[s].key}"> <div class="scoreboard-score">
            <div class="position">${k}</div>
            <div class="logo" style="background: ${logoColor(
              firstLetter(scoreArr[s].username)
            )}">${firstLetter(scoreArr[s].username)}</div>
             <div class="score-details">
             <div class="score-username">${scoreArr[s].username}</div>
             <div class="time">${scoreArr[s].totalPracExam}</div>
             </div>
             <div class="score-obtained">${scoreArr[s].practiceScore}</div>
            </div></a>
            `;
              }
            }
          });
        }
      })
      },
      "/notifications": function(){
        $('.footer').show();

        $('.footertext').hide();
        $('.footerIcon').removeClass('footerIconActive');
        if($('.ntf')[0].classList[3] === undefined){
          $('.ntf').addClass('footerIconActive');
          $($($('.ntf')[0].parentNode)[0].lastElementChild).show();
        }
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            db.ref("jachai/users/" + user.uid).update({notificationStatus: false});
          }
        });
        app.innerHTML = `
        <h5><i class="icofont-notification"></i> নোটিফিকেশান  <span class="ntf-del-all"><i class="icofont-ui-delete"></i></i></span></h5>
        <div class="notifications"></div>
        `
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            db.ref("jachai/users/" + user.uid+'/notification').on("value", (set) => {
             //console.log(set.val())
              $('.notifications').html('');
              if(set.val()=== null){
                document.querySelector('.notifications').innerHTML = `
                <div class="empty">
                <div>
                <div class="emp-icon"><i class="icofont-dropbox"></i></div>
                <div class="emp-text">ফাঁকা!</div>
                </div>
                </div>
                `
              }
              let ntfs = [];
              let ntfKey = [];
             set.forEach(ntf=>{
              ntfs.push(ntf.val());
              ntfKey.push(ntf.key);
             })

             for(let n=ntfs.length-1; n>=0; n--){
               document.querySelector('.notifications').innerHTML += `
               <div class="notification">
               <div class="ntf-del" id="${ntfKey[n]}"><i class="icofont-close"></i></i></div>
               <div class="ntf-time">${getRelativeTime(ntfs[n].time)}</div>
               <div class="ntf-text">${ntfs[n].text}</div>
               </div>
               `
             }

             $('.ntf-del').click(function(){
               let ntfDelKey = $(this)[0].id;
               db.ref('jachai/users/'+user.uid+'/notification/'+ntfDelKey).remove(); 
             });

             $('.ntf-del-all').click(function(){
              db.ref('jachai/users/'+user.uid+'/notification').remove(); 
            });

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
      leave: function (params) {
        //console.log('left');
        //window.location.reload();
      },
    });
  };

  window.addEventListener("load", init, false);
})(window, Navigo);


//notification Status
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.ref("jachai/users/" + user.uid).on("value", (set) => {
     // console.log(set.val().notificationStatus)
      if(set.val().notificationStatus === true){
        $('.ntf').attr('id', 'ntfAnim');
        $('.ntfActive').show();
      }else{
        $('.ntfActive').hide();
        $('.ntf').removeAttr('id');
      }
    })
  }
});

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
  if (lett === "A") return "var(--orange)";
  if (lett === "আ") return "var(--orange)";
  else if (lett === "B") return "var(--success)";
  else if (lett === "ব") return "var(--success)";
  else if (lett === "X") return "skyblue";
  else if (lett === "জ") return "skyblue";
  else if (lett === "E") return "var(--pink)";
  else if (lett === "ই") return "var(--pink)";
  else if (lett === "O") return "var(--secondary)";
  else if (lett === "ও") return "var(--secondary)";
  else if (lett === "C") return "var(--dark)";
  else if (lett === "চ") return "var(--dark)";
  else if (lett === "D") return "var(--danger)";
  else if (lett === "দ") return "var(--danger)";
  else if (lett === "J") return "var(--warning)";
  else if (lett === "য") return "var(--warning)";
  else if (lett === "F") return "var(--purple)";
  else if (lett === "ফ") return "var(--purple)";
  else if (lett === "H") return "var(--info)";
  else if (lett === "হ") return "var(--info)";
  else if (lett === "I") return "var(--orange)";
  else if (lett === "j") return "skyblue";
  else if (lett === "K") return "var(--indigo)";
  else if (lett === "ক") return "var(--indigo)";
  else if (lett === "L") return "var(--cyan)";
  else if (lett === "ল") return "var(--cyan)";
  else if (lett === "M") return "var(--success)";
  else if (lett === "ম") return "var(--success)";
  else if (lett === "N") return "var(--primary)";
  else if (lett === "ন") return "var(--primary)";
  else if (lett === "O") return "var(--teal)";
  else if (lett === "ও") return "var(--teal)";
  else if (lett === "P") return "var(--dark)";
  else if (lett === "প") return "var(--dark)";
  else if (lett === "Q") return "var(--blue)";
  else if (lett === "খ") return "var(--blue)";
  else if (lett === "R") return "orange";
  else if (lett === "র") return "orange";
  else if (lett === "S") return "var(--pink)";
  else if (lett === "স") return "var(--pink)";
  else if (lett === "শ") return "var(--pink)";
  else if (lett === "T") return "var(--secondary)";
  else if (lett === "ত") return "var(--secondary)";
  else if (lett === "ট") return "var(--secondary)";
  else if (lett === "U") return "var(--blue)";
  else if (lett === "ধ") return "var(--blue)";
  else if (lett === "V") return "var(--danger)";
  else if (lett === "ভ") return "var(--danger)";
  else return "red";
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

function getTime() {
  let date = new Date();
  return date.toString();
}

function validation(string) {
  if (string == null) {
    return false;
  } else if (string.match(/^\s*$/g)) {
    return false;
  } else {
    return true;
  }
}


// $('.footerIcon').click(function(){
//   // $(this).off();
//   $('.footertext').hide();
//   $($($(this)[0].parentNode)[0].lastElementChild).show();
//   $('.footerIcon').removeClass('footerIconActive');
  
//  // $(this).addClass('footerIconActive');
// })
