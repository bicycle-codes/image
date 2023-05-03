export interface Props {
    class?:string,
    filename:string,
    alt:string,
    loading?:'eager'|'lazy',
    fetchpriority?:'high'|'low'|'auto',
    className?:string,
    decoding?:'sync'|'async',
    sizes?:string[],
    srcset?: number[]
}
