<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { SunSolid, MoonSolid } from "flowbite-svelte-icons";
    import {
        Navbar,
        NavBrand,
        NavUl,
        NavHamburger,
        Avatar,
    } from "flowbite-svelte";
    import "../app.css";
    import persistent_store from "$lib/stores/persistentstore";
    import logo_dark from "$lib/images/logo-dark.png";
    import logo_light from "$lib/images/logo-light.png";

    function setThemeClass() {
        if ($persistent_store.darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }

    onMount(() => {
        setThemeClass();
        goto($persistent_store.activeUrl);
    });

    function toggledarkMode() {
        console.log(localStorage.getItem("persistent_store"));
        $persistent_store.darkMode = !$persistent_store.darkMode;
        localStorage.setItem(
            "persistent_store",
            JSON.stringify($persistent_store),
        );
        console.log(localStorage.getItem("persistent_store"));
        setThemeClass();
    }

    const routes = [
        { url: "/", name: "Home" },
        //{ url: "/achievements", name: "Achievements" },
        { url: "/projects", name: "Projects" },
        { url: "/skills", name: "Skills" },
        { url: "/education", name: "Education" },
        //{ url: "/research", name: "Research" },
    ];
</script>

<div
    class="min-h-screen min-w-screen dark:bg-primary_dark dark:text-ink_dark bg-primary_light text-ink_light"
>
    <main class="max-w-4xl p-4 mx-auto">
        <Navbar>
            <NavBrand href="/">
                {#if $persistent_store.darkMode}
                    <Avatar id="avatar-menu" src={logo_dark} border />
                {:else}
                    <Avatar id="avatar-menu" src={logo_light} border />
                {/if}
            </NavBrand>
            <div class="flex items-center md:order-2">
                <button
                    on:click={toggledarkMode}
                    class="p-2 mx-3 bg-gray-200 rounded dark:bg-gray-700"
                >
                    <!-- Replace with your toggle mode icon -->
                    <span class="text-gray-800 dark:text-gray-200">
                        {#if $persistent_store.darkMode}
                            <!-- Icon for Light Mode -->
                            <SunSolid />
                        {:else}
                            <!-- Icon for Dark Mode -->
                            <MoonSolid />
                        {/if}
                    </span>
                </button>
                <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
            </div>
            <NavUl>
                {#each routes as { url, name }}
                    <li>
                        {#if $persistent_store.activeUrl === url}
                            <button
                                class="block py-2 pl-3 pr-4 transition-all rounded text-secondary_light hover:bg-gray-100 hover:text-secondary_light md:p-0 dark:text-secondary_dark dark:hover:text-secondary_dark dark:hover:bg-gray-700 dark:border-gray-700"
                                on:click|stopPropagation={() => {
                                    $persistent_store.activeUrl = url;
                                    localStorage.setItem(
                                        "persistent_store",
                                        JSON.stringify($persistent_store),
                                    );
                                    goto(url);
                                }}>{name}</button
                            >
                        {:else}
                            <button
                                class="block py-2 pl-3 pr-4 transition-all rounded text-ink_light hover:bg-gray-100 hover:text-secondary_light md:p-0 dark:text-ink_dark dark:hover:text-secondary_dark dark:hover:bg-gray-700 dark:border-gray-700"
                                on:click|stopPropagation={() => {
                                    $persistent_store.activeUrl = url;
                                    localStorage.setItem(
                                        "persistent_store",
                                        JSON.stringify($persistent_store),
                                    );
                                    goto(url);
                                }}>{name}</button
                            >
                        {/if}
                    </li>
                {/each}
            </NavUl>
        </Navbar>

        <slot />
    </main>
</div>
