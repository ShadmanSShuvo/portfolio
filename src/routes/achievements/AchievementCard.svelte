<script lang="ts">
  export let achievement: {
    title: string;
    award: string;
    month: string;
    year: string;
    description: string;
  };
  export let sectionColors: {
    gradient: string;
    bg: string;
    border: string;
    text: string;
  };

  let isHovered = false;

  // Get award type for styling
  function getAwardType(award: string) {
    const lowerAward = award.toLowerCase();
    if (lowerAward.includes("champion") || lowerAward.includes("1st")) {
      return {
        type: "champion",
        icon: "🏆",
        color: "text-yellow-600 dark:text-yellow-400",
      };
    } else if (lowerAward.includes("silver") || lowerAward.includes("2nd")) {
      return {
        type: "silver",
        icon: "🥈",
        color: "text-gray-600 dark:text-gray-400",
      };
    } else if (
      lowerAward.includes("runner") ||
      lowerAward.includes("3rd") ||
      lowerAward.includes("bronze")
    ) {
      return {
        type: "bronze",
        icon: "🥉",
        color: "text-orange-600 dark:text-orange-400",
      };
    } else if (lowerAward.includes("finalist")) {
      return {
        type: "finalist",
        icon: "🏅",
        color: "text-blue-600 dark:text-blue-400",
      };
    } else if (lowerAward.includes("winner")) {
      return {
        type: "winner",
        icon: "🏆",
        color: "text-green-600 dark:text-green-400",
      };
    } else {
      return {
        type: "other",
        icon: "⭐",
        color: "text-purple-600 dark:text-purple-400",
      };
    }
  }

  $: awardInfo = getAwardType(achievement.award);
</script>

<div
  class="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30"
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
  role="article"
  tabindex="0"
>
  <!-- Background gradient overlay on hover -->
  <div
    class="absolute inset-0 bg-gradient-to-br {sectionColors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500"
  ></div>

  <!-- Content -->
  <div class="relative p-6 md:p-8">
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <!-- Title and Award -->
      <div class="flex-1 mr-4">
        <h3
          class="text-xl md:text-2xl font-bold text-primary_dark dark:text-primary_light mb-2 group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-300"
        >
          {achievement.title}
        </h3>

        <!-- Award with icon -->
        <div class="flex items-center space-x-2 mb-2">
          <span
            class="text-2xl transform transition-transform duration-300 group-hover:scale-110"
          >
            {awardInfo.icon}
          </span>
          <span class="text-lg font-semibold {awardInfo.color}">
            {achievement.award}
          </span>
        </div>
      </div>

      <!-- Date badge -->
      <div class="flex-shrink-0">
        <div
          class="bg-gradient-to-r {sectionColors.gradient} text-white px-4 py-2 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        >
          <div class="text-sm font-medium text-center">
            <div class="text-xs opacity-90">{achievement.month}</div>
            <div class="text-lg font-bold">{achievement.year}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="relative">
      <p
        class="text-ink_light/80 dark:text-ink_dark/80 leading-relaxed text-sm md:text-base"
      >
        {achievement.description}
      </p>

      <!-- Gradient overlay for long text -->
      {#if achievement.description.length > 200}
        <div
          class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/80 dark:from-gray-800/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
      {/if}
    </div>

    <!-- Bottom highlight bar -->
    <div
      class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r {sectionColors.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
    ></div>

    <!-- Floating particles effect -->
    <div
      class="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r {sectionColors.gradient} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 transform group-hover:translate-y-2 group-hover:scale-150"
    ></div>
    <div
      class="absolute bottom-8 left-6 w-1.5 h-1.5 bg-gradient-to-r {sectionColors.gradient} rounded-full opacity-0 group-hover:opacity-40 transition-all duration-1000 transform group-hover:-translate-y-3 group-hover:scale-125"
      style="transition-delay: 0.2s"
    ></div>
    <div
      class="absolute top-1/2 right-8 w-1 h-1 bg-gradient-to-r {sectionColors.gradient} rounded-full opacity-0 group-hover:opacity-50 transition-all duration-900 transform group-hover:translate-x-2 group-hover:scale-200"
      style="transition-delay: 0.4s"
    ></div>
  </div>

  <!-- Side accent border -->
  <div
    class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b {sectionColors.gradient} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"
  ></div>
</div>

<style>
  /* Custom scrollbar for long descriptions if needed */
  .achievement-description::-webkit-scrollbar {
    width: 4px;
  }

  .achievement-description::-webkit-scrollbar-track {
    background: transparent;
  }

  .achievement-description::-webkit-scrollbar-thumb {
    background: rgba(6, 214, 160, 0.3);
    border-radius: 2px;
  }

  .achievement-description::-webkit-scrollbar-thumb:hover {
    background: rgba(6, 214, 160, 0.5);
  }
</style>
