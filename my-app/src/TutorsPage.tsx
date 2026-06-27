import { useState } from "react";
import "./App.css";
import "./TutorsPage.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WaveDivider } from "./components/WaveDivider";
import { ReviewsSlider } from "./components/ReviewsSlider";
import { Logo } from "./components/Logo";
import alexeyPetrovImg from "./assets/Alexey Petrov.png";
import tutorsBannerImg from "./assets/tutors.png";
import arrowIcon from "./assets/Arrow.svg";
import selectSvg from "./assets/select.svg";
import { PRICING_FEATURES, REVIEW_IMAGES, SUBJECTS } from "./data/site";
import { scrollToBookingForm } from "./utils/scroll";
import type { PageKey } from "./types/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Tutor {
  name: string;
  title: string;
  image?: string;
  avatarLetter?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const TUTOR_SUBJECTS = SUBJECTS.map(({ title }) => ({ title }));

const TUTORS: Tutor[] = [
  { name: "Алексей Петров",  title: "Math Diamond Coach",        image: alexeyPetrovImg },
  { name: "Алексей Петров",  title: "Math Diamond Coach",        image: alexeyPetrovImg },
  { name: "Алексей Петров",  title: "Math Diamond Coach. 10 стобалльников. Учится в БГУ.", image: alexeyPetrovImg },
];

const FAQS: FAQ[] = [
      { "question": "Сколько длится занятие?", "answer": "Стандартное занятие длится 60 минут, однако мы также предлагаем продленные 90-минутные сессии в зависимости от потребностей студента и целей обучения." },
        { "question": "Нужны ли мне свои материалы?", "answer": "Нет — все необходимые учебные материалы и рабочие листы предоставляет ваш репетитор. Вам понадобятся только блокнот и желание учиться." },
        { "question": "Могу ли я поменять репетитора?", "answer": "Да, безусловно. Если вы чувствуете, что стиль преподавания вам не совсем подходит, мы бесплатно подберем вам другого специалиста." }
    ];

// ─── Helper components ────────────────────────────────────────────────────────

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

function FaqItem({ faq, accentColor }: { faq: FAQ; accentColor?: string }) {
  const [open, setOpen] = useState(false);

  // 1. Определение цветов фона и текста в зависимости от предмета
  let bgColor = "#F4FAFC";    // Математика / Физика (Дефолт)
  let titleColor = "#1A547E";
  let textColor = "#5A738E";
  let iconColor = "#7994A6";

  if (accentColor === "#F9AB01") { // Английский
    bgColor = "#FFFDF5";
    titleColor = "#8A5400";
    textColor = "#8C765C";
    iconColor = "#B38F54";
  } else if (accentColor === "#23E2AF") { // Химия
    bgColor = "#F2FAF7";
    titleColor = "#167A60";
    textColor = "#5A857A";
    iconColor = "#63A391";
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius: "12px",
        marginBottom: "12px",
        overflow: "hidden",
        width: "100%",
        display: "block",
        boxSizing: "border-box"
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%",
          height: "auto",
          minHeight: "unset",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 32px",
          background: "none",
          border: "none",
          outline: "none",
          textAlign: "left",
          cursor: "pointer",
          boxSizing: "border-box"
        }}
      >
        <span
          className="text-h2"
          style={{
            color: titleColor,
            fontWeight: 400,
            display: "inline-block",
            width: "auto"
          }}
        >
          {faq.question}
        </span>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          style={{
            width: "20px",
            height: "20px",
            minWidth: "20px",
            minHeight: "20px",
            maxWidth: "20px",
            maxHeight: "20px",
            color: iconColor,
            display: "block",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            boxSizing: "border-box"
          }}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="text-h3"
          style={{
            padding: "0 32px 24px 32px",
            lineHeight: "1.5",
            color: textColor,
            width: "100%",
            boxSizing: "border-box"
          }}
        >
          {faq.answer}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface TutorsPageProps {
  onBack: () => void;
  onNavigate: (page: PageKey) => void;
}

