import Image from "next/image";
import Link from "next/link";
import { projects, site } from "@/config/site";
import type { Dictionary } from "@/content/en";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className={diagonal ? "arrow diagonal" : "arrow"} aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

function SectionHeading({ number, label, title, intro }: { number: string; label: string; title: string; intro?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span aria-hidden="true">{number}</span>{label}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}

function ServiceIcon({ index }: { index: number }) {
  return (
    <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {index === 0 ? <><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" /></> : index === 1 ? <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 9v12" /></> : <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /><path d="M20 2v4m-2-2h4" /></>}
    </svg>
  );
}

export function Portfolio({ locale, copy: t }: { locale: "en" | "fa"; copy: Dictionary }) {
  const navigation = Object.entries(t.navigation);
  const email = site.contact.email.trim();
  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="wordmark" href={locale === "en" ? "/" : "/fa"} aria-label={t.home}><span lang="en" dir="ltr">nasim<span className="accent">.</span></span></Link>
          <nav className="desktop-nav" aria-label={locale === "en" ? "Main navigation" : "پیمایش اصلی"}>
            {navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <nav className="language-switch" dir="ltr" aria-label={t.language}>
              <Link href="/" hrefLang="en" lang="en" aria-current={locale === "en" ? "page" : undefined} aria-label="English">EN</Link>
              <span aria-hidden="true">/</span>
              <Link href="/fa" hrefLang="fa" lang="fa" aria-current={locale === "fa" ? "page" : undefined} aria-label="فارسی">FA</Link>
            </nav>
            <details className="mobile-menu"><summary>{t.menu}<span aria-hidden="true">+</span></summary><nav aria-label={locale === "en" ? "Mobile navigation" : "پیمایش موبایل"}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav></details>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="status-dot" aria-hidden="true" />{t.hero.eyebrow}</p>
            <p className="hero-name">{t.name}</p>
            <p className="professional-title" lang="en" dir="ltr">{site.professionalTitle}</p>
            <h1 id="hero-title">{t.hero.headline}<br /><span>{t.hero.highlight}</span></h1>
            <p className="hero-description">{t.hero.description}</p>
            <div className="hero-actions"><a className="button button-primary" href="#work">{t.hero.explore}<Arrow /></a><a className="button button-secondary" href="#contact">{t.hero.contact}<Arrow diagonal /></a></div>
            <p className="audience"><span className="audience-mark" aria-hidden="true">◎</span>{t.hero.audience}</p>
          </div>
          <figure className="portrait">
            <div className="portrait-frame"><Image src="/images/nasim-profile.png" alt={t.hero.portrait} width={1254} height={1254} sizes="(max-width: 760px) 90vw, 40vw" preload className="portrait-image" /></div>
            <figcaption><span className="portrait-monogram" aria-hidden="true" lang="en">NA</span><span>{t.hero.caption}</span><span className="caption-star" aria-hidden="true">✳</span></figcaption>
          </figure>
          <div className="hero-bottom"><span lang="en" dir="ltr">PRODUCT DESIGN / UI·UX / AI-ASSISTED WEB</span><a href="#work">{t.hero.scroll}<span aria-hidden="true">↓</span></a></div>
        </section>

        <section id="services" className="section shell" aria-labelledby="services-title">
          <div id="services-title"><SectionHeading number="01" label={t.services.label} title={t.services.title} intro={t.services.intro} /></div>
          <div className="services-grid">{t.services.items.map((service, index) => <article className="service-card" key={service.title}><div className="service-card-top"><span className="service-icon"><ServiceIcon index={index} /></span><span className="card-index" aria-hidden="true">0{index + 1}</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-details">{service.details}</div></article>)}</div>
        </section>

        <section id="work" className="section shell" aria-labelledby="work-title">
          <div id="work-title"><SectionHeading number="02" label={t.work.label} title={t.work.title} intro={t.work.intro} /></div>
          <p className="collaboration-note"><span className="status-dot" aria-hidden="true" />{t.work.shared}</p>
          <div className="projects-grid">{projects.map((project, index) => {
            const content = t.work.projects[project.id];
            return <article className={`project-card${index === 0 ? " project-featured" : ""}`} key={project.id}>
              <a className="project-image-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} — ${t.work.view} (${t.work.newTab})`}><Image src={project.image} alt={content.alt} width={1672} height={941} sizes={index === 0 ? "(max-width: 760px) 90vw, 58vw" : "(max-width: 760px) 90vw, 45vw"} className="project-image" /></a>
              <div className="project-content"><p className="project-kind"><span aria-hidden="true">0{index + 1}</span>{t.work.team}</p><h3 lang="en" dir="ltr">{project.name}</h3><p className="project-subtitle">{content.title}</p><p className="project-description">{content.description}</p><ul className="tags" aria-label={locale === "en" ? "Shared design contributions" : "مشارکت‌های مشترک در طراحی"}>{t.work.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><a className="case-link" href={project.href} target="_blank" rel="noopener noreferrer">{t.work.view}<Arrow diagonal /><span className="sr-only"> — {project.name}, {t.work.newTab}</span></a></div>
            </article>;
          })}</div>
        </section>

        <section id="process" className="section shell" aria-labelledby="process-title">
          <div id="process-title"><SectionHeading number="03" label={t.process.label} title={t.process.title} intro={t.process.intro} /></div>
          <ol className="process-grid">{t.process.items.map((step, index) => <li key={step.title}><span className="process-number" aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        </section>

        <section id="about" className="section shell about-section" aria-labelledby="about-title">
          <div id="about-title"><SectionHeading number="04" label={t.about.label} title={t.about.title} /></div>
          <div className="about-grid"><p className="about-lead">{t.about.lead}</p><div className="about-copy"><p>{t.about.body}</p><p>{t.about.closing}</p></div></div>
          <ul className="principles">{t.about.principles.map(principle => <li key={principle}><span aria-hidden="true">✳</span>{principle}</li>)}</ul>
        </section>

        <section id="contact" className="contact-section shell" aria-labelledby="contact-title">
          <div className="contact-decoration" aria-hidden="true">✳</div>
          <p className="eyebrow"><span aria-hidden="true">05</span>{t.contact.label}</p>
          <h2 id="contact-title">{t.contact.title}</h2>
          <p className="contact-description">{t.contact.description}</p>
          {email ? <a className="button button-primary" href={`mailto:${email}`}>{t.contact.email}<Arrow diagonal /></a> : <div className="contact-pending"><p><span className="status-dot" aria-hidden="true" />{t.contact.pending}</p><p>{t.contact.pendingNote}</p><a className="text-link" href="#work">{t.contact.work}<Arrow /></a></div>}
        </section>
      </main>
      <footer className="shell footer"><div><span className="footer-name">{t.name}<span className="accent">.</span></span><p>{t.footer}</p></div><p className="copyright">© {new Date().getFullYear()} <bdi>{site.name}</bdi></p><a href="#main">{t.top}<span aria-hidden="true">↑</span></a></footer>
    </>
  );
}
