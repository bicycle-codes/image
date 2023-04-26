import { h, FunctionComponent } from 'preact'
import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'

interface Props {
    src:string,
    alt:string
}

interface CloudProps {
    cloudName:string,
    src:string,
    filename:string,
    alt:string
}

export const CloudImg:FunctionComponent<CloudProps> = function (props:CloudProps) {
    const { cloudName, filename, alt } = props

    const cld = new Cloudinary({
        cloud: { cloudName },
        url: { secure: true }
    })

    // choose a source element based on screen size

    return h('picture', { class: 'hello' }, [
        h('source', {
            media: '(min-width: 800px)',
            // srcset: 'https://res.cloudinary.com/demo/image/upload/ar_2:1,c_fill,g_face/f_auto/q_auto/c_scale,w_800/docs/guitar-man.jpg 800w, https://res.cloudinary.com/demo/image/upload/ar_2:1,c_fill,g_face/f_auto/q_auto/c_scale,w_1600/docs/guitar-man.jpg 1600w',

            // dont use `type` here because we have `format(auto)` above
            // type: 'image/avif',

            sizes: '100vw',

            srcset: cld.image(filename)
                .format('auto')
                .quality('auto')
                .resize(scale().width(1000))
                .toURL()
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
            src: filename,
            loading: 'lazy'
        })

        // could use multiple 'sources' for varying sizes of image
        // (the media attribute)
    ])
}

export const Image:FunctionComponent<Props> = function (props:Props) {
    // src is like /foo/bar.jpg
    const { src, alt } = props
    const avifSrc = (src.split('.').slice(0, -1)).join('.') + '.avif'
    const webpSrc = (src.split('.').slice(0, -1)).join('.') + '.webp'

    return h('picture', { class: 'hello' }, [
        h('source', {
            // media: '(min-width: 800px)',
            type: 'image/avif',
            srcset: avifSrc
        }),
        h('source', {
            // media: '(min-width: 1000px)',
            type: 'image/webp',
            srcset: webpSrc
        }),
        h('img', {
            srcset: src,
            // if the viewport is at least 50em wide, the image will be 40em wide.
            // Otherwise, the image will be 100vw wide
            sizes: '(min-width: 50em) 40em, 100vw',
            src: src,
            alt: alt,
            // style: 'width: 100%; aspect-ratio: 1/1',
            fetchpriority: 'low',
            loading: 'lazy',
            decoding: 'async'
        })
    ])
}
