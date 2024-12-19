import { defineConfig } from "vitepress";
import { HOST_NAME, initSideBar } from "./utils";
import giscusTalk from "vitepress-plugin-comment-with-giscus";
const sidebar = initSideBar();

// console.log("%o sidebar-", sidebar);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: HOST_NAME,
  },
  title: "码上秃的前端博客",
  description:
    "重新梳理前端知识，重学一次前端，挑战自己的JS、算法、设计模式，框架源码、浏览器知识储备",
  base: "/",
  head: [
    ["link", { rel: "icon", href: "/logo.awebp" }],
    // <meta name="baidu-site-verification" content="codeva-ypCbR4Xoyf" />
    [
      "meta",
      {
        name: "baidu-site-verification",
        content: "codeva-ypCbR4Xoyf",
      },
    ],
  ],
  themeConfig: {
    logo: "/logo.awebp",
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "目录导航", link: "/link-list/index.md" },
      { text: "主页", link: "/" },
    ],
    sidebar: [
      ...sidebar,
      // 目录
      {
        text: "",
        link: "/link-list/link-list.md",
      },
      // 简历 不声明也可以 这里是防止忘记
      {
        text: "",
        link: "/resume/lxf.md",
      },
      {
        text: "",
        link: "/resume/lm.md",
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/lxfljw/lxfljw.github.io" },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
});
