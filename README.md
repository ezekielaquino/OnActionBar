# OnActionBar
Detects whether or not iOS Safari's user interface is in its initial state or collapsed state.

![Preview](https://im2.ezgif.com/tmp/ezgif-2-9400205f92.gif)

## What and why
There have been many times where I wished Apple would come up with some sort of CSS/any kind of hook when the navigation bar and action bar collapses on initial scroll and scroll up. The reasons for wanting such a thing might be because of a fixed position element that requires the full viewport height– or anything that needs be done that requires a viewport height.

I haven't really found anything that "exposed" this event so I went ahead and attempted to do just that.
This little snippet (945 bytes) simply checks whether or not the UI is `collapsed` on a mobile device and allows for the user to do things when the event happens.

```js
new OnActionBar({
  onInit: data => onInit(data),
  onVisible: data => onVisible(data),
  onCollapse: data => onCollapse(data),
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
