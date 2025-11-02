<script setup lang="ts">
definePage({
  name: 'ai',
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
})

const scrollHeight = ref(0)
const scrollViewHeight = computed(() => {
  return `calc(100% - ${scrollHeight.value}px)`
})

const inputType: Ref<'text' | 'voice'> = ref('text')
function toggleInputType() {
  inputType.value = inputType.value === 'text' ? 'voice' : 'text'
}
// 更多功能区相关
const morePanelVisible = ref(false)
function toggleMorePanel() {
  morePanelVisible.value = !morePanelVisible.value
}
// 没有展开时为40px, 展开更多功能区后需要+40px
const footerHeight = computed(() => {
  // 默认输入容器padding-top(8) + height(40) + 输入框margin-bottom(8); 展开后，输入整体容器的padding-bottom(8) + 输入功能区(40)
  return `${44 + (morePanelVisible.value ? 48 : 0)}px`
})

// slide popup
const sidePopupShow = ref(false)
function handleOpenSidePopup() {
  sidePopupShow.value = true
}
function handleCloseSidePopup() {
  sidePopupShow.value = false
}

// 对话记录状态
const aiAgentRecords = ref([])

// 前往智能体页面
function handleGoAgent() {
  uni.navigateTo({
    url: '/pages/agent/index',
  })
}
</script>

<template>
  <view class="ai-chat-page box-border h-screen w-screen flex flex-col overflow-hidden px-2 py-3">
    <!-- 顶部额外操作栏 左侧更多信息&智能体入口 -->
    <view class="mb-3 h-8 flex items-center justify-between">
      <view class="h-full flex items-center">
        <wd-icon name="format-vertical-align-left" size="20px" @click="handleOpenSidePopup" />
      </view>
      <view class="ai-chat-btn h-full flex items-center rounded-full px-3" @click="handleGoAgent">
        <wd-icon class="mr-1" name="chart-bubble" size="20px" />
        智能体
      </view>
    </view>
    <!-- 中间聊天区 -->
    <view class="flex flex-1 flex-col overflow-hidden">
      <scroll-view :style="{ height: scrollViewHeight }" scroll-y>
        <view v-for="(item, index) in 12" :key="index" class="ai-chat-item">
          <!-- 左侧聊天人=头像+聊天信息 -->
          <view class="ai-chat-reply mb-3 flex items-start justify-start">
            <view class="mr-1 h-9 w-9">
              <wd-img mode="aspectFill" round :width="36" :height="36" src="../../static/ai.jpeg" />
            </view>
            <view class="min-h-9 flex flex-1 justify-start">
              <wd-text
                color="#333333"
                text="芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。"
              />
            </view>
          </view>
          <!-- 右侧聊天人=聊天信息+头像 -->
          <view class="ai-chat-question mb-3 flex justify-end">
            <view class="min-h-9 flex flex-1 justify-end">
              <wd-text color="#333333" text="芦叶满汀洲，寒沙带浅流的下一句是什么？" />
            </view>
            <view class="ml-1 h-9 w-9">
              <wd-img mode="aspectFill" round :width="36" :height="36" src="../../static/user.jpg" />
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 底部输入栏 -->
    <!-- <wd-transition show name="slide-up"> -->
    <view class="ai-chat-footer" :style="{ height: footerHeight }">
      <!-- 输入框 -->
      <view class="my-2 box-border h-10 flex items-center justify-between">
        <!-- 左侧输入框 语音icon 输入input +号功能按钮 -->
        <view class="ai-chat-input mr-1 hidden h-full flex flex-1 items-center rounded-full bg-white px-3">
          <!-- 圆形阴影 -->
          <wd-icon
            :name="inputType === 'text' ? '../../static/voice.svg' : '../../static/keyboard.svg'" size="20px"
            @click="toggleInputType"
          />
          <input class="ml-3 mr-3 flex-1" placeholder="请输入内容">
          <wd-icon :name="morePanelVisible ? 'close-circle' : 'add-circle1'" size="20px" @click="toggleMorePanel" />
        </view>
        <!-- 右侧 圆形拍照按钮 -->
        <view class="flex items-center rounded-full bg-white p-2.5">
          <wd-icon name="camera" size="20px" />
        </view>
      </view>
      <!-- 功能按钮 拍照 添加图片 添加文件 呼叫 -->
      <view class="box-border h-10 flex items-center gap-3">
        <wd-icon
          class="ai-feature-item flex items-center justify-center rounded-2 bg-white"
          name="../../static/camera.svg" size="26px"
        />
        <wd-icon
          class="ai-feature-item flex items-center justify-center rounded-2 bg-white"
          name="../../static/upload-image.svg" size="26px"
        />
        <wd-icon
          class="ai-feature-item flex items-center justify-center rounded-2 bg-white"
          name="../../static/upload-file.svg" size="26px"
        />
        <wd-icon
          class="ai-feature-item flex items-center justify-center rounded-2 bg-white"
          name="../../static/call-phone.svg" size="26px"
        />
      </view>
    </view>
    <!-- </wd-transition> -->
    <!-- 侧边功能区 -->
    <wd-popup
      v-model="sidePopupShow" position="left"
      custom-style="height: 100%; width: 296px; background: linear-gradient(to bottom, #F9F2FF, #D8E9FF); padding: 8px;"
      @close="handleCloseSidePopup"
    >
      <!-- 用户信息区 -->
      <view class="ai-popup-user flex items-center">
        <!-- 用户信息 -->
        <view class="ai-user-info flex flex-1 items-center overflow-hidden">
          <wd-img class="ai-user-head" mode="aspectFill" round :width="36" :height="36" src="../../static/user.jpg" />
          <view class="ml-2 w-15 flex flex-col justify-center">
            <wd-text color="#333333" size="14px" text="用户昵称" />
            <wd-text color="#999999" size="13px" text="用户简介" :lines="1" />
          </view>
        </view>
        <!-- 档案 -->
        <view class="ai-user-report flex items-center rounded-4 bg-white p-2 py-1">
          <wd-icon class="mr-1" name="file-paste" size="14px" />
          <wd-text color="#333333" text="档案" size="14px" />
        </view>
        <!-- 消息 -->
        <view class="ai-user-message ml-2 mr-1 flex items-center rounded-4 bg-white p-2 py-1">
          <wd-icon class="mr-1" name="notification" size="14px" />
          <wd-text color="#333333" text="消息" size="14px" />
        </view>
      </view>
      <!-- 智能体推荐及入口区 -->
      <view class="ai-popup-agent mt-3 box-border w-full rounded-4 bg-white px-2.5 pb-2 pt-1">
        <view class="ai-agent-header mb-1.5 box-border h-6 flex items-center justify-between pl-1">
          <wd-text text="智能体" size="13px" bold color="#333333" />
          <view class="ai-agent-more flex items-center" @click="handleGoAgent">
            <wd-text text="更多" size="12px" color="#666666" />
            <wd-icon name="chevron-right" size="14px" color="#666666" />
          </view>
        </view>
        <view class="ai-agent-body flex items-center">
          <view
            v-for="(item, index) in 5" :key="index"
            class="ai-agent-item flex flex-1 flex-col items-center justify-center"
          >
            <wd-img mode="aspectFill" round :width="36" :height="36" src="../../static/ai.jpeg" />
            <wd-text class="mt-1 w-full text-center" color="#666666" :text="`智能体${index + 1}`" size="10px" />
          </view>
        </view>
      </view>
      <!-- 用户任务区 -->
      <view class="ai-popup-task mt-3 box-border w-full flex items-center rounded-4 bg-white px-2.5 pb-2 pt-1">
        <wd-img :width="56" :height="56" src="../../static/task.svg" />
        <view class="ai-task-info ml-2 flex flex-1 items-center justify-between">
          <view class="ai-task-text flex flex-col justify-center">
            <wd-text class="mb-1" color="#333333" text="智能体任务中心" size="14px" />
            <wd-text color="#999999" text="做任务，领专属好礼" size="12px" />
          </view>
          <view class="ai-task-btn ml-1 px-2">
            <wd-text color="#007AFF" text="去查看" size="14px" />
          </view>
        </view>
      </view>
      <!-- 对话记录区 -->
      <view class="ai-popup-record mt-3 box-border min-h-22 w-full rounded-4 bg-white px-2.5 pb-2 pt-1">
        <view class="ai-record-title">
          <wd-text text="历史对话记录" size="13px" bold color="#333333" />
        </view>
        <view v-if="aiAgentRecords.length">
          <view class="ai-record-header mb-1.5 box-border h-6 flex items-center justify-between pl-1">
            <wd-text text="对话记录" size="13px" bold color="#333333" />
            <view class="ai-record-more flex items-center">
              <wd-text text="更多" size="12px" color="#666666" />
              <wd-icon name="chevron-right" size="14px" color="#666666" />
            </view>
          </view>
        </view>
        <view v-else class="ai-record-empty min-h-22 w-full flex items-center justify-center">
          <wd-text color="#999999" text="暂无数据" size="16px" />
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<style scoped lang="scss">
.ai-chat-page {
  background: $uni-bg-page-gradient;
}