export default function TutorsPage({ onBack, onNavigate }: TutorsPageProps) {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Английский язык");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [tutorName, setTutorName] = useState('');
  const [tutorPhone, setTutorPhone] = useState('');
  const [tutorSubject, setTutorSubject] = useState('');
  const [isTutorDropdownOpen, setIsTutorDropdownOpen] = useState(false);


  return (
    <div className="app">
      <Header currentPage="tutors" onHome={onBack} onNavigate={onNavigate} />

      <div className="tutors-banner-wrap">
        <section className="banner tutors-banner">
          <div className="banner-inner">
            <div className="banner-content">
              <h1 className="banner-title text-display-unbounded">Репетиторы</h1>
              <p className="banner-subtitle text-h1-futura">
                Поможем подтянуть оценки, подготовиться к ЦЭ и ЦТ
              </p>
            </div>

            <img src={tutorsBannerImg} alt="" className="banner-image banner-image--tutors" />
          </div>

          <form id="top-booking-form" className="banner-form" onSubmit={e => e.preventDefault()}>
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
      </div>

      {/* ── Tutors grid ── */}
      <div className="container" style={{ paddingTop: 0 }}>
        <div className="tutors-page-header">
          <h2 className="section-title text-h1-unbounded">Наши репетиторы</h2>

          <div className="tutors-page-filter-wrapper">
            <button
              type="button"
              className={`tutors-page-filter-btn text-h3 ${isDropdownOpen ? "is-open" : ""}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <span>{selectedSubject}</span>
              <img src={selectSvg} alt="" className="filter-arrow-icon" />
            </button>

            {isDropdownOpen && (
              <div className="tutors-page-filter-dropdown" role="listbox">
                {TUTOR_SUBJECTS.map((subj) => (
                  <button
                    key={subj.title}
                    type="button"
                    role="option"
                    aria-selected={selectedSubject === subj.title}
                    className={`tutors-page-filter-option text-h3 ${
                      selectedSubject === subj.title ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedSubject(subj.title);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {subj.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="tutors-page-grid">
          {TUTORS.map((t, i) => (
            <TutorCard key={i} tutor={t} />
          ))}
        </div>
      </div>

      {/* ── Reviews ── */}
      <div id="reviews" style={{ marginTop: 48 }}>
        <ReviewsSlider reviewsData={REVIEW_IMAGES} />
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
              <button
                type="button"
                className="price-btn price-btn--primary"
                style={{ background: "#1D809F" }}
                onClick={scrollToBookingForm}
              >
                Оставить заявку
              </button>
              <button type="button" className="price-btn price-btn--outline" onClick={scrollToBookingForm}>
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
<section style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>

  {/* Верхняя строка: Заголовок, Стрелка и Делайте строго в один ряд */}
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
    <h2 className="text-h1-unbounded" style={{ margin: 0, padding: 0, lineHeight: '1.2' }}>
      Хотите<br />присоединиться<br />в команду?
    </h2>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
      <img src={arrowIcon} alt="Стрелка" style={{ maxWidth: '100px', width: '100%', height: 'auto', display: 'block' }} />
    </div>

    <div className="text-h1-unbounded" style={{ margin: 0, padding: 0, whiteSpace: 'nowrap' }}>
      Делайте!
    </div>
  </div>

  {/* Нижняя строка: Аккуратная белая карточка-форма в одну линию */}
  <form
    onSubmit={e => e.preventDefault()}
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#ffffff',
      padding: '20px 30px',
      borderRadius: '16px',
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.06)',
      gap: '20px',
      width: 'min(980px, calc(100% - 32px))',
      minHeight: '112px',
      boxSizing: 'border-box'
    }}
  >
    {/* Левый блок с текстом */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0, minWidth: '180px' }}>
      <div style={{ fontSize: '20px', fontFamily: "Futura PT", color: '#8c97a6', marginBottom: '4px', marginLeft: '0px' }}>Уверены в своих знаниях?</div>
      <div style={{ fontSize: "24px", fontFamily: "Futura PT", color: "#111827", lineHeight: 1 }}>
        Мы ждем именно Вас!
      </div>
    </div>

    {/* Поля ввода */}
    <input
  type="text"
  placeholder="Ваше имя"
  value={tutorName}
  onChange={e => setTutorName(e.target.value)}
  style={{
    height: '40px',
    width: '100%',
    border: '1px solid #dfe3e8',
    borderRadius: '8px',
    padding: '0 16px',
    fontFamily: 'var(--font-futura)',
    fontSize: 'var(--font-text-body)',
    color: '#444',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box'
  }}
/>

<input
  type="tel"
  placeholder="Номер телефона"
  value={tutorPhone}
  onChange={e => setTutorPhone(e.target.value)}
  style={{
    height: '40px',
    width: '100%',
    border: '1px solid #dfe3e8',
    borderRadius: '8px',
    padding: '0 16px',
    fontFamily: 'var(--font-futura)',
    fontSize: 'var(--font-text-body)',
    color: '#444',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box'
  }}
/>

{/* Кастомный селект */}
<div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
  <div
    className={`select-trigger ${!tutorSubject ? "placeholder" : ""}`}
    onClick={() => setIsTutorDropdownOpen(!isTutorDropdownOpen)}
    style={{
      height: '40px',
      width: '100%',
      border: '1px solid #dfe3e8',
      borderRadius: '8px',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#fff',
      cursor: 'pointer',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-futura)',
      fontSize: 'var(--font-text-body)',
      color: '#444'
    }}
  >
    <span style={{ color: !tutorSubject ? '#9ca3af' : '#444' }}>
      {tutorSubject || "Предмет"}
    </span>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`select-arrow-icon ${isTutorDropdownOpen ? "is-open" : ""}`}
      style={{
        width: '16px',
        height: '16px',
        color: '#7994a6',
        transform: isTutorDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease'
      }}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>

  {isTutorDropdownOpen && (
  <div
    className="select-dropdown"
    style={{
      position: 'absolute',
      top: '46px', /* Сдвинуто под высоту 40px */
      left: 0,
      width: '100%',
      background: '#fff',
      border: '1px solid #dfe3e8',
      borderRadius: '8px',
      zIndex: 100,
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      maxHeight: '200px',
      overflowY: 'auto'
    }}
  >
    {/* Добавили index в параметры map */}
    {TUTOR_SUBJECTS.map((s, index) => (
      <div
        key={index} /* Заменили s.title на index, чтобы убрать ошибку [object Object] */
        className={`select-option ${tutorSubject === s.title ? "selected" : ""}`}
        onClick={() => { setTutorSubject(s.title); setIsTutorDropdownOpen(false); }}
        style={{
          padding: '10px 16px',
          cursor: 'pointer',
          fontFamily: 'var(--font-futura)',
          fontSize: 'var(--font-text-body)',
          background: tutorSubject === s.title ? '#f4faff' : '#fff',
          color: tutorSubject === s.title ? '#2d5d8f' : '#444'
        }}
      >
        {s.title}
      </div>
    ))}
  </div>
)}
</div>

{/* Кнопка отправки */}
<button
  type="submit"
  className="banner-form-btn"
  style={{
    height: '45px',
    width: '153px',
    border: 'none',
    borderRadius: '8px',
    background: '#2d5d8f',
    color: 'white',
    cursor: 'pointer',
    transition: 'background 0.2s',
    fontFamily: 'var(--font-futura)',
    fontSize: 'var(--text-body)',
    fontWeight: 400,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    boxSizing: 'border-box'
  }}
>
  Отправить
</button>
  </form>
</section>

      <WaveDivider variant="footer" />
      <Footer onHome={onBack} onNavigate={onNavigate} />
    </div>
  );
}
