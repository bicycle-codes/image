#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import sharp from 'sharp'
import { resolve, join } from 'node:path'
import * as fs from 'node:fs/promises'

const defaultSizes = [480, 768, 1024]

const args = yargs(hideBin(process.argv))
    .demandCommand(1)
    .command('filename', 'resize the given local file to the default sizes')
    .option('output', {
        alias: 'o',
        type: 'string',
        description: 'The __directory__ to write output to'
    })
    .demandOption(['output'])
    .example('`npx image.resize ./my-file.jpg -o ./dir',
        'resize `my-file.jpg` to the default sizes, and put the output in `./dir`')
    .usage('Usage: image.resize <filename> -o ./output-dir')
    .argv

const [filename] = args._
await resize(filename, args.output, defaultSizes)

/**
 * Resize the given image file
 * @param {string} filename The path to a local file you want to resize
 * @param {string} outputDir The relative directory path to write output to
 */
export async function resize (filename, outputDir, sizes) {
    // @TODO -- sizes
    const outPath = resolve(process.cwd(), outputDir)
    const name = filename.split('/').pop()

    // make the directory
    await fs.mkdir(outPath, {
        recursive: true,
    })

    const parts = name.split('.')
    const ext = parts.pop()
    const noExt = parts.join('.')

    console.log('**filename**', filename)

    await fs.copyFile(filename, join(outPath, name))

    sizes.forEach(async n => {
        await sharp(filename)
            .resize(n)
            .toFile(join(outPath, `${noExt}-${n}.${ext}`))
    })
}
