// @ts-check
import { test } from 'tapzero'
import { execSync } from 'child_process'
import path from 'node:path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('Use the CLI', async t => {
    const cliPath = path.join(__dirname, '..', 'bin', 'to-string.js')

    const base64 = execSync(cliPath + ' nichoth' + ' testing').toString()
    t.ok(base64.includes('data:image/jpeg;'),
        'should return the right format string')
})
