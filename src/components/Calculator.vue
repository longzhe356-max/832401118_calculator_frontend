<template>
  <div class="calculator">
    <input
      ref="inputRef"
      :value="expression"
      placeholder="输入表达式，如 (1+2)*3"
      @input="onInput"
      @keyup.enter="doCalculate"
    />

    <div class="buttons">
      <button v-for="btn in buttons" :key="btn" @click="append(btn)">
        {{ btn }}
      </button>
      <button class="clear" @click="clearInput">C</button>
      <button class="clear" @click="backspace">⌫</button>
      <button class="equals" @click="doCalculate">=</button>
    </div>

    <div v-if="errorMsg" class="error">错误：{{ errorMsg }}</div>
    <div v-if="result !== null" class="result">= {{ result }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { calculate } from '../api'

const emit = defineEmits(['calculated'])

const expression = ref('')
const result = ref(null)
const errorMsg = ref('')
const inputRef = ref(null)

const buttons = ['7','8','9','÷','4','5','6','×','1','2','3','-','()','0','.','+']

const onInput = (e) => {
  expression.value = e.target.value
}

const insertAtCursor = (text) => {
  const input = inputRef.value
  if (!input) {
    expression.value += text
    return
  }

  const start = input.selectionStart
  const end = input.selectionEnd
  const before = expression.value.slice(0, start)
  const after = expression.value.slice(end)

  if (text === '()') {
    expression.value = before + '()' + after
    nextTick(() => {
      const pos = start + 1
      input.setSelectionRange(pos, pos)
      input.focus()
    })
  } else {
    expression.value = before + text + after
    nextTick(() => {
      const pos = start + text.length
      input.setSelectionRange(pos, pos)
      input.focus()
    })
  }
}

const append = (val) => {
  insertAtCursor(val)
}

const backspace = () => {
  expression.value = expression.value.slice(0, -1)
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
  grid-column: span 2;
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