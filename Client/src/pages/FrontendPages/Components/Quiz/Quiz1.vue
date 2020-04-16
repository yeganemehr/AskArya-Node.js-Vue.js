<template>
  <div dir="ltr" class="card">
    <div class="container">
      <h1 class="header">Ask Arya Quiz</h1>
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
              {{ answer.answer }}
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
              {{ answer.answer }}
            </base-button>
          </li>
        </ul>

        <!-- CORRECT/INCORRECT SECTION -->
        <div class="text-right mb-3">
          <!-- <p v-if="selectedAnswer.correct" class="mt-4">
            🎉 Correct, well done! 🎉
          </p>
          <p v-else class="my-3 text-lg">Wrong answer, sorry</p> -->
          <base-button type="default" v-on:click="handleNext">
            Next question
          </base-button>
        </div>
      </div>

      <!-- RESULTS SECTION -->
      <div v-if="state == 'results'">
        <h1 class="my-5 pl-2 title text-center">
          Congratulations, you completed the quiz!
        </h1>
        <p class="my-5 py-3 grades text-center">
          You got <span class="bold-text"> {{ score }} </span> out of
          <span class="bold-text"> {{ questions.length }} </span>
        </p>
        <div class="advice pl-2">
          <p v-if="scorePercentage > 90">
            <i class="fas fa-info-circle ml-2"></i>
            You are a true Ari jon connoisseur!
          </p>

          <p v-else-if="scorePercentage >= 50">
            <i class="fas fa-info-circle ml-2"></i>
            You are somewhat of a Ari jon fan...
          </p>

          <p v-else>
            <i class="fas fa-info-circle ml-2"></i>
            You should start loving Ari jon more and learn about his
            awesomeness...
          </p>
        </div>
        <div class="text-center mb-3">
          <base-button
            type="default"
            v-on:click="handleRestart"
            class="btn-simple rounded mt-3"
          >
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
          question: `A male chicken is called`,
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
          question: `A young sheep is called`,
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
          question: `A female pig is called`,
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
  width: 470px !important;
  margin-right: auto;
  margin-left: auto;
  background: #ffffff !important;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.17), 0 10px 10px rgba(0, 0, 0, 0.14);
  font-family: 'Comic Sans MS', Arial, Helvetica, sans-serif !important;
}

.header {
  font-size: 1.2em !important;
  text-align: right !important;
  color: rgb(212, 212, 212) !important;
  padding-top: 0.8em !important;
}

.title {
  font-size: 1.65em !important;
}

.bold-text {
  font-weight: bold;
}

.question-button {
  font-family: 'Comic Sans MS', Arial, Helvetica, sans-serif !important;
  color: black !important;
  font-size: 1.1em !important;
  padding: 14px 28px !important;
  display: block !important;
  width: 100% !important;
  text-align: left !important;
  border-radius: 15px !important;
  background: rgb(241, 241, 241) !important;
}

.question-button:active {
  background: rgb(241, 241, 241) !important;
}

.question-button:hover {
  transform: translateY(0px);
  -webkit-transform: translateY(0px);
}

.answer-button {
  font-family: 'Comic Sans MS', Arial, Helvetica, sans-serif !important;
  color: #c2c2c2 !important;
  font-size: 1.1em !important;
  padding: 14px 28px !important;
  display: block !important;
  width: 100% !important;
  text-align: left !important;
  border-radius: 15px;
  border-color: #e7e7e7 !important;
  // background: rgba(255, 255, 255, 0.897) !important;
}

.answer-button:hover {
  cursor: default !important;
  transform: translateY(0px);
  -webkit-transform: translateY(0px);
}

.wrong-answer {
  color: rgba(255, 255, 255, 0.5) !important;
  background: rgb(240, 104, 104) !important;
  border-color: rgb(255, 114, 114) !important;
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
  font-weight: bold !important;
  background: #4ed34e !important;
  border-color: rgb(110, 245, 93) !important;
}

.correct-answer:hover,
.correct-answer:visited,
.correct-answer:active,
.correct-answer:focus,
.correct-answer:focus-within {
  background: #4ed34e !important;
}

.advice {
  font-size: 1.1em !important;
}

.grades {
  font-size: 1.5em !important;
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
    rgba(0, 0, 0, 0.08),
    rgba(0, 0, 0, 0)
  );
}

@media (max-width: 678px) {
  .white-content .card {
    width: auto !important;
  }
}
</style>
