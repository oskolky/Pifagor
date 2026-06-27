import { useState } from "react";
import "./App.css";
import "./index.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WaveDivider } from "./components/WaveDivider";
import { ReviewsSlider } from "./components/ReviewsSlider";
import { Logo } from "./components/Logo";
import mainImg from "./assets/main_page/main_statue.png";
import arrowIcon from "./assets/main_page/cards/arrow.png";
import { SUBJECTS, PRICING_FEATURES, REVIEW_IMAGES } from "./data/site";
import { scrollToBookingForm, scrollToTop } from "./utils/scroll";
import TutorsPage from "./TutorsPage";
import SubjectPage from "./SubjectPage";
import type { ActivePage, PageKey } from "./types/navigation";

export default function PifagorHome() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>(null);

  const handleHome = () => {
    setActivePage(null);
    scrollToTop();
  };

  const handleNavigate = (page: PageKey) => {
    setActivePage(page);
    scrollToTop();
  };

  if (activePage === "tutors") {
    return <TutorsPage onBack={handleHome} onNavigate={handleNavigate} />;
  }

  if (activePage) {
    return (
      <SubjectPage
        subject={activePage}
        onBack={handleHome}
        onNavigate={handleNavigate}
      />
    );
  }

  return (
    <div className="app">
      <Header onHome={handleHome} onNavigate={handleNavigate} />

      <section className="banner">
        <div className="banner-inner">
          <div className="banner-content">
            <h1 className="banner-title text-display-unbounded">
              Репетиторы для
              <br />
              <span>5-11 классов</span>
            </h1>
            <p
              className="banner-subtitle text-h1-futura"
              style={{ fontSize: "60px", fontFamily: "Futura PT" }}
            >
              Поможем подтянуть оценки, подготовиться к ЦЭ и ЦТ,
              <br />
              разобраться в сложных темах
            </p>
          </div>

          <img src={mainImg} alt="" className="banner-image" />
        </div>

        <form id="top-booking-form" className="banner-form" onSubmit={(e) => e.preventDefault()}>
          <div className="banner-form-info">
            <div className="banner-form-small">Не уверены в знаниях?</div>
            <div className="banner-form-big">Запишитесь на пробное!</div>
          </div>

          <input
            type="text"
            placeholder="Имя родителя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Номер телефона"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {isOpen && (
              <div className="select-dropdown">
                {SUBJECTS.map((s) => (
                  <div
                    key={s.title}
                    className={`select-option ${subject === s.title ? "selected" : ""}`}
                    onClick={() => {
                      setSubject(s.title);
                      setIsOpen(false);
                    }}
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
        <h2 className="section-title text-h1-unbounded" style={{ marginBottom: "40px" }}>
          Чему научим?
        </h2>
      </div>

      <div id="subjects" className="cards container">
        {SUBJECTS.map((s) => (
          <div className={`card ${s.className}`} key={s.title}>
            <div className="card-body">
              <div className="card-text">
                <h3 className="text-h1-futura">{s.title}</h3>
                <p className="text-body-lg card-desc">{s.desc}</p>
              </div>
              <img src={s.icon} alt="" className="card-icon" />
            </div>
            <button
              type="button"
              onClick={() => handleNavigate(s.subjectKey)}
            >
              Узнать больше
              <img src={arrowIcon} alt="Стрелка" className="button-arrow" />
            </button>
          </div>
        ))}
      </div>

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
              {PRICING_FEATURES.map((f) => (
                <div key={f.text} className="price-feature-item">
                  <div className="price-feature-icon">
                    <img src={f.icon} alt="" />
                  </div>
                  <span className="price-feature text-body-lg">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="price-buttons">
              <button type="button" className="price-btn price-btn--primary" onClick={scrollToBookingForm}>
                Оставить заявку
              </button>
              <button type="button" className="price-btn price-btn--outline" onClick={scrollToBookingForm}>
                Хочу дешевле!
              </button>
            </div>
          </div>

          <div className="price-right">
            <div className="price-right-inner">
              <Logo variant="footer" />
              <div className="price-right-tagline text-h1-futura">
                Понимай, за
                <br />
                что платишь.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="reviews">
        <ReviewsSlider reviewsData={REVIEW_IMAGES} />
      </div>

      <WaveDivider variant="footer" />
      <Footer onHome={handleHome} onNavigate={handleNavigate} isHome />
    </div>
  );
}
