'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSync } from '@tldraw/sync'
import {
	Tldraw,
	AssetRecordType,
	getHashForString,
	DefaultMainMenu,
	DefaultMainMenuContent,
	TLComponents,
	TLAssetStore,
	TLBookmarkAsset,
	TldrawUiMenuGroup,
	TldrawUiMenuItem,
	TldrawUiMenuSubmenu,
	uniqueId,
	useEditor,
	getSnapshot,
	loadSnapshot,
} from 'tldraw'
import 'tldraw/tldraw.css'

const WORKER_URL = `http://localhost:8080`
const roomId = 'test-room'

function CustomMainMenu() {
	const editor = useEditor()
	return (
		<DefaultMainMenu>
			<div style={{ backgroundColor: 'white' }}>
				<TldrawUiMenuSubmenu id="file"
					label="File"
				>
					<TldrawUiMenuGroup id="file">
						<TldrawUiMenuItem
							id="load"
							label="Load File"
							icon="external-link"
							readonlyOk
							onSelect={() => {

								const input = document.createElement("input");
								input.type = "file";
								input.onchange = function (event) {
									try {
										let files = input.files;
										if (files !== null) {
											if (files.length > 0) {
												let file = files[0];
												if (file !== null) {
													let reader = new FileReader();
													const self = this;
													reader.onload = (event) => {
														if (event.target !== null) {
															const result = event.target.result as string;
															if (result !== null) {
																loadSnapshot(editor.store, JSON.parse(result));
																//console.log('FILE CONTENT', JSON.parse(result))
															};
														}
													};
													reader.readAsText(file);
												}
											}
										}
									} catch (err) {
										console.error(err);
									}
								};
								input.click();

							}}
						/>
						<TldrawUiMenuItem
							id="Save"
							label="Save File"
							icon="external-link"
							readonlyOk
							onSelect={() => {
								const snapshot = getSnapshot(editor.store);
								//console.log(JSON.stringify(snapshot));
								const link = document.createElement("a");
								const file = new Blob([JSON.stringify(snapshot)], { type: 'text/plain' });
								link.href = URL.createObjectURL(file);
								link.download = "sample.tldr";
								link.click();
								URL.revokeObjectURL(link.href);
							}}
						/>
					</TldrawUiMenuGroup>
				</TldrawUiMenuSubmenu>
			</div>
			<DefaultMainMenuContent />
		</DefaultMainMenu>
	)
}


const components: TLComponents = {
	MainMenu: CustomMainMenu,
}

const multiplayerAssets: TLAssetStore = {
	async upload(_asset: any, file: any) {
		const id = uniqueId()
		const objectName = `${id}-${file.name}`
		const url = `${WORKER_URL}/uploads/${encodeURIComponent(objectName)}`

		const response = await fetch(url, {
			method: 'PUT',
			body: file,
		})

		if (!response.ok) {
			throw new Error(`Failed to upload asset: ${response.statusText}`)
		}

		return url
	},

	resolve(asset: any) {
		return asset.props.src
	},
}

async function unfurlBookmarkUrl({ url }: { url: string }): Promise<TLBookmarkAsset> {
	const asset: TLBookmarkAsset = {
		id: AssetRecordType.createId(getHashForString(url)),
		typeName: 'asset',
		type: 'bookmark',
		meta: {},
		props: {
			src: url,
			description: '',
			image: '',
			favicon: '',
			title: '',
		},
	}

	try {
		const response = await fetch(`${WORKER_URL}/unfurl?url=${encodeURIComponent(url)}`)
		const data = await response.json()
		asset.props.description = data?.description ?? ''
		asset.props.image = data?.image ?? ''
		asset.props.favicon = data?.favicon ?? ''
		asset.props.title = data?.title ?? ''
	} catch (e) {
		console.error(e)
	}

	return asset
}

export default function Home() {

	const store = useSync({
		uri: `${WORKER_URL}/connect/${roomId}`,
		assets: multiplayerAssets,
	})
    
	return (
		<main>
			<div style={{ position: 'fixed', inset: 0 }}>
				<Tldraw
					store={store}
					onMount={(editor) => {
						// @ts-expect-error
						window.editor = editor
						editor.registerExternalAssetHandler('url', unfurlBookmarkUrl)
					}}
					components={components}
				/>
			</div>
		</main>
	)
}
