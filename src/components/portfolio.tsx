import Image from "next/image";
import Link from "next/link";
import { MobileNavigation } from "./mobile-navigation";
import { projects, site } from "@/config/site";
import type { Dictionary } from "@/content/en";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className={diagonal ? "arrow diagonal" : "arrow"} aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

function SectionHeading({ number, label, title, intro, id }: { number: string; label: string; title: string; intro?: string; id: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span aria-hidden="true">{number}</span>{label}</p>
      <h2 id={id}>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}

export function Portfolio({ locale, copy: t }: { locale: "en" | "fa"; copy: Dictionary }) {
  const navigationIds = ["work", "services", "about", "experience", "education", "recommendation", "contact"] as const;
  const navigation: [string, string][] = navigationIds.map(id => [id, t.navigation[id]]);
  const desktopNavigation = navigation.filter(([id]) => ["work", "services", "about", "experience"].includes(id));
  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="wordmark" href={locale === "en" ? "/" : "/fa"} aria-label={t.home}><span lang="en" dir="ltr">nasim<span className="accent">.</span></span></Link>
          <nav className="desktop-nav" aria-label={locale === "en" ? "Main navigation" : "پیمایش اصلی"}>
            {desktopNavigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <nav className="language-switch" dir="ltr" aria-label={t.language}>
              <Link href="/" hrefLang="en" lang="en" aria-current={locale === "en" ? "page" : undefined} aria-label="English">EN</Link>
              <span aria-hidden="true">/</span>
              <Link href="/fa" hrefLang="fa" lang="fa" aria-current={locale === "fa" ? "page" : undefined} aria-label="فارسی">FA</Link>
            </nav>
            <a className="nav-contact" href={`mailto:${site.contact.email}`}>{t.talk}<Arrow diagonal /></a>
            <MobileNavigation label={t.menu} items={navigation} navigationLabel={locale === "en" ? "Mobile navigation" : "پیمایش موبایل"} />
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-identity">
              <p className="eyebrow hero-eyebrow">{t.hero.eyebrow}</p>
              <p className="hero-name">{t.name}<span className="accent">.</span></p>
              <p className="professional-title" lang="en" dir="ltr">{site.professionalTitle}</p>
            </div>
            <h1 id="hero-title">{t.hero.headline}<br />{" "}<span>{t.hero.highlight}</span></h1>
            <p className="hero-description">{t.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={`mailto:${site.contact.email}`}>{t.hero.contact}<Arrow diagonal /></a>
              <a className="button button-secondary" href="#work">{t.hero.explore}<Arrow /></a>
              <a className="button button-cv" href={site.cv} download="Nasim-Akbari-CV.pdf">{t.download}<span aria-hidden="true">↓</span></a>
            </div>
            <address className="hero-contact-links">
              <a href={`mailto:${site.contact.email}`}><bdi dir="ltr">{site.contact.email}</bdi></a>
              <a href={site.contact.linkedin} target="_blank" rel="noopener noreferrer">{t.linkedinLabel}<Arrow diagonal /><span className="sr-only"> — {t.externalNotice}</span></a>
              <a href={site.contact.phoneHref}><bdi dir="ltr">{site.contact.phone}</bdi></a>
            </address>
          </div>
          <figure className="portrait">
            <Image src={site.portrait.src} alt={t.hero.portrait} width={site.portrait.width} height={site.portrait.height} sizes="(max-width: 760px) 106px, 340px" preload className="portrait-image" />
            <figcaption>{t.hero.caption}</figcaption>
          </figure>
          <div className="hero-bottom"><p><span className="status-dot" aria-hidden="true" />{t.hero.audience}</p><a href="#work">{t.hero.scroll}<span aria-hidden="true">↓</span></a></div>
        </section>

        <section id="work" className="section shell work-section" aria-labelledby="work-title">
          <SectionHeading id="work-title" number="01" label={t.work.label} title={t.work.title} intro={t.work.intro} />
          <p className="collaboration-note">{t.work.shared}</p>
          <div className="projects-grid">{projects.map((project, index) => {
            const content = t.work.projects[project.id];
            return (
              <article className="project-card" key={project.id}>
                <div className="project-top">
                  <div>
                    <p className="project-kind"><span aria-hidden="true">0{index + 1}</span>{t.work.team}</p>
                    <h3><bdi lang="en">{project.name}</bdi><span className="project-subtitle"> — {content.title}</span></h3>
                    <p className="project-category">{content.category}</p>
                  </div>
                  <a className="case-link" href={project.href} target="_blank" rel="noopener noreferrer">{t.work.view}<Arrow diagonal /><span className="sr-only"> — {project.name}, {t.work.newTab}</span></a>
                </div>
                <a className="project-image-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} — ${t.work.view} (${t.work.newTab})`}>
                  <Image src={project.image} alt={content.alt} width={1672} height={941} sizes="(max-width: 760px) 92vw, (max-width: 1400px) 90vw, 1200px" className="project-image" />
                </a>
                <div className="project-bottom">
                  <p className="project-description">{content.description}</p>
                  <ul className="tags" aria-label={locale === "en" ? "Shared design contributions" : "مشارکت‌های مشترک در طراحی"}>{content.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                </div>
              </article>
            );
          })}</div>
        </section>

        <section id="services" className="section shell" aria-labelledby="services-title">
          <SectionHeading id="services-title" number="02" label={t.services.label} title={t.services.title} intro={t.services.intro} />
          <div className="services-grid">{t.services.items.map((service, index) => (
            <article className="service-card" key={service.title}>
              <span className="card-index" aria-hidden="true">0{index + 1}</span>
              <h3>{service.title}</h3><p>{service.description}</p><div className="service-details">{service.details}</div>
            </article>
          ))}</div>
          <details id="process" className="process-details">
            <summary>{t.process.label}<span aria-hidden="true">+</span></summary>
            <div className="process-content"><h3>{t.process.title}</h3><p className="section-intro">{t.process.intro}</p>
              <ol className="process-grid">{t.process.items.map((step, index) => <li key={step.title}><span className="process-number" aria-hidden="true">0{index + 1}</span><h4>{step.title}</h4><p>{step.description}</p></li>)}</ol>
            </div>
          </details>
        </section>

        <section id="about" className="section shell about-section" aria-labelledby="about-title">
          <SectionHeading id="about-title" number="03" label={t.about.label} title={t.about.title} />
          <div className="about-grid"><p className="about-lead">{t.about.lead}</p><div className="about-copy"><p>{t.about.body}</p><p>{t.about.closing}</p></div></div>
          <div className="about-actions">
            <a className="button button-secondary" href={site.cv} download="Nasim-Akbari-CV.pdf">{t.download}<span aria-hidden="true">↓</span></a>
            <a className="text-link" href={site.profile} target="_blank" rel="noopener noreferrer">{t.about.profile}<Arrow diagonal /><span className="sr-only"> — {t.externalNotice}</span></a>
          </div>
          <ul className="principles">{t.about.principles.map(principle => <li key={principle}><span className="principle-dot" aria-hidden="true" />{principle}</li>)}</ul>
        </section>

        <section id="experience" className="section shell" aria-labelledby="experience-title">
          <SectionHeading id="experience-title" number="04" label={t.experience.label} title={t.experience.title} intro={t.experience.intro} />
          <ol className="timeline">
            {t.experience.items.map(job => (
              <li className="timeline-entry" key={job.company}>
                <p className="timeline-date">{job.date}</p>
                <div className="timeline-content">
                  <p className="timeline-role">{job.role}</p>
                  <h3>{job.company}</h3>
                  <p className="timeline-description">{job.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="education" className="section shell" aria-labelledby="education-title">
          <SectionHeading id="education-title" number="05" label={t.education.label} title={t.education.title} />
          <div className="credentials-grid">
            <article className="credential-card">
              <p className="eyebrow">{t.education.degreeLabel}</p>
              <h3>{t.education.degree}</h3>
              <p className="credential-institution">{t.education.university}</p>
              <p className="timeline-date">{t.education.date}</p>
            </article>
            <article className="credential-card">
              <p className="eyebrow">{t.education.certificateLabel}</p>
              <h3>{t.education.certificate}</h3>
              <p className="timeline-date">{t.education.certificateDate}</p>
              <a className="case-link" href={site.certificate} target="_blank" rel="noopener noreferrer">{t.education.view}<Arrow diagonal /><span className="sr-only"> — {t.externalNotice}</span></a>
            </article>
          </div>
        </section>

        <section id="recommendation" className="section shell" aria-labelledby="recommendation-title">
          <SectionHeading id="recommendation-title" number="06" label={t.recommendation.label} title={t.recommendation.title} />
          <figure className="recommendation-card">
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote><p>{t.recommendation.quote}</p></blockquote>
            <figcaption>
              <div><p className="recommender-name">{t.recommendation.name}</p><p className="recommender-role">{t.recommendation.role}</p></div>
              <a className="case-link" href={site.profile} target="_blank" rel="noopener noreferrer">{t.recommendation.source}<Arrow diagonal /><span className="sr-only"> — {t.externalNotice}</span></a>
            </figcaption>
          </figure>
        </section>

        <section id="contact" className="contact-section shell" aria-labelledby="contact-title">
          <p className="eyebrow"><span aria-hidden="true">07</span>{t.contact.label}</p>
          <h2 id="contact-title">{t.contact.title}</h2>
          <p className="contact-description">{t.contact.description}</p>
          <a className="contact-email" href={`mailto:${site.contact.email}`}><bdi dir="ltr">{site.contact.email}</bdi><Arrow diagonal /></a>
          <address className="contact-details">
            <div><span>{t.contact.emailLabel}</span><a href={`mailto:${site.contact.email}`}><bdi dir="ltr">{site.contact.email}</bdi></a></div>
            <div><span>{t.contact.phoneLabel}</span><a href={site.contact.phoneHref}><bdi dir="ltr">{site.contact.phone}</bdi></a></div>
            <a className="contact-social" href={site.contact.linkedin} target="_blank" rel="noopener noreferrer">{t.contact.linkedin}<Arrow diagonal /><span className="sr-only"> — {t.externalNotice}</span></a>
          </address>
        </section>


      </main>
      <footer className="shell footer"><div><span className="footer-name">{t.name}<span className="accent">.</span></span><p>{t.footer}</p></div><p className="copyright">© {new Date().getFullYear()} <bdi>{site.name}</bdi></p><a href="#main">{t.top}<span aria-hidden="true">↑</span></a></footer>
    </>
  );
}
