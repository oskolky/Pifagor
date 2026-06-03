import { useState } from "react";
import './App.css';
import { Logo } from './components/Logo';
import mainImg from './assets/main_statue.png';
import waveImg from './assets/wave.svg';

const SUBJECTS = [
  {
    title: "Математика",
    desc: "Подготовка к экзаменам, решение задач любой сложности и разбор тем",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <text x="2" y="42" fontSize="44" fill="#F5A623" fontFamily="Georgia, serif">Σ</text>
      </svg>
    ),
  },
  {
    title: "Физика",
    desc: "Подготовка к экзаменам, решение задач любой сложности и разбор тем",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <ellipse cx="26" cy="26" rx="9" ry="22" stroke="#0ea5e9" strokeWidth="2.5" fill="none" />
        <ellipse cx="26" cy="26" rx="22" ry="9" stroke="#0ea5e9" strokeWidth="2.5" fill="none" />
        <circle cx="26" cy="26" r="4" fill="#0ea5e9" />
      </svg>
    ),
  },
  {
    title: "Английский язык",
    desc: "Подготовка к экзаменам, решение задач любой сложности и разбор тем",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <text x="2" y="36" fontSize="22" fill="#F5A623" fontFamily="Georgia, serif" fontWeight="bold">ABC</text>
      </svg>
    ),
  },
  {
    title: "Химия",
    desc: "Подготовка к экзаменам, решение задач любой сложности и разбор тем",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <path d="M20 6 L20 26 L8 44 L44 44 L32 26 L32 6 Z" stroke="#0ea5e9" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
        <line x1="18" y1="12" x2="34" y2="12" stroke="#0ea5e9" strokeWidth="2" />
        <circle cx="22" cy="34" r="3" fill="#0ea5e9" opacity="0.6" />
        <circle cx="32" cy="36" r="2" fill="#F5A623" opacity="0.8" />
      </svg>
    ),
  },
];

const PRICING_FEATURES = [
  "Профессиональные репетиторы",
  "Контроль прогресса",
  "Мини-группы",
  "Профессиональная платформа",
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
];

const NAV_MAIN = ["Предметы", "Репетиторы", "Цены"];
const NAV_SECONDARY = ["Отзывы", "Личный кабинет", "О нас"];

function WaveDivider({ variant }: { variant: 'hero' | 'footer' }) {
  return (
    <div className={`wave-divider wave-divider--${variant}`} aria-hidden="true">
      <img src={waveImg} alt="" />
    </div>
  );
}

function Stars({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="#F5A623">
          <polygon points="6.5,1 8,5 12.5,5 9,8 10.5,12.5 6.5,9.5 2.5,12.5 4,8 0.5,5 5,5" />
        </svg>
      ))}
    </div>
  );
}

