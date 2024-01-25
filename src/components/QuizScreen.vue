<template>
    <div class="timer">
        <div class="progress">
            <div class="progress-bar" :style="progressStyle"></div>
            <span class="progress-text"> {{ timeNumber }}</span>
        </div>
    </div>
    <div class="question-wrap">
        <div class="number">Question
            <span class="current">{{ current + 1 }} </span>
            <span class="total">/{{ length }}</span>
        </div>
        <div class="question">{{ question }}</div>
    </div>
    <div class="answer-box">
    <question-data
        v-for="answer in answers"
        :key="answer"
        :answer="answer"
        v-model="choosenAnswer"
        :current="current"
        :is-correct="isCorrect"
        :is-wrong="isWrong"
    ></question-data>
    </div>
    <base-button @click="submitAnswer" v-if="!nextBtnVisible">Submit</base-button>
    <base-button @click="nextQuestion" v-else-if="nextBtnVisible">Next</base-button>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue'
import QuestionData from '../question/QuestionData.vue'
export default {
    components: { BaseButton, QuestionData },
    data() {
        return {
            nextBtnVisible: false,
            isCorrect: false,
            questionData: [],
            answers: [],
            current: 0,
            question: '',
            points: 0,
            length: 0,
            choosenAnswer: null,
            timeCount: null,
            timeNumber: null,
            percentage: 100
        }
    },
    inject: ['data', 'time'],
    computed: {
        progressStyle() {
            return {
                width: this.percentage + '%'
            };
        },
    },
    methods: {
        showQuestion() {
            let questionData = this.data[this.current]
            this.question = questionData.question
            questionData['incorrect_answers'].push(questionData['correct_answer'])
            this.answers = questionData['incorrect_answers']
            let currentIndex = this.answers.length,  randomIndex;
            while (currentIndex > 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [this.answers[currentIndex], this.answers[randomIndex]] = [
                this.answers[randomIndex], this.answers[currentIndex]];
            }
            this.timeNumber = Number(this.time[0])
            this.percentage = 100
            this.isCorrect = false
            this.isWrong = false
            this.nextBtnVisible = false
            this.timeCount = setInterval(() => {
                if (this.timeNumber > 0) {
                    this.progress()
                }
                else {
                    this.submitAnswer()
                }
            }, 1000)
        },
        progress() {
            this.timeNumber--          
            this.percentage = (this.timeNumber + 1) * (100 / Number(this.time[0])) - (100 / Number(this.time[0]))
        },
        submitAnswer() {
            this.nextBtnVisible = true
            this.isCorrect = true
            let elements = document.querySelectorAll('.answer')
            for (let i = 0 ; i < elements.length; i++) {
                if (elements[i].classList.contains('selected')) {
                    if (document.querySelector('.selected').textContent.includes(this.choosenAnswer)) {
                        document.querySelector('.selected').classList.add('wrong')
                    }
                }
            }
            if (this.choosenAnswer === this.data[this.current]['correct_answer']) {
                this.points++
            }
            clearInterval(this.timeCount)
        },
        nextQuestion() {
            if (this.current + 1 < this.length) {
                this.nextBtnVisible = false
                this.current++
                this.showQuestion()
            }
            else {
                this.$emit('show-result', this.points, this.length)
            }
        },
    },
    watch: {
        current(number) {
            return number
        },
        isCorrect(value) {
            return value
        }
    },
    created() {
        this.length = this.data.length
        this.showQuestion()
    }
}
</script>

<style scoped>
.progress {
    position: relative;
    width: 100%;
    height: 40px;
    background: transparent;
    border-radius: 30px;
    margin-bottom: 30px;
    border: 3px solid #3f4868;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    border-radius: 30px;
    background: linear-gradient(to right, #ea517c, #b478f1);
    transition: width 0.5s ease;
}

.progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    transform: translate(-50%, -50%);
    font-size: 16px;
}

.number {
    color: #fff;
}

.question-wrap {
    margin-bottom: 50px;
}

.number {
    color: rgb(162, 170, 206);
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 20px;
}

.total {
    color: rgb(87, 96, 129);
    font-size: 18px;
}

.question {
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
}
</style>