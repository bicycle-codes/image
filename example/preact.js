import { html } from 'htm/preact'
import { render } from 'preact'
import { Image } from '../src/preact.js'

const Example = function () {
    return html`<div>
        <p>hello</p>
        <${Image} />
    </div>`
}

const el = document.getElementById('root')
console.log('hello', el)
if (el) render(html`<${Example} />`, el)
