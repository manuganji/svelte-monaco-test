import type { RequestHandler } from '@sveltejs/kit/types/endpoint';

export const post: RequestHandler = async function ({ request, locals, url }) {
	const formData = await request.formData();
	console.log(locals, url);
	console.log();
	// const jsn = request.json();
	// console.log(jsn);
	return {
		status: 200,
		body: 'ok'
	};
};
