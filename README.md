# OnActionBar
Detects whether or not iOS Safari's user interface is in its initial state or collapsed state.

![Preview](https://d26dzxoao6i3hh.cloudfront.net/items/1u0V0Z3m3M3Y090L0v2T/ezgif-2-9400205f92.gif?v=dcdf51af)

*Note: `actionBarHeight` is removed since this is consistent across devices (44px)

## What and why
There have been many times where I wished Apple would come up with some sort of CSS/any kind of hook when the navigation bar and action bar collapses on initial scroll and scroll up. This is not likely to happen, since Apple is firm about it being a feature. The reasons for wanting such a thing might be because of a fixed position element that requires the full viewport height or just anything that takes in a 100vh dimension; this works well on desktop, chrome, etc. but is a pain when you're dealing with Safari's collapsing mobile UI.

I haven't really found anything that "exposed" this event so I went ahead and attempted to do just that.
This little snippet (934 bytes) simply checks whether or not the UI is `collapsed` on a mobile device and allows for the user to do things when the event happens.

The module provides the following data:

```
{
  initialHeight: int, -> the height of the viewport when the page loads (UI is visible)
  collapsedHeight: int, -> the height of the viewport when the UI is collapsed
  isCollapsed: bool
}
```

## Usage
Create a new `OnActionBar` instance which only gets instantiated if the device is iOS (iPhone/iPad). You can pass `onInit`, `onVisible`, `onCollapse` callbacks within the options, as well as toggling `setAttribute` which sets a class on the document when a change in the UI occurs (`.is-actionbar` and the device class `.iphone`/`.ipad`).

```js
new OnActionBar({
  onInit: data => onInit(data), // fires when instatiated
  onVisible: data => onVisible(data), // when the UI expands (visible)
  onCollapse: data => onCollapse(data), // when the UI minimizes
  setAttribute: true // set classes on root element
});

function onInit(data) {
  // data returned contains initialHeight: int, collapsedHeight: int, isCollapsed: bool
  console.log(data.initialHeight);
}

function onVisible(data) {
  // you can even set css variables and use that in the stylesheet
  document.documentElement.style.setProperty('--viewportHeight', `${data.initialHeight}px`);
  
  console.log('The UI is NOT collapsed!');
}

function onCollapse(data) {
  document.documentElement.style.setProperty('--viewportHeight', `${data.collapsedHeight}px`);

  console.log(`The collapsed height is ${data.collapsedHeight}`);
}
```

```css
// css variables are cool
.some-element {
  height: var(--viewportHeight);
}

// if `setAttribute` is true, then classes for device and state are appended to root element
.is-actionbar .some-element {
  background: blue;
}
```

## Note
This is untested and was the result of an exercise (you know those nights when you've had enough of Stranger Things and go like, ok), so this is experimental. It `might` be useful and hope that it helps someone achieve their `dreams`.

Suggestions, issues and pull requests are appreciated!

❤️
