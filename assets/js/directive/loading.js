import Vue from 'vue';
import LoadingComponent from "../../../components/global/Loading/Main"

const LoadingConstructor = Vue.extend(LoadingComponent);
let loadingEL = null;

function loading(el, binding) {
  let instance = new LoadingConstructor();
  instance.vm = instance.$mount();
  let elPosition = window.getComputedStyle(el).position;
  if (elPosition !== "fixed" && elPosition !== "absolute" && elPosition !== "relative") {
    el.classList.add("loading-parent");
  }
  el.appendChild(instance.vm.$el);
  loadingEL = instance.vm.$el
}

export default {
  inserted(el, binding, vnode) {
    binding.value && loading(el, binding)
  },
  update(el, binding, vnode) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        loading(el, binding)
      } else {
        try{
          el.classList.remove("loading-parent");
        }catch (e) {

        }
        el.removeChild(loadingEL);
      }
    }
  }
}
