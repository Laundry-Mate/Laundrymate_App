import { writable, readable } from 'svelte/store';

export let user = writable({});
export let isLoggedIn = writable(false);
export let openLoginDiv = writable(false);
export let openLoggedInDiv = writable(false);

export let selectedClothes = writable({});
export let openClothes = writable(false);
export let photoInfoList = writable([]);