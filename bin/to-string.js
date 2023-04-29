#!/usr/bin/env node
import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const args = yargs(hideBin(process.argv))
    .demandCommand(2)
    .command('cloudName', 'the cloud to use to get the file')
    .command('filename', 'the filename to fetch')
    .example('$0 name my-file.jpg', 'Use the the cloudinary namespace `name`' +
        'to get and convert `my-file.jpg` to a small base64 string')
    .usage('Usage: $0 <cloudName> <filename>')
    .argv

const cloudName = args._[0]
const filename = args._[1]
const uri = await getImg(cloudName, filename)
process.stdout.write(uri + '\n')

async function getImg (cloudName, filename) {
    const cld = new Cloudinary({
        cloud: { cloudName },
        url: { secure: true }
    })

    const url = (cld.image(filename)
        .format('auto')
        .quality('auto')
        .resize(scale().width(50))
        .toURL())

    const response = await fetch(url)
    const mime = response.headers.get('Content-Type')
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    const dataUri = 'data:' + mime + ';base64,' + base64
    return dataUri
}
