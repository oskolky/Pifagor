import { useState } from "react";
import './App.css';
import './index.css'
import { Logo } from './components/Logo';
import mainImg from './assets/main_page/main_statue.png';
import waveImg from './assets/wave_bottom.svg';
import waveBottomImg from "./assets/wave_bottom.svg"
import mathIcon from './assets/main_page/cards/math.png';
import physicsIcon from './assets/main_page/cards/physics.png';
import englishIcon from './assets/main_page/cards/english.png';
import chemistryIcon from './assets/main_page/cards/chem.png';
import arrowIcon from "./assets/main_page/cards/arrow.png";
import icon1 from "./assets/main_page/price/check.png";
import icon2 from "./assets/main_page/price/check2.png";
import icon3 from "./assets/main_page/price/time.png";
import icon4 from "./assets/main_page/price/assess.png";
import tg from "./assets/tg.png";
import vb from "./assets/vb.png";
import inst from "./assets/inst.png";

import SubjectPage, { type SubjectKey } from './SubjectPage';

const SUBJECTS = [
  {
    title: "Математика",
    className: "card-math",
    icon: mathIcon,
    desc: "Разбор сложных тем, уравнений и подготовка к экзаменам",
    subjectKey: "math" as SubjectKey,
  },
  {
    title: "Физика",
    className: "card-physics",
    icon: physicsIcon,
    desc: "Понимание формул, решение задач и подготовка к тестам",
    subjectKey: "physics" as SubjectKey,
  },
  {
    title: "Английский язык",
    className: "card-english",
    icon: englishIcon,
    desc: "Разговорная практика, грамматика и подготовка к экзаменам",
    subjectKey: "english" as SubjectKey,
  },
  {
    title: "Химия",
    className: "card-chemistry",
    icon: chemistryIcon,
    desc: "Изучение реакций, разбор теории и помощь с задачами",
    subjectKey: "chemistry" as SubjectKey,
  },
];

const PRICING_FEATURES = [
  { text: "Индивидуальные занятия",    icon: icon1 },
  { text: "Контроль прогресса",        icon: icon4 },
  { text: "Гибкое расписание",         icon: icon3 },
  { text: "Профессиональные репетиторы", icon: icon2 },
];

const REVIEWS = [
  {
    name: "Ольга",
    role: "Мама ученика",
    rating: 5,
    text: "Сын занимался физикой в Пифагоре, очень доволен. Оценки подтянулись, сдал экзамен отлично.",
  },
  {
    name: "Оксана Р.",
    role: "Ученица",
    rating: 5,
    text: "Занималась математикой перед ЦТ. Репетитор объяснял очень понятно, всё разобрали по полочкам.",
  },
  {
    name: "Татьяна К.",
    role: "Мама ученицы",
    rating: 5,
    text: "Спасибо школе Пифагор за отличную организацию. Результат превзошёл ожидания.",
  },
  {
    name: "Игорь",
    role: "Ученик",
    rating: 5,
    text: "Готовился здесь к ЦЭ по физике. Атмосфера крутая, преподаватели не грузят лишней теорией, дают только то, что реально будет на тесте.",
  },
  {
    name: "Елена Викторовна",
    role: "Мама одиннадцатиклассника",
    rating: 5,
    text: "Долго искали хорошего репетитора по математике. В Пифагоре нашли индивидуальный подход. Сын перестал бояться сложных задач и сдал экзамен на высокий балл.",
  },
  {
    name: "Максим",
    role: "Ученик",
    rating: 5,
    text: "Занимался онлайн. Сначала сомневался в таком формате, но интерактивная доска и разборы домашних заданий оказались даже удобнее обычных уроков.",
  },
  {
    name: "Наталья",
    role: "Мама выпускницы",
    rating: 5,
    text: "Благодарны всей команде центра! Дочка подтянула средний балл в школе и поступила на бюджет, куда и планировала. Рекомендую однозначно.",
  },
];

const NAV_MAIN      = ["Предметы", "Репетиторы", "Цены"];
const NAV_SECONDARY = ["Отзывы", "Личный кабинет", "О нас"];

export function WaveDivider({ variant }) {
  const src = variant === 'banner' ? waveImg : waveBottomImg;
  return (
    <div className={`wave-divider wave-divider--${variant}`} aria-hidden="true">
      <img src={src} alt="" />
    </div>
  );
}

