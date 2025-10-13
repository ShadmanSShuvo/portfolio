<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import persistent_store from "$lib/stores/persistentstore";

  import ResearchCard from "./ResearchCard.svelte";
  import { researches } from "$lib/data/researches";

  let prevUrl = "/education";
  let nextUrl = "/";
  let isVisible = false;
  let headerVisible = false;
  let statsVisible = false;
  let cardsVisible = new Array(researches.length).fill(false);
  let scrollY = 0;

  onMount(() => {
    // Enhanced staggered entrance animations
    setTimeout(() => (isVisible = true), 100);
    setTimeout(() => (headerVisible = true), 400);
    setTimeout(() => (statsVisible = true), 800);

    // Parallax scroll effect
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Enhanced intersection observer for cards
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
            }, index * 200);
          }
        });
      },
      { threshold: 0.15, rootMargin: "50px" }
    );

    // Observe all cards with delay
    setTimeout(() => {
      researches.forEach((_, index) => {
        const card = document.getElementById(`research-card-${index}`);
        if (card) {
          card.setAttribute("data-card-index", index.toString());
          observer.observe(card);
        }
      });
    }, 1000);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<svelte:window bind:scrollY />

<div
  class="min-h-screen bg-gradient-to-br from-primary_light via-primary_light to-gray-50 dark:from-primary_dark dark:via-primary_dark dark:to-gray-900"
>
  <!-- Hero Section with Parallax Effect -->
  <section class="relative py-20 px-4 overflow-hidden">
    <!-- Animated Background Elements -->
    <div
      class="absolute top-0 left-0 w-96 h-96 bg-secondary_light/10 dark:bg-secondary_dark/10 rounded-full blur-3xl transform transition-all duration-1000 -translate-x-1/2 -translate-y-1/2"
      style="transform: translate3d({-50 + scrollY * 0.1}%, {-50 +
        scrollY * 0.05}%, 0)"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-72 h-72 bg-secondary_light/5 dark:bg-secondary_dark/5 rounded-full blur-3xl transform transition-all duration-1000 translate-x-1/2 translate-y-1/2"
      style="transform: translate3d({50 - scrollY * 0.08}%, {50 -
        scrollY * 0.03}%, 0)"
    ></div>

    <div class="max-w-6xl mx-auto text-center relative z-10">
      <!-- Floating Research Icon -->
      <div
        class="flex justify-center mb-8 transform transition-all duration-1000 ease-out {isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-12 opacity-0'}"
      >
        <div class="relative">
          <div
            class="w-24 h-24 rounded-3xl bg-gradient-to-br from-secondary_light to-secondary_light/80 dark:from-secondary_dark dark:to-secondary_dark/80 flex items-center justify-center shadow-2xl animate-float"
          >
            <svg
              class="w-12 h-12 fill-primary_light dark:fill-primary_dark"
              viewBox="0 0 20 20"
            >
              <path
                d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 005.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
              />
            </svg>
          </div>
          <!-- Glow effect -->
          <div
            class="absolute -inset-2 rounded-3xl bg-gradient-to-br from-secondary_light to-secondary_light/60 dark:from-secondary_dark dark:to-secondary_dark/60 opacity-30 blur-lg animate-pulse-gentle"
          ></div>
        </div>
      </div>

      <!-- Enhanced Title with Gradient -->
      <div
        class="transform transition-all duration-1000 ease-out {headerVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-8 opacity-0 scale-95'}"
      >
        <h1
          class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary_dark via-secondary_light to-primary_dark dark:from-primary_light dark:via-secondary_dark dark:to-primary_light bg-clip-text text-transparent"
        >
          Research
        </h1>

        <!-- Elegant underline animation -->
        <div class="flex justify-center mb-8">
          <div
            class="h-1 bg-gradient-to-r from-transparent via-secondary_light to-transparent dark:via-secondary_dark transition-all duration-1200 ease-out {headerVisible
              ? 'w-40'
              : 'w-0'}"
          ></div>
        </div>
      </div>

      <!-- Refined subtitle -->
      <p
        class="text-xl md:text-2xl text-ink_light/80 dark:text-ink_dark/80 max-w-3xl mx-auto leading-relaxed transform transition-all duration-800 ease-out {statsVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-6 opacity-0'}"
        style="transition-delay: 0.2s"
      >
        Advancing the frontiers of artificial intelligence through innovative
        research and collaboration
      </p>
    </div>
  </section>

  <!-- Research Papers Section -->
  <section class="max-w-7xl mx-auto px-4 pb-20">
    <div class="space-y-16">
      {#each researches as research, index}
        <div
          id="research-card-{index}"
          class="transform transition-all duration-900 ease-out {cardsVisible[
            index
          ]
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-16 opacity-0 scale-95'}"
          style="transition-delay: {index * 0.3}s"
        >
          <ResearchCard
            {research}
            cardIndex={index}
            isVisible={cardsVisible[index]}
          />
        </div>
      {/each}
    </div>
  </section>

  <!-- Enhanced Navigation -->
  <div class="max-w-6xl mx-auto px-4 pb-8">
    <div
      class="flex justify-between items-center py-8 border-t border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-800 ease-out {statsVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-8 opacity-0'}"
      style="transition-delay: 1.2s"
    >
      <button
        class="group flex items-center space-x-3 px-8 py-4 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-ink_light dark:text-ink_dark hover:scale-105 hover:shadow-lg"
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
        class="group flex items-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-secondary_light to-secondary_light/80 dark:from-secondary_dark dark:to-secondary_dark/80 hover:from-secondary_light/90 hover:to-secondary_light/70 dark:hover:from-secondary_dark/90 dark:hover:to-secondary_dark/70 transition-all duration-300 text-white hover:scale-105 hover:shadow-lg"
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
