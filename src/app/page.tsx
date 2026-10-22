const navigation = ["About", "Experience", "Skills", "Projects", "Education", "Contact"];
const skills = [
  { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML & CSS"] },
  { title: "Backend & data", items: ["Node.js", "Python", "PostgreSQL", "REST APIs", "Prisma"] },
  { title: "Tools & process", items: ["Git", "Figma", "Docker", "Vercel", "Agile"] },
];
const projects = [
  { number: "01", title: "Orbit analytics", category: "SaaS platform", description: "Making complex data feel simple. A focused analytics workspace for teams that want to move with clarity.", tags: ["Next.js", "TypeScript", "PostgreSQL"], style: "orbit", mark: "orbit", detail: "A clearer view of your business.", href: "https://github.com/example/orbit-analytics" },
  { number: "02", title: "Forma studio", category: "E-commerce experience", description: "A considered storefront for everyday objects, with an emphasis on discovery, typography, and effortless shopping.", tags: ["React", "Tailwind CSS", "Stripe"], style: "forma", mark: "forma.", detail: "Objects for a slower everyday.", href: "https://github.com/example/forma-studio" },
  { number: "03", title: "Gather together", category: "Community application", description: "Helping people find their people. A welcoming space to discover local events and build meaningful connections.", tags: ["Next.js", "Node.js", "Prisma"], style: "gather", mark: "gather", detail: "Good things happen together.", href: "https://github.com/example/gather" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg className="arrow-icon" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}</svg>;
}
function SectionHeading({ number, label, title }: { number: string; label: string; title: string }) {
  return <div className="section-heading"><p className="eyebrow"><span>{number}</span> {label}</p><h2>{title}<span className="accent">.</span></h2></div>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a href="#" className="logo" aria-label="Alex Morgan home">am<span>.</span></a>
          <nav className="desktop-nav" aria-label="Main navigation">{navigation.slice(0, 5).map(item => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav>
          <a className="header-contact" href="#contact">Let’s talk <Arrow diagonal /></a>
          <details className="mobile-menu"><summary>Menu <span aria-hidden="true">＋</span></summary><nav aria-label="Mobile navigation">{navigation.map(item => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</nav></details>
        </div>
      </header>
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="availability"><span /> Available for new opportunities</p>
            <p className="hero-intro">Hello, I’m Alex Morgan</p>
            <h1 id="hero-title">Thoughtful code.<br /><span>Meaningful</span><br />experiences.</h1>
            <p className="hero-description">A full-stack developer with a designer’s eye. I turn complex problems into simple, intuitive digital experiences.</p>
            <div className="hero-actions"><a href="#projects" className="button button-primary">Explore my work <Arrow /></a><a href="#contact" className="button button-secondary">Get in touch <Arrow diagonal /></a></div>
            <div className="hero-location"><span aria-hidden="true">◷</span> Based in San Francisco, CA <span className="dot">·</span> Open to remote</div>
          </div>
          <div className="hero-art" aria-label="Abstract geometric developer artwork" role="img">
            <div className="art-grid" /><span className="art-coordinate top">CREATIVE MIND / TECHNICAL CRAFT</span>
            <div className="orbital orbital-one" /><div className="orbital orbital-two" /><div className="orbital orbital-three" />
            <div className="art-core"><span>&lt;<span className="core-slash">/</span>&gt;</span></div>
            <div className="art-chip chip-one"><span className="tiny-dot" /> Building with purpose</div><div className="art-chip chip-two">design <span>∩</span> development</div>
            <span className="art-coordinate bottom">37.7749° N &nbsp; 122.4194° W</span><span className="art-plus">+</span>
          </div>
          <div className="hero-bottom"><span>CURIOUS BY NATURE. BUILDER BY CHOICE.</span><a href="#about">Scroll to explore <span aria-hidden="true">↓</span></a></div>
        </section>
        <section id="about" className="section shell about-section">
          <SectionHeading number="01" label="A little about me" title="More than a developer" />
          <div className="about-grid"><p className="about-lead">I believe the best digital products live at the intersection of <span>clear thinking, good design, and well-crafted code.</span></p><div className="body-copy"><p>I’m Alex, a developer who loves bringing ideas to life on the web. Over the past few years, I’ve worked with ambitious teams to build products that are as enjoyable to use as they are reliable.</p><p>My approach is simple: stay curious, care about the details, and always put people first. Away from my keyboard, you’ll find me exploring new trails, collecting design books, or hunting for a great cup of coffee.</p><a className="text-link" href="#contact">Let’s build something together <Arrow diagonal /></a></div></div>
          <div className="stats"><div><strong>4<span>+</span></strong><p>Years of experience</p></div><div><strong>20<span>+</span></strong><p>Projects brought to life</p></div><div><strong>12<span>+</span></strong><p>Happy collaborators</p></div><div className="stat-note"><span className="tiny-dot" /> Always learning.<br />Always building.</div></div>
        </section>
        <section id="experience" className="section shell">
          <SectionHeading number="02" label="The journey so far" title="Where I’ve made an impact" />
          <div className="experience-list">{[
            { date: "2023 — Present", role: "Full-Stack Developer", company: "Studio North", type: "Full-time · Remote", description: "Building accessible web applications for growing brands. Partnering with designers and product teams to ship thoughtful features, improve performance, and create a consistent design system.", tags: ["React", "Next.js", "TypeScript"] },
            { date: "2021 — 2023", role: "Frontend Developer", company: "Pixel & Co.", type: "Full-time · San Francisco", description: "Translated ambitious design concepts into responsive, polished websites. Helped streamline the frontend workflow and delivered engaging experiences for clients across industries.", tags: ["JavaScript", "React", "CSS"] },
          ].map(job => <article className="experience-row" key={job.company}><p className="job-date"><span className="tiny-dot" />{job.date}</p><div><div className="job-title"><h3>{job.role}</h3><span>{job.type}</span></div><p className="company">{job.company}</p><p className="job-description">{job.description}</p><div className="tags">{job.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
        </section>
        <section id="skills" className="section shell">
          <SectionHeading number="03" label="My everyday toolkit" title="The right tools. The right mindset" />
          <div className="skills-grid">{skills.map((group, index) => <article className="skill-card" key={group.title}><span className="skill-icon" aria-hidden="true">{["⌘", "{ }", "✳"][index]}</span><h3>{group.title}</h3><div className="skill-items">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div>
        </section>
        <section id="projects" className="section shell">
          <div className="heading-with-note"><SectionHeading number="04" label="Selected projects" title="Ideas turned into experiences" /><p>A few things I’ve enjoyed building.<br />Made with care, from concept to code.</p></div>
          <div className="projects-grid">{projects.map(project => <article className="project-card" key={project.title}><div className={`project-art ${project.style}`}><span className="project-art-label">{project.category}</span><div className="project-art-center"><strong>{project.mark}</strong><p>{project.detail}</p><div className="mock-lines"><span /><span /><span /></div></div><span className="project-number">/{project.number}</span></div><div className="project-content"><div className="project-title"><h3>{project.title}</h3><a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} placeholder repository`}><Arrow diagonal /></a></div><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
          <p className="placeholder-note">Concept projects · Repository links are placeholders.</p>
        </section>
        <section id="education" className="section shell education-section"><SectionHeading number="05" label="A foundation for growth" title="Learning never stops" /><article className="education-card"><span className="education-icon" aria-hidden="true"><Arrow diagonal /></span><div><p className="eyebrow">2017 — 2021</p><h3>B.S. in Computer Science</h3><p>University of California, Berkeley</p></div><p className="education-note">A foundation in problem solving,<br />software engineering, and human-centered design.</p></article></section>
        <section id="contact" className="shell contact-section"><div className="contact-glow" /><p className="eyebrow"><span>06</span> What’s next?</p><h2>Have something<br />in mind<span className="accent">?</span></h2><p>I’m always open to interesting projects and good conversations.<br className="desktop-break" /> Let’s make something that matters.</p><a className="contact-email" href="mailto:hello@example.com">hello@example.com <Arrow diagonal /></a><div className="contact-links"><a href="https://github.com/example" target="_blank" rel="noopener noreferrer">GitHub <Arrow diagonal /></a><a href="https://www.linkedin.com/in/example" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal /></a><a href="mailto:hello@example.com">Email <Arrow diagonal /></a></div></section>
      </main>
      <footer className="shell footer"><a href="#" className="logo" aria-label="Back to top">am<span>.</span></a><p>© {new Date().getFullYear()} Alex Morgan. Built with intention.</p><a href="#">Back to top ↑</a></footer>
    </>
  );
}
