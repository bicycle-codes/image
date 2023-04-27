import { html } from 'htm/preact'
import { render } from 'preact'
import { CloudinaryImg } from '../dist/cloudinary/preact'

const { Image } = CloudinaryImg({ cloudName: 'nichoth' })

const Example = function () {
    return html`<div>
        <p>hello</p>
        <${Image} filename=${'testing'} />
    </div>`
}

// https://res.cloudinary.com/nichoth/image/upload/v1656784426/%2526JjioK9dL-OCFKkdYaKi6-RELgoRCYfhT1aoZlH_9Tpw.sha256.jpg

const el = document.getElementById('root')
if (el) render(html`<${Example} />`, el)
