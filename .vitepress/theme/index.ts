// https://vitepress.dev/guide/custom-theme
import { h, toRefs } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { onMounted } from "vue";
// import mediumZoom from "medium-zoom";
import "viewerjs/dist/viewer.min.css";
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";
import giscusTalk from "vitepress-plugin-comment-with-giscus";
import { useRoute, useData } from "vitepress";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件，如果你不想使用也可以不添加
    app.component("vImageViewer", vImageViewer);
    // ...
    // ...
  },
  setup() {
    // 获取路由
    const route = useRoute();
    // 获取前言和路由
    const { frontmatter } = toRefs(useData());

    // 评论组件
    initGiscus();

    onMounted(() => {
      // 图片预览组件
      imageViewer(route);
    });

    function initGiscus() {
      const theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      // 评论组件 - https://giscus.app/
      giscusTalk(
        {
          repo: "lxfljw/lxfljw.github.io",
          repoId: "R_kgDOJmmdKw",
          category: "Q&A",
          categoryId: "DIC_kwDOJmmdK84ClXWT",
          mapping: "pathname",
          inputPosition: "bottom",
          lang: "zh-CN",
          strict: "0",
          reactionsEnabled: "1",
          emitMetadata: "1",
          theme,
          loading: "lazy",
          locales: {
            "zh-Hans": "zh-CN",
            "en-US": "en",
          },
          homePageShowComment: false,
          lightTheme: "light",
          darkTheme: "transparent_dark",
        },
        {
          frontmatter,
          route,
        },
        true
      );
    }
  },
} satisfies Theme;

//     <script src="https://giscus.app/client.js"
//         data-repo="lxfljw/lxfljw.github.io"
//         data-repo-id="R_kgDOJmmdKw"
//         data-category="Q&A"
//         data-category-id="DIC_kwDOJmmdK84ClXWT"
//         data-mapping="pathname"
//         data-strict="0"
//         data-reactions-enabled="1"
//         data-emit-metadata="1"
//         data-input-position="bottom"
//         data-theme="preferred_color_scheme"
//         data-lang="zh-CN"
//         data-loading="lazy"
//         crossorigin="anonymous"
//         async>
// </script>
