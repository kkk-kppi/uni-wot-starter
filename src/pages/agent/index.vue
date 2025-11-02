<script setup lang="ts">
definePage({
  name: 'agent',
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
})

const scrollHeight = ref(0)
const scrollViewHeight = computed(() => {
  return `calc(100% - ${scrollHeight.value}px)`
})

const tabs = ref('all')
const tabsList = ref([
  {
    name: '全部',
    value: 'all',
  },
  {
    name: '医生分身',
    value: 'doctor_agent',
  },
  {
    name: '减重专区',
    value: 'weight_loss',
  },
  {
    name: '健康生活',
    value: 'health_life',
  },
  {
    name: '就医医保',
    value: 'medical_insurance',
  },
])
</script>

<template>
  <view class="ai-agent-page box-border h-screen w-screen flex flex-col overflow-hidden pt-1.5">
    <!-- 顶部搜索 -->
    <view class="box-border w-full">
      <wd-search light />
    </view>
    <!-- 智能体分类区 -->
    <view class="ai-agent-type flex-1 overflow-hidden">
      <wd-tabs v-model="tabs" auto-line-width swipeable animated sticky :map-num="4" :style="{ height: scrollViewHeight }">
        <block v-for="item in tabsList" :key="item.value">
          <wd-tab :title="item.name" :name="item.value" lazy>
            <scroll-view :style="{ height: scrollViewHeight }" scroll-y class="box-border py-1">
              <!-- tips 判断渲染修复后面的tabs下的view宽度bug -> 超过屏幕宽度 -->
              <block v-if="tabs === item.value">
                <view
                  v-for="(_item, index) in 12" :key="index"
                  class="ai-agent-item mx-2 mb-2 box-border rounded-2 bg-white p-3"
                >
                  <view class="ai-agent-item-wrapper w-full flex flex items-start">
                    <view class="ai-agent-image mr-2">
                      <wd-img round :width="36" :height="36" mode="aspectFill" src="../../static/ai.jpeg" />
                    </view>
                    <view class="ai-agent-info flex-1">
                      <wd-text text="姓名_Agent_{{ index+1 }}" size="14px" color="#333333" />
                      <view class="ai-agent-info-tag width-full mt-1 flex gap-col-1">
                        <wd-tag v-for="(tag, tagIndex) in 2" :key="tagIndex" type="primary" size="12px">
                          {{ `标签_Agent_${tagIndex + 1}` }}
                        </wd-tag>
                      </view>
                      <view class="ai-agent-info-hospital mt-1 flex gap-col-1">
                        <wd-tag type="primary">
                          三甲
                        </wd-tag>
                        <wd-text text="所属医院_Agent_{{ index+1 }}" size="12px" />
                      </view>
                      <view class="ai-agent-desc">
                        <wd-text text="智能体描述_Agent_{{ index+1 }}" size="12px" />
                      </view>
                    </view>
                  </view>
                </view>
              </block>
            </scroll-view>
          </wd-tab>
        </block>
      </wd-tabs>
    </view>
  </view>
</template>

<style scoped lang="scss">
.ai-agent-page {
  background: $uni-bg-page-gradient;
}
.ai-agent-item {
  box-shadow: $uni-box-shadow;
}
.ai-agent-type{
  :deep(.wd-tabs) {
    background-color: transparent !important;
    .wd-tabs__nav{
      background-color: transparent !important;
    }
  }
  :deep(.wd-tab__body) {
    // 减去tabs的高度
    height: calc(100vh - 102px);
  }
  :deep(.wd-tabs__map-btn) {
    background: transparent !important;
  }
}
</style>
