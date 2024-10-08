# TLDRAW NEXT JS 14 (APP style) starter template.
### Updated to tldraw 3.2.0
###  INCLUDED: cooperative user experience 
- Client: npm run dev --> http://localhost:3000

- Server: npm run server --> http://localhost:5858

- room: (hardcoded) --> test-room 

###  INCLUDED: "File open" and "File save" in main menu.

- There is no "getsnapshot(store)"  or "loadSnapshot(store, ..."  when store comes from "const store = useSync({..."

- We need to use "const editor = useEditor()" --> and then --> "loadSnapshot(editor.store, ..." or "getSnapshot(editor.store);"    




### Use this repo as a template to create a simple tldraw sample:

1. Use the template and clone your new repo to your computer
2. Run `npm install` to install dependencies
3. Run `npm run dev` and in another terminal `npm run server`
4. Open [localhost:3000](http://localhost:3000) and test it is working.




