export const site = {
  name: "Ardy Media",
  tagline: "Marketing, Media & Technology, Handled.",
  description:
    "Ardy Media runs your digital marketing, media and technology stack — Meta/Instagram/LinkedIn ads, websites, CRM, Flutter & native apps, custom development, and AI automation — so you can focus on the real work.",
  email: "hello@ardymedia.com",
  phone: "",
  location: "",
  url: "https://ardymedia.com",
};

export type HeroStage = {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  body: string;
  stageLabel: string;
};

export const heroStages: HeroStage[] = [
  {
    eyebrow: "Ardy Media · Marketing, Media & Technology",
    heading: "You do the real work. We run your",
    headingAccent: "marketing & tech.",
    body: "Paid social, websites, CRM, mobile apps and AI automation, built and managed under one roof so you stop juggling agencies and freelancers.",
    stageLabel: "Network",
  },
  {
    eyebrow: "01 · Digital Marketing",
    heading: "Paid social that actually drives",
    headingAccent: "pipeline.",
    body: "Meta, Instagram and LinkedIn campaigns tied to a lead or booking event from day one — not vanity metrics.",
    stageLabel: "Marketing",
  },
  {
    eyebrow: "02 · Technology & Development",
    heading: "Products built to run your",
    headingAccent: "business.",
    body: "Websites, CRM systems, and Flutter or native apps — designed to hold up under real usage, not just launch day.",
    stageLabel: "Technology",
  },
  {
    eyebrow: "03 · Growth Automation",
    heading: "Every lead followed up",
    headingAccent: "instantly.",
    body: "AI chatbots and CRM automation capture, qualify and book leads around the clock, so nothing goes cold.",
    stageLabel: "Automation",
  },
];

