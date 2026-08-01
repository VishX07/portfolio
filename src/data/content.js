export const skillGroups = [
  {
    label: "Frontend",
    items: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express"],
  },
  {
    label: "Database",
    items: ["MongoDB", "MySQL"],
  },
  {
    label: "Programming",
    items: ["Java", "JavaScript"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code"],
  },
];

export const timeline = [
  { title: "Started Programming", note: "First lines of code, first bugs." },
  { title: "Learned HTML & CSS", note: "Static pages, layout fundamentals." },
  { title: "Learned JavaScript", note: "DOM, logic, and the language behind the browser." },
  { title: "Learned the MERN Stack", note: "MongoDB, Express, React, Node — end to end." },
  { title: "Built Real Projects", note: "Grocery app, chat app, and early versions of AlphaCare." },
  { title: "Started Java", note: "Core language and OOP fundamentals." },
  { title: "Started Spring Boot", note: "Backend development on the Java ecosystem." },
  { title: "Started DSA", note: "Arrays to graphs, one structure at a time." },
  { title: "Preparing for Placements", note: "Mock interviews, contests, and polishing AlphaCare." },
];

export const dsaTopics = [
  { name: "Arrays", solved: 86, total: 120 },
  { name: "Strings", solved: 54, total: 80 },
  { name: "Linked Lists", solved: 28, total: 45 },
  { name: "Stack", solved: 22, total: 30 },
  { name: "Queue", solved: 18, total: 28 },
  { name: "Trees", solved: 34, total: 60 },
  { name: "Graphs", solved: 17, total: 50 },
];

export const dsaStats = {
  totalSolved: dsaTopics.reduce((a, t) => a + t.solved, 0),
  contests: 14,
  ranking: "Top 22%",
  streak: 41,
};
