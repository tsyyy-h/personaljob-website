export const siteConfig = {
  name: 'tsyyy',
  title: 'tsyyy · 个人网站',
  description: '开发者个人网站，记录项目与思考。',
  url: 'https://personaljob-website.vercel.app',
  author: 'tsyyy',
  email: '358171238@qq.com',
  avatar: '/images/avatar.jpg',
  social: {
    github: 'https://github.com/tsyyy-h/personaljob-website',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://x.com/yourusername',
  },
  nav: [
    { label: '首页', href: '/' },
    { label: '作品集', href: '/projects' },
    { label: '博客', href: '/blog' },
    { label: '联系', href: '/contact' },
  ],
} as const;
