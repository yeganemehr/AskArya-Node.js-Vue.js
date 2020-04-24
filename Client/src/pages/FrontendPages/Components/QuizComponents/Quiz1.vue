<template>
  <section class="quiz-section container">
    <div class="row d-flex justify-content-between mb-3">
      <h1 class="quiz-header text-underline font-weight-bold">
        Placement Test
      </h1>

      <div class="row my-3 quiz-details-section">
        <div class="quiz-details-card">
          <div class="quiz-details-top">
            <p class="ml-auto text-center">
              <i class="fas fa-question"></i><br />
              Questions
            </p>
          </div>
          <p class="quiz-details-bottom">
            30
          </p>
        </div>

        <div class="quiz-details-card mx-3">
          <div class="quiz-details-top">
            <p class="ml-auto text-center">
              <i class="far fa-clock"></i> <br />
              Time
            </p>
          </div>
          <p class="quiz-details-bottom">
            24
          </p>
        </div>

        <div class="quiz-details-card custom-margin">
          <div class="quiz-details-top">
            <p class="ml-auto text-center">
              <i class="fas fa-theater-masks"></i> <br />
              Difficulty
            </p>
          </div>
          <p class="quiz-details-bottom">
            N/A
          </p>
        </div>
      </div>
    </div>
    <hr class="hr" />
    <div v-if="state == 'question'">
      <h1 class="mt-3 pl-2 title">
        {{ question.question }}
      </h1>
      <!-- QUESTION SECTION -->
      <ul class="row px-0 mb-4">
        <li
          class="col-md-6 col-sm-12"
          v-for="answer in question.answers"
          :key="answer.id"
        >
          <base-button
            class="question-button"
            v-on:click="handleResponse"
            v-bind:data-id="answer.id"
          >
            <span class="mr-2 d-inline-flex">◯</span> {{ answer.answer }}
          </base-button>
        </li>
      </ul>
    </div>

    <!-- ANSWER SECTION -->
    <div v-if="state == 'answer'">
      <h1 class="mt-3 pl-2 title">{{ question.question }}</h1>
      <!-- <hr class="hr" /> -->

      <ul class="px-0 row">
        <li
          class="col-md-6 col-sm-12"
          v-for="answer in question.answers"
          :key="answer.id"
        >
          <base-button
            block
            class="answer-button"
            v-bind:class="{
              'correct-answer text-white': answer.correct,
              'wrong-answer text-white':
                answer.id == selectedAnswer.id && !answer.correct,
            }"
          >
            <span class="mr-2 d-inline-flex">◯</span> {{ answer.answer }}
          </base-button>
        </li>
        <base-button
          block
          type="default"
          class="next-btn mt-3"
          v-on:click="handleNext"
        >
          Next question
          <i class="fas fa-caret-right pl-2"></i>
        </base-button>
      </ul>

      <!-- CORRECT/INCORRECT SECTION -->
      <!-- <div class="text-right mb-3"> -->
      <!-- <p v-if="selectedAnswer.correct" class="mt-4">
          🎉 Correct, well done! 🎉
        </p>
        <p v-else class="my-3 text-lg">Wrong answer, sorry</p> -->
      <!-- <base-button type="default" class="custom-btn" v-on:click="handleNext">
          Next question
          <i class="fas fa-caret-right pl-2"></i>
        </base-button> -->
      <!-- </div> -->
    </div>

    <!-- RESULTS SECTION -->
    <div v-if="state == 'results'">
      <h1 class="mt-5 results-title text-center">
        Congratulations, you completed the quiz!
      </h1>
      <p class="my-2 pt-3 grades text-center">
        You got <span class="font-weight-bold"> {{ score }} </span> out of
        <span class="font-weight-bold"> {{ questions.length }} </span>
      </p>
      <div dir="rtl" class="advice py-4 px-4">
        <p v-if="scorePercentage > 90">
          <i class="fas fa-info-circle ml-2"></i>
          سطح پیشرفته (Advanced)
          <br />
          <br />
          - این سطح از مهارت قادر است متون طولانی و پیچیده را درک کند و مکالمه
          های طولانی تری ارائه دهد. زبان آموز در این سطح، مهارت شنوایی و درک
          مطلب خیلی خوبی از خود نشان می دهند.ساختارهای پیچیده گرامری را درک کرده
          و به راحتی به کار می برد زبان آموز به مرحله یادگیری وارد شده و به شکل
          خودکار ساختارها را به درستی رعایت و استفاده می کند.
        </p>

        <p v-else-if="scorePercentage >= 50">
          <i class="fas fa-info-circle ml-2"></i>
          سطح متوسط (Intermediate)
          <br />
          <br />
          - زبان آموزان سطح متوسط اغلب به راحتی از پس موقعیت های مختلف تعاملی بر
          می آیند در واقع نوعی به استقال زبانی دست می یابند، و قابلیت ارائه
          نوشته و متن هایی با پیچیدگی متوسط را دارا هستند در این سطح زبان آموز
          قادر می شود تا درباره موضعاتی طبق شرایط و رخدادها صحبت کند مانند
          رویاها و باورها و اعتقادهای شخصی.
        </p>

        <p v-else>
          <i class="fas fa-info-circle ml-2"></i>
          <span class="font-weight-bolder"> سطح مبتدی (Elementary) </span>
          <br />
          <br />
          - در صورتی که سطح شما در آزمون بالا مبتدی تعیین شده باشد این به این
          معنا می باشد که شما قادر به درک لغات انگلیسی پرکاربرد و اصطلاحات
          روزمره انگلیسی می باشید.
          <br />
          <br />
          - زبان آموزان در این سطح مبتدی قادر به مکالمه انگلیسی با سرعت نسبتا
          آهسته می باشد. و در موضوعات روزمره قادر به مکلمه های کوتاه می باشند.
        </p>
      </div>
      <div class="text-center mb-4">
        <base-button
          type="default"
          v-on:click="handleRestart"
          class="restart-btn mt-3 restart-btn"
        >
          <i class="fas fa-sync fa-spin mr-2"></i>
          Restart the quiz
        </base-button>
      </div>
    </div>
  </section>
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
          question: `1) _____ name is Arya.`,
          answers: [
            {
              answer: 'My',
              correct: true,
            },
            {
              answer: 'I',
            },
            {
              answer: 'Me',
            },

            {
              answer: 'I am',
            },
          ],
        },
        {
          question: `2) They _____ from Iran.`,
          answers: [
            {
              answer: 'is',
            },
            {
              answer: 'are',
              correct: true,
            },
            {
              answer: 'live',
            },
            {
              answer: 'coming',
            },
          ],
        },

        {
          question: `3) _____ are you from?`,
          answers: [
            {
              answer: 'What',
            },
            {
              answer: 'Were',
            },
            {
              answer: 'Where',
              correct: true,
            },
            {
              answer: 'Where they',
            },
          ],
        },
        {
          question: `4) What do you do? I’m _____ student.`,
          answers: [
            {
              answer: 'a',
              correct: true,
            },
            {
              answer: 'an',
            },
            {
              answer: 'the',
            },
            {
              answer: 'One',
            },
          ],
        },

        {
          question: `5) It is a fact that a RIVER is bigger than a STREAM.`,
          answers: [
            {
              answer: 'True',
              correct: true,
            },
            {
              answer: 'False',
            },
            {
              answer: 'Both',
            },
            {
              answer: 'Not sure',
            },
          ],
        },
        {
          question: `6) _____ you like this film?`,
          answers: [
            {
              answer: 'Are',
            },
            {
              answer: 'Do',
              correct: true,
            },
            {
              answer: 'Have',
            },
            {
              answer: 'Had',
            },
          ],
        },

        {
          question: `7) We _____ live in a flat.`,
          answers: [
            {
              answer: 'has not',
            },
            {
              answer: 'do not',
              correct: true,
            },
            {
              answer: 'does not',
            },
            {
              answer: 'were',
            },
          ],
        },

        {
          question: `8) _____ he play football?`,
          answers: [
            {
              answer: 'Where',
            },
            {
              answer: 'Do',
            },
            {
              answer: 'Does',
              correct: true,
            },
            {
              answer: 'Is',
            },
          ],
        },

        {
          question: `9) Have you _____ a car?`,
          answers: [
            {
              answer: 'got',
              correct: true,
            },
            {
              answer: 'any',
            },
            {
              answer: 'have',
            },
            {
              answer: 'has',
            },
          ],
        },

        {
          question: `10) Those shoes are very _____ .`,
          answers: [
            {
              answer: 'cost',
            },
            {
              answer: 'a lot',
            },
            {
              answer: 'expensive',
              correct: true,
            },
            {
              answer: 'costing',
            },
          ],
        },
        {
          question: `11) It is a busy, _____ city.`,
          answers: [
            {
              answer: 'noisy',
              correct: true,
            },
            {
              answer: 'quite',
            },
            {
              answer: 'traffic',
            },
            {
              answer: 'trafficly',
            },
          ],
        },

        {
          question: `12) The phone’s ringing:  _____ answer it.`,
          answers: [
            {
              answer: 'I',
            },
            {
              answer: 'I will',
              correct: true,
            },
            {
              answer: 'will',
            },
            {
              answer: 'He',
            },
          ],
        },

        {
          question: `13) They are going _____ in Iran next week.`,
          answers: [
            {
              answer: 'to',
            },
            {
              answer: 'being',
            },
            {
              answer: 'to be',
              correct: true,
            },
            {
              answer: 'to go',
            },
          ],
        },

        {
          question: `14) Have you ever _____ in a jazz band?`,
          answers: [
            {
              answer: 'seen',
            },
            {
              answer: 'be',
            },
            {
              answer: 'played',
              correct: true,
            },
            {
              answer: 'gone',
            },
          ],
        },
        {
          question: `15) Can you tell me the way _____ ?`,
          answers: [
            {
              answer: 'is the bank',
            },
            {
              answer: 'to the bank',
              correct: true,
            },
            {
              answer: 'where is bank',
            },
            {
              answer: 'to is bank',
            },
          ],
        },

        {
          question: `16) Arya has lived in this city _____ two years.`,
          answers: [
            {
              answer: 'after',
            },
            {
              answer: 'since',
            },
            {
              answer: 'for',
              correct: true,
            },
            {
              answer: 'in',
            },
          ],
        },
        {
          question: `17) We _____ work in that factory.`,
          answers: [
            {
              answer: 'use to',
            },
            {
              answer: 'used to',
              correct: true,
            },
            {
              answer: 'was',
            },
            {
              answer: 'have',
            },
          ],
        },

        {
          question: `18) I think it _____ be sunny tomorrow.`,
          answers: [
            {
              answer: 'probably',
            },
            {
              answer: 'will probably',
              correct: true,
            },
            {
              answer: 'will to',
            },
            {
              answer: 'has',
            },
          ],
        },

        {
          question: `19) _____ does your brother look like?`,
          answers: [
            {
              answer: 'Which',
            },
            {
              answer: 'How',
            },
            {
              answer: 'What',
              correct: true,
            },
            {
              answer: 'Whose',
            },
          ],
        },
        {
          question: `20) The problem was _____ solved`,
          answers: [
            {
              answer: 'easy',
            },
            {
              answer: 'easy to',
            },
            {
              answer: 'easily',
              correct: true,
            },
            {
              answer: 'quick',
            },
          ],
        },

        {
          question: `21) We _____ work in that factory.`,
          answers: [
            {
              answer: 'use to',
            },
            {
              answer: 'used to',
              correct: true,
            },
            {
              answer: 'was',
            },
            {
              answer: 'have',
            },
          ],
        },

        {
          question: `22) It was a difficult journey, but I _____ get home.`,
          answers: [
            {
              answer: 'could',
            },
            {
              answer: 'at last',
            },
            {
              answer: 'managed to',
              correct: true,
            },
            {
              answer: 'will',
            },
          ],
        },
        {
          question: `23) We arrived at the station, but the bus _____ earlier.`,
          answers: [
            {
              answer: 'has leave',
            },
            {
              answer: 'had left',
              correct: true,
            },
            {
              answer: 'had leave',
            },
            {
              answer: 'leave',
            },
          ],
        },
        {
          question: `24) We’ll have taken our exams _____ this time next month.`,
          answers: [
            {
              answer: 'during',
            },
            {
              answer: 'by',
              correct: true,
            },
            {
              answer: 'for',
            },
            {
              answer: 'in',
            },
          ],
        },
        {
          question: `25) How did you manage to cook _____ a good meal?`,
          answers: [
            {
              answer: 'such',
              correct: true,
            },
            {
              answer: 'so',
            },
            {
              answer: 'very',
            },
            {
              answer: 'this',
            },
          ],
        },
        {
          question: `26) I will do badly in my work, _____ try harder.`,
          answers: [
            {
              answer: 'if I have not',
            },
            {
              answer: 'if I do not',
              correct: true,
            },
            {
              answer: 'if I was not',
            },
            {
              answer: 'I',
            },
          ],
        },

        {
          question: `27) They _____ an old photograph of the place.`,
          answers: [
            {
              answer: 'came to',
            },
            {
              answer: 'came across',
              correct: true,
            },
            {
              answer: 'came up',
            },
            {
              answer: 'see',
            },
          ],
        },

        {
          question: `28) It _____ correctly`,
          answers: [
            {
              answer: 'has not',
            },
            {
              answer: 'has not do',
            },
            {
              answer: 'has not been done',
              correct: true,
            },
            {
              answer: 'will not',
            },
          ],
        },
        {
          question: `29)  Were you _____ to open the door?`,
          answers: [
            {
              answer: 'could',
            },
            {
              answer: 'able',
              correct: true,
            },
            {
              answer: 'can',
            },
            {
              answer: 'strong',
            },
          ],
        },
        {
          question: `30) If I _____ enough money, I’d buy a new car`,
          answers: [
            {
              answer: 'did',
            },
            {
              answer: 'would',
            },
            {
              answer: 'had',
              correct: true,
            },
            {
              answer: 'has',
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
      // this.questions.sort((a, b) => Math.random() - 0.5);
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
.quiz-header {
  font-size: 2em !important;
  margin: 0;
  padding: 1em !important;
  color: #e52e71 !important;
  direction: rtl !important;
  font-family: sans-serif, Verdana, Tahoma !important;
}

.header-img {
  text-align: right !important;
  padding: 1em !important;
}

.quiz-details-card {
  width: auto;
  min-width: 90px;
  border-radius: 10px;
  text-align: center;
  background-color: #fff !important;
  // border: 1px solid #e52e71;
  font-family: sans-serif, Verdana, Tahoma !important;
  font-weight: bolder !important;
  font-size: 1.1em !important;

  .quiz-details-top p {
    color: #fff !important;
    background-color: #e52e71;
    padding-top: 5px;
    padding-bottom: 5px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .quiz-details-bottom {
    background-color: #fff !important;
    color: #e52e71 !important;
    border-radius: 10px;
  }
}

.custom-margin {
  margin-right: 2em !important;
}

.quiz-section {
  padding: 0 1.5em;
  border-radius: 8px !important;
  overflow: hidden !important;
  box-shadow: 0 14px 20px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1) !important;
  border-left: 1.2em solid #e52e71 !important;
  overflow: hidden !important;
  font-family: sans-serif, Verdana, Tahoma !important;
  direction: ltr !important;
  background-color: rgb(245, 245, 245);

  .title {
    font-size: 1.4em !important;
    font-family: sans-serif, Verdana, Tahoma !important;
    font-weight: bolder !important;
    color: rgb(27, 27, 27) !important;
    text-align: left !important;
    padding-top: 15px;
  }

  .next-btn {
    background: #6600da !important;
    color: #fff;
    font-size: 1.2em !important;
    padding: 10px 28px !important;
    margin-left: 1em;
    font-family: sans-serif, Verdana, Tahoma !important;
    font-weight: bolder !important;
  }

  .next-btn:hover {
    transform: translateY(0px);
    -webkit-transform: translateY(0px);
    background: transparent;
    box-shadow: 0 14px 20px rgba(0, 0, 0, 0), 0 10px 10px rgba(0, 0, 0, 0) !important;
  }

  .restart-btn {
    background: transparent !important;
    border-radius: 10px;
    color: #6a0094;
    font-size: 1.1em !important;
    padding: 10px 28px !important;
    width: 100%;
  }

  .results-title {
    font-size: 1.4em !important;
    text-align: center !important;
    color: rgb(29, 29, 29) !important;
  }

  .btn {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center !important;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .question-button {
    background: rgb(233, 233, 233);
    font-family: sans-serif, Verdana, Tahoma !important;
    color: rgb(44, 44, 44) !important;
    font-size: 1.3em !important;
    padding: 20px 28px !important;
    display: block !important;
    width: 100% !important;
    text-align: left !important;
    border-radius: 10px;
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
    background: rgb(233, 233, 233) !important;
    font-family: sans-serif, Verdana, Tahoma !important;
    color: #a7a7a7 !important;
    font-size: 1.3em !important;
    padding: 20px 28px !important;
    display: block !important;
    width: 100% !important;
    text-align: left !important;
    border-radius: 10px;
  }

  .answer-button:hover {
    cursor: default !important;
    transform: translateY(0px);
    -webkit-transform: translateY(0px);
  }

  .white-content .btn:hover {
    -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0),
      0 1px 3px rgba(0, 0, 0, 0);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0), 0 1px 3px rgba(0, 0, 0, 0);
  }

  .wrong-answer {
    background: #d54f42 !important;
    color: rgba(255, 255, 255, 0.85) !important;
  }

  .wrong-answer:hover,
  .wrong-answer:visited,
  .wrong-answer:active,
  .wrong-answer:focus,
  .wrong-answer:focus-within {
    background: #d54f42 !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }

  .correct-answer,
  .correct-answer:hover,
  .correct-answer:visited,
  .correct-answer:active,
  .correct-answer:focus,
  .correct-answer:focus-within {
    background: #78b437 !important;
    color: white !important;
  }

  .advice p {
    font-family: IranSans !important;
    font-size: 1.1em !important;
    color: rgb(31, 31, 31) !important;
    text-align: right;
  }

  .btn-simple {
    // background: rgb(233, 233, 233) !important;
    border-color: transparent !important;
  }

  .restart-btn {
    background-color: #e52e71 !important;
    color: white !important;
    padding: 11px 20px !important;
    border-radius: 20px;
  }

  .grades {
    font-size: 2em !important;
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
    background-image: linear-gradient(to right, #e52e71, #e9e9e9);
  }
}

@media (max-width: 678px) {
  .quiz-section {
    width: auto !important;
    border-left: none !important;
  }

  .quiz-header {
    font-size: 1.8em !important;
    text-decoration: none;
    text-align: center;
    width: 100% !important;
  }

  .quiz-details-card {
    font-size: 0.9em !important;
    min-width: 80px;
  }

  .quiz-details-section {
    margin-right: auto;
    margin-left: auto;
  }

  .question-button,
  .answer-button {
    width: 100% !important;
  }

  .custom-margin {
    margin-right: 0 !important;
  }

  .next-btn {
    width: 100% !important;
    margin-right: 14px !important;
  }
}
</style>
