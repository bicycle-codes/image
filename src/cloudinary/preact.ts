import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { h, FunctionComponent } from 'preact'
import { useRef, useEffect } from 'preact/hooks'

interface Props {
    src:string,
    filename:string,
    alt:string,
    loading?:'eager'|'lazy',
    fetchpriority?:string,
    class?:string,
    className?:string
}

interface BlurProps extends Props {
    blurPlaceholder:string
}

interface Components {
    Image: FunctionComponent<Props>,
    ImageWithBlur: FunctionComponent<BlurProps>
}

/**
 * This is a factory function that returns an object like { Image },
 * where `Image` is a preact component
 * @param config {{ cloudName:string }} The cloudName for Cloudinary
 * @returns { { Image:FunctionComponent } }
 */
export const CloudinaryImg = function (config:{cloudName:string}):Components {
    const { cloudName } = config

    const cld = new Cloudinary({
        cloud: { cloudName },
        url: { secure: true }
    })

    const Image:FunctionComponent<Props> = function (props:Props) {
        const { filename, alt, loading, fetchpriority, className } = props

        return h('picture', { class: props.class || className }, [
            // we get the first source that matches the `media` attribute,
            // so we *need to* set a `max-width` in the media query
            h('source', {
                media: '(min-width: 200px) and (max-width: 799px)',
                srcset: (cld.image(filename)
                    .format('auto')
                    .quality('auto')
                    .resize(scale().width(800))
                    .toURL())
            }),

            h('source', {
                // a `media` attribute specifies the *minimum width* from
                // which to display one of the images given in the `srcset`
                // attribute
                media: '(min-width: 800px) and (max-width: 1599px)',
                // dont use `type` here because we have `format(auto)`
                // type: 'image/avif',

                // [The srcset attribute](https://cloudinary.com/documentation/responsive_html#the_srcset_attribute)
                // `srcset` can be a comma separated list of URLs
                // example: 'https://res.cloudinary.com/demo/image/c_scale,w_800/docs/guitar-man.jpg 800w, https://res.cloudinary.com/demo/image/upload/c_scale,w_1600/docs/guitar-man.jpg 1600w',
                srcset: (cld.image(filename)
                    // this is for in between the media of 800 and 1600 px
                    .format('auto')
                    .quality('auto')
                    .resize(scale().width(1300))
                    .toURL())
            }),

            h('source', {
                media: '(min-width: 1600px)',
                srcset: cld.image(filename)
                    .format('auto')
                    .quality('auto')
                    .resize(scale().width(1600))
                    .toURL()
            }),

            h('img', {
                alt,
                src: cld.image(filename)
                    .format('auto')
                    .toURL(),
                loading: loading || 'lazy',
                fetchpriority: fetchpriority || 'low'
            })
        ])
    }

    const ImageWithBlur:FunctionComponent<BlurProps> = function (props:BlurProps) {
        const { blurPlaceholder, filename, className } = props

        // should get a ref to the img component, b/c we need onload function
        const placeholder = useRef<HTMLDivElement>(null)

        useEffect(() => {
            console.log('placeholder', placeholder)
            if (!placeholder.current) return

            // also start downloading the real image
            const imgLarge = new window.Image()
            imgLarge.classList.add('sharp')
            imgLarge.src = (cld.image(filename)
                .format('auto')
                .quality('auto')
                .resize(scale().width(800))
                .toURL())

            placeholder.current.appendChild(imgLarge)
            imgLarge.onload = () => imgLarge.classList.add('loaded')
        }, [placeholder.current])

        const _class = props.class || className

        return h('div', {
            class: 'placeholder' + (_class ? ` ${_class}` : ''),
            ref: placeholder
        }, [
            h('img', {
                class: 'blurry loaded',
                src: blurPlaceholder
            })
        ])
    }

    return { Image, ImageWithBlur }
}

export default CloudinaryImg
