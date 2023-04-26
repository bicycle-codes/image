# images

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

**This is like setting a max width on the image** A max of `50em` in this case. Since if the viewport is below `50em`, then the width will be `100vw`, and above `50em`, it has a fixed size of `50em`.

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
