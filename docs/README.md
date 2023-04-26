# docs

## images
see also

* [Image performance cheat sheet](https://twitter.com/Steve8708/status/1506281613746917394)
* [Building an effective Image Component](https://developer.chrome.com/blog/image-component/)
* [HTMLImageElement: decoding property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding)

------

* [next image component](https://github.com/vercel/next.js/blob/canary/docs/api-reference/next/image.md)

I think this might be the source for the `next/image` component https://github.com/vercel/next.js/blob/641d419adac0d18c2c5d955333a645e72a4d509f/packages/next/src/client/image.tsx

------

* [Using Modern Image Formats: AVIF And WebP](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/)

### avif

> AVIF is a solid first choice if lossy, low-fidelity compression is acceptable and saving bandwidth is the number one priority. Assuming encode/decode speeds meet your needs.

> WebP is more widely supported and may be used for rendering regular images where advanced features like wide color gamut or text overlays are not required.

> AVIF compresses much better than most popular formats on the web today (JPEG, WebP, JPEG 2000, and so on).

> Note that there can be cases where WebP lossless can be better than AVIF lossless

-------------

* [the picture element](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/#progressive-enhancement)

### webp

> WebP is supported on the latest versions of almost all major browsers today.


see [the table](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/#summary)

### summary
> AVIF does check most of the boxes overall, and WebP has better support and offers better compression when compared to JPEG or PNG. As such, you should undoubtedly consider WebP support when optimizing images on your website. Evaluating AVIF if it meets your requirements and introducing it as a progressive enhancement could provide value as the format gets adopted across different browsers and platforms. 


-----------------


### [cloudinary](https://cloudinary.com/blog/how_to_adopt_avif_for_images_with_cloudinary)

[Converting to another image format](https://cloudinary.com/documentation/javascript_image_transformations#converting_to_another_image_format)

> There are three main ways to convert and deliver in another format:

* Specify the image's public ID with the desired extension.
* Explicitly set the desired format using the format action type of the delivery action.
* Use auto format to instruct Cloudinary to deliver the image in the most optimized format for each browser that requests it.


> Explicitly set the desired format using the format action type of the delivery action.

```js
 // Use the image with public ID, 'docs/shoes'.
const myImage = cld.image('docs/shoes');

// Set the format to GIF.
myImage.format('gif');
```

```js
new CloudinaryImage("sample.jpg").delivery(format(auto()));
```

> To let Cloudinary select the optimal format for each browser, set format to auto. For example, in Chrome, this image may deliver in .avif or .webp format (depending on your product environment setup):

```js
// Use the image with public ID, 'docs/shoes'.
const myImage = cld.image('docs/shoes');

// Request automatic format.
myImage.format('auto');
```

---------------------

[How Do I Do That?](https://cloudinary.com/blog/how_to_adopt_avif_for_images_with_cloudinary#how_do_i_do_that_)
```html
<picture>
  <source type="image/avif" srcset="dog.avif" />
  <source type="image/webp" srcset="dog.webp" />
  <img src="dog.jpg" alt="A dog chasing a ball." />
</picture>
```

---------------------

Set the quality:

```js
import { Cloudinary } from "@cloudinary/url-gen"

const cld = new Cloudinary({
    cloud: {
        cloudName: 'demo'
    }
})

const myImage = cld.image('sample')

const url = myImage
    .format('auto')
    .quality('auto')
    .toURL()
```

------------------------------------------

### [Art-directed responsive images using the picture element](https://cloudinary.com/documentation/responsive_html#art_directed_responsive_images_using_the_picture_element)

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
```