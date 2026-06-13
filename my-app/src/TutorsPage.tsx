import { useState } from "react";
import { Logo } from "./components/Logo";
import { WaveDivider, ReviewsSlider } from "./App";
import waveImg from "./assets/wave_bottom.svg";
import icon1 from "./assets/main_page/price/check.png";
import icon2 from "./assets/main_page/price/check2.png";
import icon3 from "./assets/main_page/price/time.png";
import icon4 from "./assets/main_page/price/assess.png";
import tg from "./assets/tg.png";
import vb from "./assets/vb.png";
import inst from "./assets/inst.png";
import alexeyPetrovImg from "./assets/Alexey Petrov.png";
import review1 from "./assets/reviews/review1.png";
import review2 from "./assets/reviews/review2.png";
import statueImg from "./assets/main_page/math_statue.png";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Tutor {
  name: string;
  title: string;
  image?: string;
  avatarLetter?: string;
}

interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const REVIEWS_IMAGES = [review1, review2];

const TUTORS: Tutor[] = [
  { name: "Алексей Петров",  title: "Math Diamond Coach",        image: alexeyPetrovImg },
  { name: "Алексей Петров",  title: "Math Diamond Coach",        image: alexeyPetrovImg },
  { name: "Алексей Петров",  title: "Math Diamond Coach. 10 стобалльников. Учится в БГУ.", image: alexeyPetrovImg },
];

const REVIEWS: Review[] = [
  { name: "Елена В.",  role: "Мама одиннадцатиклассника", rating: 5, text: "Долго искали хорошего репетитора по математике. В Пифагоре нашли индивидуальный подход. Сын перестал бояться сложных задач и сдал экзамен на высокий балл." },
  { name: "Максим",    role: "Ученик",                    rating: 5, text: "Занимался онлайн. Интерактивная доска и разборы домашних заданий оказались даже удобнее обычных уроков." },
  { name: "Ольга К.",  role: "Мама ученика",              rating: 5, text: "Сын занимался в Пифагоре, очень доволен. Оценки подтянулись, сдал экзамен отлично." },
  { name: "Оксана Р.", role: "Ученица",                   rating: 5, text: "Занималась математикой перед ЦТ. Репетитор объяснял очень понятно, всё разобрали по полочкам." },
];

const FAQS: FAQ[] = [
  { question: "How long is a lesson?",       answer: "A standard lesson lasts 60 minutes, though we can offer up to 45 or 90 minutes depending on the student's immediate goals and pace." },
  { question: "Do I need my own material?",  answer: "We provide comprehensive digital worksheets and resources sets. All you need to enable is a tablet." },
  { question: "Can I change my tutor?",      answer: "You are always welcome to switch. If you find a better match, just contact our team and we'll help you find the perfect fit, no fee." },
];

const PRICING_FEATURES = [
  { text: "Индивидуальные занятия",      icon: icon1 },
  { text: "Контроль прогресса",          icon: icon4 },
  { text: "Гибкое расписание",           icon: icon3 },
  { text: "Профессиональные репетиторы", icon: icon2 },
];

const NAV_MAIN      = ["Предметы", "Репетиторы", "Цены"];
const NAV_SECONDARY = ["Отзывы", "Личный кабинет", "О нас"];

// ─── Helper components ────────────────────────────────────────────────────────

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="#F5A623">
          <polygon points="6.5,1 8,5 12.5,5 9,8 10.5,12.5 6.5,9.5 2.5,12.5 4,8 0.5,5 5,5" />
        </svg>
      ))}
    </div>
  );
}

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="tutors-page-card">
      <div className="tutors-page-card__photo">
        <img
          src={tutor.image || alexeyPetrovImg}
          alt={tutor.name}
        />
      </div>
      <div className="tutors-page-card__name text-h2">{tutor.name}</div>
      <div className="tutors-page-card__title text-h3">{tutor.title}</div>
    </div>
  );
}

function FaqItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        type="button"
        className="faq-question"
        onClick={() => setOpen(!open)}
      >
        <span>{faq.question}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`faq-icon${open ? " faq-icon--open" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="faq-answer text-h3">{faq.answer}</div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface TutorsPageProps {
  onBack: () => void;
}

export default function TutorsPage({ onBack }: TutorsPageProps) {
  const [name,          setName]          = useState("");
  const [phone,         setPhone]         = useState("");
  const [subjectsOpen,  setSubjectsOpen]  = useState(false);

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="header">
        <a href="#" className="header-logo-link" onClick={(e) => { e.preventDefault(); onBack(); }}>
          <Logo />
        </a>
        <nav className="header-nav-main">
          <div className="header-dropdown">
            <a
              href="#"
              className="text-h3"
              onClick={(e) => { e.preventDefault(); setSubjectsOpen(!subjectsOpen); }}
            >
              Предметы
            </a>
            {subjectsOpen && (
              <div className="header-dropdown-menu">
                {["Математика", "Физика", "Английский язык", "Химия"].map(s => (
                  <a key={s} href="#" className="header-dropdown-item">{s}</a>
                ))}
              </div>
            )}
          </div>
          {NAV_MAIN.slice(1).map(l => (
            <a key={l} href={l === "Цены" ? "#prices" : "#"} className="text-h3">{l}</a>
          ))}
        </nav>
        <div className="header-right">
          <nav className="header-nav-secondary">
            {NAV_SECONDARY.map(l => (
              <a
                key={l}
                href={l === "Отзывы" ? "#reviews" : l === "О нас" ? "#about" : "#"}
                className="text-h3"
              >
                {l}
              </a>
            ))}
          </nav>
          <a href="tel:+375447933870" className="header-phone text-h3">+375 44 793 38 70</a>
        </div>
      </header>

      {/* ── Banner ── */}
      <section
        className="banner tutors-page-banner"
        style={{
          backgroundImage: `radial-gradient(circle at 100% 100%, #FFFFFF 0%, #AEE3F1 15%, #40A8C5 50%, #153E61 95%, #0D2942 100%)`,
        }}
      >
        <div className="banner-inner">
          <div className="banner-content">
            <h1 className="banner-title text-display-unbounded" style={{ paddingTop: 60 }}>
              Репетиторы
            </h1>
            <p className="banner-subtitle text-h1-futura" style={{ paddingTop: 20 }}>
              Unlock your potential in<br />algebra, geometry, and calculus.
            </p>
          </div>
          <img
            src={statueImg}
            alt=""
            className="banner-image banner-image--subject"
            style={{ bottom: -260, width: "min(460px, 40vw)", right: -70 }}
          />
        </div>

        {/* Форма */}
        <form className="tutors-page-banner-form" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Имя родителя"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Номер телефона"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <button type="submit" className="banner-form-btn" style={{ background: "#1D809F" }}>
            Записаться на пробное
          </button>
        </form>
      </section>

      <div className="wave-divider wave-divider--banner" aria-hidden="true">
        <img src={waveImg} alt="" />
      </div>

      {/* ── Tutors grid ── */}
      <div className="container" style={{ paddingTop: 100 }}>
        <div className="tutors-page-header">
          <h2 className="section-title text-h1-unbounded">Наши репетиторы</h2>
          <button type="button" className="tutors-page-filter-btn text-h3">
            Фильтровать ▾
          </button>
        </div>

        <div className="tutors-page-grid">
          {TUTORS.map((t, i) => (
            <TutorCard key={i} tutor={t} />
          ))}
        </div>
      </div>

      {/* ── Reviews ── */}
      <div id="reviews" style={{ marginTop: 48 }}>
        <ReviewsSlider reviewsData={REVIEWS_IMAGES} StarsComponent={Stars} />
      </div>

      {/* ── Pricing ── */}
      <div className="container">
        <h2
          className="section-title section-title--compact text-h1-unbounded"
          style={{ marginBottom: -40, paddingTop: 40 }}
        >
          Цены
        </h2>
      </div>

      <div id="prices" className="price-section container">
        <div className="price-box">
          <div className="price-left">
            <h2 className="text-h1-futura">Стоимость одного занятия</h2>
            <div className="price-value text-h1-unbounded">40 BYN</div>
            <div className="price-features">
              {PRICING_FEATURES.map(f => (
                <div key={f.text} className="price-feature-item">
                  <div className="price-feature-icon">
                    <img src={f.icon} alt="" />
                  </div>
                  <span className="price-feature text-body-lg">{f.text}</span>
                </div>
              ))}
            </div>
            <div className="price-buttons">
              <button type="button" className="price-btn price-btn--primary" style={{ background: "#1D809F" }}>
                Оставить заявку
              </button>
              <button type="button" className="price-btn price-btn--outline">
                Хочу дешевле!
              </button>
            </div>
          </div>

          <div
            className="price-right"
            style={{
              background: `radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, #1D809F 80%, #0D2942 100%)`,
            }}
          >
            <div className="price-right-inner">
              <Logo variant="footer" />
              <div className="price-right-tagline text-h1-futura">
                Понимай, за<br />что платишь.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="container" style={{ paddingBottom: 64 }}>
        <h2 className="section-title text-h1-unbounded" style={{ marginBottom: 24 }}>
          Часто задаваемые вопросы
        </h2>
        <div className="faq-list" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </div>

      {/* ── CTA Join ── */}
      <section className="tutors-page-cta container">
        <h2 className="tutors-page-cta__title text-h1-unbounded">
          Хотите<br />присоединиться<br />в команду?
        </h2>
        <div className="tutors-page-cta__arrow">→</div>
        <div className="tutors-page-cta__right">
          <div className="tutors-page-cta__label text-h2">Делайте!</div>
          <form className="tutors-page-cta__form" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Мне интересно стать репетитором" className="tutors-page-cta__input" />
            <button type="submit" className="banner-form-btn" style={{ background: "#1D809F", minWidth: 140 }}>
              Отправить
            </button>
          </form>
        </div>
      </section>

      <WaveDivider variant="footer" />

      {/* ── Footer ── */}
      <div id="about">
        <div className="footer-wrap">
          <footer className="footer">
            <div className="container footer-grid">
              <div className="footer-info-col">
                <div className="footer-logo-box">
                  <Logo variant="footer" />
                </div>
                <p className="footer-address text-h3">
                  ООО «Пифагор Центр», УНП 193900047<br />
                  Юридический адрес: 220019 г. Минск,<br />
                  ул. Сухаревская, д. 16<br />
                  Свидетельство регистрации от 20.08.2025,<br />
                  выдано Минским горисполкомом<br />
                  Режим работы: пн–пт 10:00–20:00
                </p>
              </div>
              <div className="footer-menu-col">
                <p className="footer-link" onClick={onBack} style={{ cursor: "pointer" }}>Предметы</p>
                <p className="footer-link">Репетиторы</p>
                <p className="footer-link">Цены</p>
                <p className="footer-link">Отзывы</p>
                <p className="footer-link">Личный кабинет</p>
                <p className="footer-link">О нас</p>
              </div>
              <div className="footer-actions-col">
                <button type="button" className="footer-cta-btn">
                  Присоединиться к занятиям
                </button>
                <div className="footer-social-box">
                  <p className="footer-social-title">Хочешь узнать больше?<br />Напиши нам!</p>
                  <div className="footer-social-icons">
                    <div className="social-icon instagram"><img src={inst} alt="Instagram" /></div>
                    <div className="social-icon telegram"><img src={tg} alt="Telegram" /></div>
                    <div className="social-icon viber"><img src={vb} alt="Viber" /></div>
                  </div>
                  <p className="footer-email">pifagor@gmail.com</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

    </div>
  );
}
