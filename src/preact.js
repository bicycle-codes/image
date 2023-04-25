import { h } from 'preact'

export function Image (props) {
    const { src } = props
    const avifSrc = (src.split('.').slice(0, -1)).join('.') + '.avif'
    const webpSrc = (src.split('.').slice(0, -1)).join('.') + '.webp'

    return h('picture', { class: 'hello' }, [
        h('source', {
            type: 'image/avif',
            srcset: avifSrc
        }),
        h('source', {
            type: 'image/webp',
            srcset: webpSrc
        }),
        h('img', {
            srcset: '',
            sizes: '',
            src: src,
            style: 'width: 100%; aspect-ratio: 1/1',
            fetchpriority: 'low',
            loading: 'lazy',
            decoding: 'async'
        })
    ])
}
