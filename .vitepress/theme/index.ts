// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { onMounted } from "vue";
// import mediumZoom from "medium-zoom";
import "viewerjs/dist/viewer.min.css";
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";
import { useRoute } from "vitepress";
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
    onMounted(() => {
      // mediumZoom("[data-zoomable]", { background: "var(--vp-c-bg)" });
      // mediumZoom(".main img", { background: "var(--vp-c-bg)" });
      // 获取路由
      const route = useRoute();
      // 使用
      imageViewer(route);
    });
  },
} satisfies Theme;