export const navLinks = [
  { href: "/media", label: "Media" },
  { href: "/digital", label: "Digital" },
  { href: "/sales", label: "Sales" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export type TeamGroup = {
  slug: string;
  icon: string;
  focus: string;
  role: string;
  description: string;
  responsibilities: string[];
};

export const team: TeamGroup[] = [
  {
    slug: "strategy",
    icon: "compass",
    focus: "Strategy & Growth",
    role: "Client strategy, planning & reporting",
    description:
      "The first people you talk to and the last people you hear from — mapping the plan on the strategy call, then making sure every channel is still pointed at the same goal three months in.",
    responsibilities: [
      "Discovery & onboarding",
      "Cross-channel strategy",
      "Reporting & optimization cadence",
    ],
  },
  {
    slug: "media",
    icon: "megaphone",
    focus: "Paid Media & Creative",
    role: "Campaigns, creative & copy",
    description:
      "Plans, builds and optimizes the paid social campaigns — from audience research and ad creative to the copy and offers that actually get someone to click.",
    responsibilities: [
      "Meta, Instagram & LinkedIn ads",
      "Ad creative & copywriting",
      "Audience testing & retargeting",
    ],
  },
  {
    slug: "product",
    icon: "code",
    focus: "Product & Engineering",
    role: "Websites, CRM & apps",
    description:
      "Designs and builds the websites, CRMs and mobile apps your business runs on — the team responsible for the parts of the stack that have to keep working long after launch day.",
    responsibilities: [
      "Web & app development",
      "CRM & systems architecture",
      "QA & ongoing maintenance",
    ],
  },
  {
    slug: "automation",
    icon: "bot",
    focus: "Automation & Support",
    role: "AI bots, routing & follow-up",
    description:
      "Wires up the AI chatbots, lead routing and follow-up sequences so nothing sits unanswered — and keeps an eye on the automations after they ship.",
    responsibilities: [
      "Chatbot & workflow design",
      "CRM & lead-routing automation",
      "Ongoing monitoring & tuning",
    ],
  },
];

export const teamPrinciples = [
  {
    title: "Small on purpose",
    description:
      "We'd rather stay lean and senior than pad out a roster — every client works directly with the people doing the work, not an account manager relaying messages.",
  },
  {
    title: "Cross-trained, not siloed",
    description:
      "Everyone on the team understands the full stack well enough to know how their piece affects the others — the media lead knows what the CRM can handle, the developer knows what the ads are promising.",
  },
  {
    title: "Directly reachable",
    description:
      "No ticket queue between you and the person doing the work — questions get answered by someone who can actually action them.",
  },
];

export type Service = {
  slug: string;
  icon: string;
  pillar: string;
  title: string;
  summary: string;
  description: string;
  features: string[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "digital-marketing",
    icon: "megaphone",
    pillar: "Media",
    title: "Paid Social & Performance Marketing",
    summary: "Paid social that actually drives pipeline, not just impressions.",
    description:
      "We plan, launch and optimize your paid social presence across Meta, Instagram and LinkedIn — built around measurable pipeline, not vanity metrics. Every campaign is tied to a lead or booking event from day one, so you always know what's working and what to cut.",
    features: [
      "Facebook & Instagram ad campaigns",
      "LinkedIn B2B lead generation",
      "Meta Lead Ads & instant forms",
      "Creative direction, copywriting & scripting",
      "Audience research & retargeting funnels",
      "Weekly performance reporting & optimization",
    ],
    deliverables: [
      "Campaign strategy & channel plan",
      "Ad creative (static, carousel, short-form video)",
      "Landing pages tuned for conversion",
      "Monthly performance dashboard",
    ],
  },
  {
    slug: "technology-development",
    icon: "code",
    pillar: "Digital",
    title: "Full-Spectrum Software Engineering",
    summary: "Products built to run your business, not just look good.",
    description:
      "From your marketing site to the backend systems, databases and cloud infrastructure that run your business, we design and build technology that holds up under real usage. Web, mobile, backend, cloud, data — one engineering team that can carry a project end to end instead of handing it between specialists.",
    features: [
      "Marketing websites & landing pages",
      "Custom web applications & SaaS platforms",
      "Custom CRM systems for sales & operations",
      "E-commerce platforms & storefronts",
      "Flutter apps — iOS + Android from one codebase",
      "Native iOS & Android development",
      "Backend systems, APIs & databases",
      "Cloud infrastructure & DevOps (AWS/Azure)",
    ],
    deliverables: [
      "Production-ready web, mobile or backend system",
      "Admin dashboard & technical documentation",
      "Source code ownership, no lock-in",
      "Post-launch support & maintenance window",
    ],
  },
  {
    slug: "growth-automation",
    icon: "bot",
    pillar: "Sales",
    title: "AI Bots, CRM & Booking Automation",
    summary: "Systems that capture, qualify and book leads while you sleep.",
    description:
      "Leads go cold in minutes, not days. We build the automated layer that receives every lead the moment it arrives, qualifies it, and either books it directly on your calendar or hands your team a warm, ready-to-close conversation.",
    features: [
      "Meta lead routing into your CRM",
      "Booking & appointment funnels",
      "AI chatbots for sales & support",
      "CRM and ad account automation",
      "Follow-up & nurture sequences",
      "SMS / email / WhatsApp response flows",
    ],
    deliverables: [
      "End-to-end automation blueprint",
      "Configured chatbot & routing logic",
      "CRM pipeline & lead-scoring setup",
      "Ongoing monitoring & tuning",
    ],
  },
];

export const pillarRoutes: Record<string, string> = {
  "digital-marketing": "/media",
  "technology-development": "/digital",
  "growth-automation": "/sales",
};

export const pillarBrand: Record<string, { name: string; tagline: string }> = {
  "digital-marketing": {
    name: "Ardy Media",
    tagline: "Paid social & performance marketing, run like pipeline depends on it.",
  },
  "technology-development": {
    name: "Ardy Digital",
    tagline: "Full-spectrum software engineering — web, mobile, backend, cloud.",
  },
  "growth-automation": {
    name: "Ardy Sales",
    tagline: "AI bots, CRM and booking automation that never let a lead go cold.",
  },
};

export function getBrandForPath(pathname: string): { name: string; tagline: string } {
  if (pathname.startsWith("/media")) return pillarBrand["digital-marketing"];
  if (pathname.startsWith("/digital")) return pillarBrand["technology-development"];
  if (pathname.startsWith("/sales")) return pillarBrand["growth-automation"];
  return { name: site.name, tagline: site.tagline };
}

export type CaseStudy = {
  serviceSlug: string;
  name: string;
  url: string;
  tagline: string;
  summary: string;
  highlights: string[];
  servicesOffered: string[];
  industries: string[];
  techStack: string[];
  founders: string;
};

export type TrustedCompany = {
  name: string;
  url?: string;
  logo?: { src: string; width: number; height: number };
};

export const trustedCompanies: TrustedCompany[] = [
  {
    name: "Summer Haven",
    url: "https://summerheaven.ca",
    logo: { src: "/logos/summerheaven.png", width: 1159, height: 497 },
  },
  {
    name: "Royal Den Capital",
    logo: { src: "/logos/royaldencapital.png", width: 488, height: 546 },
  },
];

export const caseStudies: CaseStudy[] = [];

export type TechCapabilityGroup = {
  serviceSlug: string;
  title: string;
  description: string;
  items: string[];
};

export const techCapabilities: TechCapabilityGroup[] = [
  {
    serviceSlug: "digital-marketing",
    title: "Paid Social Advertising",
    description:
      "Campaigns planned and run across the platforms your customers actually use, with budget going toward what's proven to convert.",
    items: [
      "Meta (Facebook & Instagram) campaign management",
      "LinkedIn B2B advertising",
      "Meta & LinkedIn Lead Ads",
      "Audience research & custom/lookalike targeting",
      "Budget pacing & bid strategy management",
      "Creative & audience split-testing",
    ],
  },
  {
    serviceSlug: "digital-marketing",
    title: "Creative & Content",
    description:
      "The ad itself — written, shot and edited to stop the scroll and say something worth clicking on.",
    items: [
      "Ad copywriting & offer positioning",
      "Static, carousel & short-form video creative",
      "Content direction for photo/video shoots",
      "Brand-consistent templates & design systems",
      "Landing page copy aligned to ad promise",
    ],
  },
  {
    serviceSlug: "digital-marketing",
    title: "Lead Capture & Conversion",
    description:
      "Getting the click is half the job — this is the half that turns it into a lead.",
    items: [
      "Conversion-focused landing pages",
      "Meta Lead Ads & native instant forms",
      "Retargeting & abandoned-visitor funnels",
      "Pixel, conversions API & event tracking setup",
      "CRM handoff for every captured lead",
    ],
  },
  {
    serviceSlug: "digital-marketing",
    title: "Reporting & Optimization",
    description:
      "A weekly rhythm of looking at what the numbers actually say, not a dashboard nobody opens.",
    items: [
      "Weekly performance reporting",
      "Cost-per-lead & cost-per-booking tracking",
      "A/B testing on creative, copy & audiences",
      "Monthly budget reallocation across channels",
      "Attribution across paid, organic & referral",
    ],
  },
  {
    serviceSlug: "digital-marketing",
    title: "Brand & Organic Presence",
    description:
      "What people see when the ad works and they go check the profile before they buy.",
    items: [
      "Social profile setup & optimization",
      "Organic content calendar",
      "Google Business Profile management",
      "Review generation & response strategy",
    ],
  },
  {
    serviceSlug: "technology-development",
    title: "Web & Application Development",
    description:
      "Customer-facing products across web, mobile and desktop, built on modern frameworks and designed to hold up under real traffic.",
    items: [
      "Custom web applications & SaaS platforms",
      "E-commerce platforms & storefronts",
      "Progressive web apps (PWAs)",
      "Flutter apps — iOS + Android, one codebase",
      "Native iOS (Swift) & Android (Kotlin)",
      "Desktop apps (Electron) & browser extensions",
    ],
  },
  {
    serviceSlug: "technology-development",
    title: "Backend & Systems Architecture",
    description:
      "The systems behind the interface — designed to stay reliable and easy to extend as the business grows.",
    items: [
      "REST & GraphQL API design and development",
      "Microservices & event-driven architecture",
      "SQL & NoSQL database design and data modeling",
      "Authentication, authorization & role-based access",
      "Payment processing & billing system integration",
      "Third-party integrations (CRM, ERP, accounting, marketing tools)",
    ],
  },
  {
    serviceSlug: "technology-development",
    title: "Cloud & DevOps",
    description:
      "Infrastructure that scales with usage instead of falling over at the worst moment, with a clear view of what's running and why.",
    items: [
      "AWS, Azure & Google Cloud infrastructure",
      "CI/CD pipelines & automated deployments",
      "Containerization (Docker, Kubernetes)",
      "Infrastructure as code (Terraform)",
      "Monitoring, logging & uptime alerting",
      "Performance tuning & horizontal scaling",
    ],
  },
  {
    serviceSlug: "technology-development",
    title: "Data & AI Engineering",
    description:
      "Turning raw data and AI models into features and workflows your team actually uses day to day.",
    items: [
      "Data pipelines & ETL workflows",
      "AI/LLM integration & custom chatbots",
      "Business intelligence dashboards & reporting",
      "Predictive analytics & workflow automation",
      "Vector search & retrieval-augmented generation (RAG)",
    ],
  },
  {
    serviceSlug: "technology-development",
    title: "Modernization & Ongoing Engineering",
    description:
      "For the systems that already exist — making them safer to build on, not just adding to the pile.",
    items: [
      "Legacy system audits & modernization",
      "Codebase refactors & technical debt cleanup",
      "QA, automated testing & CI test suites",
      "Security reviews & hardening",
      "Fractional CTO / technical advisory",
      "Ongoing maintenance & SLA-backed support",
    ],
  },
  {
    serviceSlug: "growth-automation",
    title: "Lead Routing & CRM Automation",
    description:
      "Every lead lands somewhere the moment it arrives — not in an inbox waiting to be noticed.",
    items: [
      "Instant lead routing from every source into your CRM",
      "Lead scoring & priority assignment rules",
      "Duplicate detection & data cleanup",
      "Ad account & CRM two-way sync",
      "Custom pipeline & stage automation",
    ],
  },
  {
    serviceSlug: "growth-automation",
    title: "AI Chatbots & Conversational Sales",
    description:
      "A first response in seconds, on whichever channel the lead actually used.",
    items: [
      "Website chat widgets with AI qualification",
      "SMS & WhatsApp response automation",
      "Qualifying question flows before human handoff",
      "FAQ & objection-handling scripts",
      "Escalation to a live person when it matters",
    ],
  },
  {
    serviceSlug: "growth-automation",
    title: "Booking & Appointment Systems",
    description:
      "Turning \"we should talk\" into an actual slot on the calendar, without a back-and-forth.",
    items: [
      "Self-serve booking & appointment funnels",
      "Calendar sync across your team",
      "Automated reminders to cut no-shows",
      "Rescheduling & cancellation flows",
      "Deposit & payment collection at booking",
    ],
  },
  {
    serviceSlug: "growth-automation",
    title: "Nurture & Follow-up Sequences",
    description:
      "The leads that don't convert on day one — followed up with automatically until they do, or don't.",
    items: [
      "Email & SMS drip sequences",
      "Behavior-triggered follow-ups",
      "Re-engagement campaigns for cold leads",
      "Seasonal & promotional sequences",
    ],
  },
  {
    serviceSlug: "growth-automation",
    title: "Reporting & Pipeline Visibility",
    description:
      "A clear read on where every lead is, and where they're falling out of the funnel.",
    items: [
      "CRM dashboards for the whole pipeline",
      "Conversion & drop-off tracking by stage",
      "Response-time & follow-up compliance reporting",
      "Monthly automation performance review",
    ],
  },
];

export const stats = [
  { value: "1", label: "Team for marketing + tech" },
  { value: "8+", label: "Core services under one roof" },
  { value: "24/7", label: "AI bots & automation" },
  { value: "0", label: "Vendors you have to manage" },
];

export const industries = [
  {
    name: "Local & Service Businesses",
    description:
      "Coaches, contractors, salons and clinics that need bookings, not just likes — local ads, a fast site and online scheduling working together.",
  },
  {
    name: "E-commerce & Retail",
    description:
      "Product businesses that need paid social built to sell, a storefront that converts, and inventory-aware automation behind it.",
  },
  {
    name: "Real Estate & Lending",
    description:
      "Trust-first websites, lead capture and consultation booking for agents, brokers and lenders competing on responsiveness.",
  },
  {
    name: "Restaurants & Hospitality",
    description:
      "Online reservations, menus that actually read well, and content that shows the place off instead of a stock photo.",
  },
  {
    name: "Healthcare & Wellness",
    description:
      "Compliant, patient-friendly booking and local visibility for practices that live or die by whether people can find and reach them.",
  },
  {
    name: "Startups & SaaS",
    description:
      "MVP builds, landing pages and growth automation wired in from day one, so the first users aren't landing on a placeholder.",
  },
];

export const outcomes = [
  {
    quote:
      "Ardy Media took our paid social from a guessing game to a real pipeline — every lead is tracked back to the campaign that brought it in, and the weekly reports actually tell us what to do next.",
    attribution: "Sabbie Sandhu, Founder & Owner — Royal Den Capital",
  },
  {
    quote:
      "We finally have a system instead of scattered ads. Ardy Media set up our Meta and Instagram campaigns and we've had a steady stream of qualified leads ever since.",
    attribution: "Gurprem Sandhu — Summer Haven",
  },
];

export const pillarTestimonials: Record<
  string,
  { quote: string; attribution: string }[]
> = {
  "digital-marketing": [
    {
      quote:
        "Ardy Media took our paid social from a guessing game to a real pipeline — every lead is tracked back to the campaign that brought it in, and the weekly reports actually tell us what to do next.",
      attribution: "Sabbie Sandhu, Founder & Owner — Royal Den Capital",
    },
    {
      quote:
        "We finally have a system instead of scattered ads. Ardy Media set up our Meta and Instagram campaigns and we've had a steady stream of qualified leads ever since.",
      attribution: "Gurprem Sandhu — Summer Haven",
    },
  ],
};

export const whyUs = [
  {
    title: "One team, zero hand-off gaps",
    description:
      "Your ads, your website, your CRM and your automation are built by people who talk to each other daily — not five agencies emailing past one another.",
  },
  {
    title: "Built to convert, not just launch",
    description:
      "Every site, app and campaign is wired into lead capture and booking flows from day one, so growth doesn't wait for a phase two.",
  },
  {
    title: "AI-powered follow-up",
    description:
      "Bots and automations qualify and respond to leads instantly, so nothing goes cold while you're heads-down running the business.",
  },
  {
    title: "You focus on the real work",
    description:
      "We run the IT, marketing and media stack in the background — reporting in plainly, on a schedule you choose — so you can run the business.",
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    short: "Free strategy call to map your goals, channels and current stack.",
    detail:
      "We start by understanding where the business actually is — current channels, existing tech, past campaigns, and what growth needs to look like over the next 6-12 months. No generic questionnaire; a real conversation with someone who will be doing the work.",
  },
  {
    step: "02",
    title: "Build",
    short: "We design and build your site, app, CRM and/or ad campaigns in parallel.",
    detail:
      "Instead of a strict waterfall — site first, then ads, then automation, months later — the pieces that need each other get built together, so your first campaign already has a converting page and a CRM ready to receive the leads.",
  },
  {
    step: "03",
    title: "Automate",
    short: "Leads, bookings and follow-ups get wired into AI bots and your CRM.",
    detail:
      "Every lead source — ads, forms, chat, phone — gets routed into one place, scored, and followed up with automatically. Your team sees qualified conversations, not a spreadsheet of cold leads.",
  },
  {
    step: "04",
    title: "Scale",
    short: "We monitor, report and optimize every channel on an ongoing basis.",
    detail:
      "Once the engine is running, the work shifts to tuning it — doubling down on what converts, cutting what doesn't, and expanding into new channels or markets as the data supports it.",
  },
];

export type PillarServiceItem = {
  title: string;
  description: string;
};

export const pillarServiceList: Record<string, PillarServiceItem[]> = {
  "technology-development": [
    {
      title: "Android Development",
      description:
        "Native Android apps built in Kotlin, tuned for real devices and real users, not just the emulator.",
    },
    {
      title: "iOS Development",
      description:
        "Native iOS apps in Swift, built to Apple's standards and ready for App Store review from day one.",
    },
    {
      title: "Flutter Development",
      description:
        "One codebase for iOS and Android, when a fully native app for each platform isn't the priority.",
    },
    {
      title: "React Native Development",
      description:
        "Cross-platform apps in React Native when you need to move fast without giving up a native feel.",
    },
    {
      title: "Website Development",
      description:
        "Marketing sites, web apps and everything between — built fast, built accessible, built to convert.",
    },
    {
      title: "SEO",
      description:
        "Technical SEO built into the site itself — structure, speed and markup that search engines can actually read.",
    },
    {
      title: "Lead Generation",
      description:
        "Landing pages, forms and tracking wired in from day one, not bolted on after the site is already live.",
    },
    {
      title: "CRM Development",
      description:
        "Custom CRM systems built around how your team actually sells and services customers, not a generic template.",
    },
  ],
};

export type PillarProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const pillarProcess: Record<string, PillarProcessStep[]> = {
  "digital-marketing": [
    {
      step: "01",
      title: "Audit",
      description:
        "We review your current channels, past ad performance and Google/social presence, and come back with a clear read on what's working and what's wasting budget.",
    },
    {
      step: "02",
      title: "Strategy & Creative",
      description:
        "We pick the channels worth the spend, define audiences and offers, and produce the ad creative — copy, static, video — built around what those audiences actually respond to.",
    },
    {
      step: "03",
      title: "Launch & Test",
      description:
        "Campaigns go live with tracking in place from day one. Early weeks are about testing creative and audience combinations, not scaling blindly.",
    },
    {
      step: "04",
      title: "Scale & Report",
      description:
        "Budget shifts toward what's converting, cut from what isn't. You get a plain-language report every week — cost per lead, cost per booking, what changed and why.",
    },
  ],
  "technology-development": [
    {
      step: "01",
      title: "Discover & Scope",
      description:
        "We map what you actually need — users, integrations, constraints — and scope the build so there are no surprises on timeline or cost partway through.",
    },
    {
      step: "02",
      title: "Design & Architecture",
      description:
        "Interface design and technical architecture happen together, so the product looks right and is built on a foundation that won't need to be redone in six months.",
    },
    {
      step: "03",
      title: "Build & QA",
      description:
        "Development happens in visible increments, not a black box until launch day. Automated and manual testing run alongside the build, not bolted on at the end.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description:
        "We handle deployment, documentation and handover, then stay on for a defined support window to fix what real usage surfaces that testing didn't.",
    },
  ],
  "growth-automation": [
    {
      step: "01",
      title: "Map the Funnel",
      description:
        "We trace every path a lead can take in — ads, forms, chat, phone, referral — and where each one currently goes (or doesn't).",
    },
    {
      step: "02",
      title: "Build the Automation",
      description:
        "Routing rules, chatbot flows, booking funnels and follow-up sequences get built around your actual sales process, not a generic template.",
    },
    {
      step: "03",
      title: "Connect & Test",
      description:
        "Every integration gets tested end to end — a real lead submitted through every channel, checked all the way to where it lands and what happens next.",
    },
    {
      step: "04",
      title: "Monitor & Tune",
      description:
        "We watch response times, conversion rates and where leads drop off, and adjust the automation as your volume and offers change.",
    },
  ],
};

export type PillarPlatform = {
  name: string;
  description: string;
  tags: string[];
};

export const pillarPlatforms: Record<string, PillarPlatform[]> = {
  "digital-marketing": [
    {
      name: "Meta Ads",
      description:
        "Facebook & Instagram campaigns with Lead Ads, custom audiences, and retargeting funnels tuned for pipeline.",
      tags: ["Lead Ads", "Retargeting", "Custom Audiences"],
    },
    {
      name: "LinkedIn Ads",
      description:
        "B2B lead generation with precise targeting by job title, industry, and company size — built for pipeline, not impressions.",
      tags: ["B2B Targeting", "Lead Gen Forms", "Account Targeting"],
    },
    {
      name: "Instagram",
      description:
        "Story ads, Reels and carousel creative that stop the scroll and drive qualified traffic to conversion-optimized landing pages.",
      tags: ["Reels Ads", "Story Ads", "Carousel"],
    },
  ],
};

export type PillarHighlight = {
  value: string;
  label: string;
  sublabel: string;
};

export const pillarHighlights: Record<string, PillarHighlight[]> = {
  "digital-marketing": [
    { value: "3", label: "Ad platforms", sublabel: "Meta, Instagram & LinkedIn" },
    { value: "5", label: "Capability areas", sublabel: "Strategy through to reporting" },
    { value: "4", label: "Step delivery process", sublabel: "Audit to scale & report" },
    { value: "Weekly", label: "Reporting cadence", sublabel: "Plain-language, every week" },
  ],
};

export type PillarFaq = {
  question: string;
  answer: string;
};

export const pillarFaqs: Record<string, PillarFaq[]> = {
  "digital-marketing": [
    {
      question: "What's a reasonable ad budget to start with?",
      answer:
        "It depends on your market and goals, but we'd rather start smaller and prove the funnel converts before scaling spend — we'll give you a specific number on the strategy call, not a generic minimum.",
    },
    {
      question: "Do you handle the creative, or do we need to provide it?",
      answer:
        "We handle it — copywriting, static and video creative, and direction for any photo/video shoots. If you already have brand assets or footage, we'll work with what you have.",
    },
    {
      question: "Which platforms do you advertise on?",
      answer:
        "Primarily Meta (Facebook & Instagram) and LinkedIn for B2B. We'll recommend the mix based on where your customers actually are, not run every platform by default.",
    },
    {
      question: "How do we know if it's working?",
      answer:
        "Weekly reporting on cost per lead, cost per booking, and what changed — not just impressions and reach. Every campaign is tied to a lead or booking event so results are traceable, not vibes-based.",
    },
  ],
  "technology-development": [
    {
      question: "Do you work with our existing tech stack, or start from scratch?",
      answer:
        "Either — we can build on what you have if it's sound, or recommend a rebuild if the current system is genuinely holding you back. We don't rip things out by default.",
    },
    {
      question: "Who owns the code once the project is done?",
      answer:
        "You do, fully. Source code, repository access and documentation are yours — we don't build on proprietary platforms that lock you into us.",
    },
    {
      question: "How do you scope a fixed price for custom software?",
      answer:
        "After the discovery call, we break the build into defined phases with clear deliverables per phase, so you know what you're getting and when before any work starts.",
    },
    {
      question: "What happens after launch?",
      answer:
        "A defined support window is included with every build to fix what real usage surfaces. After that, ongoing maintenance is available on a monthly basis if you want it.",
    },
  ],
  "growth-automation": [
    {
      question: "Does this work with the CRM we already use?",
      answer:
        "In most cases, yes — we integrate with the CRM you have rather than forcing a switch. If your current CRM genuinely can't support what you need, we'll tell you plainly instead of working around it.",
    },
    {
      question: "What if we don't have a CRM yet?",
      answer:
        "We'll help you pick and set one up as part of the automation build — sized to your team, not an enterprise platform you'll never fully use.",
    },
    {
      question: "Will an AI chatbot feel robotic to our customers?",
      answer:
        "Not if it's scoped right — we use it for fast first-response and qualification, then hand off to a real person for anything that needs judgment. It's a net faster than a human checking messages once an hour.",
    },
    {
      question: "How fast can leads actually get routed and followed up?",
      answer:
        "Typically within seconds of a form submission or ad lead coming in — that's the entire point. Slow follow-up is usually the single biggest reason leads go cold.",
    },
  ],
};

export const faqs = [
  {
    question: "Do we have to use all of your services?",
    answer:
      "No. Some clients start with just paid social, others just need a website or CRM rebuild. Most end up consolidating everything with us once they see how much smoother it runs with one accountable team — but there's no bundle requirement.",
  },
  {
    question: "How is this different from hiring an agency?",
    answer:
      "Most agencies specialize in one lane — media buying, or web dev, or CRM — and hand you off to a subcontractor for the rest. Ardy Media runs marketing and technology together, so the site, the ads, and the automation are designed as one system instead of three disconnected vendors.",
  },
  {
    question: "What does onboarding look like?",
    answer:
      "It starts with a free strategy call, followed by a short discovery phase to audit your current stack and channels. From there we scope the work, agree on timelines, and get building — most engagements have something live within the first few weeks.",
  },
  {
    question: "Who owns the website, app or CRM you build?",
    answer:
      "You do. Source code, designs and accounts are yours — we don't build on proprietary platforms that lock you in, and we hand over full documentation and access at every stage, not just at offboarding.",
  },
  {
    question: "Do you work with businesses outside of North America?",
    answer:
      "Yes — we're remote-first and work with clients across time zones. Strategy calls and reporting are scheduled around what works for your team.",
  },
  {
    question: "What if we already have an existing website, app or CRM?",
    answer:
      "We can audit what's there and either improve it in place or rebuild it, depending on what the current system can actually support. We don't rip things out for the sake of it — only when it's genuinely holding growth back.",
  },
];

export const packages = [
  {
    name: "Starter",
    tagline: "For businesses validating a single channel",
    bestFor: "A new site, a first paid social campaign, or a CRM cleanup.",
    includes: [
      "One core service from our three pillars",
      "Strategy call & audit before scoping",
      "Direct access to the team building your work",
      "Monthly reporting",
    ],
  },
  {
    name: "Growth",
    tagline: "For businesses ready to run marketing + tech together",
    bestFor: "Paid social + a converting website + basic automation, built as one system.",
    includes: [
      "Two to three services combined",
      "Cross-channel strategy & shared reporting",
      "Lead routing & CRM automation included",
      "Priority turnaround on requests",
    ],
    featured: true,
  },
  {
    name: "Full-Stack",
    tagline: "For businesses that want one partner running everything",
    bestFor: "Marketing, website, CRM, mobile app and AI automation, fully managed.",
    includes: [
      "All core services, unified under one roadmap",
      "Dedicated point of contact",
      "Ongoing optimization across every channel",
      "Quarterly strategy reviews",
    ],
  },
];
