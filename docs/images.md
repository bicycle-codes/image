# images

## links
* [many tips for image perf into this one cheat sheet](https://twitter.com/Steve8708/status/1506281613746917394)
* [avif has landed](https://jakearchibald.com/2020/avif-has-landed/)

## guide
https://cloudinary.com/blog/for_developers_the_html_picture_element_explained

## the source element
> Each `<source>` element has a `srcset` attribute, and a **`media` attribute** that specifies the *minimum width* from which to display one of the images given in the `srcset` attribute.

> if the viewport is at least 800 pixels wide, the browser chooses an image from the `srcset` in this source:

```html
<source 
  media="(min-width: 800px)"
  srcset="https://res.cloudinary.com/demo/image/upload/ar_2:1,c_fill,g_face/f_auto/q_auto/c_scale,w_800/docs/guitar-man.jpg 800w, https://res.cloudinary.com/demo/image/upload/ar_2:1,c_fill,g_face/f_auto/q_auto/c_scale,w_1600/docs/guitar-man.jpg 1600w"
  sizes="100vw" />
```

## the srcset attribute
[The srcset attribute](https://cloudinary.com/documentation/responsive_html#the_srcset_attribute)

> The srcset attribute specifies the different sized images, together with a width descriptor for each.

> The width descriptor tells the browser what the image's width is, so for example, 256w means 256 pixels. **The browser decides which image to load based on the width of the viewport.**

```html
srcset="https://res.cloudinary.com/demo/image/upload/f_auto/q_auto/c_scale,w_256/docs/house.jpg 256w,
```

## the sizes attribute
[The sizes attribute](https://cloudinary.com/documentation/responsive_html#the_sizes_attribute)

> The sizes attribute tells the browser which size of image to use for different page layouts.

> the following means if the viewport is at least 50em wide, the image will be 50em wide. Otherwise, the image will be 100vw wide

**This is like setting a max width on the image** A max of `50em` in this case. Since if the viewport is below `50em`, then the width will be `100vw`, it has a fixed max size of `50em`.

```html
sizes="(min-width: 50em) 50em, 100vw"
```

[picture element, via cloudinary](https://cloudinary.com/blog/for_developers_the_html_picture_element_explained#attributes)

> `<sizes>` takes effect only if you also specify the width dimension-descriptor with <srcset>

## the picture element
[Art-directed responsive images using the picture element](https://cloudinary.com/documentation/responsive_html#art_directed_responsive_images_using_the_picture_element)

```html
<picture>
    <source 
    media="(min-width: 800px)"
    srcset="https://res.cloudinary.com/demo/image/upload/ar_2:1,c_fill,g_face/f_auto/q_auto/c_scale,w_800/docs/guitar-man.jpg 800w, 
    https://res.cloudinary.com/demo/image/upload/ar_2:1,c_fill,g_face/f_auto/q_auto/c_scale,w_1600/docs/guitar-man.jpg 1600w"
    sizes="100vw" />  

    <source 
    media="(min-width: 600px)"
    srcset="https://res.cloudinary.com/demo/image/upload/f_auto/q_auto/c_scale,w_600/docs/guitar-man.jpg 600w, 
    https://res.cloudinary.com/demo/image/upload/f_auto/q_auto/c_scale,w_1200/docs/guitar-man.jpg 1200w"
    sizes="100vw" />

    <img
    srcset="https://res.cloudinary.com/demo/image/upload/ar_1:1,c_thumb,g_face/f_auto/q_auto/c_scale,w_400/docs/guitar-man.jpg 400w, 
    https://res.cloudinary.com/demo/image/upload/ar_1:1,c_thumb,g_face/f_auto/q_auto/c_scale,w_800/docs/guitar-man.jpg 800w"
    src="https://res.cloudinary.com/demo/image/upload/f_auto/q_auto/c_scale,w_400/docs/guitar-man.jpg"
    alt="Man playing guitar"
    sizes="100vw" />   
</picture>
```

-----------------------------------------------

[MDN -- The Media or Image Source element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source)

[the `media` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#media) -- a media query


------------------------------------------

--------------------
## sizes
--------------------

[MDN page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes)

> One or more strings separated by commas, indicating a set of source sizes. Each source size consists of:

> A media condition. This must be omitted for the last item in the list.
> A source size value.

> Media Conditions describe properties of the viewport, not of the image. For example, `(max-height: 500px) 1000px` proposes to use a source of 1000px width, if the viewport is not higher than 500px.

---------------------------



**note**
> If the `srcset` attribute uses width descriptors, the sizes attribute must also be present, or the `srcset` itself will be ignored.



------------

> `srcset` defines the set of images we will allow the browser to choose between,

**sizes**

[see responsive page](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)


```
sizes="(max-width: 600px) 480px, 800px"
```

> A media condition `(max-width:600px)` -- a media condition describes a possible state that the screen can be in. In this case, we are saying "when the viewport width is 600 pixels or less".

`sizes` defines a set of media conditions (e.g. screen widths) and indicates what image size would be best to choose, when certain media conditions are true --

> The width of the slot the image will fill when the media condition is true (480px)

This is how wide the image will be when the screen size is less than 600px

Thinking about my demo...
* the css sizes the image to 50vw
* so you would want a `sizes` of `(max-width:1000px) 500px, ...`
or do it like

```
sizes="50vw"
```
That means choose a size that is half the viewport width

> **Note**: For the slot width, rather than providing an absolute width (for example, 480px), you can alternatively provide a width relative to the viewport (for example, 50vw) 

```
sizes="(max-width: 600px) 480px,
       800px"
```

> **note** the last slot width has no media condition (this is the default that is chosen when none of the media conditions are true).

> The browser ignores everything after the first matching condition, so be careful how you order the media conditions.

--------------------

depends on our css... **Need a way to pass in a sizes array**


------------------------------

## common breakpoints

* Mobile devices – 320px — 480px.
* iPads, Tablets – 481px — 768px.
* Small screens, laptops – 769px — 1024px.
* Desktops, large screens – 1025px — 1200px.
* Extra large screens, TV – 1201px, and more.
