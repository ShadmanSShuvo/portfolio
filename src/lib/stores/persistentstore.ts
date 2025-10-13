import { writable } from "svelte/store";

const persistent_store = writable({
    activeUrl: "/",
    darkMode: true,
});

export default persistent_store;