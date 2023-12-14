import { css } from "lit"

const CSS = css`
  :host {
    display: inline-flex;
  }

  :host(:first-child):before {
    content: "";
    display: inline;
    flex: 0 0 auto;
    flex-basis: var(--slider-controller-start-gap);
  }

  :host(:last-child):after {
    content: "";
    display: inline;
    flex: 0 1 auto;
    flex-basis: var(--slider-controller-end-gap);
  }
`

export default CSS
