import { css } from "lit"

const CSS = css`
  :host {
    display: block;
    position: relative;

    --slider-controller-gap: 0;
    --slider-controller-item-size: auto;
    --slider-controller-start-gap: 0;
    --slider-controller-end-gap: 0;
  }

  :host,
  ::slotted(slide-item) {
    box-sizing: border-box;
  }

  .container {
    box-sizing: border-box;
    scroll-snap-type: x mandatory;
    display: flex;
    gap: var(--slider-controller-gap);
    width: 100%;
    height: auto;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  ::slotted(slide-item) {
    scroll-snap-align: start;
    flex: 1 0 auto;
    flex-basis: var(--slider-controller-item-size);
  }
`

export default CSS
