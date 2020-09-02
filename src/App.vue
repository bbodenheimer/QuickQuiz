<template>
  <div id="app">
    <!-- numCorrect and numTotal being passed in to use in Header -->
    <Header 
      :numCorrect="numCorrect"
      :numTotal="numTotal"
    />
      <b-container class="bv-example-row">
        <b-row>
          <!-- on anything larger than a small screen, use 6 columns, offset 3-->
          <b-col sm="6" offset="3">
            <!-- currentQuestion loads only the question at the index -->
            <!-- passing in next and increment functions that listed methods -->
            <!-- v-if checks is questions is loaded (has length) before displaying question-->
            <!-- parent is adding increment to be passed to Questions.vue as function-->
            <Questions 
              v-if="questions.length"
              :currentQuestion="questions[index]" 
              :next="next"
              :increment="increment"
            />
          </b-col>
        </b-row>
  </b-container>   
  </div>
</template>

<script>
// import other Vue components
import Header from './components/Header.vue'
import Questions from './components/Questions.vue'

export default {
  name: 'App',
  // add Vue components
  components: {
    Header,
    Questions
  },
  data() {
    return {
      questions: [], // is populated from API
      index: 0, //tracks which question is current
      numCorrect: 0,
      numTotal: 0
    }
  },
  methods: {
    // increments index for next question on next button
    next() {
      this.index++
    },
    // increments correct and total nums based on isCorrect
    increment(isCorrect) {
      if (isCorrect) {
        this.numCorrect++ // increments if correct only, must be passed to <header>
      }
      this.numTotal++ // increments regardless, must be passed to <header>
    }
  },
  mounted: function() {
    // API endpoint
    fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple', {
      method: 'get'
    })
    .then((response) => {
      return response.json()
    })
    // getting data from API
    .then((jsonData) => {
      this.questions = jsonData.results // API data lives in "results"
    })
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
