<template>
  <div class="question-container"> <!-- use "question-container" class to style-->
    <b-jumbotron>
      <template v-slot:lead>
        <!--below must be mounted or currentQuestion is undefined-->
        <!-- from parent currentQuestion in App.vue -->
        {{ currentQuestion.question}}
      </template>

      <hr class="my-4"> <!-- bootstrap for divider margin-->

      <!-- for loop to display shuffledAnswers-->
      <!-- use index as required key for v-for -->
      <!-- list-group formats answers as clickable, seperated items-->
      <!-- @click uses method: selectedAnswer-->
      <!-- class is updated based on user answer for answer feedback-->
      <b-list-group>
       <b-list-group-item
        v-for="(answer, index) in shuffledAnswers"
        :key="index"
        @click.prevent="selectedAnswer(index)"
        :class="answerClass(index)"
       >
         {{ answer }}
       </b-list-group-item>
      </b-list-group>

      <!-- disabled if no selectedIndex or already answered-->
      <b-button 
        variant="primary"
        @click="submitAnswer" 
        :disabled="selectedIndex === null || answered"
      >
        Submit
      </b-button>
      <!-- @click="next" is receiving function from App.vue line 16 -->
      <!-- next must also be declared in props -->
      <!-- disable if not answered -->
      <b-button 
        @click="next" 
        variant="success"
        :disabled="!answered"
      >
        Next
      </b-button>
    </b-jumbotron>
  </div>
</template>

<script>
// import lodash as _
import _ from 'lodash'
export default {
  props: { // received from App.vue, must be referenced here to use.
           // any variable passed from one component to another
    currentQuestion: Object, 
    next: Function, // received from App.vue, then App.vue passes down next question
    increment: Function
  },
  data() {
    return { // returns object of data variables
      selectedIndex: null,  // the user selected index
      correctIndex: null, // correct index
      shuffledAnswers: [], // from shuffledAnswers method
      answered: false
    }
  },
  computed: {
    answers() { // gets incorrect and correct answers and combines them
      let answers = [...this.currentQuestion.incorrect_answers] // "..." makes a copy of array
      answers.push(this.currentQuestion.correct_answer)
      return answers
    }
  },
  // watch can be a function or object with options
  watch: { // takes an object of functions, watches for changes to props and runs after changes
    currentQuestion: { // same name as prop, when question changes run handler()
      immediate: true, // to get the first question to shuffle
      handler() {
        // reset selectedIndex and is answered for each new question
        this.selectedIndex = null
        this.answered = false
        this.shuffleAnswers() // shuffleAnswers is new method
      }
    }
  },
  methods: {
    selectedAnswer(index) { // gets user selected index
      this.selectedIndex = index
    },
    shuffleAnswers() {
      // gets incorrect and correct answers, puts them in array
      let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
      // use lodash to shuffle array, lodash imported as "_"
      this.shuffledAnswers = _.shuffle(answers)
      // get the correct answer index post shuffle
      this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
    },
    submitAnswer() {
      let isCorrect = false

      if (this.selectedIndex === this.correctIndex) { // if user is correct
        isCorrect = true
      }
      this.answered = true // sets to true when answered
      this.increment(isCorrect) // increment function, add to props as function, add from parent in App.vue
},
    answerClass(index) { // method that changes selected answer color and highlights correct answer
      let answerClass = ''
      if (!this.answered && this.selectedIndex === index) {
        answerClass = 'selected'
      } else if (this.answered && this.correctIndex === index) {
        answerClass = 'correct'
        // selectedIndex === index to not highlight all incorrect answers, only user selected
      } else if (this.answered && this.selectedIndex === index && this.correctIndex !== index) {
        answerClass = 'incorrect'
      }
      return answerClass
    }
  }
}
</script>

<!-- scoped means styles will not be global-->
<style scoped>
  .list-group {
    margin-bottom: 15px;
  }

  .btn {
    margin: 0 5px;
  }

  /* when answers are hovered over */
  .list-group-item:hover { 
    background-color: #eee;
    cursor: pointer;
  }

  /* provide user feedback on selections and answers */
  .selected {
    background-color: lightblue;
  }

  .correct {
    background-color: lightgreen;
  }

  .incorrect {
    background-color: red;
  }
</style>