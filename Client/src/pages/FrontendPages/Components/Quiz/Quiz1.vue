<template>
  <div dir="ltr" class="card">
    <div class="container">
      <div class="header-img">
        <img src="/img/askarya-logo.png" width="94" alt="Ask Arya Logo" />
      </div>
      <div v-if="state == 'question'">
        <h1 class="my-4 pl-2 title">{{ question.question }}</h1>

        <hr class="hr" />

        <!-- QUESTION SECTION -->
        <ul class="px-0 mb-4">
          <li v-for="answer in question.answers" :key="answer.id">
            <base-button
              class="question-button mb-3"
              v-on:click="handleResponse"
              v-bind:data-id="answer.id"
            >
              ◯ {{ answer.answer }}
            </base-button>
          </li>
        </ul>
      </div>

      <!-- ANSWER SECTION -->
      <div v-if="state == 'answer'">
        <h1 class="my-4 pl-2 title">{{ question.question }}</h1>
        <hr class="hr" />

        <ul class="px-0">
          <li v-for="answer in question.answers" :key="answer.id">
            <base-button
              block
              class="answer-button btn-simple mb-3"
              v-bind:class="{
                'correct-answer text-white': answer.correct,
                'wrong-answer text-white':
                  answer.id == selectedAnswer.id && !answer.correct,
              }"
            >
              ◯ {{ answer.answer }}
            </base-button>
          </li>
        </ul>

        <!-- CORRECT/INCORRECT SECTION -->
        <div class="text-right mb-3">
          <!-- <p v-if="selectedAnswer.correct" class="mt-4">
            🎉 Correct, well done! 🎉
          </p>
          <p v-else class="my-3 text-lg">Wrong answer, sorry</p> -->
          <base-button
            type="default"
            class="custom-btn"
            v-on:click="handleNext"
          >
            Next question
            <i class="fas fa-caret-right pl-2"></i>
          </base-button>
        </div>
      </div>

      <!-- RESULTS SECTION -->
      <div v-if="state == 'results'">
        <h1 class="mt-5 results-title text-center">
          Congratulations, you completed the quiz!
        </h1>
        <p class="my-2 pt-3 grades text-center">
          You got <span class="bold-text"> {{ score }} </span> out of
          <span class="bold-text"> {{ questions.length }} </span>
        </p>
        <div class="advice pb-4 pt-3">
          <p v-if="scorePercentage > 90">
            <i class="fas fa-info-circle ml-2"></i>
            Nice! you have native-like vocab!
          </p>

          <p v-else-if="scorePercentage >= 50">
            <i class="fas fa-info-circle ml-2"></i>
            Good try! Try again for more improvements.
          </p>

          <p v-else>
            <i class="fas fa-info-circle ml-2"></i>
            You should have a look at our vocabulary course.
          </p>
        </div>
        <div class="text-center mb-4">
          <base-button
            type="default"
            v-on:click="handleRestart"
            class="custom-btn mt-3 restart-btn"
          >
            <i class="fas fa-sync fa-spin mr-2"></i>
            Restart the quiz
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      state: 'question',
      currentQuestion: 0,
      selectedAnswer: 0,
      questions: [
        {
          question: `A male chicken is called:`,
          answers: [
            {
              answer: 'a rooster',
              correct: true,
            },
            {
              answer: 'a chick',
            },
            {
              answer: 'a hen',
            },
          ],
        },
        {
          question: `A young sheep is called:`,
          answers: [
            {
              answer: 'a lamb',
              correct: true,
            },
            {
              answer: 'a ram',
            },
            {
              answer: 'an ewe',
            },
          ],
        },

        {
          question: `A female pig is called:`,
          answers: [
            {
              answer: 'a sow',
              correct: true,
            },
            {
              answer: 'a suckling',
            },
            {
              answer: 'a boar',
            },
          ],
        },
        {
          question: `A tigress is a _______ tiger.`,
          answers: [
            {
              answer: 'female',
              correct: true,
            },
            {
              answer: 'male',
            },
            {
              answer: 'young',
            },
          ],
        },

        {
          question: `Click the best synonym for voyage:`,
          answers: [
            {
              answer: 'long journey',
              correct: true,
            },
            {
              answer: 'large rock',
            },
            {
              answer: 'cruise ship',
            },
          ],
        },
        {
          question: `Click the best synonym for ponder:`,
          answers: [
            {
              answer: 'think about',
              correct: true,
            },
            {
              answer: 'hold on',
            },
            {
              answer: 'put down',
            },
          ],
        },

        {
          question: ` Click the best synonym for fortunately:`,
          answers: [
            {
              answer: 'luckily',
              correct: true,
            },
            {
              answer: 'strongly',
            },
            {
              answer: 'badly',
            },
          ],
        },

        {
          question: `Click the best synonym for vitality:`,
          answers: [
            {
              answer: 'liveliness',
              correct: true,
            },
            {
              answer: 'joy',
            },
            {
              answer: 'courage',
            },
          ],
        },

        {
          question: `Click the best synonym for futile:`,
          answers: [
            {
              answer: 'pointless',
              correct: true,
            },
            {
              answer: 'petty',
            },
            {
              answer: 'animated',
            },
          ],
        },

        {
          question: `Click the best synonym for dumb:`,
          answers: [
            {
              answer: 'stupid',
              correct: true,
            },
            {
              answer: 'dark',
            },
            {
              answer: 'old',
            },
          ],
        },
      ],
      score: 0,
    };
  },
  computed: {
    question() {
      return this.questions[this.currentQuestion];
    },
    scorePercentage() {
      return (this.score * 100) / this.questions.length;
    },
  },
  methods: {
    handleResponse(event) {
      const selected = this.question.answers.find(
        (a) => a.id == event.target.dataset.id
      );
      this.selectedAnswer = selected;
      if (selected.correct) {
        this.score++;
      }
      this.state = 'answer';
    },
    handleNext(event) {
      this.currentQuestion++;
      if (this.currentQuestion >= this.questions.length) {
        this.state = 'results';
      } else {
        this.state = 'question';
      }
    },
    randomizeOrder() {
      this.questions.map((question) => {
        question.answers.sort((a, b) => Math.random() - 0.5);
        question.answers.map((answer, index) => (answer.id = index));
      });
      this.questions.sort((a, b) => Math.random() - 0.5);
    },
    handleRestart(event) {
      this.currentQuestion = 0;
      this.score = 0;
      this.state = 'question';
      this.randomizeOrder();
    },
  },
  created() {
    this.randomizeOrder();
  },
};
</script>

