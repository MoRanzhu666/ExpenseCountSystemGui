import { createApp } from "vue";

const LoadingDirective = {
  mounted(el, binding) {
    // 创建蒙版元素
    const mask = document.createElement("div");
    mask.className = "loading-mask";
    mask.innerHTML = `<div class="spinner"></div>`;
    mask.style.display = binding.value ? "flex" : "none";

    // 保存引用
    el._loadingMask = mask;

    // 保证定位
    const style = getComputedStyle(el);
    if (style.position === "static" || !style.position) {
      el.style.position = "relative";
    }

    el.appendChild(mask);
  },
  updated(el, binding) {
    if (el._loadingMask) {
      el._loadingMask.style.display = binding.value ? "flex" : "none";
    }
  },
  unmounted(el) {
    if (el._loadingMask) {
      el._loadingMask.remove();
      el._loadingMask = null;
    }
  }
};

export default {
  install(app) {
    app.directive("loading", LoadingDirective);
  }
};
