<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
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