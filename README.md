# 个人网站

基于 Astro 构建的静态个人网站，包含首页、作品集、博客与联系方式。

## 技术栈

- [Astro](https://astro.build) — 静态站点框架
- [Tailwind CSS v4](https://tailwindcss.com) — 样式
- [Content Collections](https://docs.astro.build/en/guides/content-collections/) — 内容与类型安全
- [Vercel](https://vercel.com) — 部署

## 本地开发

```bash
cd website
npm install
npm run dev
```

浏览器访问 http://localhost:4321

## 自定义站点信息

编辑 [`src/site.config.ts`](src/site.config.ts)：

- 姓名、描述、邮箱
- 社交链接（GitHub、LinkedIn 等）
- 部署后更新 `url` 与 `astro.config.mjs` 中的 `site`

## 添加内容

### 新项目

在 `src/content/projects/` 新建 `.md` 文件，参考 `example-project.md` 的 frontmatter。

### 新博客文章

在 `src/content/blog/` 新建 `.md` 文件，参考 `hello-world.md` 的 frontmatter。

设置 `draft: true` 可隐藏文章（不会出现在列表与路由中）。

## 构建

```bash
npm run build
npm run preview
```

## 部署到 Vercel

1. 将 `website` 目录推送到 GitHub
2. 登录 [vercel.com](https://vercel.com) → **Add New Project** → 导入仓库
3. 若仓库根目录为 `personaljob`（而非 `website`），在 Vercel 项目设置中将 **Root Directory** 设为 `website`
4. 构建命令：`npm run build`，输出目录：`dist`（默认）
5. 部署完成后，将 `site.config.ts` 与 `astro.config.mjs` 中的域名改为你的 Vercel 域名或自定义域名

## 国内访问（不开 VPN）

`*.vercel.app` 在国内很多地区无法直接打开，**不是代码 bug**。可选：

1. **自定义域名 + Cloudflare 代理 Vercel**（推荐，见详细步骤）
2. **Cloudflare Pages 双部署**（已含 GitHub Actions，需配置 Secrets）
3. **Gitee Pages / 国内云静态托管**（国内最稳）

完整说明：[docs/china-access.md](docs/china-access.md)

## 项目结构

```
src/
├── components/     # Header、Footer、卡片等
├── content/        # 博客与项目 Markdown
├── layouts/        # 页面布局
├── pages/          # 路由页面
├── site.config.ts  # 站点配置
└── styles/         # 全局样式
public/             # 静态资源（图片、favicon）
```
