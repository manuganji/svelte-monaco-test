<script lang="ts">
	import { onMount } from 'svelte';
	import { editor } from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
	//@ts-ignore
	self.MonacoEnvironment = {
		getWorker(_, label) {
			if (label === 'json') {
				return new jsonWorker();
			}
			if (label === 'css' || label === 'scss' || label === 'less') {
				return new cssWorker();
			}
			if (label === 'html' || label === 'handlebars' || label === 'razor') {
				return new htmlWorker();
			}
			if (label === 'typescript' || label === 'javascript') {
				return new tsWorker();
			}
			return new editorWorker();
		}
	};
	let editorEl: HTMLElement;
	// let monaco;
	let destroyed = false;
	let editorInstance;
	export let code = 'SELECT * FROM pg_types;';
	export let language;

	export function getValue() {
		return editorInstance.getValue();
	}

	export function setValue(ipCode: string) {
		editorInstance.setValue(ipCode);
	}

	onMount(() => {
		editorInstance = editor.create(editorEl, {
			value: code,
			language: language
		});
		console.log('onMount');
		return () => {
			destroyed = true;
			editorInstance.dispose();
		};
	});
</script>

<div bind:this={editorEl} class="h-48 w-2/3" />
