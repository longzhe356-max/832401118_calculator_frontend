<template>
  <div class="app">
    <h1>前后端分离计算器</h1>
    <Calculator @calculated="onCalculated" />
    <HistoryList ref="historyRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Calculator from './components/Calculator.vue'
import HistoryList from './components/HistoryList.vue'

const historyRef = ref(null)

const onCalculated = () => {
  historyRef.value?.loadHistory()
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
  background: #f5f5f5;
}

.app {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 16px;
}

h1 {
  text-align: center;
  font-size: 22px;
  color: #333;
}
</style>