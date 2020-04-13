<template>
  <section class="hero is-warning is-fullheight text-ltr">
    <!--heroBody-->
    <div class="hero-body">
      <!--container-->
      <div class="container is-fluid">
        <!--columns-->
        <div class="columns is-centered is-marginless is-paddingless box">
          <!--sidebar-->
          <div class="column is-5 sidebar">
            <div class="sidebarContainer">
              <div class="tags is-marginless">
                <span class="tag is-medium is-rounded">#vuejs</span>
                <span class="tag is-medium is-rounded">#js</span>
              </div>

              <!-- title -->
              <h1 class="title is-2">vueQuiz</h1>
              <h2 class="subtitle is-5">A simple VueJS based quiz page.</h2>

              <!-- description -->
              <p class="subtitle is-6 has-text-justified">
                Created using <em>VueJs</em>, <em>Bulma</em>,
                <em>animate.css</em>, and <em>Font Awesome 4</em>.
              </p>
            </div>

            <div class="sidebarFooter">
              <p>
                Photo by
                <a href="https://unsplash.com/@debidiemski">Deborah Diem</a>
              </p>
            </div>
          </div>
          <!--/sidebar-->

          <!--questionBox-->
          <div class="column is-7 questionBox is-paddingless is-marginless">
            <!-- transition -->
            <transition
              enter-active-class="animated jackInTheBox"
              leave-active-class="animated zoomOut"
              mode="out-in"
            >
              <div
                v-if="!quizStarted"
                v-bind:key="quizStarted"
                class="quizForm"
              >
                <div class="titleContainer">
                  <h2 class="title is-4">Getting Started</h2>
                </div>

                <div class="quizFormContainer">
                  <div class="field">
                    <div class="field-label is-normal is-size-5">
                      <label class="label">Name</label>
                    </div>
                    <div class="control">
                      <input
                        class="input is-rounded"
                        type="text"
                        v-model="quiz.user"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                  <div class="field">
                    <div class="field-label is-normal is-size-5">
                      <label class="label">Difficulty</label>
                    </div>

                    <div class="control">
                      <label class="radio">
                        <input type="radio" name="0" checked />
                        Easy
                      </label>
                      <label class="radio">
                        <input type="radio" name="1" />
                        Medium
                      </label>
                      <label class="radio">
                        <input type="radio" name="2" />
                        Hard
                      </label>
                    </div>
                  </div>

                  <a
                    class="pagination-previous button is-medium is-info is-rounded is-outlined is-pulled-right"
                    v-on:click="
                      if (quiz.user.length > 0) {
                        quizStarted = !quizStarted;
                      }
                    "
                    style="margin-bottom: 12px;"
                  >
                    Start
                  </a>
                </div>
              </div>

              <!--qusetionContainer-->
              <div
                class="questionContainer"
                v-if="questionIndex < quiz.questions.length && quizStarted"
                v-bind:key="questionIndex"
              >
                <!-- questionTitle -->
                <div class="titleContainer">
                  <h2 class="title is-5">
                    {{ questionIndex + 1 }}.
                    {{ quiz.questions[questionIndex].text }}
                  </h2>
                </div>

                <!-- quizOptions -->
                <div class="optionContainer">
                  <div
                    class="option"
                    v-for="(response, index) in quiz.questions[questionIndex]
                      .responses"
                    @click="selectOption(index)"
                    :class="{
                      'is-selected': userResponses[questionIndex] == index,
                    }"
                    :key="index"
                  >
                    {{ index | charIndex }}. {{ response.text }}
                  </div>
                </div>

                <!--quizFooter: navigation and progress-->
                <div class="questionFooter">
                  <!--pagination-->
                  <nav
                    class="pagination is-centered"
                    role="navigation"
                    aria-label="pagination"
                  >
                    <!-- prevButton -->
                    <a
                      class="pagination-previous button is-info is-rounded is-outlined"
                      v-on:click="prev()"
                      :disabled="questionIndex < 1"
                    >
                      Previous Question
                    </a>

                    <!-- prevButton -->
                    <a
                      class="pagination-next button is-info is-rounded"
                      v-on:click="next()"
                      :disabled="questionIndex >= quiz.questions.length"
                    >
                      {{
                        userResponses[questionIndex] == null ? 'Skip' : 'Next'
                      }}
                      Question
                    </a>
                  </nav>
                  <!--/pagination-->

                  <!--progress-->
                  <div class="progressContainer">
                    <progress
                      class="progress is-success is-small"
                      :value="(questionIndex / quiz.questions.length) * 100"
                      max="100"
                      >{{
                        (questionIndex / quiz.questions.length) * 100
                      }}%</progress
                    >
                  </div>
                  <!--/progress-->
                </div>
                <!--/quizFooter-->
              </div>
              <!--/questionContainer-->

              <!--quizCompletedResult-->
              <div
                v-if="questionIndex >= quiz.questions.length && quizStarted"
                v-bind:key="questionIndex"
                class="quizCompleted has-text-centered"
              >
                <!-- quizCompletedIcon: Achievement Icon -->
                <span class="icon is-large has-text-success">
                  <i class="fa fa-check-circle-o fa-3x"></i>
                </span>

                <!--resultTitleBlock-->
                <h2 class="title">
                  You did an amazing job!
                </h2>
                <p class="subtitle">
                  Total score: {{ score() }} / {{ quiz.questions.length }}
                </p>
                <!--/resultTitleBlock-->
              </div>
              <!--/quizCompetedResult-->
            </transition>
          </div>
          <!--/questionBox-->
        </div>
        <!--/columns-->
      </div>
      <!--/container-->
    </div>
    <!--/heroBody-->
  </section>
