import "./styles.css";

const END_POINT = "https://opentdb.com/api.php?amount=10";
let totalScore = 0;

const fetchQuestions = () => {
  return fetch(END_POINT)
    .then(res => res.json())
    .then(({ results }) => results);
};

fetchQuestions().then(listOfQuestions => {
  const questions = listOfQuestions.filter(
    question => question.type === "multiple"
  );
  console.log(questions);
  displayQuestion(questions[0]);
});
function displayQuestion(question) {
  console.log(question);
  const questionSection = document.getElementById("question");
  const questionText = document.createElement("p");
  questionText.innerText = question.question;
  questionSection.appendChild(questionText);
  const questionUl = document.createElement("ul");
  const correctAnswer = question.correct_answer;
  const answerItem = document.createElement("li");

  answerItem.addEventListener("click", event => {
    totalScore++;
    console.log(totalScore);
  });
  answerItem.innerText = correctAnswer;
  questionUl.appendChild(answerItem);
  questionSection.appendChild(questionUl);
  const incorrectAnswers = question.incorrect_answers;
  incorrectAnswers.map(incorrectAnswer => {
    const answerItem = document.createElement("li");
    answerItem.innerText = incorrectAnswer;
    questionUl.appendChild(answerItem);
    return answerItem;
  });
  document.getElementById("score").innerHTML = `Total Score: ${totalScore}`;
}
