<script lang="ts">
  import {
    BadgeCheckSolid,
    CalendarMonthSolid,
    StarSolid,
    BookSolid,
  } from "flowbite-svelte-icons";

  export let education: {
    institution: string;
    timeline: string;
    degree: string;
    grade: string;
    description?: string | null;
    courses?: string[] | null;
  };
  export let cardIndex: number;
  export let isVisible: boolean;

  let isHovered = false;
  let showAllCourses = false;
  let coursesVisible = false;

  // Animate courses when card becomes visible
  $: if (isVisible && education.courses) {
    setTimeout(
      () => {
        coursesVisible = true;
      },
      300 + cardIndex * 100
    );
  }

  // Get education level styling
  function getEducationLevelStyle(degree: string) {
    const lowerDegree = degree.toLowerCase();
    if (lowerDegree.includes("b.sc") || lowerDegree.includes("bachelor")) {
      return {
        gradient: "from-blue-500 to-purple-600",
        bg: "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
        border: "border-blue-200 dark:border-blue-700",
        text: "text-blue-600 dark:text-blue-400",
        icon: "🎓",
      };
    } else if (
      lowerDegree.includes("higher secondary") ||
      lowerDegree.includes("hsc")
    ) {
      return {
        gradient: "from-green-500 to-emerald-600",
        bg: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
        border: "border-green-200 dark:border-green-700",
        text: "text-green-600 dark:text-green-400",
        icon: "📚",
      };
    } else if (
      lowerDegree.includes("secondary") ||
      lowerDegree.includes("ssc")
    ) {
      return {
        gradient: "from-orange-500 to-red-600",
        bg: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
        border: "border-orange-200 dark:border-orange-700",
        text: "text-orange-600 dark:text-orange-400",
        icon: "📖",
      };
    }
    return {
      gradient: "from-secondary_light to-secondary_light",
      bg: "from-secondary_light/10 to-secondary_light/5",
      border: "border-secondary_light dark:border-secondary_dark",
      text: "text-secondary_light dark:text-secondary_dark",
      icon: "🎯",
    };
  }

  // Get grade color based on performance
  function getGradeStyle(grade: string) {
    if (grade.includes("5.00") || grade.includes("3.90")) {
      return "text-yellow-600 dark:text-yellow-400 font-bold";
    }
    return "text-secondary_light dark:text-secondary_dark font-semibold";
  }

  $: levelStyle = getEducationLevelStyle(education.degree);
  $: displayedCourses = showAllCourses
    ? education.courses
    : education.courses?.slice(0, 6);
</script>

<div
  class="group relative bg-primary_light dark:bg-primary_dark shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1"
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
  role="article"
  tabindex="0"
