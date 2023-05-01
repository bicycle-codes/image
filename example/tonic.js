import Tonic from '@socketsupply/tonic'
import { CloudinaryTonic } from '../dist/cloudinary/tonic'
import '../dist/style.css'
import './my-style.css'

const { BlurredImage } = CloudinaryTonic({ cloudName: 'nichoth' })
const placeholderImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMSEBASEx0VFhUWFR0sHCAcHCAcLCcvJiQmLydGNzExN0ZRREBEUWJYWGJ8dnyiotkBCAgICAkICQoKCQ0ODA4NExIQEBITHRUWFRYVHSwcIBwcIBwsJy8mJCYvJ0Y3MTE3RlFEQERRYlhYYnx2fKKi2f/AABEIADIAMgMBIgACEQEDEQH/xAB4AAACAwEBAQAAAAAAAAAAAAAABgQFBwIDARAAAgEEAQMBBQYHAAAAAAAAAQIDAAQFERIGEzFyBxQhQVEVIiNhsbIzNTZxdIGRAQEBAQEAAAAAAAAAAAAAAAACAQMAEQEBAQEBAQEBAAAAAAAAAAABAAJBMRESIf/aAAwDAQACEQMRAD8A1vLJuKL1VRzQco6ZMov4cPqNVipsaoPrLknTmCGPlPMsY3rbECki/wA52LqVYJEkj7Z4EEnRP1q7v+nZ8xlLuRsiqRQvwijC8iBoE7rsez661aFUnfveSQvq2KgFaPHl8UURHuwW0AWIIBNOPSsI+0pXHjsmk296Js4feBcXFzB2zsq3H4BqfuhcbJZ45OcolO3UP9VHioB9EaM68aK9uNFaxoWSH4cXqqBCu9VYZL+EnqqBEwVdmi+15U5tYIbi5lRdM7EtTxYzRnH2bsVLCFCPy+FZXL1NiffXtvel7nMrrR8iuhkcUH7e4OXILrQ8kbo/0fpLky5NIrq7yYcbUlV/4gq5w8EcOPt0QaGm/Ws9yGdx+Ogcc4g7LyEYIBan7AXSXWIspk8PEDVyRWttUV9op0q7IEdlf70hdR9SW+NtzCjBp28LTll45ZrN0il7bkHT63qsCsMI2b6kvsdHkhIYFLyzkedEAgVO1o2NiEj3Vzw+4geWQn5/PVNvRlxDm7+XuKAibdtj6DVJucu0wuUzOPtotxyRwopJ8aQbP+91dezq5t7RsrJNKFkeJEiG6eRULPaZytK6sxdvLeCKIBHHxQ/Xl4Wnv2b3ofECzL7kgLbH5E7pD6pmN1KX1w3GVX5HY8EVc9Av3stFfIw43NnLzUfKRCvOlr1jh/WS2jdFeW6KztZc6od4+n8o6OVZbWUgg6IPGsT9k/8APb7/AAH/AHrRRVul/rH+p8h6o/2CukVfszfEb2aKKePWz3yYevI0jx+FMaBSyNvQ1v7oq69kvi6/KT9VooocnbbRRRUrf//Z'

const sizes = [
    '50vw'
]

class TheApp extends Tonic {
    render () {
        return this.html`<div class="the-app">
            <blurred-image
                id="test"
                filename="testing"
                blurplaceholder=${placeholderImg}
                sizes=${sizes}
                maxWidth=${[1024]}
            ></blurred-image>
        </div>`
    }
}

Tonic.add(BlurredImage)
Tonic.add(TheApp)
