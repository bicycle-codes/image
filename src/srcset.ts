const defaultSizes = [1024, 768, 480]

export function defaultSrcset (filename:string):string {
    const URIs:string[] = getSrcset(filename, defaultSizes)
    return URIs.join(', ')
}

export function getSrcset (filename:string, sizes:number[]):string[] {
    // return filenames like `file-480.jpg`
    return sizes.map(n => {
        return getSrcsetItem(filename, n)
    })
}

export function getSrcsetItem (filename:string, n:number) {
    const fileParts = filename.split('.')
    const ext = fileParts.pop()
    const noExt = fileParts.join('.')

    return noExt + `-${n}.${ext} ${n}w`
}
