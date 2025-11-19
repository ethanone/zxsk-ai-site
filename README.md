# 知象数据官网 | Zhixiang Data Official Website

<div align="center">

**为知识产权全链条激活数据价值**  
*Activating Data Value for the Entire IP Chain*

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

[📧 联系我们](mailto:contact@zhixiang-data.com)

</div>

---

## 📖 关于 | About

知象数据专注于为知识产权全产业链提供专业的数据服务和智能解决方案。我们深耕知识产权领域多年,深刻理解政府机关、保护中心、产业园区、代理机构等不同主体的数据需求与业务痛点。

**Zhixiang Data** specializes in providing professional data services and intelligent solutions for the entire intellectual property industry chain. With years of experience in the IP field, we deeply understand the data needs and business pain points of different entities.

---

## ✨ 核心特色 | Key Features

### 🌍 **中英文双语支持 | Bilingual Support**
- 一键切换中英文界面
- 完整的双语内容支持
- One-click language switching
- Complete bilingual content support

### 🎨 **静奢风设计 | Luxury Minimalist Design**
- 枣红、酱紫、淡金色配色方案
- 去繁就简的设计风格
- 流畅的动画效果
- 现代化的用户体验

### 💎 **完整内容架构 | Complete Content Structure**
- **首页第一屏** | Hero Section - 品牌介绍与核心价值
- **首页第二屏** | Solutions - 关键场景解决方案
- **首页第三屏** | Data System - 数据管理体系
- **首页第四屏** | Testimonials & Contact - 客户见证与联系方式

---

## 🚀 快速开始 | Quick Start

### 环境要求 | Prerequisites
- Node.js 18.0 或更高版本 | Node.js 18.0 or higher
- npm 或 yarn 或 pnpm

### 安装 | Installation

```bash
# 克隆仓库 | Clone repository
git clone https://github.com/ethanone/zxsk-ai-site.git
cd zxsk-ai-site

# 安装依赖 | Install dependencies
npm install

# 启动开发服务器 | Start development server
npm run dev
```

访问 `http://localhost:3000` 查看网站 | Visit `http://localhost:3000` to view the site

### 构建生产版本 | Build for Production

```bash
# 构建 | Build
npm run build

# 启动生产服务器 | Start production server
npm start
```

---

## 📁 项目结构 | Project Structure

```
zxsk-ai-site/
├── public/                    # 静态资源
│   ├── scxsl-logo.png        # 公司Logo
│   └── images/               # 图片资源
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # 根布局 + SEO配置
│   │   ├── page.tsx          # 主页面组件 (4个屏幕)
│   │   └── globals.css       # 全局样式 + 静奢风配色
│   ├── components/           # UI组件库
│   │   └── ui/              # shadcn/ui组件
│   ├── contexts/            # React上下文
│   │   └── LanguageContext.tsx  # 语言切换上下文
│   ├── data/                # 数据文件
│   │   ├── companyData.json     # 中文数据
│   │   ├── companyData.en.json  # 英文数据
│   │   ├── uiText.json          # 中文UI文本
│   │   └── uiText.en.json       # 英文UI文本
│   └── lib/                 # 工具函数
└── package.json             # 项目配置
```

---

## 🎯 核心功能 | Core Functions

### 关键场景解决方案 | Key Scenario Solutions
1. **政府机关** | Government Agencies - 数智研判,智慧监管,政企协同
2. **保护中心** | Protection Centers - 海外保护,分级预警,异常判断
3. **产业园区** | Industrial Parks - 产业导航,优企识别,招商邀约
4. **代理机构** | Agency Firms - 区域分析,案源推荐,智能撰写

### 数据管理体系 | Data Management System
- 📊 **数据来源** | Data Sources - 政府权威开放数据库,行业可信加工数据集
- 🛡️ **数据治理** | Data Governance - 信息安全国标,数据安全国标,可信数据空间
- 💡 **数据应用** | Data Applications - 数据集,数据报告,数据平台
- 🔄 **数据协同** | Data Collaboration - 多源一数,上下贯通,安全共享

