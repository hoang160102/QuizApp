<template>
    <h1>Quiz App</h1>
    <div class="settings">
        <label for="num-questions">Number of Questions</label>
        <select id="num-questions" ref="quanity">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
        </select>
        <label for="category">Select Category</label>
        <select id="category" ref="category">
            <option value="">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertaiment: Books</option>
            <option value="11">Entertaiment: Film</option>
            <option value="12">Entertaiment: Music</option>
            <option value="13">Entertaiment: Musicals & Theatres</option>
            <option value="14">Entertaiment: Television</option>
            <option value="15">Entertaiment: Video Games</option>
            <option value="16">Entertaiment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertaiment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertaiment: Japanese Anime & Manga</option>
            <option value="32">Entertaiment: Cartoon & Animation</option>
        </select>
        <label for="difficulty">Select Difficulty</label>
        <select id="difficulty" ref="difficulty">
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        <label for="type">Select Type</label>
        <select id="type" ref="type">
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>    
        </select>
        <label for="time">Select time per question</label>
        <select id="time" ref="seconds">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="60">60</option>
        </select>
    </div>
    <base-button v-if="!loadingBtn" @click="startQuiz">Start Quiz</base-button>
    <base-button v-else-if="loadingBtn">
        <span>Loading </span>
        <span>{{ dotText }}</span>
    </base-button>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue'
export default {
    components: { BaseButton },
    data() {
        return {
            loadingBtn: false,
            numberQuestions: '',
            selectCategory: '',
            selectDifficulty: '',
            selectType: '',
            dotText: '',
            selectTime: null,
        }
    },
    methods: {
        startQuiz() {
            this.loadingBtn = true
            const addDot = setInterval(() => {
                if (this.dotText.length < 3) {
                    this.dotText += '.'
                }
                else {
                    clearInterval(addDot)
                }
            }, 500)
            this.numberQuestions = this.$refs.quanity.value
            this.selectCategory = this.$refs.category.value
            this.selectDifficulty = this.$refs.difficulty.value
            this.selectType = this.$refs.type.value
            this.selectTime = this.$refs.seconds.value
            const url = `https://opentdb.com/api.php?amount=${this.numberQuestions}&category=${this.selectCategory}&difficulty=${this.selectDifficulty}&type=${this.selectType}`
            fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setTimeout(() => {
                    this.$emit('show-quiz', data.results, this.selectTime) 
                }, 2000) 
            })
        },

    },
}
</script>

<style scoped>
label {
    display: block;
    font-size: 14px;
    margin-bottom: 10px;
    color: #fff;
}

select {
    width: 100%;
    padding: 10px;
    border: none;
    text-transform: capitalize;
    border-radius: 5px;
    margin-bottom: 20px;
    background: #fff;
    color: #1f2847;
    font-size: 16px;
}

button {
    width: 100%;
    height: 60px;
    background: #0c80ef;
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s linear;
    margin-top: 50px;
}

button:hover {
    background: #0a6bc5;
}
</style>