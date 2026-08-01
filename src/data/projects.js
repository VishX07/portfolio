export const projects = [
  {
    slug: "hospital-booking",
    title: "AlphaCare — Hospital Booking",
    tagline: "Full-stack appointment booking platform for patients and doctors.",
    description:
      "A role-based hospital appointment system with OTP login, online and offline consultation flows, and integrated payments.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Razorpay"],
    tags: ["Authentication", "Payments", "Dashboards"],
    image: "hospital",
    accent: "azure",
    overview:
      "AlphaCare connects patients with doctors through a streamlined booking flow, replacing the phone-call-and-waitlist model most clinics still rely on.",
    problem:
      "Small clinics had no affordable way to manage appointments, verify patients, or accept digital payments without adopting a heavy hospital ERP.",
    features: [
      "OTP-based authentication with httpOnly cookie sessions",
      "Role-based access for patients, doctors, and admins",
      "Patient dashboard with appointment history and prescriptions",
      "Doctor dashboard with schedule and patient queue management",
      "Admin dashboard for hospital and doctor oversight",
      "Online consultation booking with calendar slots",
      "Offline 'Pay at Clinic' booking flow",
      "Razorpay test-mode payment integration",
      "Google OAuth sign-in alongside OTP",
    ],
    architecture:
      "Modular Express backend (controller / service / route / model layers) with a React + Vite frontend, deployed separately on Render and Vercel.",
    database: [
      "User — role, auth provider, verification status",
      "Doctor — specialization, schedule, linked User reference",
      "Appointment — patient, doctor, slot, mode, payment status",
      "Prescription — appointment reference, notes, medicines",
    ],
    api: [
      "POST /auth/send-otp — issue a one-time login code",
      "GET /doctors — paginated, filterable doctor search",
      "GET /doctors/suggestions — autocomplete by doctor name",
      "POST /appointments — create a booking (online or offline)",
      "POST /payments/verify — confirm Razorpay transaction",
    ],
    challenges: [
      "Google OAuth popups were blocked in production due to browser popup policies — resolved by deferring the popup call to a direct user gesture.",
      "Gmail collapsed confirmation emails under 'Show quoted text' because the sign-off pattern matched its signature heuristic — fixed by restructuring the email as table-based HTML.",
      "Express route ordering caused /doctors/suggestions to be swallowed by /doctors/:id until suggestion routes were registered first.",
    ],
    lessons:
      "Production environments surface edge cases — popup blockers, email client heuristics, route ordering — that never appear in local development.",
    future: [
      "Video consultation support",
      "SMS appointment reminders",
      "Multi-clinic support for hospital chains",
    ],
    github: "https://github.com/vishal/alphacare",
    demo: "#",
  },
  {
    slug: "grocery-app",
    title: "Grocery App",
    tagline: "MERN grocery ordering app with cart and order tracking.",
    description:
      "A grocery storefront with category browsing, a persistent cart, and order tracking for customers.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    tags: ["E-commerce", "Cart", "Orders"],
    image: "grocery",
    accent: "cyan",
    overview:
      "A lightweight grocery ordering app built to practice end-to-end e-commerce flows: catalog, cart, checkout, and order status.",
    problem:
      "Most tutorial e-commerce apps stop at checkout — this project carries the order through to a trackable status.",
    features: [
      "Category and product browsing with search",
      "Persistent cart stored per user",
      "Checkout with address and order summary",
      "Order status tracking (placed, packed, delivered)",
      "Admin product and inventory management",
    ],
    architecture:
      "React frontend with Context-based cart state, Express REST API, MongoDB for product and order collections.",
    database: [
      "Product — name, category, price, stock",
      "Cart — user reference, line items",
      "Order — user, items snapshot, status, address",
    ],
    api: [
      "GET /products — list and filter products",
      "POST /cart — add or update cart items",
      "POST /orders — place an order from the cart",
      "GET /orders/:id — track order status",
    ],
    challenges: [
      "Keeping cart state in sync across tabs without over-fetching the server.",
      "Designing an order-status model that's easy to extend with new stages.",
    ],
    lessons:
      "Cart state is deceptively tricky — getting persistence and sync right early saves a lot of rework later.",
    future: ["Payment gateway integration", "Delivery slot scheduling"],
    github: "https://github.com/vishal/grocery-app",
    demo: "#",
  },
  {
    slug: "java-todo",
    title: "Java Todo App",
    tagline: "Console-based task manager built while learning core Java.",
    description:
      "A console Java application for managing tasks, built to practice OOP fundamentals and file-based persistence.",
    tech: ["Java", "OOP", "File I/O"],
    tags: ["Java", "Console App"],
    image: "todo",
    accent: "violet",
    overview:
      "A console-based todo manager written in core Java, used as a hands-on exercise while learning object-oriented programming.",
    problem:
      "Learning Java syntax from tutorials wasn't sticking — building a real, if small, application made the concepts concrete.",
    features: [
      "Add, complete, and delete tasks",
      "Priority levels and due dates",
      "File-based persistence between runs",
      "Simple menu-driven console interface",
    ],
    architecture:
      "Plain Java classes following single-responsibility design: Task, TaskManager, and a Storage class handling file I/O.",
    database: ["Tasks persisted as serialized objects in a local file"],
    api: ["N/A — console application, no network API"],
    challenges: [
      "Handling file corruption gracefully when serialized data was malformed.",
      "Designing a clean class hierarchy without over-engineering a small app.",
    ],
    lessons:
      "Small, complete projects teach OOP better than reading about it — every design decision has a visible consequence.",
    future: ["Migrate to a GUI with JavaFX", "Add recurring tasks"],
    github: "https://github.com/vishal/java-todo",
    demo: "#",
  },
  {
    slug: "chat-app",
    title: "Chat Application",
    tagline: "Real-time messaging app with rooms and live presence.",
    description:
      "A real-time chat application with rooms, typing indicators, and live presence using WebSockets.",
    tech: ["React", "Node.js", "Socket.IO", "MongoDB"],
    tags: ["Real-time", "WebSockets"],
    image: "chat",
    accent: "azure",
    overview:
      "A real-time messaging app exploring WebSocket communication, built to understand event-driven architectures beyond REST.",
    problem:
      "REST polling is a poor fit for messaging — this project explores genuinely real-time communication patterns.",
    features: [
      "Real-time messaging with Socket.IO",
      "Chat rooms with join/leave events",
      "Typing indicators and live presence",
      "Message history persisted in MongoDB",
    ],
    architecture:
      "Express + Socket.IO server broadcasting room-scoped events to a React client managing socket lifecycle in a custom hook.",
    database: [
      "Room — name, members",
      "Message — room reference, sender, content, timestamp",
    ],
    api: [
      "WS connect — authenticate and join default rooms",
      "WS message:send — broadcast a message to a room",
      "GET /rooms/:id/messages — fetch message history",
    ],
    challenges: [
      "Managing socket reconnection without duplicating message handlers.",
      "Keeping presence state accurate when users close tabs without disconnecting cleanly.",
    ],
    lessons:
      "Real-time systems need careful thought about connection lifecycle, not just the happy path of sending a message.",
    future: ["Direct messages", "Read receipts", "File sharing in chat"],
    github: "https://github.com/vishal/chat-app",
    demo: "#",
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
