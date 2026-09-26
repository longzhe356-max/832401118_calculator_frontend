<template>
  <div class="calculator">
    <input
      v-model="expression"
      placeholder="输入表达式，如 (1+2)*3"
      @keyup.enter="doCalculate"
    />

    <div class="buttons">
      <button v-for="btn in buttons" :key="btn" @click="append(btn)">
        {{ btn }}
      </button>
      <button class="clear" @click="clearInput">C</button>
      <button class="equals" @click="doCalculate">=</button>
    </div>

    <div v-if="errorMsg" class="error">错误：{{ errorMsg }}</div>
    <div v-if="result !== null" class="result">= {{ result }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { calculate } from '../api'

const emit = defineEmits(['calculated'])

const expression = ref('')
const result = ref(null)
const errorMsg = ref('')

const buttons = ['7','8','9','÷','4','5','6','×','1','2','3','-','(','0','.','+']

const append = (val) => {
  expression.value += val
}

const clearInput = () => {
  expression.value = ''
  result.value = null
  errorMsg.value = ''
}

const doCalculate = async () => {
  errorMsg.value = ''
  result.value = null
  if (!expression.value.trim()) return

  try {
    const res = await calculate(expression.value)
    if (res.data.success) {
      result.value = res.data.result
      emit('calculated')
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.message || '计算失败，请检查表达式'
  }
}
</script>

<style scoped>
.calculator {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

input {
  width: 100%;
  font-size: 22px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
}

button {
  padding: 14px;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid #ddd;
  background: #fafafa;
  border-radius: 6px;
}

button:hover { background: #f0f0f0; }

.equals {
  background: #4caf50;
  color: #fff;
  border-color: #4caf50;
}
.equals:hover { background: #43a047; }

.clear {
  background: #ffebee;
  color: #c62828;
}

.result {
  margin-top: 14px;
  font-size: 24px;
  color: #2e7d32;
}

.error {
  margin-top: 14px;
  font-size: 16px;
  color: #c62828;
}
</style>