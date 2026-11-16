/*
 * ============================================================
 *  SITE CONTENT — THIS IS THE ONLY FILE YOU NEED TO EDIT
 * ============================================================
 *  - Change any text between the quotes and save. Refresh the page.
 *  - To add an item (project, job, skill), copy an existing { ... } block,
 *    paste it below, and change the values. Keep the commas between blocks.
 *  - Photos: put the image file in  assets/images/  and write its path here.
 *  - Leave a field as ""  (empty) to hide it on the site.
 *  - See README.md for a step-by-step guide.
 */
window.SITE = {
  /* ---------- Basics ---------- */
  name: "Ajo Eldho Baby",
  initials: "AEB",
  role: "Project Technical Lead — Automotive IVI",
  tagline:
    "I build real-time 3D interfaces, in-vehicle infotainment and AI-powered virtual assistants with Unity and Android.",
  location: "Ernakulam, Kerala, India",

  /* Month you started working (YYYY-MM). "Years of experience" is calculated from this automatically. */
  careerStart: "2019-08",

  /* Profile photo. Replace the file or point to a new one. Square images work best. */
  photo: "assets/images/profile.jpg",

  /* Up to 4 small tags that float around your photo. Remove all to hide them. */
  heroTags: ["Unity", "C#", "Kotlin", "AI"],

  /* Resume download button. Put a PDF in assets/resume/ and write its path, e.g. "assets/resume/Ajo_Eldho_Baby.pdf".
     Empty = button hidden. */
  resume: "",

  /* ---------- Contact ---------- */
  contact: {
    email: "ajoeldhobaby@gmail.com",
    linkedin: "https://www.linkedin.com/in/ajo-baby-9a8398120",
    github: "https://github.com/ajoeldho",
    message:
      "Open to conversations about automotive HMI, Unity, real-time 3D and applied AI. Email is the fastest way to reach me.",
  },

  /* ---------- Headline numbers in the top section ----------
     {years} is replaced by the calculated years of experience. */
  stats: [
    { value: "{years}+", label: "Years in software" },
    { value: "5", label: "Projects led" },
    { value: "14", label: "Projects delivered" },
  ],

  /* ---------- About ---------- */
  about: {
    paragraphs: [
      "Senior software engineer specialising in Unity-based applications, automotive infotainment, real-time 3D systems and AI-powered virtual assistants.",
      "My day-to-day covers C#, Kotlin, Unity rendering pipelines (HDRP/URP), AR/VR, Android, and map-based solutions on Mapbox and Google Maps. I integrate AI services, Python backends, WebSockets and real-time audio streaming to build conversational, interactive experiences.",
      "I lead development teams, own technical architecture, work directly with customers, and take products from prototype through deployment and optimisation.",
    ],
    /* Short facts shown beside the text */
    facts: [
      { label: "Current role", value: "Project Technical Lead" },
      { label: "Domain", value: "Automotive IVI" },
      { label: "Core stack", value: "Unity · C# · Kotlin · Python" },
      { label: "Based in", value: "Ernakulam, India" },
    ],
    /* What you are learning right now */
    exploring: ["AI / ML", "Autonomous driving simulation"],
  },

  /* ---------- Skills ---------- */
  skills: [
    {
      group: "Languages",
      items: ["C#", "Kotlin", "Python", "C++", "JavaScript", "Shell scripting"],
    },
    {
      group: "Real-time 3D & XR",
      items: ["Unity", "HDRP / URP", "AR / VR", "3D UI", "Character animation & lip-sync", "Performance optimisation"],
    },
    {
      group: "Automotive & Maps",
      items: ["In-vehicle infotainment (IVI)", "Mapbox", "Google Maps", "Navigation & traffic visualisation", "Gesture & haptic interaction"],
    },
    {
      group: "AI & Integration",
      items: ["AI service integration", "Voice / speech pipelines", "Real-time audio streaming", "WebSockets", "REST APIs", "Python backends"],
    },
    {
      group: "Mobile",
      items: ["Android (Kotlin)", "React Native", "Native bridging (iOS / Unity)"],
    },
    {
      group: "Tools & Practice",
      items: ["Visual Studio", "VS Code", "Android Studio", "Git / GitHub", "Postman", "Playwright", "Blender", "Agile", "Team leadership"],
    },
  ],

  /* ---------- Work experience (newest first) ---------- */
  experience: [
    {
      title: "Senior Software Engineer · Project Technical Lead",
      company: "NeST Digital",
      period: "Jan 2022 — Present",
      summary: "Leading automotive infotainment projects built on Unity and Android.",
      points: [
        "Lead development teams and act as the technical point of contact for customers.",
        "Build 3D interactive user interfaces and virtual assistant experiences for in-vehicle systems.",
        "Deliver navigation and map-based features: route visualisation, traffic and congestion display.",
        "Integrate real-time APIs, voice and audio processing, and AI features into automotive applications.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Travancore Analytics",
      period: "Aug 2019 — Dec 2021",
      summary: "Service-company work across Unity, mobile, VR and desktop platforms.",
      points: [
        "Built Unity video players for mobile, web and VR headsets, including HLS (.m3u8) playback.",
        "Bridged Unity with React Native on iOS through native Objective-C and Swift code.",
        "Developed a VR shopping experience, a React Native floor-plan app and Windows desktop tools in C#.",
        "Automated internal timesheet entry with Python and Selenium.",
      ],
    },
  ],

  /* ---------- Projects ----------
     category : used for the filter buttons (any text; buttons are created automatically)
     image    : optional. e.g. "assets/images/projects/ar-nav.jpg". Empty = styled placeholder.
     link     : optional URL (GitHub, demo, video). Empty = no link shown.
     featured : true shows a "Lead" style highlight on the card. */
  projects: [
    {
      title: "AI Interactive Assistant",
      category: "AI Assistants",
      role: "Project Lead",
      duration: "8 months",
      summary:
        "A conversational virtual assistant fronted by a 3D character. Real-time speech in and out, with facial animation and lip-sync so the character responds naturally.",
      contribution: "Led the project and customer communication; Unity development, API integration, real-time audio handling and performance tuning.",
      tech: ["Unity", "C#", "Python", "Character Creator", "Postman"],
      image: "",
      link: "",
      featured: true,
    },
    {
      title: "Holographic Virtual Assistant",
      category: "AI Assistants",
      role: "Project Lead",
      duration: "6 months",
      summary:
        "A 3D holographic assistant for in-vehicle use, combining AI services, speech processing, live audio and character animation.",
      contribution: "Led the project and customer communication; Unity development, optimisation and direction of the 3D design work.",
      tech: ["Unity", "C#", "Python", "Blender"],
      image: "",
      link: "",
      featured: true,
    },
    {
      title: "Augmented Reality Navigation",
      category: "Automotive",
      role: "Project Lead",
      duration: "1 year",
      summary:
        "Navigation that overlays route guidance, road information and landmarks on the real-world view, blending live location with digital map data.",
      contribution: "Led the project and customer communication; real-time location integration, traffic information and UI development.",
      tech: ["Kotlin", "Android", "Mapbox"],
      image: "",
      link: "",
      featured: true,
    },
    {
      title: "Gesture-Based Infotainment Control",
      category: "Automotive",
      role: "Project Lead",
      duration: "8 months",
      summary:
        "Touchless control of infotainment features using hand gestures and spatial interaction, with 3D visualisation and haptic feedback.",
      contribution: "Led the project and customer communication; gesture interaction, UI integration, 3D visualisation and haptic system integration.",
      tech: ["Unity", "C#"],
      image: "",
      link: "",
      featured: true,
    },
    {
      title: "Voice-Based Health Assistant",
      category: "Mobile",
      role: "Project Lead",
      duration: "3 months",
      summary: "An Android app that answers spoken health questions in real time using a health-information API.",
      contribution: "Led the project; Android development focused on voice integration and health API integration.",
      tech: ["Kotlin", "Android"],
      image: "",
      link: "",
      featured: true,
    },
    {
      title: "VR Shopping Mall",
      category: "AR / VR",
      role: "Developer",
      duration: "",
      summary: "A virtual mall with walkable stores and product displays, plus a shopping cart that follows the user.",
      contribution: "Integrated 3D models and implemented the follow-the-user cart mechanism.",
      tech: ["Unity", "C#", "VR"],
      image: "",
      link: "",
      featured: false,
    },
    {
      title: "HLS Video Player for VR",
      category: "AR / VR",
      role: "Developer",
      duration: "",
      summary: "A VR-headset video player for .m3u8 streams built on a third-party player SDK.",
      contribution: "Extended SDK events and built the Unity player and its UI.",
      tech: ["Unity", "C#", "HLS"],
      image: "",
      link: "",
      featured: false,
    },
    {
      title: "Unity + React Native Video App",
      category: "Mobile",
      role: "Developer",
      duration: "",
      summary: "A mobile video app with playback rendered in Unity and the interface in React Native, connected through native iOS code.",
      contribution: "Managed the Unity player, wrote the iOS bridge (Objective-C / Swift) and built login and home screens.",
      tech: ["Unity", "React Native", "Swift", "Objective-C"],
      image: "",
      link: "",
      featured: false,
    },
    {
      title: "3D Floor Plan App",
      category: "Mobile",
      role: "Developer",
      duration: "",
      summary: "A mobile application for generating floor plans.",
      contribution: "Feature development in React Native.",
      tech: ["React Native", "JavaScript"],
      image: "",
      link: "",
      featured: false,
    },
    {
      title: "Connect the Dots",
      category: "Games & Tools",
      role: "Developer",
      duration: "",
      summary: "A 2D puzzle game built in Unity.",
      contribution: "Designed and developed the game end to end.",
      tech: ["Unity", "C#"],
      image: "",
      link: "https://github.com/ajoeldho/Connect-The-Dots",
      featured: false,
    },
    {
      title: "Timesheet Automation",
      category: "Games & Tools",
      role: "Developer",
      duration: "",
      summary: "A scheduled script that logs in to a web timesheet and fills in working hours from a JSON file every day.",
      contribution: "Built and scheduled the automation.",
      tech: ["Python", "Selenium"],
      image: "",
      link: "https://github.com/ajoeldho/Timesheet",
      featured: false,
    },
    {
      title: "Quality Control Desktop App",
      category: "Games & Tools",
      role: "Developer",
      duration: "",
      summary: "A Windows application for configuration, measurement, data storage and analysis.",
      contribution: "Built the data-management forms.",
      tech: ["C#", "Windows Forms"],
      image: "",
      link: "",
      featured: false,
    },
  ],

  /* ---------- Education ---------- */
  education: [
    {
      degree: "Bachelor of Technology",
      school: "Mar Athanasius College of Engineering",
      period: "2015 — 2019",
      notes: ["CGPA 7.47", "Projects: Automatic farming robot, Smart helmet"],
    },
    {
      degree: "Higher Secondary — Computer Science",
      school: "St Joseph's HSS, Paingottoor",
      period: "2013 — 2015",
      notes: [],
    },
  ],

  /* ---------- Extras ---------- */
  languages: ["English", "Malayalam"],
  interests: ["Travel", "Movies", "Gaming", "Pets"],
};
