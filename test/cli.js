// @ts-check
import { test } from 'tapzero'
import { execSync } from 'child_process'
import path from 'node:path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const cliPath = path.join(__dirname, '..', 'bin', 'to-string.js')

test('Use the CLI', async t => {
    const base64 = execSync(cliPath + ' nichoth testing').toString()
    t.ok(base64.includes('data:image/jpeg;'), 'should return base64 string')
})

test('Use the CLI with a local file', async t => {
    const localFilePath = path.join(__dirname, '..', 'example', '100.jpg')
    const base64 = execSync(cliPath + ' ' + localFilePath)

    t.ok(base64.includes('data:image/jpeg;'), 'should return base64 string')
})
