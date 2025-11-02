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
  // 获取智能体列表
  '[GET]/agent/list': () => {
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

  // 获取智能体详情信息
  '[GET]/agent/detail/{chatId}': ({ params }) => {
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

  // 获取智能体tabs列表
  '[GET]/agent/tabs': () => {
    return [
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
    ]
  },
}, true)
