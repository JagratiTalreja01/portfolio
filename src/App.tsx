import { useState } from 'react'
import { profile } from './data/profile'
import { experience, education } from './data/experience'
import { publications } from './data/publications'
import { patents, skillGroups, adventures, researchLife } from './data/portfolio'
import { asset } from './lib/asset'
import './wix-replica.css'

const background = (path: string) => ({ backgroundImage: `url("${asset(path)}")` })

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="wix-replica">
    <header className="wix-nav">
      <a className="wix-logo" href="#home">JT</a>
      <button className="wix-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
      <nav className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>
        <a href="#about">About</a><a href="#skills">Skills</a><a href="#publications">Publications</a>
        <a href="#experience">Experience</a><a href="#life">Life</a><a href="#contact">Contact</a>
      </nav>
    </header>
    <main>
      <section id="home" className="photo-panel hero-panel" style={background('media/images/adventure-motorcycle.webp')}>
        <div className="hero-note">Highly motivated individual aiming to achieve high career growth through continuous learning.</div>
        <div className="hero-name"><span>HI! I’M</span><h1>JAGRATI<br/>TALREJA</h1><p>Ph.D. · Data Science & Machine Learning<br/>AI/ML Engineer · Geospatial Data Scientist</p></div>
        <a className="scroll-cue" href="#about">Scroll ↓</a>
      </section>

      <section id="about" className="light-panel compact-about">
        <p className="kicker">ABOUT</p><h2>Dr. Jagrati Talreja</h2><p>{profile.statement}</p>
        <div className="quick-links"><a href={asset(profile.documents.resume)} target="_blank">Résumé</a><a href={asset(profile.documents.cv)} target="_blank">Curriculum Vitae</a></div>
      </section>

      <section id="skills" className="photo-panel skills-panel" style={background('media/images/portrait-editorial.webp')}>
        <div className="section-card"><p className="kicker">PROFESSIONAL</p><h2>SKILLS</h2>
          <div className="skill-lines">{skillGroups.slice(0, 7).map((group, i) => <div key={group.name}><span>{group.name}</span><i style={{width:`${92-i*4}%`}} /></div>)}</div>
        </div>
      </section>

      <section id="publications" className="dark-photo-panel" style={background('media/images/medicart-hardware.webp')}>
        <div className="paper-sheet"><p className="kicker">RESEARCH</p><h2>PUBLICATIONS</h2>
          <div className="paper-list">{publications.map(pub => <article key={pub.id}><span>{pub.year}</span><div><h3>{pub.title}</h3><p>{pub.venue}</p></div>{pub.doi ? <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer">DOI</a> : <em>{pub.status}</em>}</article>)}</div>
          <div className="patent-strip"><h2>PATENTS</h2>{patents.map(p => <div key={p.id}><b>{p.title}</b><span>{p.number}</span></div>)}</div>
        </div>
      </section>

      <section id="experience" className="timeline-panel">
        <div><p className="kicker">EDUCATION & EXPERIENCE</p><div className="timeline-title"><h2>Ph.D.<br/>Research<br/>Graduate</h2><span>Chulalongkorn University, Thailand</span></div></div>
        <div className="timeline-list">
          {experience.map(role => <article key={role.id}><time>{role.period}</time><div><h3>{role.title}</h3><h4>{role.org}</h4><p>{role.scope}</p></div></article>)}
          {education.map(degree => <article key={degree.id}><time>{degree.period}</time><div><h3>{degree.qualification}</h3><h4>{degree.institution}</h4><p>{degree.detail}</p></div></article>)}
        </div>
      </section>

      <section className="photo-panel credentials-panel" style={background('media/images/chula-engineering.webp')}>
        <p className="kicker">ACHIEVEMENTS</p><h2>CERTIFICATES & MILESTONES</h2>
        <div className="credential-grid">{['award.webp','graduation.webp','chula-poster.webp','talk-superres.webp'].map((img,i)=><img key={img} src={asset(`media/images/${img}`)} alt={['Academic award','Doctoral graduation','Research poster','Research presentation'][i]} loading="lazy"/>)}</div>
      </section>

      <section id="life" className="black-panel"><p className="kicker">BEYOND RESEARCH</p><h2>INTERESTS & ADVENTURES</h2>
        <div className="video-wall">{adventures.map(item => <figure key={item.id} className={item.span === 'wide' ? 'wide' : ''}>
          {item.type === 'video' ? <video muted loop playsInline controls poster={item.poster ? asset(item.poster) : undefined}><source src={asset(item.media)} type="video/mp4"/></video> : <img src={asset(item.media)} alt={item.alt} loading="lazy"/>}
          <figcaption>{item.title}</figcaption></figure>)}</div>
      </section>

      <section className="moments-panel"><p className="kicker">MOMENTS</p><h2>RESEARCH · COMMUNITY · TRAVEL</h2>
        <div className="moments-grid">{researchLife.map(frame => <figure key={frame.src}><img src={asset(frame.src)} alt={frame.alt} loading="lazy"/><figcaption>{frame.caption}</figcaption></figure>)}</div>
      </section>

      <section id="contact" className="contact-panel"><div><p className="kicker">CONTACT</p><h2>Let’s connect.</h2><p>Greensboro, North Carolina</p><a href={`mailto:${profile.links.email}`}>{profile.links.email}</a></div>
        <div className="contact-links"><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.links.wix} target="_blank" rel="noreferrer">Wix Portfolio</a><a href={asset(profile.documents.cv)} target="_blank">CV</a></div>
      </section>
    </main>
  </div>
}