>
  <!-- Animated background gradient on hover -->
  <div
    class="absolute inset-0 bg-gradient-to-br from-secondary_light/5 to-secondary_light/10 dark:from-secondary_dark/5 dark:to-secondary_dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
  ></div>

  <!-- Animated border accent -->
  <div
    class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary_light to-secondary_light/70 dark:from-secondary_dark dark:to-secondary_dark/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
  ></div>

  <!-- Content -->
  <div class="relative p-6 space-y-4">
    <!-- Institution and Timeline -->
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <h3
          class="text-xl font-bold text-primary_dark dark:text-primary_light flex items-center group-hover:text-secondary_dark dark:group-hover:text-secondary_light transition-colors duration-300"
        >
          <div
            class="mr-3 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
          >
            <BadgeCheckSolid
              class="w-6 h-6 text-secondary_light dark:text-secondary_dark"
            />
          </div>
          <span class="leading-tight">{education.institution}</span>
        </h3>
      </div>

      <!-- Animated timeline badge -->
      <div
        class="transform transition-all duration-300 group-hover:scale-105 group-hover:-rotate-2"
      >
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary_light/10 text-secondary_dark dark:bg-secondary_dark/10 dark:text-secondary_light border border-secondary_light/20 dark:border-secondary_dark/20"
        >
          <CalendarMonthSolid class="w-4 h-4 mr-2" />
          {education.timeline}
        </span>
      </div>
    </div>

    <!-- Degree and Grade -->
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <p
          class="text-lg font-semibold text-primary_dark dark:text-primary_light"
        >
          {education.degree}
        </p>

        <!-- Animated grade with star -->
        <div
          class="flex items-center space-x-2 transform transition-all duration-300 group-hover:scale-105"
        >
          <StarSolid class="w-5 h-5 text-yellow-500 animate-pulse" />
          <span
            class="text-lg font-bold text-secondary_dark dark:text-secondary_light"
          >
            {education.grade}
          </span>
        </div>
      </div>
    </div>

    <!-- Description with fade-in animation -->
    {#if education.description}
      <div
        class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-secondary_light dark:border-secondary_dark transform transition-all duration-500 {isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-4 opacity-0'}"
        style="transition-delay: {cardIndex * 0.1 + 0.2}s"
      >
        <p class="text-ink_light dark:text-ink_dark leading-relaxed italic">
          "{education.description}"
        </p>
      </div>
    {/if}

    <!-- Courses with staggered animations -->
    {#if education.courses}
      <div
        class="transform transition-all duration-500 {coursesVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0'}"
      >
        <div class="flex items-center justify-between mb-3">
          <h4
            class="text-lg font-semibold text-secondary_dark dark:text-secondary_light flex items-center"
          >
            <BookSolid
              class="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:rotate-12"
            />
            Notable Courses
            <span
              class="ml-2 text-sm bg-secondary_light/10 dark:bg-secondary_dark/10 text-secondary_dark dark:text-secondary_light px-2 py-1 rounded-full"
            >
              {education.courses.length}
            </span>
          </h4>

          {#if education.courses.length > 6}
            <button
              on:click={() => (showAllCourses = !showAllCourses)}
              class="text-sm text-secondary_dark dark:text-secondary_light hover:underline font-medium transition-all duration-200 hover:scale-105"
            >
              {showAllCourses ? "Show Less" : "Show All"}
            </button>
          {/if}
        </div>

        <div class="space-y-2">
          {#each showAllCourses ? education.courses : education.courses.slice(0, 6) as course, courseIndex}
            <div
              class="flex items-center p-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-secondary_light dark:hover:border-secondary_dark transition-all duration-300 hover:shadow-md transform {coursesVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-2 opacity-0'} hover:scale-[1.02]"
              style="transition-delay: {courseIndex * 0.05 + 0.1}s"
            >
              <!-- Course code circle -->
              <div
                class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-secondary_light to-secondary_light/80 dark:from-secondary_dark dark:to-secondary_dark/80 rounded-full flex items-center justify-center mr-3"
              >
                <span class="text-xs font-bold text-white">
                  {course
                    .split(" ")[0]
                    .replace(/[^0-9]/g, "")
                    .substring(0, 2) || course.substring(0, 2).toUpperCase()}
                </span>
              </div>

              <!-- Course details -->
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-ink_light dark:text-ink_dark truncate"
                >
                  {course.includes(" - ") ? course.split(" - ")[1] : course}
                </p>
                {#if course.includes(" - ")}
                  <p class="text-xs text-ink_light/60 dark:text-ink_dark/60">
                    {course.split(" - ")[0]}
                  </p>
                {/if}
              </div>
            </div>
          {/each}
        </div>

        <!-- Show more indicator -->
        {#if education.courses.length > 6 && !showAllCourses}
          <div class="text-center mt-2">
            <p class="text-xs text-ink_light/60 dark:text-ink_dark/60 italic">
              +{education.courses.length - 6} more courses...
            </p>
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Animated hover effects -->
  <div
    class="absolute top-4 right-4 w-2 h-2 bg-secondary_light dark:bg-secondary_dark rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 transform group-hover:scale-150 group-hover:translate-y-2"
  ></div>
  <div
    class="absolute bottom-6 left-6 w-1.5 h-1.5 bg-secondary_light dark:bg-secondary_dark rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 transform group-hover:scale-125 group-hover:-translate-y-2"
    style="transition-delay: 0.1s"
  ></div>
</div>
