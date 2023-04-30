import { h, FunctionComponent } from 'preact'
import { useRef, useEffect } from 'preact/hooks'

interface Props {
    filename:string,
    alt:string,
    loading?:'eager'|'lazy',
    // array of integers in descending order
    sizes?:number[],
    fetchpriority?:string,
    class?:string,
    className?:string,
    decoding?:'sync'|'async'|'auto'
}

// pass an array of sizes like [1600, 800, 400]
// this is an array of available sizes of the image
export const Image:FunctionComponent<Props> = function (config:Props) {
    const { decoding, filename, alt, loading, fetchpriority,
        className } = config
    const sizes = config.sizes || []

    const fileParts = filename.split('.')

    // sizes = sizes || [1300, 800]
    const lastSize = sizes.pop()
    const firstSize = sizes.shift()

    const sources = sizes.length ? (
        ([
            // the biggest one
            h('source', {
                media: `(min-width: ${firstSize}px)`,
                srcset: filename
            })
        ]).concat(sizes.map((size) => {
            return h('source', {
                // anything greater than `size` and smaller than `firstSize`
                media: `(min-width: ${size}px)`,
                // must include a `sizes` if you include the last part,
                // the width unit: `srcset: file.jpg 600w`
                srcset: (fileParts[0] + `-${size}` + `.${fileParts[1]}`)
            })
        })).concat([
            // the smallest one
            h('source', {
                media: `min-width: ${lastSize}px`,
                srcset: fileParts[0] + `-${lastSize}` + `.${fileParts[1]}`
            }),

            h('img', {
                src: filename,
                alt,
                decoding: decoding || 'auto',
                loading: loading || 'lazy',
                fetchpriority: fetchpriority || 'low'
            })
        ])) :

        getDefaultSources(config)

    return h('picture', { class: config.class || className }, sources)
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
    const fileParts = filename.split('.')
    const ext = fileParts.pop()
    const noExt = fileParts.join('.')

    return [
        // 1025+
        h('source', {
            media: '(min-width: 1025px)',
            srcset: filename
        }),

        // 769 - 1024
        h('source', {
            media: '(min-width: 769px)',
            srcset: `${noExt}-1024.${ext}`
        }),

        h('source', {
            // 481 - 768
            media: '(min-width: 481px)',
            srcset: `${noExt}-768.${ext}`
        }),

        h('source', {
            // anything 480 or less
            srcset: `${noExt}-480.${ext}`
        }),

        h('img', {
            alt,
            // full resolution
            src: filename,
            decoding: decoding || 'auto',
            loading: loading || 'lazy',
            fetchpriority: fetchpriority || 'low'
        })
    ]
}
