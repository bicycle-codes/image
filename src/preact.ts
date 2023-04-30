import { h, FunctionComponent } from 'preact'
import { useRef, useEffect } from 'preact/hooks'

interface Props {
    filename:string,
    alt:string,
    loading?:'eager'|'lazy',
    sizes?:number[],  // array of integers in ascending order
    fetchpriority?:string,
    class?:string,
    className?:string,
    decoding:'sync'|'async'|'auto'
}

// pass an array of sizes like [400, 800, 1600]
export const Image:FunctionComponent<Props> = function (config:Props) {
    const { decoding, filename, alt, loading, fetchpriority,
        className } = config
    let sizes = config.sizes

    const fileParts = filename.split('.')

    // sizes = sizes || [800, 1300]
    sizes = sizes || []
    const lastSize = sizes.pop()
    const firstSize = sizes.shift() as number

    const sources = sizes.length ? (
        [
            h('source', {
                media: `(min-width: 1px) and (max-width: ${firstSize - 1})`,
                srcset: fileParts[0] + `-${firstSize}` + fileParts[1]
            })
        ].concat(sizes.map((size, i) => {
            return h('source', {
                media: `(min-width: ${size}px) and (max-width: ${sizes[i + 1] - 1})`,
                srcset: fileParts[0] + `-${size}` + fileParts[1]
            })
        })).concat([
            h('source', {
                media: `min-width: ${sizes[1]}`
            })
        ])
    ) :
        getDefaultSources(config)

    return h('picture', { class: config.class || className }, sources.concat([
        h('img', {
            alt,
            src: filename,
            decoding: decoding || 'auto',
            loading: loading || 'lazy',
            fetchpriority: fetchpriority || 'low'
        })
    ]))

    // return h('picture', { class: config.class || className }, sizes.map(size => {
    //     return h('source', {
    //         media: `(min-width: 1px) and (max-width: ${firstSize - 1})`,
    //         srcset: fileParts[0] + `-${size}` + fileParts[1]
    //     })
    // }).concat([
    //     h('source', {
    //         media: `(${lastSize}px)`
    //     }),

    //     h('img', {
    //         alt,
    //         src: filename,
    //         decoding: decoding || 'auto',
    //         loading: loading || 'lazy',
    //         fetchpriority: fetchpriority || 'low'
    //     })
    // ]))

}

interface BlurProps extends Props {
    blurPlaceholder:string
}

export const BlurredImage:FunctionComponent<BlurProps> = function (props:BlurProps) {
    const { blurPlaceholder, filename, className } = props

    const placeholder = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log('placeholder', placeholder)
        if (!placeholder.current) return

        // also start downloading the real image
        const imgLarge = new window.Image()
        imgLarge.classList.add('sharp')
        imgLarge.src = filename

        placeholder.current.appendChild(imgLarge)
        imgLarge.onload = () => imgLarge.classList.add('loaded')
    }, [placeholder.current])

    const _class = props.class || className

    // @TODO -- should use <picture> element, not img

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

function getDefaultSources (config:Props) {
    const { decoding, filename, alt, loading, fetchpriority } = config

    return [
        h('source', {
            media: '(min-width: 1px) and (max-width: 799px)',
            srcset: (filename)
        }),

        h('source', {
            media: '(min-width: 800px) and (max-width: 1299px)',
            srcset: (filename)
        }),

        h('source', {
            media: '(min-width: 1300px)',
            srcset: filename
        }),

        h('img', {
            alt,
            src: filename,
            decoding: decoding || 'auto',
            loading: loading || 'lazy',
            fetchpriority: fetchpriority || 'low'
        })
    ]
}
