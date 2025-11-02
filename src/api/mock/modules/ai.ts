/*
 * @Author: weisheng
 * @Date: 2025-06-15 14:25:00
 * @LastEditTime: 2025-06-26 21:59:38
 * @LastEditors: weisheng
 * @Description: Pet Store - Pet相关接口的mock数据
 * @FilePath: /wot-starter/src/api/mock/modules/pet.ts
 */
import { defineMock } from '@alova/mock'
import { generateMockData } from '../utils/generators'

export default defineMock({
  // 获取历史对话记录
  '[GET]/ai/chat': () => {
    return generateMockData.listResponse(
      generateMockData.array(
        _index => ({
          id: generateMockData.id(),
          name: generateMockData.name('Chat'),
          desc: generateMockData.description('Desc'),
        }),
      ),
    )
  },

  // 获取对话记录对应的聊天信息
  '[POST]/ai/chat/{chatId}': ({ params }) => {
    return generateMockData.listResponse(
      generateMockData.array(
        index => ({
          id: `${params.chatId}_${index + 1}`,
          content: generateMockData.message('Message'),
          type: index % 2 === 0 ? 'agent' : 'user',
        }),
        20,
      ),
    )
  },
}, true)
