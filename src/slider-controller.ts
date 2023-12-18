import { html, LitElement } from "lit"
import { customElement, queryAssignedElements } from "lit/decorators.js"
import { createRef, ref } from "lit/directives/ref.js"
import debounce from "./debounce"
import CSS from "./slider-controller.css"
import { SlideItem } from "./slide-item"
import "./slide-item"

export const SLIDER_SCROLLING = "SLIDER_SCROLLING"
export const SLIDER_SCROLLING_DONE = "SLIDER_SCROLLING_DONE"

@customElement("slider-controller")
export class SliderController extends LitElement {
  static get styles() {
    return [CSS]
  }

  container = createRef<HTMLElement>()
  currentElement: SlideItem | undefined
  index: number = 0
  debouncedScroll: any
  debouncedResize: any

  @queryAssignedElements({ selector: "slide-item" })
  slideItems!: Array<SlideItem>

  connectedCallback(): void {
    super.connectedCallback()
    this.debouncedScroll = debounce(this._update, 300)
    this.debouncedResize = debounce(this._update, 300)
    window.addEventListener("resize", this.debouncedResize)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.debouncedResize.cancel()
    this.debouncedScroll.cancel()
    window.removeEventListener("resize", this.debouncedResize)
    this.sliderContainer?.removeEventListener("scroll", this.debouncedScroll)
  }

  protected firstUpdated() {
    requestAnimationFrame(() => {
      this.sliderContainer?.addEventListener("scroll", this.debouncedScroll)
    })
  }

  private get sliderContainer() {
    return this.container.value
  }

  public next() {
    this.handleNext()
  }

  public previous() {
    this.handlePrev()
  }

  public get currentIndex(): number {
    return this.index
  }

  public get totalItems(): number {
    return this.slideItems?.length || 0
  }

  public get hasPrevious(): boolean {
    if (!this.sliderContainer) return false

    const scrollLeft = Math.ceil(this.sliderContainer.scrollLeft)
    return scrollLeft > 0
  }

  public get hasNext(): boolean {
    if (!this.sliderContainer) return false

    const scrollLeft = Math.ceil(this.sliderContainer.scrollLeft)
    const scrollMax =
      this.sliderContainer.scrollWidth - this.sliderContainer.clientWidth
    return scrollLeft < scrollMax
  }

  private handleNext() {
    if (!this.sliderContainer) return false

    const parentX = this.sliderContainer.getBoundingClientRect().x
    const nextItem = this.slideItems?.find((item) => {
      const dif = item.getBoundingClientRect().x - parentX
      return dif > 1
    }) // Rounding up

    this._scrollTo(nextItem)
  }

  private handlePrev() {
    if (!this.sliderContainer) return false

    const parentX = this.sliderContainer?.getBoundingClientRect().x | 0
    const prevItem = this.slideItems?.findLast((item) => {
      const dif = item.getBoundingClientRect().x - parentX
      return dif < -1
    }) // Rounding down

    this._scrollTo(prevItem)
  }

  private _scrollTo(item: SlideItem | undefined) {
    if (!item) return

    item.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    })
    this.dispatchEvent(new CustomEvent(SLIDER_SCROLLING))
  }

  private _update = () => {
    if (!this.sliderContainer) return false

    this.currentElement?.removeAttribute("active")

    const parentX = this.sliderContainer.getBoundingClientRect().x
    this.index = this.slideItems?.findIndex((item) => {
      const x = item.getBoundingClientRect().x
      const hit = x - parentX >= 0
      if (hit) this.currentElement = item
      return hit
    })
    this.currentElement?.setAttribute("active", "true")

    this.dispatchEvent(new CustomEvent(SLIDER_SCROLLING_DONE))
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
