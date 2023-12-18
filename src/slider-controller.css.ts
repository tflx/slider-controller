import { css } from "lit"

const CSS = css`
  :host {
    display: block;
    position: relative;
    box-sizing: border-box;

    --slider-controller-gap: 0;
    --slider-controller-item-size: auto;
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
`
export default CSS
