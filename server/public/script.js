let obj = []
let quiz = document.querySelector("#quiz");
let question = document.querySelector("#question");
let op1 = document.querySelector("#a_text");
let op2 = document.querySelector("#b_text");
let op3 = document.querySelector("#c_text");
let op4 = document.querySelector("#d_text");
let nextBtn = document.querySelector("#next");
let submitBtn = document.querySelector("#submit");
let ansElements = document.querySelectorAll(".answer");
let startBtn = document.querySelector("#start");
let ansBox = document.querySelector("#ansBox");
let attempt = require("../db/attemptsScema");
let score = 0;
let questionCount = 0;

const deselectAnswers = () => {
  ansElements.forEach((option) => (option.checked = false));
};

function selected() {
  let correctAns;
  ansElements.forEach((ele) => {
    if (ele.checked) {
      correctAns = ele.id;
    }
  });
  return correctAns;
}

async function fetchData() {
  await fetch("http://localhost:3000/api/getquestion")
    .then((res) => {
      return res.json();
    })
    .then((Data) => {
      Data.map((item) => {
        obj.push(item)
      })
      
      loadQuestion();
    });
  }
  console.log(obj);

fetchData();

async function loadQuestion() {
  question.innerHTML = obj[questionCount].question;
  op1.innerHTML = obj[questionCount].A;
  op2.innerHTML = obj[questionCount].B;
  op3.innerHTML = obj[questionCount].C;
  op4.innerHTML = obj[questionCount].D;
}

//loadQuestion();

let flag = true;
submitBtn.addEventListener("click", function () {
  let correctAns = selected();

  if (correctAns === obj[questionCount].answer) {
    if (flag != false) {
      score++;
      flag = false;
    }

  } 
  
});


  nextBtn.addEventListener("click", function () {
    flag = true;
    s = true
    questionCount++;
    ansBox.innerHTML = "";
    ansBox.style.backgroundColor = "white";

    if (questionCount < obj.length) {
      loadQuestion();
      deselectAnswers();
    } else {
      quiz.innerHTML = `
            <h2>You answered ${score}/${obj.length} questions correctly</h2>
            <button onclick= "handleSubmit()">Submit</button>
            `;
    }
  });

async function handleSubmit() {
  let roll = await JSON.parse(localStorage.getItem("roll"));
  await attempt.create({rollNo:roll,score:score})
}