import type { CSSProperties } from "react";
import { publications } from "./data/publications";
import { experience } from "./data/experience";
import { adventures, researchLife } from "./data/portfolio";
import { profile } from "./data/profile";
import { asset } from "./lib/asset";
import "./wix-replica.css";

const bg = (src: string) =>
  ({ "--bg": `url("${asset(src)}")` }) as CSSProperties;
const skills = [
  ["Machine Learning", 92],
  ["Deep Learning", 90],
  ["Computer Vision", 88],
  ["Python / MATLAB", 86],
  ["Image Processing", 84],
  ["Data Science", 82],
  ["Research", 94],
  ["Teaching", 80],
] as const;
const hobbyLabels = [
  "Skydiving",
  "Hiking",
  "Workout",
  "Bowling",
  "Driving",
  "Swimming",
  "Riding Bike",
  "Jet Ski",
  "Parasailing",
  "Rubik’s Cube",
];

export default function App() {
  return (
    <div className="wix-copy">
      <header className="topline">
        <a href="#home" className="mark">
          JAGRATI TALREJA
        </a>
        <nav>
          <a href="#skills">ABOUT</a>
          <a href="#portfolio">PORTFOLIO</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#hobbies">HOBBIES</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>
      <main>
        <section
          id="home"
          className="scene hero"
          style={bg("media/images/adventure-motorcycle.webp")}
        >
          <p className="black-ribbon">
            “Highly motivated individual aiming to achieve high career growth
            through continuous learning and personally contribute to the growth
            of the organization.”
          </p>
          <div className="hero-copy">
            <span className="nasa">NASA</span>
            <h1>
              HI! I’M
              <br />
              JAGRATI
              <br />
              TALREJA
            </h1>
            <div className="rule" />
            <p>
              AI / MACHINE LEARNING RESEARCHER
              <br />
              COMPUTER VISION · REMOTE SENSING
              <br />
              DATA SCIENCE
            </p>
          </div>
        </section>
        <section
          id="skills"
          className="scene portrait"
          style={bg("media/images/portrait-editorial.webp")}
        >
          <div className="skills-copy">
            <h2>PROFESSIONAL</h2>
            <span>SKILLS</span>
            {skills.map(([name, amount]) => (
              <div className="skill" key={name}>
                <small>{name}</small>
                <i>
                  <b style={{ width: `${amount}%` }} />
                </i>
              </div>
            ))}
          </div>
          <div className="mini-columns">
            <div>
              <h3>ACHIEVEMENTS</h3>
              <p>
                Gold Medalist
                <br />
                C2F Scholarship
                <br />
                Research Scholarships
                <br />
                Academic Excellence
              </p>
            </div>
            <div>
              <h3>RESEARCH INTERESTS</h3>
              <p>
                Artificial Intelligence
                <br />
                Deep Learning
                <br />
                Computer Vision
                <br />
                Remote Sensing
                <br />
                Image Super-Resolution
              </p>
            </div>
          </div>
        </section>
        <section id="portfolio" className="publication-stage">
          <div className="portfolio-heading">
            <h2>PORTFOLIO</h2>
            <p>PUBLICATIONS AND PATENTS</p>
          </div>
          <div className="publication-paper">
            <h3>PUBLISHED / ACCEPTED ARTICLES</h3>
            <ol>
              {publications.map((p) => (
                <li key={p.id}>
                  <b>{p.title}</b>
                  <span>
                    {p.venue}
                    {p.year ? ` · ${p.year}` : ""}
                  </span>
                </li>
              ))}
            </ol>
            <h3>ARTICLES UNDER REVIEW</h3>
            <p className="dense-copy">
              Research in multimodal remote sensing, flood mapping,
              physics-informed learning, quantum encoding and satellite image
              enhancement.
            </p>
            <h3>PATENT</h3>
            <p className="dense-copy">
              Medi-Cart: Telemetry using RFID · SafePath: Navigate to Safety
            </p>
          </div>
        </section>
        <section
          id="experience"
          className="experience-stage"
          style={bg("media/images/portrait-about.webp")}
        >
          <h2>EXPERIENCE</h2>
          <div className="experience-list">
            {experience.map((job, i) => (
              <article key={job.id}>
                <div>
                  <small>{job.org}</small>
                  <h3>{job.title.replace(/, /g, "\n").replace(" — ", "\n")}</h3>
                  <time>{job.period}</time>
                </div>
                <p>{job.scope}</p>
                <span className="vertical-index">0{i + 1}</span>
              </article>
            ))}
          </div>
        </section>
        <section
          className="certificates-stage"
          style={bg("media/images/medicart-hardware.webp")}
        >
          <h2>CERTIFICATES</h2>
          <div className="certificate-grid">
            {[
              "award.webp",
              "graduation.webp",
              "chula-poster.webp",
              "talk-superres.webp",
              "talk-podium.webp",
              "gisday-booth.webp",
            ].map((x, i) => (
              <figure key={x}>
                <img
                  src={asset(`media/images/${x}`)}
                  alt="Certificate and academic milestone"
                />
                <figcaption>
                  {
                    [
                      "ACADEMIC EXCELLENCE",
                      "DOCTORAL DEGREE",
                      "RESEARCH UNIT",
                      "CONFERENCE",
                      "PRESENTATION",
                      "RECOGNITION",
                    ][i]
                  }
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section id="hobbies" className="hobbies-stage">
          <h2>HOBBIES</h2>
          <div className="hobby-grid">
            {[...adventures, ...adventures.slice(0, 2)].map((item, i) => (
              <figure key={`${item.id}-${i}`}>
                {item.type === "video" ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={item.poster ? asset(item.poster) : undefined}
                  >
                    <source src={asset(item.media)} type="video/mp4" />
                  </video>
                ) : (
                  <img src={asset(item.media)} alt={item.alt} />
                )}
                <figcaption>{hobbyLabels[i]}</figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="vision-stage">
          <div>
            <h2>GROW YOUR VISION</h2>
            <p>
              An experience enriched by research, innovation, leadership and a
              life beyond the laboratory.
            </p>
          </div>
          <div className="vision-images">
            <img
              src={asset("media/images/talk-igarss.webp")}
              alt="Conference presentation"
            />
            <img
              src={asset("media/images/talk-superres.webp")}
              alt="Research presentation"
            />
          </div>
        </section>
        <section className="photo-story">
          <div className="story-grid">
            {researchLife.map((frame, i) => (
              <figure key={frame.src} className={`p${i + 1}`}>
                <img src={asset(frame.src)} alt={frame.alt} />
              </figure>
            ))}
          </div>
        </section>
        <section className="closing-video">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={asset("media/posters/cv-demo.webp")}
          >
            <source src={asset("media/videos/cv-demo.mp4")} type="video/mp4" />
          </video>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={asset("media/posters/gym.webp")}
          >
            <source src={asset("media/videos/gym.mp4")} type="video/mp4" />
          </video>
        </section>
        <section
          id="contact"
          className="contact-stage"
          style={bg("media/images/hero-geoweek.webp")}
        >
          <div>
            <h2>CONTACT</h2>
            <p>{profile.location}</p>
            <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
            <p>Connect with me</p>
            <a href={profile.links.linkedin}>LinkedIn</a> ·{" "}
            <a href={profile.links.github}>GitHub</a>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <input aria-label="First name" placeholder="First Name" />
              <input aria-label="Last name" placeholder="Last Name" />
            </div>
            <input aria-label="Email" placeholder="Email" type="email" />
            <textarea aria-label="Message" placeholder="Write a message" />
            <button type="submit">SEND</button>
          </form>
        </section>
      </main>
    </div>
  );
}
