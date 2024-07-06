Do the following on macOS if `npm i` fails for canvas installation

1. remove this line : `"canvas": "^2.11.2",` from package.json
2. Execute the following
>brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman python-setuptools    

>npm i

# >npm install canvas@npm:@napi-rs/canvas 