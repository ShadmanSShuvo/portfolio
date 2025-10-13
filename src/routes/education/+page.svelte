<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import persistent_store from "$lib/stores/persistentstore";

  import EducationCard from "./EducationCard.svelte";
  import { education_milestone } from "$lib/data/education";

  let prevUrl = "/skills";
  let nextUrl = "/"; //"/research";
  let isVisible = false;
  let titleVisible = false;
  let statsVisible = false;
  let cardsVisible = new Array(education_milestone.length).fill(false);

  onMount(() => {
    // Staggered entrance animations
    setTimeout(() => (isVisible = true), 100);
    setTimeout(() => (titleVisible = true), 300);
    setTimeout(() => (statsVisible = true), 600);

    // Set up intersection observer for cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-card-index") || "0"
            );
            setTimeout(() => {
              cardsVisible[index] = true;
              cardsVisible = [...cardsVisible];
            }, index * 150); // Staggered card animations
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all cards
    setTimeout(() => {
      education_milestone.forEach((_, index) => {
        const card = document.getElementById(`education-card-${index}`);
        if (card) {
          card.setAttribute("data-card-index", index.toString());
          observer.observe(card);
        }
      });
    }, 500);

    return () => observer.disconnect();
  });
</script>

<div class="container mx-auto p-4">
  <!-- Animated Header -->
  <div class="text-center mb-12">
    <h1
      class="text-4xl md:text-5xl font-bold text-primary_dark dark:text-primary_light mb-4 transform transition-all duration-800 ease-out {titleVisible
        ? 'translate-y-0 opacity-100 scale-100'
        : 'translate-y-8 opacity-0 scale-95'}"
    >
      Education
    </h1>

    <!-- Animated underline -->
    <div class="flex justify-center mb-8">
      <div
        class="h-1 bg-gradient-to-r from-transparent via-secondary_light to-transparent dark:via-secondary_dark transition-all duration-1000 ease-out {titleVisible
          ? 'w-32'
          : 'w-0'}"
      ></div>
    </div>

    <!-- Animated subtitle -->
    <p
      class="text-lg text-ink_light/80 dark:text-ink_dark/80 max-w-2xl mx-auto transform transition-all duration-700 ease-out {statsVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-4 opacity-0'}"
      style="transition-delay: 0.2s"
    >
      My academic journey through computer science and engineering
    </p>
  </div>

  <!-- Education Cards with Timeline -->
  <div class="relative max-w-6xl mx-auto">
    <!-- Animated timeline line -->
    <div
      class="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bg-gradient-to-b from-secondary_light to-secondary_light/30 dark:from-secondary_dark dark:to-secondary_dark/30 transition-all duration-1000 ease-out {statsVisible
        ? 'h-full w-0.5 opacity-100'
        : 'h-0 w-0.5 opacity-0'}"
      style="transition-delay: 0.5s"
    ></div>

    <!-- Education Cards -->
    <div class="space-y-16">
      {#each education_milestone as education, index}
        <div
          id="education-card-{index}"
          class="relative transform transition-all duration-700 ease-out {cardsVisible[
            index
          ]
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-12 opacity-0 scale-95'}"
        >
          <!-- Animated timeline dot -->
          <div
            class="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-secondary_light dark:bg-secondary_dark rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10 transition-all duration-500 ease-out {cardsVisible[
              index
            ]
              ? 'scale-100 opacity-100'
              : 'scale-0 opacity-0'}"
            style="transition-delay: {index * 0.2 + 0.3}s"
          >
            <!-- Pulse animation -->
            <div
              class="absolute inset-0 rounded-full bg-secondary_light dark:bg-secondary_dark animate-ping opacity-30"
            ></div>
            <!-- Inner glow -->
            <div
              class="absolute inset-1 rounded-full bg-white dark:bg-gray-800"
            ></div>
          </div>

          <!-- Card with improved sizing -->
          <div
            class="ml-16 md:ml-0 md:max-w-2xl lg:max-w-3xl transform transition-all duration-600 ease-out {cardsVisible[
              index
            ]
              ? index % 2 === 0
                ? 'md:pr-16 lg:pr-20 md:translate-x-0'
                : 'md:ml-auto md:pl-16 lg:pl-20 md:translate-x-0'
              : index % 2 === 0
                ? 'md:pr-16 lg:pr-20 md:-translate-x-8'
                : 'md:ml-auto md:pl-16 lg:pl-20 md:translate-x-8'}"
            style="transition-delay: {index * 0.2 + 0.5}s"
          >
            <EducationCard
              {education}
              cardIndex={index}
              isVisible={cardsVisible[index]}
            />
          </div>
        </div>
      {/each}
    </div>
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
