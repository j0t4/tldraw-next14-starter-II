'use client'
import {
	Tldraw,
	DefaultMainMenu,
	DefaultMainMenuContent,
	TLComponents,
	TldrawUiMenuGroup,
	TldrawUiMenuItem,
	TldrawUiMenuSubmenu,
	createTLStore,
	getSnapshot,
	loadSnapshot
} from 'tldraw'
import 'tldraw/tldraw.css'

const store = createTLStore()

function CustomMainMenu() {

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
																loadSnapshot(store, JSON.parse(result));
																console.log('FILE CONTENT', JSON.parse(result))
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
								const snapshot = getSnapshot(store);
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


export default function Home() {
	return (
		<main>
			<div style={{ position: 'fixed', inset: 0 }}>
				<Tldraw store={store} components={components}/>
			</div>
		</main>
	)
}
