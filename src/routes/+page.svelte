<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import dp from "$lib/images/black.jpg";
  import persistent_store from "$lib/stores/persistentstore";

  let name = "Shadman Shuvo";
  let title = "BUET CSE Undergrad";
  let currentRole = "L1-T2 Student";
  let subtitle = "Learning algorithms";

  let isVisible = false;
  let aboutVisible = false;

  onMount(() => {
    // Trigger animations after component mounts
    setTimeout(() => (isVisible = true), 100);

    // Intersection observer for about section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            aboutVisible = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    const aboutSection = document.getElementById("about-section");
    if (aboutSection) observer.observe(aboutSection);

    return () => observer.disconnect();
  });

  let prevUrl = "/education"; //"/research";
  let nextUrl = "/projects"; //"/achievements";
</script>

<div class="min-h-[80vh] flex flex-col overflow-hidden">
  <!-- Hero Section -->
  <section class="flex-1 flex items-center justify-center py-8 md:py-16">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <!-- Left Column - Text Content -->
        <div
          class="space-y-6 text-center lg:text-left order-2 lg:order-1 transform transition-all duration-1000 ease-out {isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0'}"
        >
          <!-- Name and Title -->
          <div class="space-y-3">
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold text-primary_dark dark:text-primary_light leading-tight animate-fade-in-up"
            >
              {name}
            </h1>
            <h2
              class="text-xl md:text-2xl lg:text-3xl font-medium text-secondary_light dark:text-secondary_dark animate-fade-in-up animate-delay-200"
            >
              {title}
            </h2>
            <p
              class="text-base md:text-lg text-ink_light/80 dark:text-ink_dark/80 animate-fade-in-up animate-delay-400"
            >
              {subtitle}
            </p>
          </div>

          <!-- Current Role Highlight -->
          <div
            class="bg-gradient-to-r from-secondary_light/10 to-secondary_light/5 dark:from-secondary_dark/10 dark:to-secondary_dark/5 border-l-4 border-secondary_light dark:border-secondary_dark p-4 rounded-r-lg animate-slide-in-left animate-delay-600 hover:scale-105 transition-transform duration-300"
          >
            <div class="flex items-center space-x-2">
              <div
                class="w-2 h-2 bg-secondary_light dark:bg-secondary_dark rounded-full animate-pulse"
              ></div>
              <span
                class="text-sm font-medium text-secondary_light dark:text-secondary_dark uppercase tracking-wide"
                >Currently</span
              >
            </div>
            <p
              class="mt-1 text-lg font-semibold text-primary_dark dark:text-primary_light"
            >
              {currentRole}
            </p>
          </div>

          <!-- Contact Info -->
          <div class="space-y-3 animate-fade-in-up animate-delay-800">
            <div
              class="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-ink_light/70 dark:text-ink_dark/70"
            >
              <div
                class="flex items-center space-x-2 hover:text-secondary_light dark:hover:text-secondary_dark transition-colors duration-300"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
                <span><a href="mailto:ShadmanSShuvo@gmail.com">ShadmanSShuvo@gmail.com</a></span>
              </div>
              <div
                class="flex items-center space-x-2 hover:text-secondary_light dark:hover:text-secondary_dark transition-colors duration-300"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div
            class="flex justify-center lg:justify-start space-x-4 animate-fade-in-up animate-delay-1000"
          >
            <a
              href="https://www.linkedin.com/in/ShadmanSShuvo"
              target="_blank"
              aria-label="LinkedIn"
              class="group transform hover:scale-110 transition-all duration-300 hover:rotate-3"
            >
              <img
                src="https://img.shields.io/badge/LinkedIn-06d6a0?style=flat&logo=linkedin&logoColor=white"
                alt="LinkedIn"
                class="h-8 w-auto transition-all duration-300 group-hover:shadow-lg"
              />
            </a>
            <a
              href="https://github.com/ShadmanSShuvo"
              target="_blank"
              aria-label="GitHub"
              class="group transform hover:scale-110 transition-all duration-300 hover:-rotate-3"
            >
              <img
                src="https://img.shields.io/badge/Github-06d6a0?style=flat&logo=github&logoColor=white"
                alt="GitHub"
                class="h-8 w-auto transition-all duration-300 group-hover:shadow-lg"
              />
            </a>
            <a
              href="https://www.youtube.com/@Shadman_Shuvo"
              target="_blank"
              aria-label="Youtube"
              class="group transform hover:scale-110 transition-all duration-300 hover:rotate-3"
            >
              <img
                src="https://img.shields.io/badge/Youtube-06d6a0?style=flat&logo=youtube&logoColor=white"
                alt="Youtube"
                class="h-8 w-auto transition-all duration-300 group-hover:shadow-lg"
              />
            </a>
            <a
              href="https://facebook.com/ShadmanSShuvo"
              target="_blank"
              aria-label="Facebook"
              class="group transform hover:scale-110 transition-all duration-300 hover:-rotate-3"
            >
              <img
                src="https://img.shields.io/badge/Facebook-06d6a0?style=flat&logo=facebook&logoColor=white"
                alt="Facebook"
                class="h-8 w-auto transition-all duration-300 group-hover:shadow-lg"
              />
            </a>
          </div>
        </div>

        <!-- Right Column - Image -->
        <div
          class="flex justify-center order-1 lg:order-2 transform transition-all duration-1200 ease-out {isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-10 opacity-0 scale-95'}"
        >
          <div class="relative group">
            <!-- Decorative background -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-secondary_light/20 to-secondary_light/5 dark:from-secondary_dark/20 dark:to-secondary_dark/5 rounded-2xl rotate-3 scale-105 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
            ></div>
            <!-- Main image -->
            <img
              src={dp}
              alt="Shadman Shuvo - BUET CSE Undergrad"
              class="relative z-10 rounded-2xl w-64 md:w-80 lg:w-96 h-auto aspect-[3/4] object-cover shadow-2xl border-4 border-white dark:border-gray-800 transition-all duration-500 group-hover:scale-105"
            />
            <!-- Floating elements -->
            <div
              class="absolute -top-4 -right-4 w-8 h-8 bg-secondary_light dark:bg-secondary_dark rounded-full opacity-80 animate-float"
            ></div>
            <div
              class="absolute -bottom-6 -left-6 w-6 h-6 bg-secondary_light dark:bg-secondary_dark rounded-full opacity-60 animate-float animate-delay-1000"
            ></div>
            <div
              class="absolute top-1/2 -left-8 w-4 h-4 bg-secondary_light dark:bg-secondary_dark rounded-full opacity-40 animate-float animate-delay-2000"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
 
    <!-- CV Download Button -->
    <!-- href="src/lib/documents/CV_SHUVO_2.pdf" -->
    <div class="mt-4">
        <a
            href="https://drive.google.com/file/d/1bEKnYj8eLsTO9sKft4j-RXU2ukm594ub/view?usp=sharing"
            target="_blank"
            class="inline-flex items-center gap-2 px-6 py-2 bg-primary_dark dark:bg-primary_light text-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
        >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            Download CV
        </a>
    </div>

  <!-- Compact About Section -->
  <section
    id="about-section"
    class="py-8 md:py-12 border-t border-gray-200 dark:border-gray-700"
  >
    <div class="max-w-6xl mx-auto px-4">
      <div
        class="text-center mb-6 transform transition-all duration-800 {aboutVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'}"
      >
        <h3
          class="text-2xl md:text-3xl font-bold text-primary_dark dark:text-primary_light mb-4"
        >
          About Me
        </h3>
        <div
          class="w-20 h-1 bg-secondary_light dark:bg-secondary_dark mx-auto rounded-full animate-expand-width"
        ></div>
      </div>

      <!-- Two Column About Layout -->
      <div class="grid md:grid-cols-2 gap-8 items-start">
        <!-- Left Column - Main Description -->
        <div
          class="space-y-4 transform transition-all duration-800 delay-200 {aboutVisible
            ? 'translate-x-0 opacity-100'
            : '-translate-x-10 opacity-0'}"
        >
          <p class="text-ink_light/80 dark:text-ink_dark/80 leading-relaxed">
            <span
              class="font-semibold text-secondary_light dark:text-secondary_dark"
              >CS Undergraduate</span
            >
            from
            <span class="font-medium text-primary_dark dark:text-primary_light"
              >Bangladesh University of Engineering and Technology</span
            >
            (August 2024). When I'm not diving deep into tech innovations, you'll
            find me rewatching
            <span class="italic font-medium">Harry Potters</span> and
            <span class="italic font-medium">Captain America</span>,
            competing in
            <span
              class="font-medium text-secondary_light dark:text-secondary_dark"
              >basketball</span
            >, unwinding with
            <span
              class="font-medium text-secondary_light dark:text-secondary_dark"
              >table tennis</span
            >, or exploring transformative ideas through
            <span
              class="font-medium text-secondary_light dark:text-secondary_dark"
              >public speaking.</span
            >
          </p>
        </div>

        <!-- Right Column - Interests & Philosophy -->
        <div
          class="space-y-4 transform transition-all duration-800 delay-400 {aboutVisible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-10 opacity-0'}"
        >
          <!-- Books Section -->
          <div
            class="bg-gradient-to-r from-secondary_light/5 to-transparent dark:from-secondary_dark/5 p-4 rounded-lg border-l-2 border-secondary_light dark:border-secondary_dark"
          >
            <h4
              class="font-semibold text-secondary_light dark:text-secondary_dark mb-2 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
                />
              </svg>
              Favorite Reads
            </h4>
            <p class="text-sm text-ink_light/70 dark:text-ink_dark/70">
              <span class="italic">Pather Pachali</span> and
              <span class="italic">Aronnoyok</span>
            </p>
          </div>

          <!-- Philosophy -->
          <div class="text-center">
            <blockquote
              class="text-lg font-medium italic text-secondary_light dark:text-secondary_dark mb-2 animate-pulse-gentle"
            >
              "Always be happy"
            </blockquote>
            <p class="text-sm text-ink_light/70 dark:text-ink_dark/70">
              I believe life is a precious gift meant to be fully experienced
              and shared. Always open to meaningful conversations about
              technology, cinema, sports, or life's beautiful complexities.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

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

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-10px) rotate(5deg);
    }
    50% {
      transform: translateY(-15px) rotate(0deg);
    }
    75% {
      transform: translateY(-5px) rotate(-5deg);
    }
  }

  @keyframes expand-width {
    from {
      width: 0;
    }
    to {
      width: 5rem;
    }
  }

  @keyframes pulse-gentle {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
  }

  .animate-slide-in-left {
    animation: slide-in-left 0.8s ease-out forwards;
    opacity: 0;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-expand-width {
    animation: expand-width 1s ease-out forwards;
  }

  .animate-pulse-gentle {
    animation: pulse-gentle 3s ease-in-out infinite;
  }

  /* Animation delays */
  .animate-delay-200 {
    animation-delay: 0.2s;
  }
  .animate-delay-400 {
    animation-delay: 0.4s;
  }
  .animate-delay-600 {
    animation-delay: 0.6s;
  }
  .animate-delay-800 {
    animation-delay: 0.8s;
  }
  .animate-delay-1000 {
    animation-delay: 1s;
  }
  .animate-delay-2000 {
    animation-delay: 2s;
  }
</style>
