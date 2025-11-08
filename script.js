// script.js - 批量上传图像到 Cloudflare Images。因为是pro 付费服务，流量未增加之前，暂时不启动
require('dotenv').config(); // 加载 .env
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // 修复 fetch 导入
const FormData = require('form-data'); // 添加 form-data 包导入

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID; // 从 .env
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

// 要上传的图像文件列表
const IMAGE_FILES = [
  'logo.webp',
  'blue_logo_huitu.webp',
  'globe.svg',
  'images/ai-workstation-demo.webp',
  'images/industrial-inspect-demo.webp',
  'images/industry-case.webp',
  'images/local-llm-demo.webp',
  'images/nongye.webp',
  'images/smartcity-demo.webp',
  'images/solar.webp',
  'images/transport.webp',
  'images/wind.webp'
];

// 验证环境变量
if (!ACCOUNT_ID || !API_TOKEN) {
  console.error('错误: 请在 .env 中设置 CLOUDFLARE_ACCOUNT_ID 和 CLOUDFLARE_API_TOKEN');
  process.exit(1);
}

async function uploadImage(filePath) {
  const fullPath = path.join(__dirname, 'public', filePath);
  
  // 验证文件是否存在
  if (!fs.existsSync(fullPath)) {
    console.error(`错误: 文件不存在: ${fullPath}`);
    return null;
  }

  // 验证文件类型
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
  if (!validExtensions.includes(path.extname(fullPath).toLowerCase())) {
    console.error(`错误: 不支持的文件类型: ${fullPath}`);
    return null;
  }

  try {
    const formData = new FormData();
    const fileStream = fs.createReadStream(fullPath);
    
    // 添加错误处理到文件流
    fileStream.on('error', (error) => {
      throw new Error(`文件读取错误: ${error.message}`);
    });

    formData.append('file', fileStream);

    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(`上传失败: ${res.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ''}`);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(`API 返回错误: ${JSON.stringify(data.errors)}`);
    }

    console.log(`✅ 上传成功: ${filePath}`);
    console.log(`🔗 URL: https://imagedelivery.net/bf-znJgD2C4BfdjMyt9O2A/${data.result.id}/optimized`);
    return data.result.id;
  } catch (error) {
    console.error(`❌ 上传 ${filePath} 失败:`, error.message);
    return null;
  }
}

// 批量上传
(async () => {
  console.log('🚀 开始批量上传...');
  
  let successCount = 0;
  let failCount = 0;

  for (const file of IMAGE_FILES) {
    try {
      const result = await uploadImage(file);
      if (result) {
        successCount++;
      } else {
        failCount++;
      }
    } catch (error) {
      console.error(`处理 ${file} 时发生错误:`, error);
      failCount++;
    }
  }

  console.log('\n📊 上传统计:');
  console.log(`✅ 成功: ${successCount} 个文件`);
  console.log(`❌ 失败: ${failCount} 个文件`);
  console.log('\n完成！请使用新的 ID 更新代码中的 <Image src="..." /> 标签');
})();