function Stars({ count = 5 }) {
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

export default function PifagorHome() {
  const [name,    setName]    = useState("");
  const [phone,   setPhone]   = useState("");
  const [subject, setSubject] = useState("");
  const [isOpen,  setIsOpen]  = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [activePage,   setActivePage]   = useState<SubjectKey | null>(null);

  if (activePage) {
    return (
      <SubjectPage
        subject={activePage}
        onBack={() => {
          setActivePage(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  return (
    <div className="app">

      <header className="header">
        <a href="#" className="header-logo-link">
          <Logo />
        </a>

        <nav className="header-nav-main">

          <div className="header-dropdown">

  <a
    href="#"
    className="text-h3"
    onClick={(e) => {
      e.preventDefault();
      setSubjectsOpen(!subjectsOpen);
    }}
  >
    Предметы
  </a>

  {subjectsOpen && (
    <div className="header-dropdown-menu">
      {SUBJECTS.map(subject => (
        <a
          key={subject.title}
          href="#"
          className="header-dropdown-item"
          onClick={(e) => { e.preventDefault(); setSubjectsOpen(false); setActivePage(subject.subjectKey); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          {subject.title}
        </a>
      ))}
    </div>
  )}

</div>

          <a href="#" className="text-h3">Репетиторы</a>
          <a href="#" className="text-h3">Цены</a>

        </nav>

        <div className="header-right">
          <nav className="header-nav-secondary">
            {NAV_SECONDARY.map(l => (
              <a key={l} href="#" className="text-h3">{l}</a>
            ))}
          </nav>
          <a href="tel:+375447933870" className="header-phone text-h3">+375 44 793 38 70</a>
        </div>
      </header>

      <section className="banner">
        <div className="banner-inner">
          <div className="banner-content">
            <h1 className="banner-title text-display-unbounded">
              Репетиторы для<br />
              <span>5-11 классов</span>
            </h1>
            <p className="banner-subtitle text-h1-futura">
              Поможем подтянуть оценки, подготовиться к ЦЭ и ЦТ,<br />
              разобраться в сложных темах
            </p>
          </div>

          <img src={mainImg} alt="" className="banner-image" />
        </div>

        <form className="banner-form" onSubmit={e => e.preventDefault()}>
          <div className="banner-form-info">
            <div className="banner-form-small">Не уверены в знаниях?</div>
            <div className="banner-form-big">Запишитесь на пробное!</div>
          </div>

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

          <div className="select-wrapper">
            <div
              className={`select-trigger ${!subject ? "placeholder" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{subject || "Предмет"}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`select-arrow-icon ${isOpen ? "is-open" : ""}`}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {isOpen && (
              <div className="select-dropdown">
                {SUBJECTS.map(s => (
                  <div
                    key={s.title}
                    className={`select-option ${subject === s.title ? "selected" : ""}`}
                    onClick={() => { setSubject(s.title); setIsOpen(false); }}
                  >
                    {s.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="banner-form-btn">
            Записаться
          </button>
        </form>
      </section>

      <WaveDivider variant="banner" />

      <div className="container" style={{ paddingTop: 32 }}>
        <h2 className="section-title text-h1-unbounded" style={{ marginBottom: "40px" }}>Чему научим?</h2>
      </div>

      <div className="cards container">
        {SUBJECTS.map(s => (
          <div className={`card ${s.className}`} key={s.title}>
            <div className="card-body">
              <div className="card-text">
                <h3 className="text-h1-futura">{s.title}</h3>
                <p className="text-body-lg card-desc">{s.desc}</p>
              </div>
              <img src={s.icon} alt="" className="card-icon" />
            </div>
            <button onClick={() => { setActivePage(s.subjectKey); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              Узнать больше
              <img src={arrowIcon} alt="Стрелка" className="button-arrow" />
            </button>
          </div>
        ))}
      </div>

      <div className="container">
        <h2 className="section-title section-title--compact text-h1-unbounded" style={{ marginBottom: -40, paddingTop: 40 }}>Цены</h2>
      </div>

      <div className="price-section container">
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
              <button type="button" className="price-btn price-btn--primary">Оставить заявку</button>
              <button type="button" className="price-btn price-btn--outline">Хочу дешевле!</button>
            </div>
          </div>

          <div className="price-right">
            <div className="price-right-inner">
              <Logo variant="footer" />
              <div className="price-right-tagline text-h1-futura">
                Понимай, за<br />что платишь.
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewsSlider reviewsData={REVIEWS} StarsComponent={Stars} />

      <WaveDivider variant="footer" />

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
              <p className="footer-link">Предметы</p>
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
                  <div className="social-icon instagram">
                    <img src={inst} alt="Instagram" />
                  </div>
                  <div className="social-icon telegram">
                    <img src={tg} alt="Telegram" />
                  </div>
                  <div className="social-icon viber">
                    <img src={vb} alt="Viber" />
                  </div>
                </div>

                <p className="footer-email">pifagor@gmail.com</p>
              </div>
            </div>

          </div>
        </footer>
      </div>

    </div>
  );
}


export function ReviewsSlider({ reviewsData, StarsComponent }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < reviewsData.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="reviews container" style={{ overflow: "hidden" }}>
      <div className="reviews-header">
        <h2 className="text-h1-unbounded">Отзывы наших клиентов</h2>

        <div className="slider-controls">
          <button
            type="button"
            onClick={handlePrev}
            className={`slider-btn ${currentIndex === 0 ? "disabled" : ""}`}
            disabled={currentIndex === 0}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className={`slider-btn active ${currentIndex === reviewsData.length - 1 ? "disabled" : ""}`}
            disabled={currentIndex === reviewsData.length - 1}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="slider-viewport">
        <div
          className="review-list"
          style={{ transform: `translateX(-${currentIndex * 364}px)` }}
        >
          {reviewsData.map(r => (
            <div className="review" key={r.name}>
              <div className="review-author">
                <div className="review-avatar text-body-lg">{r.name[0]}</div>
                <div>
                  <div className="review-name text-body">{r.name}</div>
                  <div className="review-role">{r.role}</div>
                </div>
              </div>
              <StarsComponent count={r.rating} />
              <p className="text-body">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
