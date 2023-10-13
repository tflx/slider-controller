import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { createRef, ref } from 'lit/directives/ref.js'

import CSS from './slide-item.css'

@customElement('slide-item')
export class SlideItem extends LitElement {
  static get styles() {
    return [CSS]
  }

  private wrapper = createRef<HTMLElement>()

  connectedCallback(): void {
    super.connectedCallback()
    gsap.registerPlugin(ScrollTrigger)

    requestAnimationFrame(() => {
      this.initScrollTrigers()
    })
  }

  private initScrollTrigers() {
    if (!this.wrapper.value) return
    const delay =
      window.innerWidth > this.getBoundingClientRect().left
        ? this.getBoundingClientRect().left / 10000
        : 0.2

    ScrollTrigger.create({
      trigger: this,
      start: 'top bottom-=150px',
      end: 'top top',
      // markers: true,
      animation: gsap.to(this.wrapper.value, {
        x: 0,
        duration: 0.8,
        delay: delay,
        ease: 'sine.out',
        onComplete: () => {
          this.dispatchEvent(new CustomEvent('slide-animation-done'))
        },
      }),
    })
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div ${ref(this.wrapper)} class="slider-item-wrapper">
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'slide-item': SlideItem
  }
}