.ai-chat-btn {
  background: #fff;
}

.scroll-view-height {
  height: calc(100% - 40px);
}

.ai-chat-item {
  .ai-chat-reply {
    :deep(.wd-text) {
      background: $uni-bg-reply-message-gradient;
      box-shadow: $uni-box-shadow;
      // 除右上角外的圆形边框
      border-radius: 0.5rem;
      border-top-left-radius: 0;
      padding: 0.5rem;
      // 文本向左对齐
      text-align: left !important;
    }
  }

  .ai-chat-question {
    :deep(.wd-text) {
      background: $uni-bg-question-message-gradient;
      box-shadow: $uni-box-shadow;
      // 除左上角外的圆形边框
      border-radius: 0.5rem;
      border-top-right-radius: 0;
      padding: 0.5rem;
      // 文本向右对齐
      text-align: right !important;
    }
  }
}

.ai-chat-footer {
  // 给高度变化添加动画
  transition: height 0.3s ease-in-out;
}

.ai-chat-input {
  box-shadow: $uni-box-shadow-inner;
}

.ai-feature-item {
  padding: 0.4rem 0.5rem;

  :deep(.wd-icon__image) {
    width: 100% !important;
    height: 100% !important;
  }
}

.ai-user-report,
.ai-user-message,
.ai-popup-agent,
.ai-popup-task,
.ai-popup-record {
  box-shadow: $uni-box-shadow;
}

.ai-user-info {
  padding: 4px 10px;
  border-radius: 20px;

  .ai-user-head {
    box-shadow: $uni-box-shadow;
  }
}

.ai-popup-agent{
  height: 88px;
}

.ai-popup-task{
  height: 88px;
}
</style>
