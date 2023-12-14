import { html, LitElement } from "lit"
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js"
import { createRef, ref } from "lit/directives/ref.js"
import debounce from "lodash/debounce"
import findLast from "lodash/findLast"
import CSS from "./slider-controller.css"
import "./slide-item"

export const SLIDER_SCROLL = "SLIDER_SCROLL"

@customElement("slider-controller")
export class SliderController extends LitElement {
  static get styles() {
    return [CSS]
  }

  @property({ type: String }) imageWidth: string | undefined
  slide!: HTMLElement
  currentElement: HTMLElement | undefined
  debounceScroll: any
  debounceResize: any
  arrowLeft = createRef<HTMLElement>()
  arrowRight = createRef<HTMLElement>()
  container = createRef<HTMLElement>()

  @queryAssignedElements({ selector: "slide-item" })
  slideItems!: Array<HTMLElement>

  connectedCallback(): void {
    super.connectedCallback()
    this.debounceScroll = debounce(this.updateArrows, 300, {})
    window.addEventListener("resize", this.debounceResize)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.debounceScroll && this.debounceScroll.cancel()
    this.debounceResize && this.debounceResize.cancel()
    this.slide.removeEventListener("scroll", this.debounceScroll)
  }

  protected firstUpdated() {
    this.slide = this.shadowRoot?.querySelector(".container") as HTMLElement

    requestAnimationFrame(() => {
      this.slide.addEventListener("scroll", this.debounceScroll)
    })
  }

  public next() {
    this.handleNext()
  }

  public previous() {
    this.handlePrev()
  }

  private handleNext() {
    const nextItem = this.slideItems?.find((item) => {
      const parentX = this.slide?.getBoundingClientRect().x
      const dif = item.getBoundingClientRect().x - parentX

      return dif > 1
    }) // Rounding up

    this._scrollTo(nextItem)
  }

  private handlePrev() {
    const prevItem = findLast(this.slideItems, (item: HTMLElement) => {
      const parentX = this.slide?.getBoundingClientRect().x | 0
      const dif = item.getBoundingClientRect().x - parentX
      return dif < -1
    }) // Rounding down

    this._scrollTo(prevItem)
  }

  private _scrollTo(item: any) {
    if (!item) return

    this.currentElement?.removeAttribute("active")
    this.currentElement = item
    this.currentElement?.setAttribute("active", "true")
    item.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    })
    this.dispatchEvent(new CustomEvent(SLIDER_SCROLL))
  }

  private updateArrows = () => {
    const scrollLeft = Math.ceil(this.slide.scrollLeft)
    const scrollMax = this.slide.scrollWidth - this.slide.clientWidth

    if (scrollLeft === 0) this.arrowLeft.value?.setAttribute("disabled", "true")
    else this.arrowLeft.value?.removeAttribute("disabled")

    if (scrollLeft >= scrollMax)
      this.arrowRight.value?.setAttribute("disabled", "true")
    else this.arrowRight.value?.removeAttribute("disabled")
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
    "slider-controller": SliderController
  }
}
