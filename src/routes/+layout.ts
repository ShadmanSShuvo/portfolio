import type { PageLoad } from "./$types";
import persistent_store from "$lib/stores/persistentstore";

export const ssr = false;
export const prerender = true;

function load_persistent_store() {
    const value = JSON.parse(localStorage.getItem("persistent_store"));
    if (value == null) {
        persistent_store.set({
            activeUrl: "/",
            darkMode: true,
        });
    }
    else {
        persistent_store.set(value);
    }
}

export const load: PageLoad = async () => {
    load_persistent_store();
    return {
        status: 200,
        error: null,
        props: {},
    };
}