# blur hash
https://github.com/LukyVj/cloudinary-blurhash/blob/269ad69eeaa0d2a26fd729be6b9558c30cda0468/transformer/index.js#L3

example, [uses canvas in node](https://github.com/LukyVj/cloudinary-blurhash/blob/269ad69eeaa0d2a26fd729be6b9558c30cda0468/transformer/index.js#L4) to create the blurhash.

## canvas issue
about canvas issue, [see this](https://github.com/Automattic/node-canvas/issues/1733#issuecomment-761703018)

need to run the command
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

## good news
Can pass a local path to the node canvas -- https://github.com/Automattic/node-canvas/blob/5bd5b243c4353fb9bdf03287e993104964cc0c39/examples/image-src-svg.js#L10

----------------------------

[css tricks article](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/#aa-a-working-example)

[the pen related](https://codepen.io/thatemil/pen/yYmaqG/?editors=0110)

Here they look at inline css to find the URL of the bg-image in `.enhanced-post-head`. Then they download that image into a dummy image element, and when that download has finished, they change the classname on the post header element.

We want something more automated. Need to create a base64 image at build time, not run time.

```css
.post-header {
    /* base 64 background image */
    background-image: url(data:image/gif;base64,R0lGODlh)
}

.post-header-enhanced {
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/401949/largeimg.jpg);
}
```

>  The very first request will load the tiny image in inline CSS, then the high-res background comes after first render.

> Get the URL to the large image from the inline CSS, and preload it using JavaScript.

^ This is the important / hard part

> When the large image is loaded, add a class name that toggles the CSS to use the large image

```js
// `img` here is just a `new Image()`
const img = new Image();

// Assign an onLoad handler to the dummy image *before* assigning the src
img.onload = function() {
    // this means the full image has downloaded
    // *the full image has downloaded, so change the classname on the element*

    // we just change the class on the element, thus using the URL for the real
    // image, not a base64 URL
    // this depends on the browser using a cache to get the same image that we
    // loaded in the dummy image
    header.className += ' ' + enhancedClass;
};

// trigger the whole preloading chain by giving the dummy
// image its source.
if (bigSrc) {
    img.src = bigSrc;
}
```

### animation

```css
.post-header-enhanced {
    animation: sharpen .5s both;
}
```


-----------------------------------------------------------

************
## example with `img` tags
************

[example using img elements, not background](https://blog.yipl.com.np/keep-on-hacking-frontend-quicktips-3-medium-site-like-image-loading-blur-effect-a7fe052c44f6)

they just append the new image to the dom:
```js
placeholder.appendChild(imgLarge);
```
And then change the class when it has loaded.

```js
function loadImage (placeholder) {
    var small = placeholder.children[0];
    // 1: load small image and show it
    var img = new Image();

    img.onload = () => small.classList.add('loaded');
    img.src = small.src;

    // 2: load large image
    var imgLarge = new Image();
    imgLarge.classList.add('sharp');
    imgLarge.onload = () => imgLarge.classList.add('loaded');

    // here -- need to get the src url for the real image
    imgLarge.src = placeholder.dataset.large;

    placeholder.appendChild(imgLarge);
}
```

By default, images here have opacity 0
```css
.placeholder img {
    position: absolute; 
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.5s linear;
}
```

The `.loaded` class gives them opacity 1
```css
.placeholder img.loaded {
    opacity: 1;
}
```

I think the animation from css-tricks might be better than the simple opacity transition though
```css
@supports (background-image: filter(url('i.jpg'), blur(1px))) {
  .post-header {
    transform: translateZ(0);
  }
  .post-header-enhanced {
    animation: sharpen 1s both;
  }
  @keyframes sharpen {
    from {
      background-image: filter(url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/401949/largeimg.jpg), blur(20px));
    }
    to {
      background-image: filter(url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/401949/largeimg.jpg), blur(0px));
    }
  }
}
```

would want to use the class `.loaded` instead
```css
img.sharp.loaded {
    animation: sharpen 1s both;
}
```

----------

Try filter on the image element
```css
@keyframes sharpen {
    from {
        filter: blur(20px);
    to {
        filter: blur(0px)
    }
}
```
