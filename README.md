# image
![tests](https://github.com/nichoth/image/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@nichoth/image)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue)](README.md)
[![license](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)

Create responsive `img` tags, with a `srcset` property that allows browsers to download the best size image. Optionally, create a small, blurry image as a placeholder for the image with the [blur up technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/).

You need to define two things -- a list of sizes of images that are available:
```js
[300, 600, 900]
```

And the *media condition* for the [sizes attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes):
```html
<img sizes="(min-width: 50em) 50em, 100vw" />
```

This is designed to work easily with either [Cloudinary](https://cloudinary.com/) or locally hosted image files. If you are hosting images locally, you may want to create multiple resolutions of the images. For this, see [the section on resizing images](#resizing-images).

__See also__

[The links to articles](#some-links)


## install
```
npm i -S @nichoth/image
```

## demonstration
[See a demonstration of this](https://nichoth-image.netlify.app/), with the `tonic` components.

![Demo](docs/image.png)

**note**
Use the dev tools to throttle the internet speed, and load in a mobile view. You should see that the requests are made for a smaller version of the image.

## develop
* build consumable files: `npm run build`
* start a local demo: `npm start`. Also, edit the `index.html` file in `example` to test different implementations.

## test
Run all tests:
```
npm test
```

Run the tests for HTML generation:
```
npm run test-html
```

## examples

--------------

* [preact](#preact)
* [tonic](#tonic)
* [plain html](#html)
* [base64 placeholders](#base64-placeholders)
* [resizing images](#resizing-images)

--------------

In general this will create defaults for attributes. The only required attributes are `filename` and `alt`. Everything else has defaults.
```ts
interface Props {
    class?:string,
    className?:string,
    filename:string,
    alt:string,
    loading?:'eager'|'lazy',
    fetchpriority?:'high'|'low'|'auto',
    decoding?:'sync'|'async',
    sizes?:string[],
    srcset?: number[]
}
```

The default `srcset` attribute has these sizes:
```js
const defaultSizes = [1024, 768, 480]
```

## preact

### preact + cloudinary
Create an `<img>` element with a `srcset` attribute with relevant image sources.

```ts
import { html } from 'htm/preact'
import { render } from 'preact'
import { CloudinaryImg } from '@nichoth/image/cloudinary/preact'
import '@nichoth/image/style.css'
import './my-style.css'

//
// create an image tag with a good default `srcset` attribute
//
const { Image } = CloudinaryImg({ cloudName: 'nichoth' })

const Example = function () {
    return html`<div>
        <p>image</p>
        <${Image} filename=${'testing'} class=${'my-image-test'}
            sizes=${['50vw']}
        />
    </div>`
}

//
// or pass in a custom `srcset` as an array of image widths
//
const CustomSrc = function () {
    return html`<${Image} filename=${'testing'} class=${'my-image-test'}
        sizes=${['50vw']} srcset=${[300, 600, 1000]}`
}

render(html`<${Example} />`, document.getElementById('root'))
```


### preact + cloudinary -- blur up image
Create an image with a *blur up* placeholder.

```js
import { html } from 'htm/preact'
import { render } from 'preact'
import { CloudinaryImage } from '@nichoth/image/cloudinary/preact'
import '@nichoth/image/css'
import './my-style.css'

const { BlurredImage } = CloudinaryImage({ cloudName: 'nichoth' })
const placeholderImg = 'data:image/jpeg;base64,/9j/4AAQSkZJ...'

//
// create using the default srcset
//
const Example = function () {
    return html`<${BlurredImage} filename=${'testing'} class=${'blur-test'}
        blurPlaceholder=${placeholderImg}
        sizes=${['50vw']}
    />`
}

// or pass in a custom srcset:
// srcset=${[300, 600, ...]}
```


### preact + local files
Create an `img` tag that links to locally hosted files. See [the CLI section](#base64-cli) for info on creating images of different sizes.

**note**
This uses a naming convention for image files. If you are dealing with a file `my-file.jpg`, then alternate resolutions should be named like `my-file-400.jpg`, `my-file-800.jpg`, etc, for versions that are `400` and `800` px wide.

```js
import { html } from 'htm/preact'
import { render } from 'preact'
import { Image, BlurredImage } from '@nichoth/image/preact'
import '@nichoth/image/style.css'
import './my-style.css'

const placeholderImg = 'data:image/jpeg;base64,/9j/4AAQSkZJ...'

const Example = function () {
    return html`<div>
        <p>hello</p>

        <p>non-blurry image</p>
        <div class="non-blurry-wrapper">
            <${Image} filename=${'/100.jpg'} class=${'non-blurry-image'}
                sizes=${['50vw']}
            />
        </div>

        <p>blurry image</p>
        <${BlurredImage} filename=${'/100.jpg'} class=${'blur-test'}
            blurPlaceholder=${placeholderImg}
            sizes=${['50vw']}
        />
    </div>`
}

render(html`<${Example} />`, document.getElementById('root'))
```

----------------------

## tonic

### tonic + cloudinary
Create a [tonic](https://tonicframework.dev/) component for an `img` tag with a good defualt `srcset` attribute.

```js
import Tonic from '@nichoth/tonic'
import { CloudinaryTonic } from '@nichoth/image/cloudinary/tonic'
import '@nichoth/image/style.css'
import './my-style.css'

const { ImageTag, BlurredImage } = CloudinaryTonic({ cloudName: 'nichoth' })
const placeholderImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...'

const sizes = ['50vw']

// `maxWidth` below is used as the `src` attribute on the image tag
// so it is used if the browser doens't understnad the `srcset` attribute

class TheApp extends Tonic {
    render () {
        return this.html`<div class="the-app">
            <image-tag
                id="tag-test"
                filename="testing"
                sizes=${sizes.join(', ')}
            ></image-tag>

            <blurred-image
                id="test"
                filename="testing"
                blurplaceholder=${placeholderImg}
                sizes=${sizes.join(', ')}
                maxWidth=${[1024]}
            ></blurred-image>
        </div>`
    }
}

Tonic.add(ImageTag)
Tonic.add(BlurredImage)
Tonic.add(TheApp)
```

### tonic + local files
Create tonic components that link to locally hosted files.

**note**
This uses a naming convention for image files. If you are dealing with a file `my-file.jpg`, then alternate resolutions should be named like `my-file-400.jpg`, `my-file-800.jpg`, etc, for versions that are `400` and `800` px wide.

```js
import Tonic from '@nichoth/tonic'
import { ImageTag, BlurredImage } from '@nichoth/image/tonic'
import '@nichoth/image/style.css'
import './my-style.css'

const placeholderImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...'
const sizes = ['50vw']

// `maxWidth` below is used as the `src` attribute on the image tag
// so it is used if the browser doens't understnad the `srcset` attribute

class TheApp extends Tonic {
    render () {
        return this.html`<div class="the-app">
            <image-tag
                id="tag-test"
                filename="/100.jpg"
                sizes=${sizes.join(', ')}
            ></image-tag>

            <blurred-image
                id="test"
                filename="/100.jpg"
                blurplaceholder=${placeholderImg}
                sizes=${sizes.join(', ')}
                maxWidth=${[1024]}
            ></blurred-image>
        </div>`
    }
}

Tonic.add(ImageTag)
Tonic.add(BlurredImage)
Tonic.add(TheApp)
```

------------------------------------------------------

## HTML
Generate HTML strings instead of components.

### HTML with local files

**note**
This uses a naming convention for image files. If you are dealing with a file `my-file.jpg`, then alternate resolutions should be named like `my-file-400.jpg`, `my-file-800.jpg`, etc, for versions that are `400` and `800` px wide.

```js
// node js
import { html } from '@nichoth/image'

const markup = html({
    filename: '/aaa.jpg',
    alt: 'test picture',
})

console.log(markup)

// =>
// <div class="image">
//     <img
//         alt="test picture"
//         srcset="/aaa-1024.jpg 1024w, /aaa-768.jpg 768w, /aaa-480.jpg 480w"
//         sizes="100vw"
//         src="/aaa.jpg"
//         decoding="auto"
//         loading="lazy"
//         fetchpriority="low"
//     >
// </div>
```

### HTML with cloudinary
```js
import { CloudinaryImage } from '@nichoth/image/cloudinary'

// pass in your cloudinary name
const { Image } = CloudinaryImage('nichoth')

const html = Image({
    filename: 'bbb.jpg',
    alt: 'testing'
})
```

-----------------------------------------------------


## base64 placeholders
We need small base64 encoded strings to use as placeholder images for the blur up effect.

### base64 CLI
Use the CLI to generate a small base64 encoded image to use as a blurry placeholder while a better quality image downloads.

First install this locally
```bash
npm i -S @nichoth/image
```

Then call the node binary file included, aliased locally as `image.stringify`.

`--size` option is optional. The default is 40px. 

```
-s, --size     The width of the base64 image                          [number]
```


#### CLI + local file
Convert a local file to base64 (this will write to `stdout`):

```bash
npx image.stringify ./my-local-file.jpg --size 40
```

#### CLI + cloudinary
Or use Cloudinary as an image source:

```bash
npx image.stringify my-cloud-name my-filename.jpg -s 20
```

#### Write the base64 string to a file
Use the shell to redirect output to a file:

```bash
npx image.stringify my-cloud-name my-filename.jpg > ./my-filename.base64
```

### node
Use the exported functions `getImgFile` and `getImgCloudinary` to create base64 encoded strings in node.

```js
import { getImgFile, getImgCloudinary } from '@nichoth/image/bin/to-string'

const base64FromLocalFile = getImgFile('./file.jpg')

// (cloudName, filename)
const base64FromCloudinary = getImgCloudinary('nichoth', 'my-file.jpg')
```

**note**
There's no CJS version of the base64 functions because I used top level `await`.

-----------------------------------

## resizing images
Create multiple resolutions of a single source image. This is suitable for the default resolution options that are created for the `srcset` attribute in the client side JS.

First install locally:
```bash
npm i -S @nichoth/image
```

Then run via `npx`
```bash
npx image.resize ./file.jpg --output ./output-dir
```

This will create 4 files in the output directory -- `file-480.jpg`, `file-768.jpg`, `file-1024.jpg`, and `file.jpg`. It will copy the original file in addition to resizing it to new versions.

### node
Or use this in node

```js
import { resize, defaultSizes } from '@nichoth/image/resize'

// (filename, outputDir, sizes) {
await resize('./my-file.jpg', './output-dir', defaultSizes)
// ./output-dir now contains the default resolutions of my-file.jpg
```
 
## some links

See this nice article for more information about images -- [A Guide to the Responsive Images Syntax in HTML](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/#using-srcset)

[bholmes.dev -- Picture perfect image optimization](https://bholmes.dev/blog/picture-perfect-image-optimization/)

This project also includes tools to help with the ["Blur Up" technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/), which means creating a nice blurred placeholder image while a high resolution image downloads, then switching them out, so the high res image is visible when it's ready

See [the section on the CLI](#base64-placeholders) for info on creating base64 strings of images.

[A guide to getting the dominant color](https://manu.ninja/dominant-colors-for-lazy-loading-images/)

[industrial empathy](https://www.industrialempathy.com/posts/image-optimizations/#blurry-placeholder)

## bonus

* [asynchronous decoding](https://www.industrialempathy.com/posts/image-optimizations/#asynchronous-decoding)
* [content-visibility: auto](https://www.industrialempathy.com/posts/image-optimizations/#lazy-rendering)

-------

### sizes

[Responsive Images: If you’re just changing resolutions, use srcset.](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/#aa-also-sizes)

> It’s actually not that bad to just leave it off. In that case, it assumes sizes="100vw"

https://bholmes.dev/blog/picture-perfect-image-optimization/#link-the-sizes-attribute

> In general, the sizes attribute is a way to tell the browser which image to use for a given screen size.

> our image is 100vw (100% screen width) below 500px, and 50vw when we hit `@media (min-width: 500px)`. This perfectly translates to sizes 👉 `sizes="(min-width: 500px) 50vw, 100vw"` 

### better performace
If your only goal is improved performance, then use an `img` tag with `srcset` and `sizes` attributes.

### format
Use the `picture` element to choose different files based on a media query or browser support, or for art direction purposes.

> For example, cropping an image differently depending on the size of the screen and differences in the layout.

### `srcset` + `sizes`

`srcset` is a comma separated list of values, telling the browser which image size to download. `src` is a fallback if the browser does not understand `srcset`.

[Resolution Switching](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#resolution_switching_different_sizes)
> srcset defines the set of images we will allow the browser to choose between

You can use a value like `filename.jpg 2x` (with an `x` descriptor) to tell the browser about different files based on pixel denxity. If it is on a high-res screen, it can download the `2x` version.

Use `srcset` with `sizes` to let the browser choose based on page layout.

#### w descriptors

> The sizes attribute describes the width that the image will display within the layout of your specific site. The width that images render at is layout-dependent rather than just viewport dependent.

#### [sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes)
Contain two things:

1. A media condition. This must be omitted for the last item in the list.
2. A source size value.

[see sizes here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#resolution_switching_different_sizes)

> sizes defines a set of media conditions (e.g. screen widths) and indicates what image size would be best to choose

> Media Conditions describe properties of the viewport, not of the image. For example, `(max-height: 500px) 1000px` proposes to use a source of 1000px width, if the viewport is not higher than 500px.

So `sizes` tells us which image to choose based on screen size.

`srcset` tells us different images that are available to choose from. The browser can use a variety of criteria to choose an image, like bandwidth cost in addition to screen size.

> If the srcset attribute uses width descriptors, the sizes attribute must also be present, or the srcset itself will be ignored.

-------

* [Using the srcset and sizes attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#using_the_srcset_and_sizes_attributes)
* [Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
* [Responsive Images: If you’re just changing resolutions, use srcset.](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/)
* [Don’t use <picture> (most of the time)](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/)
