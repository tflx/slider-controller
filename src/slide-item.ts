import { html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"

import CSS from "./slide-item.css"

@customElement("slide-item")
export class SlideItem extends LitElement {
  static get styles() {
    return [CSS]
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="slider-item-wrapper">
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "slide-item": SlideItem
  }
}
