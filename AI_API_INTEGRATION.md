# AI智能体后端接口集成指南

## 概述

本项目已经预留了AI智能体后端接口的集成位置。您只需要按照以下步骤配置您的AI后端服务即可。

## 当前状态

- ✅ 对话窗口界面已完成
- ✅ 消息发送和显示功能已完成
- ✅ 对话历史管理已完成
- ✅ API接口函数已预留
- ⏳ 等待接入真实AI后端服务

## 快速开始

### 1. 配置环境变量

在项目根目录创建 `.env.local` 文件:

```bash
# AI后端API地址
NEXT_PUBLIC_API_URL=http://your-ai-backend-url.com

# API密钥（如果需要）
NEXT_PUBLIC_API_KEY=your-api-key-here

# 其他配置
NEXT_PUBLIC_API_TIMEOUT=30000
```

### 2. API接口说明

所有API相关函数都在 `src/lib/api.ts` 文件中,包括:

#### 2.1 发送消息

```typescript
// 发送单条消息到AI
import { sendMessageToAI } from '@/lib/api';

const response = await sendMessageToAI(
  userMessage,      // 用户消息内容
  conversationId,   // 对话ID（可选）
  context          // 上下文信息（可选）
);
```

#### 2.2 流式响应（推荐）

```typescript
// 实现打字机效果的流式响应
import { sendMessageStream } from '@/lib/api';

await sendMessageStream(
  userMessage,
  conversationId,
  (chunk) => {
    // 接收到文本块时的回调
    console.log('收到文本块:', chunk);
  }
);
```

#### 2.3 对话管理

```typescript
import { 
  createConversation,      // 创建新对话
  getConversationHistory,  // 获取对话历史
  deleteConversation       // 删除对话
} from '@/lib/api';

// 创建新对话
const conversationId = await createConversation();

// 获取历史记录
const messages = await getConversationHistory(conversationId);

// 删除对话
await deleteConversation(conversationId);
```

### 3. 在页面中集成

在 `src/app/page.tsx` 中的 `handleSendMessage` 函数中,找到以下注释:

```typescript
// TODO: 这里将来会调用AI后端接口
```

替换为实际的API调用:

```typescript
// 替换模拟回复为真实API调用
const response = await sendMessageToAI(userMessage.content, currentConversationId);

if (response.success && response.data) {
  const aiMessage: Message = {
    id: (Date.now() + 1).toString(),
    role: "assistant",
    content: response.data.reply,
    timestamp: new Date(),
  };
  
  setConversations(prev => prev.map(conv => {
    if (conv.id === currentConversationId) {
      return {
        ...conv,
        messages: [...conv.messages, aiMessage],
      };
    }
    return conv;
  }));
}
```

### 4. 流式响应集成（推荐）

如果您的AI后端支持流式响应,可以实现更好的用户体验:

```typescript
// 创建一个临时消息用于显示AI回复
const tempAiMessage: Message = {
  id: (Date.now() + 1).toString(),
  role: "assistant",
  content: "",
  timestamp: new Date(),
};

// 添加到对话中
setConversations(prev => prev.map(conv => {
  if (conv.id === currentConversationId) {
    return {
      ...conv,
      messages: [...conv.messages, tempAiMessage],
    };
  }
  return conv;
}));

// 调用流式API
await sendMessageStream(
  userMessage.content,
  currentConversationId,
  (chunk) => {
    // 实时更新消息内容
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        return {
          ...conv,
          messages: conv.messages.map(msg => 
            msg.id === tempAiMessage.id 
              ? { ...msg, content: msg.content + chunk }
              : msg
          ),
        };
      }
      return conv;
    }));
  }
);
```

## API接口规范

### 请求格式

#### POST /api/chat

发送消息到AI

**请求体:**
```json
{
  "message": "用户消息内容",
  "conversationId": "对话ID（可选）",
  "context": {
    "language": "zh",
    "userInfo": {}
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "reply": "AI回复内容",
    "conversationId": "对话ID"
  }
}
```

#### POST /api/chat/stream

流式响应接口

**请求体:** 同上

**响应:** 
- Content-Type: `text/event-stream`
- 流式返回文本块

#### GET /api/conversations/:id

获取对话历史

**响应:**
```json
{
  "conversationId": "对话ID",
  "messages": [
    {
      "role": "user",
      "content": "消息内容",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/conversations

创建新对话

**响应:**
```json
{
  "conversationId": "新对话ID",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### DELETE /api/conversations/:id

删除对话

**响应:**
```json
{
  "success": true
}
```

#### GET /api/health

检查AI服务状态

**响应:**
```json
{
  "status": "online",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 错误处理

所有API函数都包含错误处理逻辑。如果API调用失败,会:

1. 在控制台输出错误信息
2. 返回包含错误信息的响应对象
3. 在开发模式下使用模拟数据作为后备

```typescript
try {
  const response = await sendMessageToAI(message);
  if (!response.success) {
    console.error('API错误:', response.error);
    // 处理错误情况
  }
} catch (error) {
  console.error('请求失败:', error);
  // 显示错误提示给用户
}
```

## 开发测试

在开发阶段,可以使用模拟API响应进行测试:

```typescript
import { getMockAIResponse } from '@/lib/api';

// 获取模拟回复
const mockReply = getMockAIResponse(userMessage, language);
```

## 部署注意事项

1. **环境变量**: 确保在生产环境中正确配置 `NEXT_PUBLIC_API_URL`
2. **CORS设置**: 确保AI后端允许来自前端域名的跨域请求
3. **认证**: 如果需要API密钥,在请求头中添加认证信息
4. **超时设置**: 根据AI响应速度调整超时时间
5. **错误监控**: 建议集成错误监控服务(如Sentry)

## 性能优化建议

1. **使用流式响应**: 提供更好的用户体验
2. **实现消息队列**: 处理高并发请求
3. **添加缓存**: 缓存常见问题的回答
4. **限流**: 防止API滥用
5. **CDN加速**: 使用CDN加速静态资源

## 安全建议

1. **API密钥安全**: 不要在客户端代码中硬编码API密钥
2. **输入验证**: 验证和清理用户输入
3. **速率限制**: 实现请求速率限制
4. **HTTPS**: 确保所有API通信使用HTTPS
5. **内容过滤**: 过滤敏感或不当内容

## 联系支持

如果您在集成过程中遇到问题,请:

1. 查看控制台错误日志
2. 检查网络请求和响应
3. 确认API端点配置正确
4. 联系技术支持团队

---

**更新日期**: 2024-12-16  
**版本**: 1.0.0
