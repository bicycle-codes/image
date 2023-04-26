import { html } from 'htm/preact'
import { render } from 'preact'
import { Image } from '../dist/preact.js'

const Example = function () {
    return html`<div>
        <p>hello</p>
        <${Image} src="/100.jpg" />
    </div>`
}

const el = document.getElementById('root')
if (el) render(html`<${Example} />`, el)
