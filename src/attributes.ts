export interface Props {
    filename:string,
    alt:string,
    loading?:'eager'|'lazy',
    fetchpriority?:string,
    class?:string,
    className?:string,
    decoding?:'sync'|'async',
    sizes?:string[],
    srcset?: number[]
}
