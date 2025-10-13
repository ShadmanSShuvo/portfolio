import flappy_poster from "$lib/images/flappy-bird.png";
import buet_cse_courseworks_poster from "$lib/images/buet_cse_courseworks2.jpg";
import algomania_poster from "$lib/images/algo-mania.png";
import mathcamp_poster from "$lib/images/math-camp.png";
export const projects = [
  {
    title: "AlgoMania - DSA Visualizer", //Data Structures & Algorithms Visualizer",
    imageUrl: algomania_poster,
    githubUrl: "https://github.com/ShadmanSShuvo/AlgoMania",
    youtubeUrl: "https://youtu.be/R8U2GAA77SI",
    tags: ["Java", "JavaFX", "CSS", "OOP", "BUET CSE"], // "Courseworks"],
    year: "2025",
    description:
      "This repository contains the links to the CSE 106 JavaFX Project of L1-T2.",
  },

  {
    title: "Flappy Bird Clone Game",
    imageUrl: flappy_poster,
    githubUrl: "https://github.com/ShadmanSShuvo/FlappyBird",
    youtubeUrl: "https://youtu.be/mjMROK7sZJY",
    tags: ["C", "C++", "OpenGL", "BUET CSE", "Courseworks"],
    year: "2024",
    description:
      "This repository contains the links to the CSE 102 iGraphics Project of L1-T1.",
  },

  {
    title: "BUET-CSE-Courseworks",
    imageUrl: buet_cse_courseworks_poster,
    githubUrl: "https://github.com/ShadmanSShuvo/BUET-CSE-Courseworks",
    youtubeUrl: undefined,
    tags: ["C", "C++", "Java", "Python", "DSA", "DBMS"],
    year: "2024-Present",
    description:
      "This repo contains the links to all of my course works of BUET CSE",
  },

  {
    title: "National Camp Journal",
    imageUrl: mathcamp_poster,
    githubUrl: "https://github.com/ShadmanSShuvo/Nat-Camp-Journal",
    youtubeUrl: undefined,
    fileUrl: "src/lib/documents/Math-Camp-2021.pdf",
    tags: ["LaTeX", "Math", "Olympiad", "Problem Solving"],
    year: "2021",
    description:
      "This is a LaTeX project that contains the journal of the National Olympiad Camp 2021. It contains the lectures, problems and solutions of the camp.",
  },
];
