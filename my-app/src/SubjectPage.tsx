import { useState } from "react";
import { Logo } from './components/Logo';
import { WaveDivider, ReviewsSlider } from './App';
import waveImg from './assets/wave_bottom.svg';
import icon1 from "./assets/main_page/price/check.png";
import icon2 from "./assets/main_page/price/check2.png";
import icon3 from "./assets/main_page/price/time.png";
import icon4 from "./assets/main_page/price/assess.png";
import tg from "./assets/tg.png";
import vb from "./assets/vb.png";
import inst from "./assets/inst.png";

// ─── Subject config ──────────────────────────────────────────────────────────

export type SubjectKey = "math" | "physics" | "english" | "chemistry";

interface SubjectConfig {
  title: string;
  subtitle: string;
  accentColor: string;       // button / highlight colour
  bgGradient: string;        // full banner background
  bannerImage: string;       // statue / mascot image path
  badgeText?: string;        // optional corner badge on banner image
  tutors: Tutor[];
  reviews: Review[];
  faqs: FAQ[];
}

interface Tutor {
  name: string;
  title: string;
  avatarLetter: string;
  avatarColor: string;
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

const PRICING_FEATURES = [
  { text: "Индивидуальные занятия",      icon: icon1 },
  { text: "Контроль прогресса",          icon: icon4 },
  { text: "Гибкое расписание",           icon: icon3 },
  { text: "Профессиональные репетиторы", icon: icon2 },
];

const NAV_MAIN      = ["Предметы", "Репетиторы", "Цены"];
const NAV_SECONDARY = ["Отзывы", "Личный кабинет", "О нас"];

// ─── Per-subject data ─────────────────────────────────────────────────────────

const SUBJECT_CONFIGS: Record<SubjectKey, SubjectConfig> = {
  math: {
    title: "Математика",
    subtitle: "Unlock your potential in algebra, geometry, and calculus.",
    accentColor: "#245985",
    bgGradient: `radial-gradient(circle at 70% 80%, rgba(255,255,255,0.25) 10%, rgba(64,168,197,0.7) 30%, rgba(36,89,133,1) 60%), url('/src/assets/main_page/formulas0.4.png')`,
    bannerImage: "/src/assets/main_page/main_statue.png",
    tutors: [
      { name: "Алексей Петров",  title: "МАП Олимп Совет",  avatarLetter: "А", avatarColor: "#245985" },
      { name: "Алексей Петров",  title: "МАП Олимп Совет",  avatarLetter: "А", avatarColor: "#245985" },
      { name: "Алексей Петров",  title: "Топ-5 Репетитор",  avatarLetter: "А", avatarColor: "#245985" },
    ],
    reviews: [
      { name: "Елена В.", role: "Мама одиннадцатиклассника", rating: 5, text: "Долго искали хорошего репетитора по математике. В Пифагоре нашли индивидуальный подход. Сын перестал бояться сложных задач и сдал экзамен на высокий балл." },
      { name: "Максим",   role: "Ученик",                    rating: 5, text: "Занимался онлайн. Интерактивная доска и разборы домашних заданий оказались даже удобнее обычных уроков." },
      { name: "Ольга К.", role: "Мама ученика",              rating: 5, text: "Сын занимался в Пифагоре, очень доволен. Оценки подтянулись, сдал экзамен отлично." },
      { name: "Оксана Р.", role: "Ученица",                  rating: 5, text: "Занималась математикой перед ЦТ. Репетитор объяснял очень понятно, всё разобрали по полочкам." },
    ],
    faqs: [
      { question: "How long is a lesson?",        answer: "A standard lesson lasts 60 minutes, though we also offer extended 90-minute sessions depending on the student's needs and learning goals." },
      { question: "Do I need my own materials?",  answer: "No — all necessary study materials and worksheets are provided by your tutor. You only need a notebook and a willingness to learn." },
      { question: "Can I change my tutor?",       answer: "Yes, absolutely. If you feel the teaching style doesn't suit you perfectly, we'll match you with another specialist at no additional charge." },
    ],
  },

  english: {
    title: "Английский язык",
    subtitle: "Unlock your potential in algebra, geometry, and calculus.",
    accentColor: "#F9AB01",
    bgGradient: `radial-gradient(circle at 70% 80%, rgba(255,255,255,0.25) 10%, rgba(249,171,1,0.65) 30%, rgba(180,110,0,1) 60%), url('/src/assets/main_page/formulas0.4.png')`,
    bannerImage: "/src/assets/main_page/main_statue.png",
    badgeText: "Not open book!",
    tutors: [
      { name: "Алексей Петров",  title: "МАП Олимп Совет",  avatarLetter: "А", avatarColor: "#F9AB01" },
      { name: "Алексей Петров",  title: "МАП Олимп Совет",  avatarLetter: "А", avatarColor: "#F9AB01" },
      { name: "Алексей Петров",  title: "Топ-5 Репетитор",  avatarLetter: "А", avatarColor: "#F9AB01" },
    ],
    reviews: [
      { name: "Дарья",    role: "Ученица",         rating: 5, text: "Подготовилась к ЦЭ по английскому на отлично. Грамматика стала намного понятнее после первых же занятий." },
      { name: "Виктор",   role: "Ученик",           rating: 5, text: "Разговорная практика помогла мне не бояться говорить. Очень рекомендую этого преподавателя." },
      { name: "Наталья",  role: "Мама выпускницы",  rating: 5, text: "Дочка подтянула средний балл и поступила на бюджет. Рекомендую однозначно." },
      { name: "Игорь",    role: "Ученик",           rating: 5, text: "Готовился к международному экзамену. Структурированный подход и реальная практика — именно то, что нужно." },
    ],
    faqs: [
      { question: "How long is a lesson?",        answer: "A standard lesson lasts 60 minutes, though we also offer extended 90-minute sessions depending on the student's needs and learning goals." },
      { question: "Do I need my own materials?",  answer: "No — all necessary study materials and worksheets are provided by your tutor. You only need a notebook and a willingness to learn." },
      { question: "Can I change my tutor?",       answer: "Yes, absolutely. If you feel the teaching style doesn't suit you perfectly, we'll match you with another specialist at no additional charge." },
    ],
  },

  physics: {
    title: "Физика",
    subtitle: "Unlock your potential in algebra, geometry, and calculus.",
    accentColor: "#40A8C5",
    bgGradient: `radial-gradient(circle at 70% 80%, rgba(255,255,255,0.25) 10%, rgba(64,168,197,0.8) 30%, rgba(20,90,120,1) 60%), url('/src/assets/main_page/formulas0.4.png')`,
    bannerImage: "/src/assets/main_page/main_statue.png",
    tutors: [
      { name: "Алексей Смелый", title: "Старт Эксперт",    avatarLetter: "А", avatarColor: "#40A8C5" },
      { name: "Алексей Петров", title: "МАП Олимп Совет",  avatarLetter: "А", avatarColor: "#40A8C5" },
      { name: "Алексей Петров", title: "Топ-5 Репетитор",  avatarLetter: "А", avatarColor: "#40A8C5" },
    ],
    reviews: [
      { name: "Ольга",    role: "Мама ученика",  rating: 5, text: "Сын занимался физикой в Пифагоре, очень доволен. Оценки подтянулись, сдал экзамен отлично." },
      { name: "Игорь",    role: "Ученик",        rating: 5, text: "Готовился здесь к ЦЭ по физике. Атмосфера крутая, дают только то, что реально будет на тесте." },
      { name: "Максим",   role: "Ученик",        rating: 5, text: "Задачи по механике казались невозможными, а теперь я решаю их сам. Большое спасибо!" },
      { name: "Татьяна",  role: "Мама ученицы",  rating: 5, text: "Результат превзошёл ожидания. Спасибо школе Пифагор за отличную организацию." },
    ],
    faqs: [
      { question: "How long is a lesson?",        answer: "A standard lesson lasts 60 minutes, though we also offer extended 90-minute sessions depending on the student's needs and learning goals." },
      { question: "Do I need my own materials?",  answer: "No — all necessary study materials and worksheets are provided by your tutor. You only need a notebook and a willingness to learn." },
      { question: "Can I change my tutor?",       answer: "Yes, absolutely. If you feel the teaching style doesn't suit you perfectly, we'll match you with another specialist at no additional charge." },
    ],
  },

  chemistry: {
    title: "Химия",
    subtitle: "Unlock your potential in algebra, geometry, and calculus.",
    accentColor: "#23E2AF",
    bgGradient: `radial-gradient(circle at 70% 80%, rgba(255,255,255,0.25) 10%, rgba(35,226,175,0.7) 30%, rgba(10,130,100,1) 60%), url('/src/assets/main_page/formulas0.4.png')`,
    bannerImage: "/src/assets/main_page/main_statue.png",
    badgeText: "Химия",
    tutors: [
      { name: "Алексей Смелый", title: "Старт Эксперт",    avatarLetter: "А", avatarColor: "#23E2AF" },
      { name: "Алексей Петров", title: "МАП Олимп Совет",  avatarLetter: "А", avatarColor: "#23E2AF" },
      { name: "Алексей Петров", title: "Топ-5 Репетитор",  avatarLetter: "А", avatarColor: "#23E2AF" },
    ],
    reviews: [
      { name: "Анна",     role: "Ученица",         rating: 5, text: "Органическая химия была для меня тёмным лесом. После курса всё встало на свои места, сдала на отлично." },
      { name: "Владимир", role: "Ученик",           rating: 5, text: "Преподаватель объясняет реакции через реальные примеры. Гораздо интереснее, чем в школе." },
      { name: "Марина",   role: "Мама ученицы",     rating: 5, text: "Дочка мечтает о медицинском, химия была слабым местом. После Пифагора — уверенность и хороший балл." },
      { name: "Сергей",   role: "Ученик",           rating: 5, text: "Готовился к олимпиаде. Разбирали нестандартные задачи — именно это и помогло победить." },
    ],
    faqs: [
      { question: "How long is a lesson?",        answer: "A standard lesson lasts 60 minutes, though we also offer extended 90-minute sessions depending on the student's needs and learning goals." },
      { question: "Do I need my own materials?",  answer: "No — all necessary study materials and worksheets are provided by your tutor. You only need a notebook and a willingness to learn." },
      { question: "Can I change my tutor?",       answer: "Yes, absolutely. If you feel the teaching style doesn't suit you perfectly, we'll match you with another specialist at no additional charge." },
    ],
  },
};

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
    <div className="tutor-card">
      <div className="tutor-avatar" style={{ background: tutor.avatarColor + "22", color: tutor.avatarColor }}>
        {tutor.avatarLetter}
      </div>
      <div className="tutor-name text-body">{tutor.name}</div>
      <div className="tutor-title">{tutor.title}</div>
    </div>
  );
}

function FaqItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <button
        type="button"
        className="faq-question text-body"
        onClick={() => setOpen(!open)}
      >
        <span>{faq.question}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`faq-icon ${open ? "faq-icon--open" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="faq-answer text-body">{faq.answer}</div>
      )}
    </div>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────

interface SubjectPageProps {
  subject: SubjectKey;
  onBack: () => void;
}

export default function SubjectPage({ subject, onBack }: SubjectPageProps) {
  const cfg = SUBJECT_CONFIGS[subject];
  const [name,  setName]  = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="header">
        <a href="#" className="header-logo-link" onClick={(e) => { e.preventDefault(); onBack(); }}>
          <Logo />
        </a>
        <nav className="header-nav-main">
          {NAV_MAIN.map(l => (
            <a key={l} href="#" className="text-h3">{l}</a>
          ))}
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

      {/* ── Banner ── */}
      <section
        className="banner subject-banner"
        style={{
          backgroundImage: cfg.bgGradient,
          backgroundSize: "cover, 60%",
          backgroundPosition: "center, right center",
          backgroundRepeat: "no-repeat, repeat",
        }}
      >
        <div className="banner-inner">
          <div className="banner-content">
            <h1 className="banner-title text-display-unbounded">{cfg.title}</h1>
            <p className="banner-subtitle text-h1-futura">{cfg.subtitle}</p>
          </div>
          <img src={cfg.bannerImage} alt="" className="banner-image" />
        </div>

        {/* simple 2-field sign-up strip */}
        <div className="subject-banner-form">
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
          <button
            type="button"
            className="banner-form-btn"
            style={{ background: cfg.accentColor === "#23E2AF" ? "#1ab894" : cfg.accentColor }}
          >
            Записаться
          </button>
        </div>
      </section>

      <WaveDivider variant="banner" />

      {/* ── Tutors ── */}
      <div className="container" style={{ paddingTop: 48 }}>
        <h2 className="section-title text-h1-unbounded" style={{ paddingTop: 8, marginBottom: 32 }}>
          Наши репетиторы
        </h2>
        <div className="tutors-grid">
          {cfg.tutors.map((t, i) => (
            <TutorCard key={i} tutor={t} />
          ))}
        </div>
      </div>

      {/* ── Reviews ── */}
      <div style={{ marginTop: 48 }}>
        <ReviewsSlider reviewsData={cfg.reviews} StarsComponent={Stars} />
      </div>

      {/* ── Pricing ── */}
      <div className="container">
        <h2 className="section-title section-title--compact text-h1-unbounded" style={{ marginBottom: -40, paddingTop: 40 }}>
          Цены
        </h2>
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
              <button
                type="button"
                className="price-btn price-btn--primary"
                style={{ background: cfg.accentColor === "#23E2AF" ? "#1ab894" : cfg.accentColor }}
              >
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
              background: `radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, ${cfg.accentColor} 50%, ${cfg.accentColor === "#F9AB01" ? "#a06c00" : cfg.accentColor === "#23E2AF" ? "#0a8264" : "#245985"} 100%)`,
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
        <div className="faq-list">
          {cfg.faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </div>

      <WaveDivider variant="footer" />

      {/* ── Footer ── */}
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
  );
}
