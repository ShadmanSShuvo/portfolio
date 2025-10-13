<script lang="ts">
    export let project: any = {};
</script>

<div class="my-8">
    <h2 class="text-2xl font-bold underline">{project.title}</h2>
    <img
        src={project.imageUrl}
        alt={project.title}
        class="mx-auto my-4 max-w-96"
    />
    <p class="font-semibold text-left">{project.date}</p>
    <div class="flex flex-wrap justify-start gap-4 my-2">
        {#each project.tags as tag}
            <span class="px-2 py-1 bg-gray-200 rounded dark:bg-gray-700"
                >{tag}</span
            >
        {/each}
    </div>
    <p>{project.description}</p>
    <div class="flex flex-row justify-start gap-4 my-4">
        {#each Object.keys(project.links) as link}
            <a href={project.links[link]} class="underline">{link}</a>
        {/each}
    </div>
</div>
