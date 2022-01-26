// import cookie from 'cookie';
import { config as loadDBParams } from 'dotenv';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import type { SettingsType } from './types';

loadDBParams();

export let isDBConfigured = false;
export let isDBConnected = false;

export let settings: SettingsType;

// const CONNECTION_QUERY = `SELECT 'connected to db'`;
// const CONNECTION_QUERY = readFileSync(path.resolve(`./src/queries/view_schema.sql`), 'utf8');

const loadSettings = () => {
	console.log('loadSettings');
};

export const logRequest = async ({ request, resolve }) => {
	console.log(request);
	// console.log(db.query(`SELECT 'Connected to database'`));
	return resolve(request);
};

export const authUser: Handle = async function({ event, resolve }) {
	const { request, locals } = event;
	// const cookies = cookie.parse(request.headers.cookie || '');
	locals.user = null;
	return await resolve(event);
};

export const handle: Handle = sequence(authUser);
