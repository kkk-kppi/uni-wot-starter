<script setup lang="ts">
definePage({
  name: 'map',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '地图',
  },
})
</script>

<template>
  <view class="min-h-screen bg-gray-100 py-3 dark:bg-[var(--wot-dark-background)]">
    <map name="" />
  </view>
</template>
