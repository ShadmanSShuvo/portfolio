<script lang="ts">
  import AchievementCard from "./AchievementCard.svelte";
  import { onMount } from "svelte";

  export let sectionTitle: string;
  export let achievements: Array<{
    title: string;
    award: string;
    month: string;
    year: string;
    description: string;
  }>;
  export let isVisible: boolean = false;

  let cardsVisible = new Array(achievements.length).fill(false);

  onMount(() => {
    // Animate cards with staggered delay when section becomes visible
    const animateCards = () => {
      achievements.forEach((_, cardIndex) => {
        setTimeout(() => {
          cardsVisible[cardIndex] = true;
          cardsVisible = [...cardsVisible];
        }, cardIndex * 150);
      });
    };

    if (isVisible) {
      setTimeout(animateCards, 300);
    }
  });

  // Watch for visibility changes
  $: if (isVisible && cardsVisible.every((v) => !v)) {
    setTimeout(() => {
      achievements.forEach((_, cardIndex) => {
        setTimeout(() => {
          cardsVisible[cardIndex] = true;
          cardsVisible = [...cardsVisible];
        }, cardIndex * 150);
      });
    }, 300);
  }

  // Get section icon based on title
  function getSectionIcon(title: string) {
    switch (title.toLowerCase()) {
      case "datathons":
        return `<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>`;
      case "hackathons":
        return `<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>`;
      case "competitive programming":
        return `<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>`;
      case "leadership":
        return `<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>`;
      default:
        return `<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>`;
    }
  }

  // Get section color scheme
  function getSectionColors(title: string) {
    switch (title.toLowerCase()) {
      case "datathons":
        return {
          gradient: "from-blue-500 to-purple-600",
          bg: "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
          border: "border-blue-200 dark:border-blue-700",
          text: "text-blue-600 dark:text-blue-400",
        };
      case "hackathons":
        return {
          gradient: "from-green-500 to-emerald-600",
          bg: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
          border: "border-green-200 dark:border-green-700",
          text: "text-green-600 dark:text-green-400",
        };
      case "competitive programming":
        return {
          gradient: "from-orange-500 to-red-600",
          bg: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
          border: "border-orange-200 dark:border-orange-700",
          text: "text-orange-600 dark:text-orange-400",
        };
      case "leadership":
        return {
          gradient: "from-purple-500 to-pink-600",
          bg: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
          border: "border-purple-200 dark:border-purple-700",
          text: "text-purple-600 dark:text-purple-400",
        };
      default:
        return {
          gradient: "from-secondary_light to-secondary_light",
          bg: "from-secondary_light/10 to-secondary_light/5",
          border: "border-secondary_light dark:border-secondary_dark",
          text: "text-secondary_light dark:text-secondary_dark",
        };
    }
  }

  $: colors = getSectionColors(sectionTitle);
</script>

<section class="relative">
  <!-- Section Header -->
  <div class="mb-8">
    <div class="flex items-center space-x-4 mb-4">
      <!-- Icon with gradient background -->
      <div class="relative">
        <div
          class="w-14 h-14 rounded-2xl bg-gradient-to-r {colors.gradient} flex items-center justify-center text-white shadow-lg"
        >
          {@html getSectionIcon(sectionTitle)}
        </div>
        <!-- Decorative ring -->
        <div
          class="absolute -inset-1 rounded-2xl bg-gradient-to-r {colors.gradient} opacity-20 blur-sm"
        ></div>
      </div>

      <!-- Title and count -->
      <div>
        <h2
          class="text-3xl md:text-4xl font-bold text-primary_dark dark:text-primary_light"
        >
          {sectionTitle}
        </h2>
        <p class="text-sm {colors.text} font-medium mt-1">
          {achievements.length} achievement{achievements.length !== 1
            ? "s"
            : ""}
        </p>
      </div>
    </div>

    <!-- Gradient divider -->
    <div
      class="w-full h-px bg-gradient-to-r {colors.gradient} opacity-30"
    ></div>
  </div>

  <!-- Achievement Cards Grid -->
  <div class="grid gap-6 md:gap-8">
    {#each achievements as achievement, cardIndex}
      <div
        class="transform transition-all duration-700 ease-out {cardsVisible[
          cardIndex
        ]
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-8 opacity-0 scale-95'}"
        style="transition-delay: {cardIndex * 0.1}s"
      >
        <AchievementCard {achievement} sectionColors={colors} />
      </div>
    {/each}
  </div>

  <!-- Section bottom spacing -->
  <div class="mt-16 mb-8">
    <div
      class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent opacity-50"
    ></div>
  </div>
</section>
