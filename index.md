---
# https://vitepress.dev/reference/default-theme-home-page

layout: home

hero:
  name: "前端知识体系"
  text: ""
  tagline: "重新梳理前端知识，重学一次前端，挑战自己的JS、算法、设计模式，框架源码、浏览器知识储备"
  image:
    src: /fe-skill.png
  actions:
    - theme: brand
      text: 设计模式
      link: /pages/1-设计模式/0.前言.md
    - theme: brand
      text: 目录导航
      link: /link-list/index.md

features:
  - icon: 📚
    title: 前端知识脑图
    details: 前端涉及的知识面和边界，以及前端以外能做什么
    link: /pages/10-知识图解/1.前端体系.md
  - icon: 🚗
    title: Vue3
    details: diff 算法，最长增长子序列
    link: /pages/2-Vue3/源码系列/diff算法之最长递增子序列.md
  - icon: 💻
    title: 算法
    details: 常见算法，链表、树、排序
    link: /pages/5-算法/链表/1.合并有序链表.md
---