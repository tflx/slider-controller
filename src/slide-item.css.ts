import { css } from "lit"

const CSS = css`
  :host {
    display: block;
    box-sizing: border-box;
    scroll-snap-align: start;
    flex: 0 0 var(--slider-controller-item-size);
  }
`
export default CSS