</template>

<script>
var quiz = {
    user: 'Dave',
    questions: [
      {
        text: 'What is the full form of HTTP?',
        responses: [
          { text: 'Hyper text transfer package' },
          { text: 'Hyper text transfer protocol', correct: true },
          { text: 'Hyphenation text test program' },
          { text: 'None of the above' },
        ],
      },
      {
        text: 'HTML document start and end with which tag pairs?',
        responses: [
          { text: 'HTML', correct: true },
          { text: 'WEB' },
          { text: 'HEAD' },
          { text: 'BODY' },
        ],
      },
      {
        text: 'Which tag is used to create body text in HTML?',
        responses: [
          { text: 'HEAD' },
          { text: 'BODY', correct: true },
          { text: 'TITLE' },
          { text: 'TEXT' },
        ],
      },
      {
        text: 'Outlook Express is _________',
        responses: [
          { text: 'E-Mail Client', correct: true },
          { text: 'Browser' },
          {
            text: 'Search Engine',
          },
          { text: 'None of the above' },
        ],
      },
      {
        text: 'What is a search engine?',
        responses: [
          { text: 'A hardware component ' },
          {
            text: 'A machinery engine that search data',
          },
          { text: 'A web site that searches anything', correct: true },
          { text: 'A program that searches engines' },
        ],
      },
      {
        text: 'What does the .com domain represents?',
        responses: [
          { text: 'Network' },
          { text: 'Education' },
          { text: 'Commercial', correct: true },
          { text: 'None of the above' },
        ],
      },
      {
        text: 'In Satellite based communication, VSAT stands for? ',
        responses: [
          { text: ' Very Small Aperture Terminal', correct: true },
          { text: 'Varying Size Aperture Terminal ' },
          {
            text: 'Very Small Analog Terminal',
          },
          { text: 'None of the above' },
        ],
      },
      {
        text: 'What is the full form of TCP/IP? ',
        responses: [
          { text: 'Telephone call protocol / international protocol' },
          {
            text: 'Transmission control protocol / internet protocol',
            correct: true,
          },
          { text: 'Transport control protocol / internet protocol ' },
          { text: 'None of the above' },
        ],
      },
      {
        text: 'What is the full form of HTML?',
        responses: [
          {
            text: 'Hyper text marking language',
          },
          { text: 'Hyphenation text markup language ' },
          { text: 'Hyper text markup language', correct: true },
          { text: 'Hyphenation test marking language' },
        ],
      },
      {
        text: '"Yahoo", "Infoseek" and "Lycos" are _________?',
        responses: [
          { text: 'Browsers ' },
          { text: 'Search Engines', correct: true },
          { text: 'News Group' },
          { text: 'None of the above' },
        ],
      },
    ],
  },
  userResponseSkelaton = Array(quiz.questions.length).fill(null);

