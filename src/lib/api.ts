// AI智能体API接口集成
// 这个文件用于连接后端AI服务

// 消息类型定义
export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// API响应类型
export type APIResponse = {
  success: boolean;
  message?: string;
  data?: {
    reply: string;
    conversationId?: string;
  };
  error?: string;
};

// API配置
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 30000, // 30秒超时
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * 发送消息到AI后端
 * @param message 用户消息
 * @param conversationId 对话ID（可选）
 * @param context 上下文信息（可选）
 * @returns AI回复
 */
export async function sendMessageToAI(
  message: string,
  conversationId?: string,
  context?: Record<string, any>
): Promise<APIResponse> {
  try {
    // TODO: 替换为您的实际API端点
    const response = await fetch(`${API_CONFIG.baseURL}/api/chat`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({
        message,
        conversationId,
        context,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('AI API调用失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
    };
  }
}

/**
 * 流式响应处理（用于实时打字效果）
 * @param message 用户消息
 * @param conversationId 对话ID
 * @param onChunk 接收到文本块时的回调
 */
export async function sendMessageStream(
  message: string,
  conversationId: string,
  onChunk: (chunk: string) => void
): Promise<void> {
  try {
    // TODO: 替换为您的实际流式API端点
    const response = await fetch(`${API_CONFIG.baseURL}/api/chat/stream`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({
        message,
        conversationId,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('无法读取响应流');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  } catch (error) {
    console.error('流式API调用失败:', error);
    throw error;
  }
}

/**
 * 获取对话历史
 * @param conversationId 对话ID
 * @returns 对话历史消息列表
 */
export async function getConversationHistory(
  conversationId: string
): Promise<Message[]> {
  try {
    // TODO: 替换为您的实际API端点
    const response = await fetch(
      `${API_CONFIG.baseURL}/api/conversations/${conversationId}`,
      {
        method: 'GET',
        headers: API_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`获取对话历史失败: ${response.status}`);
    }

    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error('获取对话历史失败:', error);
    return [];
  }
}

/**
 * 创建新对话
 * @returns 新对话ID
 */
export async function createConversation(): Promise<string> {
  try {
    // TODO: 替换为您的实际API端点
    const response = await fetch(`${API_CONFIG.baseURL}/api/conversations`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`创建对话失败: ${response.status}`);
    }

    const data = await response.json();
    return data.conversationId;
  } catch (error) {
    console.error('创建对话失败:', error);
    // 返回一个本地生成的ID作为后备
    return `local_${Date.now()}`;
  }
}

/**
 * 删除对话
 * @param conversationId 对话ID
 */
export async function deleteConversation(
  conversationId: string
): Promise<boolean> {
  try {
    // TODO: 替换为您的实际API端点
    const response = await fetch(
      `${API_CONFIG.baseURL}/api/conversations/${conversationId}`,
      {
        method: 'DELETE',
        headers: API_CONFIG.headers,
      }
    );

    return response.ok;
  } catch (error) {
    console.error('删除对话失败:', error);
    return false;
  }
}

/**
 * 获取AI模型状态
 * @returns 模型是否在线
 */
export async function checkAIStatus(): Promise<boolean> {
  try {
    // TODO: 替换为您的实际API端点
    const response = await fetch(`${API_CONFIG.baseURL}/api/health`, {
      method: 'GET',
      headers: API_CONFIG.headers,
    });

    return response.ok;
  } catch (error) {
    console.error('检查AI状态失败:', error);
    return false;
  }
}

/**
 * 模拟AI回复（用于开发测试）
 * 实际部署时应该被真实的API调用替换
 */
export function getMockAIResponse(userMessage: string, language: 'zh' | 'en'): string {
  const responses = {
    zh: [
      `我是工业工程AI专家,我理解您想了解"${userMessage}"相关的内容。\n\n作为您的专业分析助手,我可以帮助您:\n\n• ⏱️ **工时测定分析**\n  基于MOST、MTM、MODAPTS方法,精准测定标准工时\n\n• 🎯 **动作经济分析**\n  应用22条动作经济原则,优化作业动作,提升效率\n\n• 📊 **OEE综合效率**\n  计算可用率、性能率、质量率,识别六大损失\n\n• ⚖️ **产线平衡优化**\n  计算平衡率,识别瓶颈工序,优化工位配置\n\n• 👥 **人机协作分析**\n  绘制人机联合图,优化人机配比,提升综合效率\n\n请问您具体需要分析哪个方面?我会通过多轮对话引导您提供必要信息。`,
      `关于"${userMessage}",我可以为您提供专业的工业工程分析。\n\n让我通过几个问题了解您的需求:\n\n❓ **第一步:明确分析对象**\n   您是需要分析装配线、加工线还是包装线?\n\n❓ **第二步:获取基础数据**\n   请告诉我工序数量、节拍时间等关键信息\n\n❓ **第三步:深入分析**\n   我会根据您提供的数据进行精准计算\n\n❓ **第四步:生成报告**\n   为您生成专业的分析报告和改善建议\n\n根据我们服务500+制造企业的经验,通过系统化的工业工程分析:\n\n✅ 平均提升生产效率25%\n✅ 降低人力成本15%\n✅ 产线平衡率提升至90%以上\n\n请告诉我您的具体情况,我们开始分析吧!`,
      `您提到的"${userMessage}"是一个很好的工业工程课题!\n\n让我为您介绍我们的分析方法:\n\n📋 **标准工业工程方法**\n\n1️⃣ **工时测定** - MOST、MTM、秒表法\n   • 预定时间标准系统\n   • 动作时间测量法\n   • 实测工时分析\n\n2️⃣ **动作分析** - 22条动作经济原则\n   • 双手操作分析\n   • 人体动作分析\n   • 操作程序分析\n\n3️⃣ **效率分析** - OEE、产线平衡\n   • 六大损失分析\n   • 瓶颈工序识别\n   • 工位负荷分析\n\n🎯 **典型案例**\n\n🚗 **汽车装配线**\n   工时测定+产线平衡,效率提升40%\n\n📱 **电子组装**\n   动作分析+MTM优化,节拍降低35%\n\n🔧 **机械加工**\n   人机协作分析,设备利用率提升至90%\n\n请问您想从哪个方面开始分析?`,
    ],
    en: [
      `I'm an Industrial Engineering AI Expert. I understand you want to learn about "${userMessage}".\n\nAs your professional analysis assistant, I can help you with:\n\n• ⏱️ **Time Study Analysis**\n  Accurate standard time determination using MOST, MTM, MODAPTS methods\n\n• 🎯 **Motion Economy Analysis**\n  Apply 22 motion economy principles to optimize work operations\n\n• 📊 **OEE Calculation**\n  Calculate availability, performance, quality rates, identify six big losses\n\n• ⚖️ **Line Balancing**\n  Calculate balance rate, identify bottlenecks, optimize workstation configuration\n\n• 👥 **Human-Machine Collaboration**\n  Draw human-machine charts, optimize ratio, improve overall efficiency\n\nWhich aspect do you need to analyze? I'll guide you through multi-round dialogue to gather necessary information.`,
      `Regarding "${userMessage}", I can provide professional industrial engineering analysis.\n\nLet me understand your needs through a few questions:\n\n❓ **Step 1: Define Analysis Object**\n   Are you analyzing an assembly line, processing line, or packaging line?\n\n❓ **Step 2: Gather Basic Data**\n   Please provide number of processes, takt time, and other key information\n\n❓ **Step 3: In-depth Analysis**\n   I'll perform precise calculations based on your data\n\n❓ **Step 4: Generate Report**\n   I'll create professional analysis reports and improvement suggestions\n\nBased on our experience serving 500+ manufacturing enterprises, through systematic IE analysis:\n\n✅ Average 25% production efficiency improvement\n✅ 15% labor cost reduction\n✅ Line balance rate improved to over 90%\n\nPlease tell me your specific situation, let's start the analysis!`,
      `"${userMessage}" is an excellent industrial engineering topic!\n\nLet me introduce our analysis methods:\n\n📋 **Standard IE Methods**\n\n1️⃣ **Time Study** - MOST, MTM, Stopwatch\n   • Predetermined Time Standards\n   • Methods-Time Measurement\n   • Actual Time Analysis\n\n2️⃣ **Motion Analysis** - 22 Motion Economy Principles\n   • Two-hand Operation Analysis\n   • Body Motion Analysis\n   • Operation Procedure Analysis\n\n3️⃣ **Efficiency Analysis** - OEE, Line Balancing\n   • Six Big Losses Analysis\n   • Bottleneck Process Identification\n   • Workstation Load Analysis\n\n🎯 **Typical Cases**\n\n🚗 **Automotive Assembly**\n   Time study + line balancing, 40% efficiency improvement\n\n📱 **Electronics Assembly**\n   Motion analysis + MTM optimization, 35% cycle time reduction\n\n🔧 **Machining**\n   Human-machine collaboration, 90% equipment utilization\n\nWhich aspect would you like to start analyzing?`,
    ],
  };

  const langResponses = responses[language] || responses.zh;
  return langResponses[Math.floor(Math.random() * langResponses.length)];
}
