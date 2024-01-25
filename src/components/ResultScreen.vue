<template>
    <h1>Result</h1>
    <div class="score">
        <span class="score-text">Your score:</span>
        <div>
            <span class="final-score">{{ score }}</span>
            <span class="total-score">/{{ total }}</span>
        </div>
    </div>
    <base-button @click="restartQuiz">Restart</base-button>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue'
export default {
    components: {
        BaseButton
    },
    props: ['score', 'total'],
    methods: {
        restartQuiz() {
            this.$emit('show-start')
        }
    }
}
</script>

<style scoped>
.score {
    color: #fff;
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 80px;
    text-align: center;
}
.score .score-text {
    color: #a2aace;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 120px;
}
</style>