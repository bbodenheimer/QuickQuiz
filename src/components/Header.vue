<template>
  <!-- <div> allows for classes to be added later-->
  <div>
    <b-nav tabs>
      <!-- nav-items disabled because it is not a nav link-->
      <b-nav-item disabled><b>Quiz App</b></b-nav-item>
      <b-nav-item disabled>Counter: {{ numCorrect }}/{{ numTotal }}</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  props: [ // to receive props from App.vue
    'numCorrect',
    'numTotal'
  ]
}
</script>