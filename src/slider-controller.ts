/* eslint-disable import/no-duplicates */
import { gsap } from 'gsap'
import { Power3 } from 'gsap/gsap-core'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { html, LitElement } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'
import { createRef, ref } from 'lit/directives/ref.js'
import debounce from 'lodash/debounce'
import findLast from 'lodash/findLast'
import CSS from './slider-controller.css'

export const SLIDER_SCROLL = 'SLIDER_SCROLL'

@customElement('slider-controller')
export class SliderController extends LitElement {
  static get styles() {
    return [CSS]
  }

  // Declare reactive properties
  @property({ type: String }) imageWidth:string|undefined
  slide!: HTMLElement
  currentElement: HTMLElement | undefined
  debounceScroll: any
  debounceResize: any
  arrowLeft = createRef<HTMLElement>()
  arrowRight = createRef<HTMLElement>()
  container = createRef<HTMLElement>()

  @queryAssignedElements({selector: 'slide-item'})
  slideItems!: Array<HTMLElement>;

  connectedCallback(): void {
    super.connectedCallback()
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
    this.debounceScroll = debounce(this.updateArrows, 300, {})
    window.addEventListener('resize', this.debounceResize)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.debounceScroll && this.debounceScroll.cancel()
    this.debounceResize && this.debounceResize.cancel()
    this.slide.removeEventListener('scroll', this.debounceScroll)
  }

  protected firstUpdated() {
    this.slide = this.shadowRoot?.querySelector('.container') as HTMLElement

    requestAnimationFrame(() => {
      this.slide.addEventListener('scroll', this.debounceScroll)
    })
  }

  public next() {
    this.handleNext()
  }

  public previous() {
    this.handlePrev()
  }

  private handleNext() {
    const nextItem = this.slideItems?.find(item => {
      const parentX = this.slide?.getBoundingClientRect().x
      const dif = item.getBoundingClientRect().x - parentX

      return dif > 1
    }) // Rounding up

    this._scrollTo(nextItem)
  }

  private handlePrev() {
    const prevItem = findLast(this.slideItems, item => {
      const parentX = this.slide?.getBoundingClientRect().x | 0
      const dif = item.getBoundingClientRect().x - parentX
      return dif < -1
    }) // Rounding down

    this._scrollTo(prevItem)
  }

  private _scrollTo(item: any) {
    this.currentElement?.removeAttribute('active')
    this.currentElement = item
    this.currentElement?.setAttribute('active', 'true')
    gsap.to(this.slide, { duration: 0.5, ease: Power3.easeInOut, scrollTo: { x: item || 0, y: 0 } })
  }


  private updateArrows = () => {
    const scrollLeft = Math.ceil(this.slide.scrollLeft)
    const scrollMax = this.slide.scrollWidth - this.slide.clientWidth
    this.dispatchEvent(new CustomEvent(SLIDER_SCROLL))

    // setBooleanAttribute(this.arrowLeft.value as HTMLElement, 'disabled', scrollLeft === 0)
    if (scrollLeft === 0) this.arrowLeft.value?.setAttribute('disabled', 'true')
    else this.arrowLeft.value?.removeAttribute('disabled')

    // setBooleanAttribute(this.arrowRight.value as HTMLElement, 'disabled', scrollLeft >= scrollMax)
    if (scrollLeft >= scrollMax) this.arrowRight.value?.setAttribute('disabled', 'true')
    else this.arrowRight.value?.removeAttribute('disabled')
  }

  render() {
    return html`
      <div ${ref(this.container)} class="container">
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'slider-controller': SliderController
  }
}
