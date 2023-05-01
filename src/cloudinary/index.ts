import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { Props } from '../attributes'

//
// create html strings for <img> elements
//

export function CloudinaryImg (cloudName) {
    const cld = new Cloudinary({
        cloud: { cloudName },
        url: { secure: true }
    })

    return { image }

    // const { filename, alt, loading, fetchpriority, className } = props
    // return html for a local file
    function image (props:Props):string {
        const { alt, filename, loading, fetchpriority } = props

        const _class = props.class || props.className

        return `<picture ${_class ? ('class="' + _class + '"') : ''}>
            <source media="(min-width: 200px) and (max-width: 799px)"
                srcset="${(cld.image(filename)
                    .format('auto')
                    .quality('auto')
                    .resize(scale().width(800))
                    .toURL())}"
            />

            <source media="(min-width: 800px) and (max-width: 1599px)"
                srcset="${(cld.image(filename)
                    .format('auto')
                    .quality('auto')
                    .resize(scale().width(1300))
                    .toURL())}"
            />

            <source media="(min-width:1600px)"
                srcset="${(cld.image(filename)
                    .format('auto')
                    .quality('auto')
                    .resize(scale().width(1600))
                    .toURL())}"
            />
            
            <img alt="${alt}"
                src="${cld.image(filename).format('auto').toURL()}"
                loading="${loading || 'lazy'}"
                fetchpriority="${fetchpriority || 'low'}"
            >
        </picture>`
    }
}

// -------------

// return h('picture', { class: props.class || className }, [
//     // we get the first source that matches the `media` attribute,
//     // so we *need to* set a `max-width` in the media query
//     h('source', {
//         media: '(min-width: 200px) and (max-width: 799px)',
//         srcset: (cld.image(filename)
//             .format('auto')
//             .quality('auto')
//             .resize(scale().width(800))
//             .toURL())
//     }),

//     h('source', {
//         // a `media` attribute specifies the *minimum width* from
//         // which to display one of the images given in the `srcset`
//         // attribute
//         media: '(min-width: 800px) and (max-width: 1599px)',
//         // dont use `type` here because we have `format(auto)`
//         // type: 'image/avif',

//         // [The srcset attribute](https://cloudinary.com/documentation/responsive_html#the_srcset_attribute)
//         // `srcset` can be a comma separated list of URLs
//         // example: 'https://res.cloudinary.com/demo/image/c_scale,w_800/docs/guitar-man.jpg 800w, https://res.cloudinary.com/demo/image/upload/c_scale,w_1600/docs/guitar-man.jpg 1600w',
//         srcset: (cld.image(filename)
//             // this is for in between the media of 800 and 1600 px
//             .format('auto')
//             .quality('auto')
//             .resize(scale().width(1300))
//             .toURL())
//     }),

//     h('source', {
//         media: '(min-width: 1600px)',
//         srcset: cld.image(filename)
//             .format('auto')
//             .quality('auto')
//             .resize(scale().width(1600))
//             .toURL()
//     }),

//     h('img', {
//         alt,
//         src: cld.image(filename)
//             .format('auto')
//             .toURL(),
//         loading: loading || 'lazy',
//         fetchpriority: fetchpriority || 'low'
//     })
// ])

