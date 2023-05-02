#!/usr/bin/env node
import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import sharp from 'sharp'
import { fileTypeFromFile } from 'file-type'

// `image.stringify cloud filename` -- this means read from cloudinary
// `image.stringify filename` -- this means use a local file

const args = yargs(hideBin(process.argv))
    .demandCommand(1)
    .command('cloudName filename', 'the cloud name and filename to use')
    .command('filename', 'the local filename to read')
    .example('`npx image.stringify name my-file.jpg`', 'Use the the cloudinary namespace `name`' +
        ' to convert `my-file.jpg` to a small base64 string')
    .example('`npx image.stringify my-fiile.jpg`',
        'Create a small base64 string from a local file')
    .usage('Usage: image.stringify <cloudName> <filename>')
    .argv

if (args._.length > 1) {
    const cloudName = args._[0]
    const filename = args._[1]
    const uri = await getImgCloudinary(cloudName, filename)
    process.stdout.write(uri + '\n')
} else {
    // got 1 arg, so use a local file
    const filename = args._[0]
    const uri = await getImgFile(filename)
    process.stdout.write(uri + '\n')
}

export async function getImgFile (filename) {
    const buf = await sharp(filename)
        .resize(40)
        .jpeg()
        .toBuffer()

    const { mime } = await fileTypeFromFile(filename)
    const base64 = buf.toString('base64')
    const dataUri = 'data:' + mime + ';base64,' + base64
    return dataUri
}

export async function getImgCloudinary (cloudName, filename) {
    const cld = new Cloudinary({
        cloud: { cloudName },
        url: { secure: true }
    })

    const url = (cld.image(filename)
        .format('auto')
        .quality('auto')
        .resize(scale().width(40))
        .toURL())

    const response = await fetch(url)
    const mime = response.headers.get('Content-Type')
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    const dataUri = 'data:' + mime + ';base64,' + base64
    return dataUri
}
