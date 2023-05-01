# image
Create responsive `img` tags, with a `srcset` property that allows browsers to download the best size image.

Also includes tools to help with the ["Blur Up" technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/), which means creating a nice blurred placeholder image while a high resolution image downloads, then switching them out, so the high res image is visible when it's ready

See [the section on the CLI]() for info on creating base64 strings of images.

## example

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
Create an `img` tag that links to locally hosted files. See [the CLI section]() for info on creating images of different sizes.

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

        <p>non blurry image</p>
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



### tonic + cloudinary
Create a [tonic](https://tonicframework.dev/) component for an `img` tag with a good `srcset` attribute.

```js
```

### tonic + local files





# image
Use images with the new `<picture>` element, or create a fancy blurred placeholder image.

## Blur Up images
We can use the ["Blur Up" technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/) to load images. This means creating a nice blurred placeholder image while a high resolution image downloads, then switching them out so the high res image is visible when it's ready.

See the next section, [base64 placeholders](#base64-placeholders) for a way to generate the small base64 image.

see [A Guide to the Responsive Images Syntax in HTML](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/#using-srcset)

## examples

### preact

__sizes__
```
  sizes="(max-width: 600px) 480px,
         800px"
```
this means that at 50em and up, the image will be at most 50em wide
otherwise, it is 100vw
so 100vw if the viewport is below 50em
at most 50em
--------------------
```
sizes="(min-width: 50em) 50em, 100vw"
```


#### preact + cloudinary -- img element
Create an `<img>` element with a `srcset` attribute with relevant image sources.

```ts
import { html } from 'htm/preact'
import { render } from 'preact'
import { CloudinaryImg } from '@nichoth/image/cloudinary/preact'
import '@nichoth/image/style.css'
import './my-style.css'

const { Image } = CloudinaryImg({ cloudName: 'nichoth' })

const Example = function () {
    return html`<div>
        <p>image</p>
        <${Image} filename=${'testing'} class=${'my-image-test'}
            sizes=${['50vw']}
        />
    </div>`
}

const el = document.getElementById('root')
if (el) render(html`<${Example} />`, el)
```

#### preact + self hosted files -- img element

```ts
import { html } from 'htm/preact'
import { render } from 'preact'
import { createImage } from '@nichoth/image/preact'

// @TODO
```

#### preact + cloudinary -- blur up
```ts
import { html } from 'htm/preact'
import { render } from 'preact'
import { CloudinaryImg } from '@nichoth/image/cloudinary/preact'
import '@nichoth/image/style.css'  // need this for blur + sharpening animation
import './my-style.css'

const { BlurredImage } = CloudinaryImg({ cloudName: 'nichoth' })
const placeholderImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2w...'

const Example = function () {
    return html`<div>
        <p>blurry image</p>
        <${BlurredImage} filename=${'testing'} class=${'blur-test'}
            blurPlaceholder=${placeholderImg} width=${800}
            sizes=${['50vw']} maxWidth=${800}
        />
    </div>`
}

const el = document.getElementById('root')
if (el) render(html`<${Example} />`, el)
```

### preact + self-hosted files -- blur up
```ts
// @TODO
```




-------------------------------------------------------

### tonic

-------------------------------------------------------
Create a `<picture>` with [tonic](https://tonicframework.dev/) components.

#### tonic + cloudinary -- img element
```js
// @TODO
```

#### tonic + self hosted files -- img element
```js
// @TODO
```

#### tonic + cloudinary -- "blur up" images
```js
import Tonic from '@socketsupply/tonic'
import { CloudinaryTonic } from '@nichoth/image/cloudinary/tonic'
import '@nichoth/image/style.css'  // need this for blur + sharpening animation
import './my-style.css'

const { BlurredImage } = CloudinaryTonic({ cloudName: 'nichoth' })
const placeholderImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'

class TheApp extends Tonic {
    render () {
        return this.html`<div class="the-app">
            <blurred-image
                id="test"
                filename="testing"
                blurplaceholder=${placeholderImg}
            ></blurred-image>
        </div>`
    }
}

Tonic.add(BlurredImage)
Tonic.add(TheApp)
```

...and in your HTML file...
```html
<body>
    <the-app id="the-app"></the-app>
    <script type="module" src="/my-tonic-source.js"></script>
</body>
```

#### tonic + self hosted files -- blurred images
```js
// @TODO
```



-------------------------------------------------------

### html

-------------------------------------------------------
Create html strings from local files or cloudinary sources.

### html from cloudinary images -- img element
```js
// @TODO
```

### html from self hosted files -- img element
```js
// @TODO
```



------------------------------------------------------

## base64 placeholders

------------------------------------------------------
We need small base64 encoded strings to use as placeholder images for the blur up effect.

### CLI
Use the CLI to generate a small base64 encoded image to use as a blurry placeholder while a better quality image downloads.

First install this locally
```bash
npm i -S @nichoth/image
```

Then call the node binary file included, aliased locally as `image`.

This will write to `stdout`.

#### local file
Convert a local file to base64:

```bash
npx image ./my-local-file.jpg
```

#### cloudinary
Or use Cloudinary as an image source:

```bash
npx image my-cloud-name my-filename.jpg
```

#### Write the base64 string to a file
Use shell scripting to redirect output to a file.

```bash
npx image my-cloud-name my-filename.jpg > ./my-filename.base64
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
There's no CJS version of these because I used top level `await`.
