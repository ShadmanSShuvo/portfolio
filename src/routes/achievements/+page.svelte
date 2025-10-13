<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import persistent_store from "$lib/stores/persistentstore";
  import AchievementSection from "./AchievementSection.svelte";
  import { achievements } from "$lib/data/achievements";

  let prevUrl = "/";
  let nextUrl = "/projects";
  let isVisible = false;
  let sectionsVisible = new Array(achievements.length).fill(false);

  onMount(() => {
    // Trigger initial animations
    setTimeout(() => (isVisible = true), 100);

    // Set up intersection observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-section-index") || "0"
            );
            sectionsVisible[index] = true;
            sectionsVisible = [...sectionsVisible]; // Trigger reactivity
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all sections
    setTimeout(() => {
      achievements.forEach((_, index) => {
        const section = document.getElementById(`section-${index}`);
        if (section) {
          section.setAttribute("data-section-index", index.toString());
          observer.observe(section);
        }
      });
    }, 200);

    return () => observer.disconnect();
  });

  // Calculate total achievements count
  $: totalAchievements = achievements.reduce(
    (total, section) => total + section.items.length,
    0
  );
</script>

<div
  class="min-h-screen bg-gradient-to-br from-primary_light via-primary_light to-gray-50 dark:from-primary_dark dark:via-primary_dark dark:to-gray-900"
>
  <!-- Hero Section -->
  <section class="relative py-16 px-4 overflow-hidden">
    <!-- Background decorative elements -->
    <div
      class="absolute top-0 left-0 w-72 h-72 bg-secondary_light/10 dark:bg-secondary_dark/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-96 h-96 bg-secondary_light/5 dark:bg-secondary_dark/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
    ></div>

    <div class="max-w-6xl mx-auto text-center relative z-10">
      <div
        class="transform transition-all duration-1000 ease-out {isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'}"
      >
        <!-- Title with gradient text -->
        <h1
          class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary_dark via-secondary_light to-primary_dark dark:from-primary_light dark:via-secondary_dark dark:to-primary_light bg-clip-text text-transparent animate-fade-in-up"
        >
          Achievements
        </h1>

        <!-- Subtitle -->
        <p
          class="text-xl md:text-2xl text-ink_light/80 dark:text-ink_dark/80 mb-8 animate-fade-in-up animate-delay-200"
        >
          A journey of innovation, competition, and leadership
        </p>
      </div>
    </div>
  </section>

  <!-- Achievements Sections -->
  <section class="max-w-6xl mx-auto px-4 pb-16">
    {#each achievements as { section, items }, index}
      <div
        id="section-{index}"
        class="mb-16 transform transition-all duration-800 ease-out {sectionsVisible[
          index
        ]
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'}"
        style="transition-delay: {index * 0.2}s"
      >
        <AchievementSection
          sectionTitle={section}
          achievements={items}
          isVisible={sectionsVisible[index]}
        />
      </div>
    {/each}
  </section>

  <!-- Navigation -->
  <div class="max-w-6xl mx-auto px-4 pb-8">
    <div
      class="flex justify-between items-center py-8 border-t border-gray-200/50 dark:border-gray-700/50"
    >
      <button
        class="flex items-center space-x-3 px-8 py-4 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-ink_light dark:text-ink_dark group hover:scale-105 hover:shadow-lg"
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
          class="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="font-medium">Previous</span>
      </button>

      <button
        class="flex items-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-secondary_light to-secondary_light/80 dark:from-secondary_dark dark:to-secondary_dark/80 hover:from-secondary_light/90 hover:to-secondary_light/70 dark:hover:from-secondary_dark/90 dark:hover:to-secondary_dark/70 transition-all duration-300 text-white group hover:scale-105 hover:shadow-lg"
        on:click|stopPropagation={() => {
          $persistent_store.activeUrl = nextUrl;
          localStorage.setItem(
            "persistent_store",
            JSON.stringify($persistent_store)
          );
          goto(nextUrl);
        }}
      >
        <span class="font-medium">Next</span>
        <svg
          class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
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
</div>
