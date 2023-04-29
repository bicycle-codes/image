import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'

// fetch it as a small image
// https://css-tricks.com/the-blur-up-technique-for-loading-background-images/#aa-a-working-example

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
    const response = await fetch(url)
    const mime = response.headers.get('Content-Type')
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    // console.log('*mime*', mime)
    const dataUri = 'data:' + mime + ';base64,' + base64
    console.log('**data uri**', dataUri)
}

get()
