# image
Create responsive `img` tags, with a `srcset` property that allows browsers to download the best size image.

See this great article for more information about images -- [A Guide to the Responsive Images Syntax in HTML](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/#using-srcset)

Also includes tools to help with the ["Blur Up" technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/), which means creating a nice blurred placeholder image while a high resolution image downloads, then switching them out, so the high res image is visible when it's ready

See [the section on the CLI](#base64-placeholders) for info on creating base64 strings of images.

------------------

This is designed to work easily with either [Cloudinary](https://cloudinary.com/) or locally hosted image files. If you are hosting images locally, you may want to create multiple resolutions of the images. For this, see [the secion on resizing images](#resizing-images).

## examples

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
Create an `img` tag that links to locally hosted files. See [the CLI section]() for info on creating images of different sizes.

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

----------------------

## tonic

### tonic + cloudinary
Create a [tonic](https://tonicframework.dev/) component for an `img` tag with a good defualt `srcset` attribute.

```js
import Tonic from '@socketsupply/tonic'
import { CloudinaryTonic } from '../dist/cloudinary/tonic'
import '../dist/style.css'
import './my-style.css'

const { ImageTag, BlurredImage } = CloudinaryTonic({ cloudName: 'nichoth' })
const placeholderImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...'

const sizes = ['50vw']

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
import Tonic from '@socketsupply/tonic'
import { ImageTag, BlurredImage } from '@nichoth/image/tonic'
import '@nichoth/image/style.css'
import './my-style.css'

const placeholderImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...'
const sizes = ['50vw']

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

## base64 placeholders

We need small base64 encoded strings to use as placeholder images for the blur up effect.

### base64 CLI
Use the CLI to generate a small base64 encoded image to use as a blurry placeholder while a better quality image downloads.

First install this locally
```bash
npm i -S @nichoth/image
```

Then call the node binary file included, aliased locally as `image.stringify`.

#### CLI + local file
Convert a local file to base64 (this will write to `stdout`):

```bash
npx image.stringify ./my-local-file.jpg
```

#### CLI + cloudinary
Or use Cloudinary as an image source:

```bash
npx image.stringify my-cloud-name my-filename.jpg
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

This will create 4 files in the output directory -- `file-480.jpg`, `file-768.jpg`, and `file-1024.jpg`, and `file.jpg`. It will copy the original file in addition to resizing it to new versions.
