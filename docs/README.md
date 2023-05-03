# docs

## see also
* [A Guide to the Responsive Images Syntax in HTML](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/#using-srcset)
* [Image performance cheat sheet](https://twitter.com/Steve8708/status/1506281613746917394)
* ["Blur Up" technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/)
* [Responsive Images Done Right: A Guide To `<picture>` And `srcset`](https://www.smashingmagazine.com/2014/05/responsive-images-done-right-guide-picture-srcset/)

----

* [Building an effective Image Component](https://developer.chrome.com/blog/image-component/)
* [avif has landed](https://jakearchibald.com/2020/avif-has-landed/)
* [HTMLImageElement: decoding property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding)
* [Using Modern Image Formats: AVIF And WebP](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/)
* [the picture element](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/#progressive-enhancement)
[css-tricks responsive image article](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/)

-----

* [Using the srcset and sizes attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#using_the_srcset_and_sizes_attributes)


## common breakpoints

* Mobile devices – 320px — 480px.
* iPads, Tablets – 481px — 768px.
* Small screens, laptops – 769px — 1024px.
* Desktops, large screens – 1025px — 1200px.
* Extra large screens, TV – 1201px, and more.


--------------------


If the viewport is greater than 50em, then the image will be 50em wide. Else, it is 100vw. So 100vw if the screen size is less than 50em.

```
sizes="(min-width: 50em) 50em, 100vw"
```