export default {
  data: function () {
    return {
      quiz: quiz,
      questionIndex: 0,
      userResponses: userResponseSkelaton,
      quizStarted: true,
      isActive: false,
    };
  },
  filters: {
    charIndex: function (i) {
      return String.fromCharCode(97 + i);
    },
  },

  methods: {
    selectOption: function (index) {
      Vue.set(this.userResponses, this.questionIndex, index);
    },
    next: function () {
      if (this.questionIndex < this.quiz.questions.length) this.questionIndex++;
    },

    prev: function () {
      if (this.quiz.questions.length > 0) this.questionIndex--;
    },
    // Return "true" count in userResponses
    score: function () {
      var score = 0;
      for (let i = 0; i < this.userResponses.length; i++) {
        if (
          typeof this.quiz.questions[i].responses[this.userResponses[i]] !==
            'undefined' &&
          this.quiz.questions[i].responses[this.userResponses[i]].correct
        ) {
          score = score + 1;
        }
      }
      return score;

      //return this.userResponses.filter(function(val) { return val }).length;
    },
  },
};
</script>

<style lang="scss" scoped>
$trans_duration: 0.3s;
$titleBg: #29c5dc;

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,400i,700');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700');

body {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;

  /* mocking native UI */
  cursor: default !important; /* remove text selection cursor */
  user-select: none; /* remove text selection */
  // user-drag: none; /* disbale element dragging */
}

.button {
  transition: $trans_duration;
}
.title,
.subtitle {
  font-family: Montserrat, sans-serif;
  font-weight: normal;
}
.animated {
  transition-duration: $trans_duration/2;
}

.sidebar {
  background: url('https://source.unsplash.com/RVF0ngUujks');
  background-size: cover;

  border-radius: 6px 0px 0px 6px;
  z-index: 10;

  .sidebarContainer {
    padding: 10px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);

    .tag {
      background: rgba(255, 255, 255, 0.25);
      color: rgba(255, 255, 255, 0.8);
    }

    .title {
      color: white !important;
    }
    .subtitle {
      color: rgba(255, 255, 255, 0.8) !important;
    }
  }
  .sidebarFooter {
    display: none;
    color: red;
  }
}

.questionBox {
  height: 100%;
  position: relative;
  display: flex;

  .titleContainer {
    background: $titleBg;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;

    h2 {
      color: white;
      padding: 18px;
    }
  }

  .quizForm {
    display: block;
    white-space: normal;

    height: 100%;
    width: 100%;

    .quizFormContainer {
      height: 100%;
      margin: 15px 18px;

      .field-label {
        text-align: left;
        margin-bottom: 0.5rem;
      }
    }
  }
  .quizCompleted {
    width: 100%;
    padding: 25px;
  }
  .questionContainer {
    white-space: normal;

    height: 100%;
    width: 100%;

    .optionContainer {
      margin-top: 12px;
      flex-grow: 1;
      .option {
        border-radius: 290486px;
        padding: 9px 18px;
        margin: 0 18px;
        margin-bottom: 12px;
        transition: $trans_duration;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
        border: transparent 1px solid;

        &.is-selected {
          border-color: #209cee;
          background-color: white;
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        &:active {
          transform: scaleX(0.9);
        }
      }
    }

    .questionFooter {
      width: 100%;
      align-self: flex-end;

      .pagination {
        //padding: 10px 15px;
        margin: 15px 25px;
      }
      .progressContainer {
        margin: 15px 25px;
      }
    }
  }
}
@media screen and (min-width: 769px) {
  .container {
    height: 100%;

    .columns {
      height: 100%;

      .column {
        height: 100%;
      }
    }
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .questionBox {
    align-items: center;
    justify-content: center;

    .questionContainer {
      display: flex;
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 768px) {
  .sidebar {
    height: auto !important;
    border-radius: 6px 6px 0px 0px;
  }
}
</style>
