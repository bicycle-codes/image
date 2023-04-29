import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'

const cld = new Cloudinary({
    cloud: { cloudName: 'nichoth' },
    url: { secure: true }
})

const url = (cld.image('testing')
    .format('auto')
    .quality('auto')
    .resize(scale().width(50))
    .toURL())

async function get () {
    // await (await fetch('https://www.gravatar.com/avatar/5730f209b34b8474639e0c2020f54513?s=64&d=identicon&r=PG'))
    //     .blob()

    // await ((await (await fetch('https://www.gravatar.com/avatar/5730f209b34b8474639e0c2020f54513?s=64&d=identicon&r=PG')).blob()).arrayBuffer())

    const response = await fetch(url)
    const mime = response.headers.get('Content-Type')
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    console.log('*mime*', mime)
    // => *mime* image/jpeg
    // need to prepend the URI stuff
    // background-image: url(data:image/gif;base64,R0lGODlh)
    const dataUri = 'data:' + mime + ';base64,' + base64
    console.log('**data uri**', dataUri)

    // const res = Buffer.from(await ((await (await fetch(url))
    //     .blob()).arrayBuffer())).toString('base64')

    // console.log('***res***', res)
}

get()

// ----------

// fetch it as a small image

// https://css-tricks.com/the-blur-up-technique-for-loading-background-images/#aa-a-working-example
// > Inline a tiny image preview (40×22 pixels) as a base64-encoded
// background image

// -----------

// image/jpeg
// "data:" + contentType + ';base64,' + buffer.toString('base64');
