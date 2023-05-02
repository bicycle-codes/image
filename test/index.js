// @ts-check
import { test } from 'tapzero'
import { html } from '../dist/index.js'

test('create HTML strings with defaults', async t => {
    const markup = html({
        filename: 'aaa.jpg',
        alt: 'test picture'
    })

    t.ok(markup, 'Should create HTML')
    t.ok(markup.includes('sizes="100vw"'), 'should create the default sizes')
    t.ok(markup.includes('srcset="/100-1024.jpg 1024w, /100-768.jpg 768w, /100-480.jpg 480w"'),
        'should return the default srcset')
    t.ok(markup.includes('src="/aaa.jpg"'), 'should create the src from filename')
    t.ok(markup.includes('decoding="auto"'), 'has the default "decoding" attribute')
    t.ok(markup.includes('loading="lazy"'), 'has "loading" attribute')
    t.ok(markup.includes('fetchpriority="low"'),
        'should have the default fetchpriority')
})
