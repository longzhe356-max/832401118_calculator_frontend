<template>
  <div class="history">
    <div class="header">
      <h2>计算历史</h2>
      <button v-if="list.length" @click="clearAll">清空全部</button>
    </div>

    <ul v-if="list.length">
      <li v-for="item in list" :key="item.id">
        <span class="expr">{{ item.expression }} = {{ item.result }}</span>
        <small>{{ item.createdAt }}</small>
        <button @click="remove(item.id)">删除</button>
      </li>
    </ul>

    <p v-else class="empty">暂无历史记录</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getHistory, deleteHistory, clearHistory } from '../api'

const list = ref([])

const loadHistory = async () => {
  try {
    const res = await getHistory()
    list.value = res.data.data || []
  } catch (e) {
    console.error('加载历史失败', e)
  }
}

const remove = async (id) => {
  await deleteHistory(id)
  loadHistory()
}

const clearAll = async () => {
  if (!confirm('确定清空所有历史吗？')) return
  await clearHistory()
  loadHistory()
}

onMounted(loadHistory)

defineExpose({ loadHistory })
</script>

<style scoped>
.history {
  margin-top: 24px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h2 { margin: 0; font-size: 18px; }

.header button {
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fafafa;
}

ul { list-style: none; padding: 0; margin: 12px 0 0; }

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.expr { flex: 1; font-size: 16px; }
small { color: #999; font-size: 12px; }

li button {
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  color: #c62828;
}

.empty { color: #999; text-align: center; }
</style>