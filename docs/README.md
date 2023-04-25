# docs

## images
see also

* [next image component](https://github.com/vercel/next.js/blob/canary/docs/api-reference/next/image.md)

I think this might be the source for the `next/image` component https://github.com/vercel/next.js/blob/641d419adac0d18c2c5d955333a645e72a4d509f/packages/next/src/client/image.tsx

------

* [compiled many tips for image perf into this one cheat sheet](https://twitter.com/Steve8708/status/1506281613746917394)

------

* [Using Modern Image Formats: AVIF And WebP](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/)

### avif

> AVIF is a solid first choice if lossy, low-fidelity compression is acceptable and saving bandwidth is the number one priority. Assuming encode/decode speeds meet your needs.

> WebP is more widely supported and may be used for rendering regular images where advanced features like wide color gamut or text overlays are not required.

> AVIF compresses much better than most popular formats on the web today (JPEG, WebP, JPEG 2000, and so on).

> Note that there can be cases where WebP lossless can be better than AVIF lossless

-------------

* [the picture element](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/#progressive-enhancement)

### webp

> WebP is supported on the latest versions of almost all major browsers today.


---------------------

## package exports

https://webpack.js.org/guides/package-exports/#alternatives

> Instead of providing a single result, the package author may provide a list of results. In such a scenario this list is tried in order and the first valid result will be used.
