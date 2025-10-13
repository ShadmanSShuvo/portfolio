<script lang="ts">
    import { FireSolid } from "flowbite-svelte-icons";
    export let skill: {
        title: string;
        badges: string[];
    };
</script>

<div
    class="p-6 bg-primary_light dark:bg-primary_dark shadow-md rounded-lg w-full mb-6"
>
    <!-- Title -->
    <h3
        class="text-lg font-bold text-primary_dark dark:text-primary_light mb-4"
    >
        <FireSolid class="w-6 h-6 inline-block mr-2" />
        {skill.title}
    </h3>

    <!-- Badges -->
    <div class="flex flex-wrap gap-4">
        {#each skill.badges as badge}
            <img
                src={badge}
                alt={skill.title}
                class="h-8 w-auto object-contain"
                loading="lazy"
            />
        {/each}
    </div>
</div>
