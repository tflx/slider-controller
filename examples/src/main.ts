import CSS from "./style.css.ts"
import "slider-controller"
import { html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { SliderController } from "slider-controller"

@customElement("main-element")
export class MainElement extends LitElement {
  static get styles() {
    return [CSS]
  }

  slider: Ref<SliderController> = createRef()

  handleNext = () => {
    this.slider.value?.next()
  }
  handlePrev = () => {
    this.slider.value?.previous()
  }

  render() {
    return html`
      <div>
        <div style="height: 110vh;"></div>
        <button @click="${this.handlePrev}">Prev</button>
        <button @click="${this.handleNext}">Next</button>
        <div class="slider-wrapper">
          <slider-controller ${ref(this.slider)}>
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
              <img src="https://picsum.photos/350/300" />
            </slide-item>
          </slider-controller>
        </div>
        <div style="height: 110vh;"></div>
      </div>
    `
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "main-element": MainElement
  }
}
