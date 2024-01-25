<template>
  <div class="container">
    <start-screen v-if="startScreenVisible" @show-quiz="showQuizPage"></start-screen>
    <quiz-screen v-if="quizScreenVisible" @show-result="showResultPage"></quiz-screen>
    <result-screen v-if="endScreenVisible" @show-start="showStartPage" :total="total" :score="score"></result-screen>
  </div>
</template>

<script>
import StartScreen from './components/StartScreen.vue'
import QuizScreen from './components/QuizScreen.vue'
import ResultScreen from './components/ResultScreen.vue'

export default {
  components: {
    StartScreen,
    QuizScreen,
    ResultScreen
  },
  data() {
    return {
      startScreenVisible: true,
      quizScreenVisible: false,
      endScreenVisible: false,
      score: 0,
      total: 0,
      data: [],
      quizTime: []
    }
  },
  methods: {
    showQuizPage(getData, time) {
      this.startScreenVisible = !this.startScreenVisible
      this.quizScreenVisible = !this.quizScreenVisible
      for (let i = 0; i < getData.length; i++) {
        this.data.push(getData[i])
      }
      this.quizTime.push(time)
    },
    showResultPage(points, length) {
      this.quizScreenVisible = !this.quizScreenVisible
      this.endScreenVisible = !this.endScreenVisible
      this.score = points
      this.total = length
    },
    showStartPage() {
      window.location.reload()
    },
    
  },
  provide() {
    return {
      data: this.data,
      time: this.quizTime
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

body {
    background-color: #dddfeb;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

.container {
    position: relative;
    width: 100%;
    width: 420px;
    background-color: #1f2847;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    font-size: 40px;
    color: #fff;
    margin-bottom: 50px;
}
</style>
