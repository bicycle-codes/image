// @ts-check
import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import Tonic from '@socketsupply/tonic'

/**
 * This is a factory function that returns an object like { Image },
 * where `Image` is a preact component
 * @param config {{ cloudName:string }} The cloudName for Cloudinary
 * @returns { { BlurredImage } } Tonic components
 */
export const CloudinaryTonic = function ({ cloudName }) {
    const cld = new Cloudinary({
        cloud: { cloudName },
        url: { secure: true }
    })

    /**
     * A `tonic` component for images.
     * Be sure to pass an `id` in HTML to the component. Also takes a prop
     * `blurPlaceholder`, which is a base64 string to use inline as src,
     * and a prop `filename` -- the filename to fetch
     * @returns {HTMLElement} HTML element created with `tonic`
     */
    class BlurredImage extends Tonic {
        constructor () {
            super()
            const imgLarge = new window.Image()
            imgLarge.classList.add('sharp')
            this.state = { blurry: true, imgLarge }

            imgLarge.onload = async () => {
                this.state.blurry = false
                await this.reRender()
                const placeholder = this.querySelector('.placeholder')
                imgLarge.classList.add('loaded')
                // @ts-ignore
                placeholder.appendChild(imgLarge)
            }
        }

        getImg () {
            const { filename } = this.props
            const { imgLarge } = this.state
            imgLarge.src = (cld.image(filename)
                .format('auto')
                .quality('auto')
                .resize(scale().width(800))
                .toURL())
        }

        render () {
            const { blurplaceholder, className } = this.props
            const _class = (this.props.class || className)

            if (this.state.blurry) {
                this.getImg()
            }

            return this.html`<div
                class=${('placeholder' + (_class ? ` ${_class}` : ''))}
            >
                <img class="blurry" src=${blurplaceholder} />
            </div>`
        }
    }

    return { BlurredImage }
}
