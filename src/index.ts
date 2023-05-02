import { Props } from './attributes.js'
import { getSrcset, defaultSizes } from './srcset.js'

// filename:string,
// alt:string,
// loading?:'eager'|'lazy',
// fetchpriority?:string,
// class?:string,
// className?:string,
// decoding?:'sync'|'async',
// sizes?:string[],
// srcset?: number[]

// return this.html`<div class=${'image' + (_class ? ` ${_class}` : '')}>
//     <img
//         srcset="${srcset}"
//         sizes="${sizes}"
//         src="${filename}"
//         decoding="${decoding || 'auto'}"
//         loading="${loading || 'lazy'}"
//         fetchpriority="${fetchpriority || 'low'}"
//     />
// </div>`

export function html (props:Props):string {
    const { className, sizes, filename, decoding,
        loading, fetchpriority, alt } = props

    return `<div class=${props.class || className}>
        <img
            alt="${alt}"
            srcset="${getSrcset('/100.jpg', defaultSizes)}"
            sizes="${sizes?.join(', ') || '100vw'}"
            src="/${filename}"
            decoding="${decoding || 'auto'}"
            loading="${loading || 'lazy'}"
            fetchpriority="${fetchpriority || 'low'}"
        >
    </div>`
}

export default html