<style lang="scss" scoped>
.white-content .card {
  width: 450px !important;
  margin-right: auto;
  margin-left: auto;
  background: #e9e9e9 !important;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.17), 0 10px 10px rgba(0, 0, 0, 0.14);
  font-family: sans-serif, Verdana, Tahoma !important;
  border-left: 1.4em solid #e52e71;
  // border-top: 5px solid #e52e71;
}

.custom-btn {
  padding: 11px 20px !important;
  background: #c7c7c7 !important;
  border-radius: 20px;
  color: #4d4d4d;
}

.header-img {
  text-align: left !important;
  padding-top: 1em !important;
  padding-right: 0.6em !important;
  margin-bottom: 1em !important;
}

.title {
  font-size: 1.3em !important;
  text-align: left !important;
  color: rgb(29, 29, 29) !important;
}

.results-title {
  font-size: 1.4em !important;
  text-align: center !important;
  color: rgb(29, 29, 29) !important;
}

.bold-text {
  font-weight: bold;
}

.question-button {
  font-family: sans-serif, Verdana, Tahoma !important;
  color: rgb(44, 44, 44) !important;
  font-size: 1.15em !important;
  padding: 10px 28px !important;
  display: block !important;
  width: 100% !important;
  text-align: left !important;
  border-radius: 10px !important;
  background: rgb(228, 228, 228);
}

.question-button:active {
  background: rgb(241, 241, 241) !important;
}

.question-button:hover {
  transform: translateY(0px);
  -webkit-transform: translateY(0px);
  background: rgb(197, 197, 197) !important;
}

.answer-button {
  font-family: sans-serif, Verdana, Tahoma !important;
  color: #a7a7a7 !important;
  font-size: 1.15em !important;
  padding: 10px 28px !important;
  display: block !important;
  width: 100% !important;
  text-align: left !important;
  border-radius: 15px;
  border-color: #dfdfdf !important;
  // background: rgba(255, 255, 255, 0.897) !important;
}

.answer-button:hover {
  cursor: default !important;
  transform: translateY(0px);
  -webkit-transform: translateY(0px);
}

.white-content .btn:hover {
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0), 0 1px 3px rgba(0, 0, 0, 0);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0), 0 1px 3px rgba(0, 0, 0, 0);
}

.wrong-answer {
  color: rgba(255, 255, 255, 0.5) !important;
  background: rgb(240, 104, 104) !important;
}

.wrong-answer:hover,
.wrong-answer:visited,
.wrong-answer:active,
.wrong-answer:focus,
.wrong-answer:focus-within {
  background: rgb(240, 104, 104) !important;
  color: rgba(255, 255, 255, 0.5) !important;
}

.correct-answer {
  color: white !important;
  background: #4ed34e !important;
}

.correct-answer:hover,
.correct-answer:visited,
.correct-answer:active,
.correct-answer:focus,
.correct-answer:focus-within {
  background: #4ed34e !important;
}

.advice p {
  font-size: 1.1em !important;
  color: rgb(70, 70, 70) !important;
}

.restart-btn {
  background-color: #e52e71 !important;
  color: white !important;
  padding: 11px 20px !important;
  border-radius: 20px;
}

.grades {
  font-size: 1.7em !important;
  color: #e52e71 !important;
  // color: rgb(29, 29, 29) !important;
}

li {
  list-style: none;
}

.hr {
  margin-bottom: 2em !important;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(99, 99, 99, 0.2),
    rgba(0, 0, 0, 0)
  );
}

@media (max-width: 678px) {
  .white-content .card {
    width: auto !important;
    border-left: 1.2em solid #e52e71;
  }

  .title {
    font-size: 1.5em !important;
  }
}
</style>
