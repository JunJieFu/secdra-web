import {off, removeClass} from "../../../assets/script/util/domUtil"

export default {
  props: {
    persistent: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        removeClass(document.body, "not-scroll");
        this.$emit("change", false);
      }
    }
  },
  data() {
    return {
      persistentAnimate: false,
      maskFlag: false
    };
  },
  methods: {
    destroyElement() {
      off(document, "keydown", this.onEsc);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    onEsc(event) {
      if (event.keyCode === 27) {
        if (this.persistent) {
          this.persistentAnimate = true;
          return
        }
        this.close()
      }
    },
    onPersistent(event) {
      if (event && event.target.className.indexOf("mask") === -1) {
        return
      }
      if (event.type === "mousedown") {
        this.maskFlag = true;
        return
      }
      if (!this.maskFlag) {
        return
      }
      this.maskFlag = false;
      if (this.persistent) {
        this.persistentAnimate = true;
        return
      }
      this.close()
    },
    persistentAnimationend() {
      this.persistentAnimate = false
    }
  }
}
