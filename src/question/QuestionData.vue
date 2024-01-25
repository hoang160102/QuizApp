<template>
    <div class="answer-wrapper">
        <div @click="selectAnswer(answer)" class="answer" :class="{selected: modelValue === answer, correct: checkAnswer}">
            <span class="text">{{ answer }}</span>
            <span class="checkbox">
                <i class="fas fa-check"></i>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['answer', 'modelValue', 'current', 'isCorrect'],
    inject: ['data'],
    data() {
        return {
            correct: false,
        }
    },
    computed: {
        checkAnswer() {
            return this.checkCorrectAnswer()
        },
    },
    methods: {
        selectAnswer(option) {
            this.$emit('update:modelValue', option)
        },
        checkCorrectAnswer() {
            let array = JSON.parse(JSON.stringify(this.data))
            if (this.answer === array[this.current]['correct_answer']) {
                return this.correct = this.isCorrect
            }
        },
    },
}
</script>

<style scoped>
.answer {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    border: 3px solid rgb(63, 72, 104);
    margin-bottom: 20px;
    align-items: center;
    width: 100%;
    color: rgb(255, 255, 255);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s linear;
}

.answer .checkbox {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid #3f4868;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.answer .checkbox i {
    color: #fff;
    font-size: 10px;
    opacity: 0;
    transition: all 0.3s;
}

.answer:hover:not(.checked) .checkbox,
.answer.selected .checkbox {
  background-color: #0c80ef;
  border-color: #0c80ef;
}

.selected .checkbox i {
    opacity: 1;
}

.checked {
    pointer-events: none;
}

.correct {
    border-color: #0cef2a
}

.wrong {
    border-color: #fc3939
}
</style>