---

## 🔧 配置与定制 | Configuration & Customization

### 修改内容 | Modify Content
编辑数据文件以更新网站内容 | Edit data files to update website content:
- **中文**: `src/data/companyData.json` + `src/data/uiText.json`
- **English**: `src/data/companyData.en.json` + `src/data/uiText.en.json`

### 修改配色 | Modify Colors
编辑 `src/app/globals.css` 中的颜色变量 | Edit color variables in `src/app/globals.css`:
- **枣红色** | Maroon Red: `#8B2F39` (主色 | Primary)
- **酱紫色** | Purple: `#6B4C7A` (辅色 | Secondary)
- **淡金色** | Light Gold: `#D4AF37` (点缀色 | Accent)

### 修改SEO | Modify SEO
编辑 `src/app/layout.tsx` 中的 metadata | Edit metadata in `src/app/layout.tsx`

---

## 💼 联系信息 | Contact Information

### 知象数据 | Zhixiang Data

- 📧 **邮箱 | Email**: contact@zhixiang-data.com
- 📞 **电话 | Phone**: +86 138 0000 0000
- 📍 **地址 | Address**: 中国·北京·海淀区中关村大街1号 | Beijing Zhongguancun, China
- 🌐 **网站 | Website**: www.zhixiang-data.com
- ⏰ **工作时间 | Hours**: 工作日 9:00-18:00 (GMT+8) | Weekdays 9:00-18:00 (GMT+8)

### 服务内容 | Services

✅ 获取数据样本和解决方案演示  
✅ Get data samples and solution demos

✅ 免费定制行业解决方案  
✅ Free customized industry solutions

✅ 预约产品演示和试用  
✅ Schedule product demo and trial

✅ 了解最新产品、功能和资源  
✅ Learn about latest products, features and resources

---

## 🎨 配色说明 | Color Scheme

### 静奢风配色 | Luxury Minimalist Colors
去繁就简的设计理念 | Simplified design philosophy

- 🔴 **枣红色** #8B2F39 - 权威、专业、可信 | Authority, Professional, Trustworthy
- 🟣 **酱紫色** #6B4C7A - 智慧、创新、高端 | Wisdom, Innovation, Premium
- 🟡 **淡金色** #D4AF37 - 价值、品质、尊贵 | Value, Quality, Excellence

---

## 🛠️ 技术栈 | Tech Stack

- **框架 | Framework**: Next.js 15.3.5 (App Router)
- **UI库 | UI Library**: React 19.0
- **语言 | Language**: TypeScript 5.0
- **样式 | Styling**: Tailwind CSS 4.0
- **组件 | Components**: shadcn/ui + Radix UI
- **动画 | Animation**: Framer Motion 12.23
- **图标 | Icons**: Lucide React

---

## 📝 开发指南 | Development Guide

### 添加新内容 | Add New Content
1. 在 `companyData.json` 和 `companyData.en.json` 中添加数据
2. 网站将自动显示新内容
3. Add data to both `companyData.json` and `companyData.en.json`
4. The website will automatically display new content

### 修改页面布局 | Modify Page Layout
1. 编辑 `src/app/page.tsx` 文件
2. 调整各个 Section 组件的内容和样式
3. Edit `src/app/page.tsx` file
4. Adjust content and styles of Section components

---

## 📄 许可证 | License

Copyright © 2020-2025 知象数据 | Zhixiang Data

All rights reserved. 保留所有权利。

---

## 🤝 贡献 | Contributing

欢迎提交问题和拉取请求！  
Issues and pull requests are welcome!

---

<div align="center">

**知象数据 - 数据驱动 · 智能决策**  
**Zhixiang Data - Data-Driven · Intelligent Decisions**

Made with ❤️ in Beijing, China

</div>
