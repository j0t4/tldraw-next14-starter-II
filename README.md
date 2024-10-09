# TLDRAW NEXT JS 14 (APP style) starter template.
### Updated to tldraw 3.2.0
###  INCLUDED: cooperative user experience 
- Client: npm run dev --> http://localhost:3000

- Server: npm run server --> http://localhost:5858

- room name: (hardcoded) --> "test-room" 

###  INCLUDED: "File open" and "File save" in main menu.

- There is no "getsnapshot(store)"  or "loadSnapshot(store, ..."  when "store" is initialized this way "const store = useSync({..."

- We need to use "const editor = useEditor()" --> and then --> "loadSnapshot(editor.store, ..." or "getSnapshot(editor.store);"    

### Use this repo as a template to create a simple tldraw sample:

1. Use the template and clone your new repo to your computer
2. Run `npm install` to install dependencies
3. Run `npm run dev` ,and in another terminal `npm run server`
4. Open [localhost:3000](http://localhost:3000) and test it is working.


## REVERSE proxy. 

If needed, like me, you can serve both, server and client in a single port.

In this example, I use [caddy](https://caddyserver.com/) to reverse proxy tldraw and the Sync Server in a single port.

The client is statically built with "npm run build" and saved in "./out" folder. This static build is configured in the file "next.config.mjs"

This reverse proxy configurarion is defined in the file Caddyfile (without extension)
In this use case, server is started as (opriginal port 5858)
```bash
npm run server
```

And the client with the reverse proxy in the 8080 port is started as:

```bash
caddy start --config ./Caddyfile
```

Open a browser to "http://localhost:8080" to open tldraw.

With caddy its easy to add tls to the endpoints: "https://"  and "wss://"


To stop the reverse proxy:
```bash
caddy stop
```