export const en = {
  /* ── Nav ── */
  nav: {
    home: 'Home',
    about: 'About',
    blog: 'Blog',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to content',
  },

  /* ── Footer ── */
  footer: {
    copy: '© {year} Marcos Irenos · Built with React',
  },

  /* ── Hero ── */
  hero: {
    greeting: "Hi, I'm",
    name: 'Marcos Irenos',
    role: 'Data Analyst',
    roleHighlight: 'Software Engineer',
    description:
      'I turn data into decisions and code into solutions. Currently at Grupo RIC, building dashboards and pipelines that power financial intelligence.',
    cta: 'Get in touch',
    photoAlt:
      'Photo of Marcos Irenos, data analyst and software engineering student',
  },

  /* ── About (mini) ── */
  aboutMini: {
    label: 'About me',
    p1: "I'm a data analyst at Grupo RIC, where I turn numbers into decisions. I work with Power BI, Python, and SQL to build pipelines and dashboards that make a difference in the company's financial intelligence.",
    p2: "I'm studying Software Engineering at UNIBRASIL and I believe the intersection between data and development is where the best solutions are born. Outside work, I explore machine learning, automation, and ways to make data more accessible to everyone.",
    readMore: 'Read more',
  },

  /* ── Skills ── */
  skills: {
    label: 'Skills',
    heading: 'What I do best',
    items: [
      {
        title: 'Power BI & Data',
        description:
          'Interactive dashboards, data modeling, and visual storytelling for strategic decisions.',
      },
      {
        title: 'Python & ETL',
        description: 'Automated data pipelines and scalable analytics.',
        badges: ['Pandas', 'Openpyxl', 'Automation'],
      },
      {
        title: 'SQL',
        description: 'Complex and optimized queries on enterprise databases.',
        badges: ['Oracle', 'GCP BigQuery'],
      },
      {
        title: 'Machine Learning',
        description:
          'Supervised models applied to real-world business problems.',
      },
      {
        title: 'Power Platform & VBA',
        description:
          'Low-code automation and macros for enterprise productivity.',
      },
    ],
    stats: [
      { value: '2+', label: 'years of experience in data' },
      { value: '3', label: 'companies in my career' },
    ],
  },

  /* ── Experience ── */
  experience: {
    label: 'Experience',
    heading: 'My professional journey',
    items: [
      {
        company: 'Grupo RIC',
        role: 'Junior Data Analyst',
        period: 'Mar 2024 — Present',
        location: 'Curitiba, PR',
        bullets: [
          'Development of strategic Power BI dashboards for the Financial Intelligence team',
          'Building ETL pipelines with Python (Pandas, Openpyxl) to automate reporting',
          'Complex SQL queries on Oracle and GCP BigQuery for data extraction and analysis',
          'Automation with Power Platform and VBA to optimize internal processes',
        ],
      },
      {
        company: 'SLB OneSubsea',
        role: 'Intern — Supplier Quality',
        period: 'Aug 2023 — Mar 2024',
        location: 'Curitiba, PR',
        bullets: [
          'Supplier quality data analysis using Excel and internal tools',
          'Support in generating reports and performance indicators (KPIs)',
          'Collaboration with cross-functional teams for continuous process improvement',
        ],
      },
      {
        company: 'RM2 Intelligence Partner',
        role: 'Intern — Data',
        period: 'Feb 2023 — Aug 2023',
        location: 'Curitiba, PR',
        bullets: [
          'First professional contact with data analysis and business intelligence',
          'Support in dashboard creation and database processing',
          'Hands-on learning in SQL, advanced Excel, and BI tools',
        ],
      },
    ],
  },

  /* ── Certifications ── */
  certs: {
    label: 'Certifications',
    heading: 'Lifelong learning',
  },

  /* ── Blog Preview ── */
  blogPreview: {
    label: 'Blog',
    heading: 'Latest posts',
    viewAll: 'View all posts',
    posts: [
      {
        slug: 'pipeline-etl-python-pandas',
        title: 'How I built an ETL pipeline with Python and Pandas',
        date: 'Jan 15, 2026',
        tag: 'Python',
        readingTime: '5 min',
        excerpt:
          'A practical guide on automating data extraction and transformation using Python for financial reports.',
      },
      {
        slug: 'power-bi-dashboards-storytelling',
        title: 'Power BI: tips for dashboards that tell stories',
        date: 'Dec 28, 2025',
        tag: 'Power BI',
        readingTime: '4 min',
        excerpt:
          'Visual storytelling techniques I learned in practice to make financial data accessible to any stakeholder.',
      },
      {
        slug: 'sql-window-functions',
        title: 'Advanced SQL: window functions in everyday work',
        date: 'Nov 10, 2025',
        tag: 'SQL',
        readingTime: '6 min',
        excerpt:
          'How window functions changed the way I analyze time series and rankings in Oracle and BigQuery databases.',
      },
    ],
  },

  /* ── Contact ── */
  contact: {
    label: 'Contact',
    heading1: "Let's build something",
    headingHighlight: 'together',
    subtitle:
      "I'm always open to new opportunities, collaborations, and conversations about data and technology.",
    cta: 'Get in touch',
  },

  /* ── About page ── */
  aboutPage: {
    label: 'About me',
    heading: 'Marcos Irenos',
    p1: "I'm a data analyst at Grupo RIC, part of the Financial Intelligence team. My daily work involves turning raw data into insights that guide strategic decisions — using Power BI, Python, and SQL as my main tools.",
    p2: "I'm studying Software Engineering at UNIBRASIL (2023–2026) and I believe the intersection between data analysis and software development is where the most creative and scalable solutions happen. I enjoy automating the repetitive and bringing clarity to the complex.",
    p3: "Outside work, I study machine learning, contribute to personal projects, and look for ways to make data more accessible to non-technical people.",
    infoCards: [
      { label: 'Current role', value: 'Junior Data Analyst — Grupo RIC' },
      { label: 'Education', value: 'Software Engineering — UNIBRASIL' },
      { label: 'Location', value: 'Curitiba, PR — Brazil' },
      { label: 'Experience', value: '2+ years in data analysis' },
    ],
    motivationHeading: 'What drives me',
    motivationText:
      "I believe well-presented data changes perspectives. What motivates me is seeing a dashboard I designed help someone make a better decision, or a script that saves hours of manual work. Technology exists to serve people — and that's what guides me.",
  },

  /* ── Blog page ── */
  blogPage: {
    heading: 'Posts',
    subtitle:
      'Thoughts, tutorials, and learnings about data, Python, and software engineering.',
    all: 'All',
    empty: 'No posts found with this filter.',
    backToBlog: 'Back to blog',
  },

  /* ── Blog Post page ── */
  blogPost: {
    notFound: 'Post not found',
    backToBlog: 'Back to blog',
  },
}
