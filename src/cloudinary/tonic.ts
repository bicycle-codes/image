import { Cloudinary } from '@cloudinary/url-gen'
import Tonic from '@socketsupply/tonic'

interface Components {
    Image: any
    ImageWithBlur: any
}

export const CloudinaryImg = function (config:{cloudName:string}):Components {
    const { cloudName } = config

    const cld = new Cloudinary({
        cloud: { cloudName },
        url: { secure: true }
    })

    class Image extends Tonic {
        constructor ({ filename }) {
            super()
            const imgLarge = new window.Image()

            imgLarge.classList.add('sharp')
            imgLarge.src = (cld.image(filename)
                .format('auto')
                .quality('auto')
                .resize(scale().width(800))
                .toURL())

            placeholder.current.appendChild(imgLarge)
            imgLarge.onload = () => imgLarge.classList.add('loaded')

            this.state.blurry = true
        }

        render () {
            const { blurPlaceholder, filename, className } = this.props
            // @ts-ignore
            const _class = (this.props.class || className)
            // @ts-ignore
            return this.html`<div class=${'placeholder' + _class ? ` ${_class}` : ''}>
                <img src=${cld} />
            </div>`
        }
    }

    return {
        Image,
        ImageWithBlur: ''
    }
}
