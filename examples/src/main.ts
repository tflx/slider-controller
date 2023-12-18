import CSS from "./style.css.ts"
import "slider-controller"
import { html, LitElement } from "lit"
import { customElement, state } from "lit/decorators.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { SliderController } from "slider-controller"

@customElement("main-element")
export class MainElement extends LitElement {
  static get styles() {
    return [CSS]
  }

  @state() protected disableNext = false
  @state() protected disablePrev = false
  slider: Ref<SliderController> = createRef()

  connectedCallback(): void {
    super.connectedCallback()
  }

  handleScrollDone = () => {
    this.disablePrev = !this.slider.value?.hasPrev
    this.disableNext = !this.slider.value?.hasNext
    console.log(this.slider.value?.currentIndex)
  }

  handleNext = () => {
    this.slider.value?.next()
  }
  handlePrev = () => {
    this.slider.value?.previous()
  }

  render() {
    return html`
      <div>
        <button ?disabled="${this.disablePrev}" @click="${this.handlePrev}">
          Prev
        </button>
        <button ?disabled="${this.disableNext}" @click="${this.handleNext}">
          Next
        </button>
        <div class="slider-wrapper">
          <slider-controller
            ${ref(this.slider)}
            @SLIDER_SCROLLING_DONE="${this.handleScrollDone}"
          >
            <slide-item>
              <img src="https://picsum.photos/200/300" />
            </slide-item>
            <slide-item>
              <img src="https://picsum.photos/400/300" />
            </slide-item>
            <slide-item>
              <img src="https://picsum.photos/350/300" />
            </slide-item>
            <slide-item>
              <img src="https://picsum.photos/500/200" />
            </slide-item>
            <slide-item>
              <img src="https://picsum.photos/350/300" />
            </slide-item>
            <slide-item>
              <img src="https://picsum.photos/200/100" />
            </slide-item>
            <slide-item>
              <img src="https://picsum.photos/400/300" />
            </slide-item>
            <slide-item>
              <img src="https://picsum.photos/350/300" />
            </slide-item>
          </slider-controller>
        </div>
      </div>
    `
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "main-element": MainElement
  }
}
