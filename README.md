# image
Use images with the new `<picture>` element, or create a fancy blurred placeholder image.

## Blur Up images
We can use the ["Blur Up" technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/) to load images. This means creating a nice blurred placeholder image while a high resolution image downloads, then switching them out so the high res image is visible when it's ready.

See the next section, [base64 placeholders](#base64-placeholders) for a way to generate the small base64 image.

----------------------------------

## examples

----------------------------------

-------------------------------------------------------

### preact

-------------------------------------------------------

Create a `<picture>` element with several `<source>` nodes, using [preact](https://preactjs.com/) components.

#### preact + cloudinary -- picture element

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
        <div class="img-wrapper">
            <${Image} filename=${'testing'} class=${'my-image'} />
        </div>
    </div>`
}

const el = document.getElementById('root')
if (el) render(html`<${Example} />`, el)
```

#### preact + self hosted files -- picture element

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

const { ImageWithBlur } = CloudinaryImg({ cloudName: 'nichoth' })
const placeholderImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2w...'

const Example = function () {
    return html`<div>
        <p>blurry image</p>
        <${ImageWithBlur} filename=${'testing'} class=${'blur-test'}
            blurPlaceholder=${placeholderImg}
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


-----------------------------------------------------------



-------------------------------------------------------

### tonic

-------------------------------------------------------
Create a `<picture>` with [tonic](https://tonicframework.dev/) components.

#### tonic + cloudinary -- picture element
```js
// @TODO
```

#### tonic + self hosted files -- picture element
```js
// @TODO
```

#### tonic + cloudinary -- blurred images
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

### html from cloudinary images -- picture element
```js
```

### html from self hosted files -- picture element
```js
```


------------------------------------------------------------------------


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
There's no common JS version of these because I used top level `await`.
