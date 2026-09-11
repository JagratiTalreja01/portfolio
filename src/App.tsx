import { useEffect, useRef, useState } from 'react'
import { profile } from './data/profile'
import { experience, education } from './data/experience'
import { publications } from './data/publications'
import { momentsSequence, patents, skillGroups } from './data/portfolio'
import { asset } from './lib/asset'
import './wix-replica.css'

const background = (path: string) => ({ backgroundImage: `url("${asset(path)}")` })

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const mediaRootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mediaRoot = mediaRootRef.current
    if (!mediaRoot) return

    const videos = Array.from(mediaRoot.querySelectorAll('video'))
    const adventureSection = mediaRoot.querySelector<HTMLElement>('#life')
    const adventureVideos = videos.filter(video => video.closest('#life') && !video.classList.contains('adventure-background-video'))
    const otherVideos = videos.filter(video => !adventureVideos.includes(video))
    const visibleVideos = new Set<HTMLVideoElement>()
    const activeAdventureVideos = new Set<HTMLVideoElement>()
    let adventureSectionVisible = false
    let adventureFrame = 0

    const startVideo = (video: HTMLVideoElement) => {
      video.defaultMuted = true
      video.muted = true
      void video.play().catch(() => undefined)
    }

    const handleReady = (event: Event) => {
      const video = event.currentTarget as HTMLVideoElement
      if (adventureVideos.includes(video) ? activeAdventureVideos.has(video) : visibleVideos.has(video)) startVideo(video)
    }

    const keepAdventurePlaying = (event: Event) => {
      const video = event.currentTarget as HTMLVideoElement
      if (!activeAdventureVideos.has(video) || document.visibilityState !== 'visible') return
      window.setTimeout(() => startVideo(video), 0)
    }

    const syncAdventurePlayback = () => {
      adventureFrame = 0
      activeAdventureVideos.clear()
      if (!adventureSectionVisible || document.visibilityState !== 'visible') {
        adventureVideos.forEach(video => video.pause())
        return
      }

      const visible = adventureVideos
        .map(video => ({ video, rect: video.getBoundingClientRect() }))
        .filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight)

      if (!visible.length) return
      const viewportCenter = window.innerHeight / 2
      const activeRowTop = visible.reduce((best, item) => {
        const itemDistance = Math.abs((item.rect.top + item.rect.bottom) / 2 - viewportCenter)
        const bestDistance = Math.abs((best.rect.top + best.rect.bottom) / 2 - viewportCenter)
        return itemDistance < bestDistance ? item : best
      }).rect.top

      adventureVideos.forEach(video => {
        const active = Math.abs(video.getBoundingClientRect().top - activeRowTop) < 40
        if (active) {
          activeAdventureVideos.add(video)
          startVideo(video)
        } else {
          video.pause()
        }
      })
    }

    const scheduleAdventurePlayback = () => {
      if (adventureFrame) return
      adventureFrame = window.requestAnimationFrame(syncAdventurePlayback)
    }

    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement
        if (entry.isIntersecting) {
          visibleVideos.add(video)
          startVideo(video)
        } else {
          visibleVideos.delete(video)
          video.pause()
        }
      })
    }, { threshold: 0.1, rootMargin: '150px 0px' })

    const adventureObserver = new IntersectionObserver(([entry]) => {
      adventureSectionVisible = entry.isIntersecting
      scheduleAdventurePlayback()
    }, { threshold: 0 })

    const resumeVisibleVideos = () => {
      if (document.visibilityState !== 'visible') return
      scheduleAdventurePlayback()
      visibleVideos.forEach(startVideo)
    }

    videos.forEach(video => {
      video.addEventListener('canplay', handleReady)
      video.addEventListener('loadeddata', handleReady)
    })
    adventureVideos.forEach(video => {
      video.addEventListener('pause', keepAdventurePlaying)
      video.addEventListener('ended', keepAdventurePlaying)
    })
    otherVideos.forEach(video => videoObserver.observe(video))
    if (adventureSection) adventureObserver.observe(adventureSection)
    window.addEventListener('scroll', scheduleAdventurePlayback, { passive: true })
    window.addEventListener('resize', scheduleAdventurePlayback)
    document.addEventListener('visibilitychange', resumeVisibleVideos)

    return () => {
      videoObserver.disconnect()
      adventureObserver.disconnect()
      if (adventureFrame) window.cancelAnimationFrame(adventureFrame)
      window.removeEventListener('scroll', scheduleAdventurePlayback)
      window.removeEventListener('resize', scheduleAdventurePlayback)
      document.removeEventListener('visibilitychange', resumeVisibleVideos)
      adventureSectionVisible = false
      activeAdventureVideos.clear()
      adventureVideos.forEach(video => {
        video.removeEventListener('pause', keepAdventurePlaying)
        video.removeEventListener('ended', keepAdventurePlaying)
      })
      videos.forEach(video => {
        video.removeEventListener('canplay', handleReady)
        video.removeEventListener('loadeddata', handleReady)
        video.pause()
      })
      visibleVideos.clear()
    }
  }, [])

  const playVisibleAdventures = () => {
    const videos = Array.from(mediaRootRef.current?.querySelectorAll<HTMLVideoElement>('#life .adventure-reels video') ?? [])
    const visible = videos
      .map(video => ({ video, rect: video.getBoundingClientRect() }))
      .filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight)
    if (!visible.length) return

    const viewportCenter = window.innerHeight / 2
    const activeRowTop = visible.reduce((best, item) => {
      const itemDistance = Math.abs((item.rect.top + item.rect.bottom) / 2 - viewportCenter)
      const bestDistance = Math.abs((best.rect.top + best.rect.bottom) / 2 - viewportCenter)
      return itemDistance < bestDistance ? item : best
    }).rect.top

    visible.forEach(({ video, rect }) => {
      if (Math.abs(rect.top - activeRowTop) >= 40) return
      video.defaultMuted = true
      video.muted = true
      void video.play().catch(() => undefined)
    })
  }

  return <div ref={mediaRootRef} className="wix-replica">
    <header className="wix-nav">
      <a className="wix-logo" href="#home">JT</a>
      <button className="wix-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
      <nav className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>
        <a href="#about">About</a><a href="#skills">Skills</a><a href="#publications">Publications</a>
        <a href="#experience">Experience</a><a href="#life">Life</a><a href="#contact">Contact</a>
      </nav>
    </header>
    <main>
      <section id="home" className="photo-panel hero-panel">
        <img className="hero-background-image" src={asset('media/images/adventure-motorcycle.jpg')} alt="" aria-hidden="true"/>
        <div className="hero-note"><span>Highly motivated individual aiming to achieve high career growth through continuous learning and utilizing my skills to progress professionally and personally.</span></div>
        <img className="hero-nasa-logo" src={asset('media/images/nasa-logo-wix.png')} alt="NASA"/>
        <div className="hero-name">
          <span>HI! I'M</span>
          <h1>JAGRATI<br/>TALREJA</h1>
          <p>
            <span>Ph.D. (Data Science &amp; Machine Learning)</span>
            <span>Artificial Intelligence &amp; Deep Learning Engineer</span>
            <span>Geospatial Data Analyst</span>
          </p>
        </div>
        <a className="scroll-cue" href="#about">Scroll ↓</a>
      </section>

      <section id="about" className="light-panel compact-about">
        <p className="kicker">ABOUT</p><h2>Dr. Jagrati Talreja</h2><p>{profile.statement}</p>
        <div className="quick-links"><a href={asset(profile.documents.resume)} target="_blank">Résumé</a><a href={asset(profile.documents.cv)} target="_blank">Curriculum Vitae</a></div>
      </section>

      <section id="skills" className="photo-panel skills-panel" style={background('media/images/black-jacket-portrait.webp')}>
        <div className="section-card skills-card"><p className="kicker">PROFESSIONAL</p><h2>SKILLS</h2>
          <div className="skill-lines">{skillGroups.slice(0, 7).map((group, i) => <div key={group.name}><span>{group.name}</span><i style={{width:`${92-i*4}%`}} /></div>)}</div>
          <div className="skills-details">
            <section><h3>ACHIEVEMENTS</h3><ul>
              <li>GRE 304 (2020)</li>
              <li>IELTS 6.5 (2019)</li>
              <li>Gold Medal for Excellence in Institutional Academia (2017)</li>
              <li>JEE MAINS Qualified (2015)</li>
            </ul></section>
            <section><h3>RESEARCH INTEREST</h3><ul>
              <li>Geospatial Data Analysis &amp; Remote Sensing</li>
              <li>Artificial Intelligence</li>
              <li>Deep Learning</li>
              <li>Machine Learning</li>
              <li>Data Science</li>
              <li>Digital Image/Video Processing</li>
              <li>Satellite Imaging</li>
              <li>Computer Vision</li>
              <li>Applied Mathematics</li>
              <li>Robotics</li>
              <li>Ethical Hacking</li>
            </ul></section>
          </div>
        </div>
      </section>

      <section id="publications" className="dark-photo-panel research-panel" style={background('media/images/geoweek-background.jpeg')}>
        <div className="research-heading"><h2>RESEARCH</h2></div>
        <div className="paper-sheet">
          <div className="patent-strip patent-first"><div className="research-section-title"><h2>PATENTS</h2><img src={asset('media/images/patent-icon.png')} alt="Patented seal"/></div>{patents.map(p => <div key={p.id}><b>{p.title}</b><span>{p.number}</span></div>)}</div>
          <div className="research-section-title"><h2>PUBLICATIONS</h2><img src={asset('media/images/publication-icon.png')} alt="Published research papers"/></div>
          <div className="paper-list">{publications.filter(pub => pub.status !== 'under-review').map(pub => <article key={pub.id}><span>{pub.year}</span><div><h3>{pub.title}</h3><p>{pub.venue}</p></div>{pub.doi ? <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer">DOI</a> : <em>{pub.status}</em>}</article>)}</div>
          <section className="scholarship-strip">
            <div className="research-section-title"><h2>SCHOLARSHIPS</h2><img src={asset('media/images/scholarship-icon.png')} alt="Scholarship"/></div>
            <ul>
              <li>Receiving a grant from NASA and NSF for research on deep learning-based remote sensing applications.</li>
              <li>Received the highest five-year Ph.D. scholarship at Chulalongkorn University, Bangkok, Thailand: The Second Century Fund (C2F), High Efficiency Ph.D. Student, 1st Batch 2019.</li>
              <li>Awarded the Overseas Research Experience Scholarship for Graduate Students, Fiscal Year 2024.</li>
              <li>Honoured with the 90th Anniversary of Chulalongkorn University Scholarship under the Ratchadapisek Somphot Endowment Fund, receiving a Lenovo Legion 7i Gen 7 (16&quot;, 2023) and iPad Air 6 (2024).</li>
              <li>Awarded a State Government scholarship with 65% tuition-fee support for maintaining 80% in undergraduate studies.</li>
            </ul>
          </section>
        </div>
      </section>

      <section id="experience" className="timeline-panel">
        <div className="timeline-title"><p className="kicker">CAREER & ACADEMICS</p><h2>EDUCATION<br/>& EXPERIENCE</h2></div>
        <div className="timeline-groups">
          <section className="timeline-group"><h3>WORK EXPERIENCE</h3><div className="timeline-list">
            {experience.map(role => <article key={role.id}><time>{role.period}</time><div><h3>{role.title}</h3><h4>{role.org}</h4><p>{role.scope}</p></div></article>)}
          </div></section>
          <section className="timeline-group"><h3>EDUCATION</h3><div className="timeline-list">
            {education.map(degree => <article key={degree.id}><time>{degree.period}</time><div><h3>{degree.qualification}</h3><h4>{degree.institution}</h4><p>{degree.detail}</p></div></article>)}
          </div></section>
        </div>
      </section>

      <section className="photo-panel credentials-panel" style={background('media/images/certificates-milestones-background.jpg')}>
        <p className="kicker">ACHIEVEMENTS</p><h2>CERTIFICATES & MILESTONES</h2>
        <div className="certificate-gallery">
          {[
            ['certificates/ieee-cass.webp', 'IEEE CASS Day 2022 Thailand Chapter certificate'],
            ['certificates/python-video-analytics.webp', 'Python Programming for Video Analytics workshop certificate'],
            ['certificates/ethical-hacking.webp', 'Ethical Hacking Workshop certificate'],
            ['certificates/academic-excellence.webp', 'Academic Excellence certificate'],
            ['certificates/cyber-security.webp', 'Cyber Security Awareness Program certificate'],
            ['certificates/rc-aircraft-design.webp', 'RC Aircraft Design training certificate'],
          ].map(([src, alt]) => <a key={src} href={asset(`media/images/${src}`)} target="_blank" rel="noreferrer"><img src={asset(`media/images/${src}`)} alt={alt} loading="lazy"/></a>)}
        </div>
      </section>

      <section id="life" className="black-panel adventure-panel">
        <video className="adventure-background-video" autoPlay muted loop playsInline preload="auto" poster={asset('media/images/aurora-background-poster.webp')} aria-hidden="true" tabIndex={-1}>
          <source src={asset('media/videos/adventures/aurora-background.webm')} type="video/webm"/>
        </video>
        <div className="adventure-content">
        <p className="aurora-side-note aurora-side-note-left">🌌 I have seen Aurora with my own eyes</p>
        <p className="aurora-side-note aurora-side-note-right" aria-hidden="true">I have seen Aurora with my own eyes 🌌</p>
        <p className="kicker">BEYOND RESEARCH</p><h2>INTERESTS & ADVENTURES</h2>
        <button className="adventure-play" type="button" onClick={playVisibleAdventures}>▶ Play visible videos</button>
        <div className="adventure-reels">
          {[
            ['01-skydiving-v2.mp4', 'Skydiving'],
            ['02-driving-v2.mp4', 'Driving'],
            ['03-bowling-v2.mp4', 'Bowling'],
            ['04-swimming-v2.mp4', 'Swimming'],
            ['05-workout-v2.mp4', 'Workout'],
            ['06-biking-v2.mp4', 'Biking'],
            ['07-jetski-v2.mp4', 'Jet Ski'],
            ['08-parasailing-v2.mp4', 'Parasailing'],
            ['09-rubiks-cube-v2.mp4', "Rubik's Cube"],
          ].map(([src, title]) => <figure key={src}>
            <video autoPlay muted loop playsInline preload="metadata" controls controlsList="nodownload noplaybackrate" aria-label={title}><source src={asset(`media/videos/adventures/${src}`)} type="video/mp4"/></video>
            <figcaption>{title}</figcaption>
          </figure>)}
        </div>
        </div>
      </section>

      <section className="moments-panel">
        <video className="moments-background-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1}>
          <source src={asset('media/videos/moments-background.mp4')} type="video/mp4"/>
        </video>
        <div className="moments-content"><p className="kicker">MOMENTS</p><h2>RESEARCH · COMMUNITY · TRAVEL</h2>
        <div className="wix-moments-grid">
          {momentsSequence.map(item => <figure key={item.src} className={item.layout}>
            {item.type === 'video' ?
              <video autoPlay muted loop playsInline preload="metadata" poster={asset(item.poster!)} aria-label={item.alt}><source src={asset(item.src)} type="video/mp4"/></video> :
              <img src={asset(item.src)} alt={item.alt} loading="lazy"/>
            }
          </figure>)}
        </div>
        </div>
      </section>

      <section id="contact" className="contact-panel"><div><p className="kicker">CONTACT</p><h2>Let’s connect.</h2><p>Greensboro, North Carolina</p><a href={`mailto:${profile.links.email}`}>{profile.links.email}</a></div>
        <div className="contact-links"><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.links.wix} target="_blank" rel="noreferrer">Wix Portfolio</a><a href={asset(profile.documents.resume)} target="_blank" rel="noreferrer">Resume</a><a href={asset(profile.documents.cv)} target="_blank" rel="noreferrer">CV</a></div>
      </section>
    </main>
  </div>
}
