# 国内访问优化指南

`*.vercel.app` 域名在国内很多网络下**不稳定或无法访问**，这不是你网站代码的问题，而是访问路径在国外。

下面三种方案**从易到难**，任选其一即可明显改善「不开 VPN 也能打开」的情况。

---

## 方案一（推荐）：自定义域名 + Cloudflare 代理 Vercel

**仍用 Vercel 部署**，只改 DNS，让访客走 Cloudflare 节点（国内成功率通常高于直接访问 `vercel.app`）。

### 需要准备

- 一个域名（阿里云 / 腾讯云 / Namesilo 等，约几十元/年）
- 免费 [Cloudflare](https://dash.cloudflare.com) 账号

### 步骤

1. **Vercel 添加域名**  
   项目 → **Settings** → **Domains** → 添加你的域名（如 `www.example.com`）

2. **域名 DNS 迁到 Cloudflare**  
   在域名注册商处，把 NS 记录改为 Cloudflare 提供的两个 nameserver

3. **Cloudflare DNS 记录**（代理状态为 **已代理 / 橙色云**）  
   | 类型 | 名称 | 内容 |
   |------|------|------|
   | CNAME | `www` | `cname.vercel-dns.com` |
   | A | `@` | `76.76.21.21`（Vercel 文档中的 IP，以 Vercel 面板提示为准） |

4. **更新项目配置**（两处改成你的域名）  
   - `src/site.config.ts` → `url: 'https://www.example.com'`  
   - `astro.config.mjs` → `site: 'https://www.example.com'`  
   然后 `git push`，等 Vercel 重新部署。

5. 用**国内网络、关闭 VPN** 访问 `https://www.example.com` 测试。

> 注意：未备案域名走 Cloudflare 代理到境外，**不保证 100% 全国畅通**，但多数情况比 `personaljob-website.vercel.app` 好。

---

## 方案二：Cloudflare Pages 双部署（本仓库已配置）

GitHub 推送后，除 Vercel 外，可同时部署到 **Cloudflare Pages**，获得 `*.pages.dev` 地址（国内访问往往比 `vercel.app` 好一些）。

### 一次性配置

1. 注册 [Cloudflare](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**  
   或用手动方式：创建 API Token（权限：Account - Cloudflare Pages - Edit）

2. 在 GitHub 仓库 **Settings → Secrets and variables → Actions** 添加：
   - `CLOUDFLARE_API_TOKEN` — 你的 API Token  
   - `CLOUDFLARE_ACCOUNT_ID` — Cloudflare 右侧边栏 Account ID

3. 推送任意 commit 到 `main`，Actions 会自动构建并部署。

4. Cloudflare 面板里查看 Pages 项目地址，例如：  
   `https://personaljob-website.pages.dev`

5. 若作为正式站，把 `site.config.ts` 和 `astro.config.mjs` 的 `url` / `site` 改为该地址（或绑定自定义域名到 Pages）。

工作流文件：`.github/workflows/cloudflare-pages.yml`

---

## 方案三：国内平台托管（国内最稳）

把 `npm run build` 生成的 **`dist` 文件夹** 上传到国内静态托管，国内访客基本无需 VPN。

| 平台 | 说明 |
|------|------|
| [Gitee Pages](https://gitee.com) | 免费，码云账号，适合个人站 |
| 腾讯云静态网站托管 | 按量计费，访问稳定 |
| 阿里云 OSS + CDN | 需备案才能用 CDN 加速自定义域名 |

### Gitee Pages 简要流程

1. 在 Gitee 新建仓库，把代码 push 上去（可添加第二个 remote）  
2. 本地执行 `npm run build`  
3. 在 Gitee 仓库开启 Pages，部署目录选 `dist`（或使用 Gitee Go 自动构建）  
4. 使用 Gitee 提供的 `*.gitee.io` 域名，国内可直接访问  

---

## 无法通过改代码解决的情况

- 仅修改 Astro / CSS / `site.config.ts` **不能**让 `vercel.app` 在国内全网畅通。  
- 必须改变 **访问入口**（域名 + CDN）或 **托管位置**（国内服务器）。

---

## 建议你怎么选

| 你的情况 | 建议 |
|----------|------|
| 有或愿意买域名 | **方案一** |
| 不想买域名、想多一个免费地址 | **方案二** + 配置 GitHub Secrets |
| 主要给国内朋友/简历、要求最稳 | **方案三**（Gitee Pages） |

可以同时保留 Vercel（国外）+ Gitee（国内），简历上写国内链接。
