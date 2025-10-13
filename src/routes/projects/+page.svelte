<script lang="ts">
    import { goto } from "$app/navigation";
    import persistent_store from "$lib/stores/persistentstore";

    import ProjectCard from "./ProjectCard.svelte";
    import { projects } from "$lib/data/projects";

    let prevUrl = "/"; //"/achievements";
    let nextUrl = "/skills";
</script>

<div class="container mx-auto p-4">
    <h1
        class="text-3xl font-bold text-primary_dark dark:text-primary_light my-8"
    >
        Projects
    </h1>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {#each projects as project}
            <ProjectCard {project} />
        {/each}
    </div>

    <!-- Navigation -->
  <div
    class="flex justify-between items-center py-8 border-t border-gray-200 dark:border-gray-700"
  >
    <button
      class="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-ink_light dark:text-ink_dark group hover:scale-105 hover:shadow-lg"
      on:click|stopPropagation={() => {
        $persistent_store.activeUrl = prevUrl;
        localStorage.setItem(
          "persistent_store",
          JSON.stringify($persistent_store)
        );
        goto(prevUrl);
      }}
    >
      <svg
        class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-2"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <span>Previous</span>
    </button>

    <button
      class="flex items-center space-x-2 px-6 py-3 rounded-lg bg-secondary_light dark:bg-secondary_dark hover:bg-secondary_light/90 dark:hover:bg-secondary_dark/90 transition-all duration-300 text-white group hover:scale-105 hover:shadow-lg"
      on:click|stopPropagation={() => {
        $persistent_store.activeUrl = nextUrl;
        localStorage.setItem(
          "persistent_store",
          JSON.stringify($persistent_store)
        );
        goto(nextUrl);
      }}
    >
      <span>Next</span>
      <svg
        class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</div>
