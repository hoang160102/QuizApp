import { createApp } from 'vue'
import App from './App.vue'
import StartScreen from './components/StartScreen.vue'
import QuizScreen from './components/QuizScreen.vue'
import ResultScreen from './components/ResultScreen.vue'

const app = createApp(App)
app.component('start-screen', StartScreen)
app.component('quiz-screen', QuizScreen)
app.component('result-screen', ResultScreen)

app.mount('#app')
