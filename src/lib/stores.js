import { writable, readable } from 'svelte/store';

export let user = writable({});
export let isLoggedIn = writable(false);
export let openLoginDiv = writable(false);