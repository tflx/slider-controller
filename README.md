# Slider Controller

The `SliderController` is a custom web component built using the `LitElement` library. It provides a slider functionality for a collection of `SlideItem` elements.

## Installation

You can install the `SliderController` using npm.

```bash
npm install slider-controller
```

Then, you need to import the `SliderController` and `SlideItem` in your project.

```typescript
import "slider-controller"
import "slide-item"
```

## Usage

To use the `SliderController`, you need to include it in your HTML as a custom element. The `SlideItem` elements should be nested inside the `SliderController`.

```html
<slider-controller>
  <slide-item>Slide 1</slide-item>
  <slide-item>Slide 2</slide-item>
  <slide-item>Slide 3</slide-item>
  <!-- Add more slide items as needed -->
</slider-controller>
```

Each `SlideItem` represents a single slide in the slider. You can put any content inside a `SlideItem`.

The `SliderController` automatically handles the scrolling behavior of the slides. It also emits custom events `SLIDER_SCROLLING` and `SLIDER_SCROLLING_DONE` which you can listen to for custom behavior.

## Event Listeners

You can add event listeners to the `SliderController` to listen for the `SLIDER_SCROLLING` and `SLIDER_SCROLLING_DONE` events.

```javascript
document
  .querySelector("slider-controller")
  .addEventListener("SLIDER_SCROLLING", function () {
    console.log("Slider is scrolling")
  })

document
  .querySelector("slider-controller")
  .addEventListener("SLIDER_SCROLLING_DONE", function () {
    console.log("Slider has finished scrolling")
  })
```

…or with LitElement's `@eventListener` decorator.

```html
handleScrollDone = () => {
  …
}

render() {
    return html`
      <slider-controller @SLIDER_SCROLLING_DONE="${this.handleScrollDone}">
        <slide-item>Slide 1</slide-item>
        <slide-item>Slide 2</slide-item>
        <slide-item>Slide 3</slide-item>
        <!-- Add more slide items as needed -->
      </slider-controller>
    `
  }
```

## Getters

Get the current index of the slider:

```javascript
document.querySelector("slider-controller").currentIndex
```

Get the total number of slides in the slider:

```javascript
document.querySelector("slider-controller").totalSlides
```

Determine if the slider can scroll to the next slide:

```javascript
document.querySelector("slider-controller").hasNext
```

Determine if the slider can scroll to the previous slide:

```javascript
document.querySelector("slider-controller").hasPrev
```

## Cleanup

The `SliderController` automatically cleans up its event listeners when it is disconnected from the DOM. You don't need to manually remove the event listeners.

## Note

The `SliderController` uses a debounced scroll and resize event to improve performance. The debounce delay is currently set to 300ms.

## Styling

The `SliderController` component uses CSS variables for some of its styles, which you can override in your own CSS. Here's how you can do it:

1. `--slider-controller-gap`: This variable controls the gap between the slides. You can set it to any valid CSS length value. For example, to set the gap to 20px, you would do:

```css
slider-controller {
  --slider-controller-gap: 20px;
}
```

2. `--slider-controller-item-size`: This variable controls the size of the slides. You can set it to any valid CSS length value. For example, to set the size to 200px, you would do:

```css
slider-controller {
  --slider-controller-item-size: 200px;
}
```

Note that these variables should be set on the `slider-controller` element itself, not on the `:host` selector inside the `slider-controller`'s CSS.

In addition to these variables, you can also apply any other CSS styles to the `slider-controller` element as you would with any other HTML element. However, keep in mind that due to the Shadow DOM, styles applied outside the `slider-controller` will not affect the internal elements of the `slider-controller` (like the `.container` div). If you need to style these internal elements, you would need to modify the `slider-controller.css.ts` file directly.
