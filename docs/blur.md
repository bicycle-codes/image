# blur hash
https://github.com/LukyVj/cloudinary-blurhash/blob/269ad69eeaa0d2a26fd729be6b9558c30cda0468/transformer/index.js#L3

example, [uses canvas in node](https://github.com/LukyVj/cloudinary-blurhash/blob/269ad69eeaa0d2a26fd729be6b9558c30cda0468/transformer/index.js#L4) to create the blurhash.

## canvas issue
about canvas issue, [see this](https://github.com/Automattic/node-canvas/issues/1733#issuecomment-761703018)

need to run the command
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

## good news
Can pass a local path to the node canvas -- https://github.com/Automattic/node-canvas/blob/5bd5b243c4353fb9bdf03287e993104964cc0c39/examples/image-src-svg.js#L10
