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



## Methods

| Method     | Type      | Description                  |
| ---------- | --------- | ---------------------------- |
| next()    | method  | Slides to next slide-item |
| previous() | method | Slides to previous slide-item        |


## Getters

| Method     | Type      | Description                  |
| ---------- | --------- | ---------------------------- |
| currentIndex    | getter  | Gets the current index of the active slider |
| totalItems | getter | Gets the total number of slide-items        |
| hasPrevious | getter | Is there a previous slide-item? Good for disabling buttons fx.        |
| hasNext | getter | Is there a next slide-item? Good for disabling buttons fx.        |


## Event Listeners

| Event     | Type      | Description                  |
| ---------- | --------- | ---------------------------- |
| SLIDER_SCROLLING    | event  | Fires on each DOM scroll event |
| SLIDER_SCROLLING_DONE    | event  | Fires after scroll is done |



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

2. `--slider-controller-item-size`: This variable controls the size of the slides. You can set it to any valid CSS length value. The default is auto meaning that the items retain their natural size. For example, to set the size to 200px, you would do:

```css
slider-controller {
  --slider-controller-item-size: 200px;
}
```

Note that these variables should be set on the `slider-controller` element itself, not on the `:host` selector inside the `slider-controller`'s CSS.

In addition to these variables, you can also apply any other CSS styles to the `slider-controller` element as you would with any other HTML element. However, keep in mind that due to the Shadow DOM, styles applied outside the `slider-controller` will not affect the internal elements of the `slider-controller` (like the `.container` div). If you need to style these internal elements, you would need to modify the `slider-controller.css.ts` file directly.
