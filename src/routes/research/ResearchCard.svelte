<script lang="ts">
  import {
    BookOpenSolid,
    ArrowUpRightFromSquareSolid,
    UsersGroupSolid,
    TagSolid,
    BookSolid,
  } from "flowbite-svelte-icons";

  export let research: {
    title: string;
    arxivUrl: string;
    keywords: string[];
    coAuthors: string[];
    abstract: string;
  };
  export let cardIndex: number;
  export let isVisible: boolean;

  let isHovered = false;
  let keywordsVisible = false;
  let abstractVisible = false;
  let expandedAbstract = false;

  // Animate sections when card becomes visible
  $: if (isVisible) {
    setTimeout(
      () => {
        keywordsVisible = true;
      },
      300 + cardIndex * 100
    );
    setTimeout(
      () => {
        abstractVisible = true;
      },
      600 + cardIndex * 100
    );
  }

  // Truncate abstract for better UX
  $: truncatedAbstract =
    research.abstract.length > 250
      ? research.abstract.substring(0, 250) + "..."
      : research.abstract;
</script>

<div
  class="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-2"
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
  role="article"
  tabindex="0"
>
  <!-- Animated gradient background on hover -->
  <div
    class="absolute inset-0 bg-gradient-to-br from-secondary_light/5 via-transparent to-secondary_light/10 dark:from-secondary_dark/5 dark:to-secondary_dark/10 opacity-0 group-hover:opacity-100 transition-all duration-700"
  ></div>

  <!-- Top accent border with animation -->
  <div
    class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary_light via-secondary_light/80 to-secondary_light dark:from-secondary_dark dark:via-secondary_dark/80 dark:to-secondary_dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left"
  ></div>

  <!-- Content -->
  <div class="relative p-8 md:p-10 space-y-8">
    <!-- Header Section -->
    <div
      class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6"
    >
      <!-- Title with Icon -->
      <div class="flex-1">
        <div class="flex items-start gap-4 mb-4">
          <div class="flex-shrink-0 mt-1">
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary_light to-secondary_light/80 dark:from-secondary_dark dark:to-secondary_dark/80 flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
            >
              <BookOpenSolid class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="flex-1">
            <h3
              class="text-2xl md:text-3xl font-bold text-primary_dark dark:text-primary_light leading-tight group-hover:text-secondary_dark dark:group-hover:text-secondary_light transition-colors duration-500"
            >
              {research.title}
            </h3>
          </div>
        </div>
      </div>

      <!-- arXiv Button -->
      {#if research.arxivUrl}
        <div class="flex-shrink-0">
          <a
            href={research.arxivUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-secondary_light to-secondary_light/90 dark:from-secondary_dark dark:to-secondary_dark/90 hover:from-secondary_light/90 hover:to-secondary_light/80 dark:hover:from-secondary_dark/90 dark:hover:to-secondary_dark/80 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <ArrowUpRightFromSquareSolid class="w-5 h-5" />
            <span>View on arXiv</span>
          </a>
        </div>
      {/if}
    </div>

    <!-- Keywords Section -->
    <div
      class="transform transition-all duration-600 ease-out {keywordsVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-6 opacity-0'}"
    >
      <div class="flex items-center gap-3 mb-4">
        <TagSolid
          class="w-5 h-5 text-secondary_light dark:text-secondary_dark"
        />
        <h4
          class="text-lg font-semibold text-secondary_dark dark:text-secondary_light"
        >
          Keywords
        </h4>
        <div
          class="flex-1 h-px bg-gradient-to-r from-secondary_light/30 to-transparent dark:from-secondary_dark/30"
        ></div>
      </div>
      <div class="flex flex-wrap gap-3">
        {#each research.keywords as keyword, keywordIndex}
          <span
            class="px-4 py-2 bg-gradient-to-r from-secondary_light/10 to-secondary_light/5 dark:from-secondary_dark/10 dark:to-secondary_dark/5 text-secondary_dark dark:text-secondary_light border border-secondary_light/20 dark:border-secondary_dark/20 rounded-full font-medium text-sm hover:bg-secondary_light/20 dark:hover:bg-secondary_dark/20 transition-all duration-300 transform hover:scale-105 hover:shadow-md {keywordsVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'}"
            style="transition-delay: {keywordIndex * 0.1}s"
          >
            {keyword}
          </span>
        {/each}
      </div>
    </div>

    <!-- Co-authors Section -->
    {#if research.coAuthors.length > 0}
      <div
        class="bg-gray-50/80 dark:bg-gray-700/30 rounded-2xl p-6 border-l-4 border-secondary_light dark:border-secondary_dark transform transition-all duration-600 ease-out {keywordsVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-6 opacity-0'}"
        style="transition-delay: 0.4s"
      >
        <div class="flex items-center gap-3 mb-3">
          <UsersGroupSolid
            class="w-5 h-5 text-secondary_light dark:text-secondary_dark"
          />
          <h4
            class="text-lg font-semibold text-secondary_dark dark:text-secondary_light"
          >
            Collaborators
          </h4>
        </div>
        <p class="text-base text-ink_light dark:text-ink_dark leading-relaxed">
          {research.coAuthors.join(", ")}
        </p>
      </div>
    {/if}

    <!-- Abstract Section -->
    <div
      class="transform transition-all duration-700 ease-out {abstractVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-8 opacity-0'}"
      style="transition-delay: 0.6s"
    >
      <div
        class="bg-white/70 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200/30 dark:border-gray-700/30 shadow-inner"
      >
        <div class="flex items-center gap-3 mb-6">
          <BookSolid
            class="w-6 h-6 text-secondary_light dark:text-secondary_dark"
          />
          <h4
            class="text-xl font-bold text-secondary_dark dark:text-secondary_light"
          >
            Abstract
          </h4>
          <div
            class="flex-1 h-px bg-gradient-to-r from-secondary_light/30 to-transparent dark:from-secondary_dark/30"
          ></div>
        </div>

        <div class="prose prose-gray dark:prose-invert max-w-none">
          <p
            class="text-base md:text-lg text-ink_light dark:text-ink_dark leading-relaxed text-justify transition-all duration-300"
          >
            {expandedAbstract ? research.abstract : truncatedAbstract}
          </p>

          {#if research.abstract.length > 250}
            <button
              on:click={() => (expandedAbstract = !expandedAbstract)}
              class="mt-4 text-secondary_light dark:text-secondary_dark hover:text-secondary_dark dark:hover:text-secondary_light font-semibold transition-colors duration-300 hover:underline"
            >
              {expandedAbstract ? "Show Less" : "Read More"}
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Floating decorative elements -->
  <div
    class="absolute top-6 right-6 w-3 h-3 bg-gradient-to-br from-secondary_light to-secondary_light/60 dark:from-secondary_dark dark:to-secondary_dark/60 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-700 transform group-hover:scale-150 group-hover:translate-y-3"
  ></div>
  <div
    class="absolute bottom-8 left-8 w-2 h-2 bg-gradient-to-br from-secondary_light to-secondary_light/40 dark:from-secondary_dark dark:to-secondary_dark/40 rounded-full opacity-0 group-hover:opacity-50 transition-all duration-900 transform group-hover:scale-125 group-hover:-translate-y-4"
    style="transition-delay: 0.2s"
  ></div>
  <div
    class="absolute top-1/3 right-12 w-1.5 h-1.5 bg-gradient-to-br from-secondary_light to-secondary_light/80 dark:from-secondary_dark dark:to-secondary_dark/80 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-800 transform group-hover:scale-200 group-hover:translate-x-3"
    style="transition-delay: 0.4s"
  ></div>

  <!-- Side accent with gradient -->
  <div
    class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-secondary_light via-secondary_light/60 to-secondary_light/30 dark:from-secondary_dark dark:via-secondary_dark/60 dark:to-secondary_dark/30 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out origin-top rounded-l-3xl"
  ></div>
</div>