export default function PifagorHome() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <div className="app">

      <header className="header">
        <a href="#" className="header-logo-link">
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

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title text-display-unbounded">
              Репетиторы для<br />
              <span>5-11 классов</span>
            </h1>
            <p className="hero-subtitle text-h1-futura">
              Поможем подтянуть оценки, подготовиться к ЦЭ и ЦТ,<br />
              разобраться в сложных темах
            </p>
          </div>

          <img src={mainImg} alt="" className="hero-image" />
        </div>

        <form className="hero-form" onSubmit={e => e.preventDefault()}>
           <div className="hero-form-info">
            <div className="hero-form-small">
              Не уверены в знаниях?
            </div>
            <div className="hero-form-big">
              Запишитесь на пробное!
            </div>
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

          <select
            className={subject ? undefined : "hero-form-select--placeholder"}
            value={subject}
            onChange={e => setSubject(e.target.value)}
          >
            <option value="" disabled>
              Предмет
            </option>
            {SUBJECTS.map(s => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>

          <button type="submit" className="hero-form-btn">
            Записаться
          </button>
        </form>
      </section>

      <WaveDivider variant="hero" />

      <div className="container" style={{ paddingTop: 32 }}>
        <h2 className="section-title text-h2" style={{ paddingLeft: 0, paddingRight: 0 }}>Чему научим?</h2>
      </div>

      <div className="cards container">
        {SUBJECTS.map(s => (
          <div className="card" key={s.title}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <h3 className="text-h3">{s.title}</h3>
                <p className="text-body">{s.desc}</p>
              </div>
              <div style={{ marginLeft: 16, flexShrink: 0 }}>{s.icon}</div>
            </div>
            <button>Узнать больше →</button>
          </div>
        ))}
      </div>

      <div className="container">
        <h2 className="section-title section-title--compact text-h2" style={{ paddingLeft: 0, paddingRight: 0 }}>Цены</h2>
      </div>

      <div className="price-section container">
        <div className="price-box">
          <div className="price-left">
            <h2 className="text-body-lg">Стоимость одного занятия</h2>
            <div className="price-value text-h1-futura">40 BYN</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", margin: "16px 0 24px" }}>
              {PRICING_FEATURES.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%", background: "#e0f8f4",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path d="M2 5l2 2 4-4" stroke="#0ea5e9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="price-feature text-body">{f}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button type="button" className="price-btn price-btn--primary">Оставить заявку</button>
              <button type="button" className="price-btn price-btn--outline">Хочу дешевле!</button>
            </div>
          </div>

          <div className="price-right">
            <div className="price-right-inner">
              <Logo variant="footer" />
              <div className="price-right-tagline text-h2">
                Понимай, за<br />что платишь.
              </div>
              <p className="price-right-desc text-body">
                Прозрачные цены, без скрытых платежей.<br />
                Пробное занятие — бесплатно.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 className="text-h2" style={{ margin: 0 }}>Отзывы наших клиентов</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {["←", "→"].map((a, i) => (
              <button key={i} type="button" style={{
                width: 38, height: 38, borderRadius: "50%", border: "1.5px solid #ddd",
                background: "#fff", cursor: "pointer", color: "#444"
              }} className="text-body">{a}</button>
            ))}
          </div>
        </div>

        <div className="review-list">
          {REVIEWS.map(r => (
            <div className="review" key={r.name}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div className="text-body-lg" style={{
                  width: 40, height: 40, borderRadius: "50%", background: "#fff5e0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#F5A623", flexShrink: 0
                }}>{r.name[0]}</div>
                <div>
                  <div className="review-name text-body">{r.name}</div>
                  <div className="review-role">{r.role}</div>
                </div>
              </div>
              <Stars count={r.rating} />
              <p className="text-body">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      <WaveDivider variant="footer" />

      <div className="footer-wrap">
        <footer className="footer">
          <div className="container">

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 36 }}>
              <div>
                <Logo variant="footer" />
                <p className="footer-address text-body">
                  ООО «Пифагор Центр», УНП 909100847<br />
                  г. Минск, ул. Сурганова, д. 10<br />
                  Режим работы пн–пт 10:00–20:00
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["IG", "TG", "VB"].map(s => (
                    <div key={s} className="text-body" style={{
                      width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(255,255,255,0.7)", cursor: "pointer"
                    }}>{s}</div>
                  ))}
                </div>
              </div>

              {[
                { title: "Продукты", links: ["Репетиторы", "Цены", "Отзывы", "О нас"] },
                { title: "Компания", links: ["Личный кабинет", "Блог", "Карьера"] },
                { title: "Контакты", links: ["+375 44 793 38 70", "pifagor@gmail.com"] },
              ].map(col => (
                <div key={col.title}>
                  <p className="footer-col-title text-body">{col.title}</p>
                  {col.links.map(l => (
                    <p key={l} className="footer-col-link text-body">{l}</p>
                  ))}
                </div>
              ))}
            </div>

            <div style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 16, padding: "22px 30px",
              display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28
            }}>
              <div>
                <p className="footer-cta-title text-body-lg">Приступите к занятиям сегодня</p>
                <p className="footer-cta-sub text-body">Первое пробное занятие — бесплатно</p>
              </div>
              <button type="button" className="btn">Записаться →</button>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, textAlign: "center" }}>
              <p className="footer-copy">© 2024 Пифагор. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}
