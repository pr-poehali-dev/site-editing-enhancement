import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PROJECTS = [
  {
    id: 1,
    title: "Ребрендинг TechCorp",
    category: "Маркетинг",
    desc: "Полный редизайн фирменного стиля и маркетинговой стратегии для B2B компании",
    img: "https://cdn.poehali.dev/projects/96e0769a-0953-4e4e-b200-f48931195b34/files/20614140-4d0c-4827-80a5-d62f08079143.jpg",
    tags: ["Стратегия", "SMM", "Контент"],
  },
  {
    id: 2,
    title: "Имиджевый ролик",
    category: "Видеомонтаж",
    desc: "Корпоративный имиджевый ролик для привлечения инвесторов и клиентов",
    img: "https://cdn.poehali.dev/projects/96e0769a-0953-4e4e-b200-f48931195b34/files/2756ae3b-d92e-44e0-b78d-279ceed60a3c.jpg",
    tags: ["After Effects", "Моушн", "Сценарий"],
  },
  {
    id: 3,
    title: "Рекламная кампания",
    category: "Маркетинг",
    desc: "Таргетированная реклама в социальных сетях с конверсией 8,4%",
    img: "https://cdn.poehali.dev/projects/96e0769a-0953-4e4e-b200-f48931195b34/files/20614140-4d0c-4827-80a5-d62f08079143.jpg",
    tags: ["Таргет", "Аналитика", "ROI"],
  },
  {
    id: 4,
    title: "YouTube-сериал",
    category: "Видеомонтаж",
    desc: "12-серийный обучающий курс для онлайн-школы с аудиторией 50 000 подписчиков",
    img: "https://cdn.poehali.dev/projects/96e0769a-0953-4e4e-b200-f48931195b34/files/2756ae3b-d92e-44e0-b78d-279ceed60a3c.jpg",
    tags: ["Premiere Pro", "Цветокоррекция", "Субтитры"],
  },
];

const SKILLS = [
  { name: "Видеомонтаж", level: 95, icon: "Video" },
  { name: "Motion Graphics", level: 85, icon: "Layers" },
  { name: "Digital Marketing", level: 90, icon: "TrendingUp" },
  { name: "SMM & Контент", level: 88, icon: "Share2" },
  { name: "Таргетированная реклама", level: 82, icon: "Target" },
  { name: "Аналитика", level: 78, icon: "BarChart2" },
];

const NAV = ["Главная", "Обо мне", "Работы", "Навыки", "Контакты"];

const SECTION_IDS: Record<string, string> = {
  "Главная": "home",
  "Обо мне": "about",
  "Работы": "works",
  "Навыки": "skills",
  "Контакты": "contacts",
};

function useIntersection(ref: React.RefObject<Element>, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function Section({ id, children, className = "", style }: { id: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useIntersection(ref as React.RefObject<Element>);
  return (
    <section
      id={id}
      ref={ref}
      style={style}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("Главная");
  const [lightbox, setLightbox] = useState<null | typeof PROJECTS[0]>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const scrollTo = (section: string) => {
    const id = SECTION_IDS[section] || "home";
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(section);
    setMenuOpen(false);
  };

  return (
    <div className="font-body bg-background text-foreground min-h-screen">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-charcoal/10">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-display text-xl font-semibold tracking-widest text-charcoal uppercase">
            А<span style={{ color: "hsl(var(--gold))" }}>.</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`text-sm tracking-wider uppercase transition-colors duration-200 flex flex-col items-center ${
                  activeNav === item ? "text-charcoal font-medium" : "text-charcoal-light hover:text-charcoal"
                }`}
              >
                {item}
                {activeNav === item && (
                  <span className="block h-px w-full mt-0.5" style={{ background: "hsl(var(--gold))" }} />
                )}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-charcoal/10 px-6 py-4 flex flex-col gap-4">
            {NAV.map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="text-left text-sm tracking-wider uppercase text-charcoal-light hover:text-charcoal">
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center pt-16" style={{ background: "hsl(var(--charcoal))" }}>
        <div className="max-w-6xl mx-auto px-6 w-full py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in" style={{ color: "hsl(var(--gold))", animationDelay: "0.1s" }}>
              Маркетинг · Видеомонтаж
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-light text-white leading-none mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.25s" }}>
              Алексей<br />
              <em style={{ color: "hsl(var(--gold-light))" }}>Новиков</em>
            </h1>
            <p className="text-base font-light leading-relaxed mb-10 opacity-0 animate-fade-in" style={{ color: "rgba(255,255,255,0.55)", animationDelay: "0.4s" }}>
              Создаю визуальные истории, которые продают.<br />
              7 лет в digital-маркетинге и видеопроизводстве.
            </p>
            <div className="flex gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.55s" }}>
              <button
                onClick={() => scrollTo("Работы")}
                className="px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-90"
                style={{ background: "hsl(var(--gold))", color: "hsl(var(--charcoal))" }}
              >
                Мои работы
              </button>
              <button
                onClick={() => scrollTo("Контакты")}
                className="px-8 py-3 text-sm tracking-widest uppercase font-medium border transition-all duration-300 hover:bg-white/10 text-white"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                Связаться
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-end opacity-0 animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative w-80 h-96">
              <div className="absolute inset-0 rounded-sm overflow-hidden">
                <img src="https://cdn.poehali.dev/projects/96e0769a-0953-4e4e-b200-f48931195b34/files/20614140-4d0c-4827-80a5-d62f08079143.jpg" className="w-full h-full object-cover opacity-70" alt="hero" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border rounded-sm pointer-events-none" style={{ borderColor: "hsl(var(--gold))", opacity: 0.4 }} />
              <div className="absolute bottom-6 left-6 bg-charcoal/90 backdrop-blur px-4 py-3 rounded-sm">
                <p className="font-display text-2xl text-white">50+</p>
                <p className="text-xs tracking-widest uppercase" style={{ color: "hsl(var(--gold))" }}>проектов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(var(--gold))" }}>Обо мне</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-charcoal leading-tight mb-8">
              Стратег<br /><em>и визионер</em>
            </h2>
            <p className="text-sm leading-relaxed text-charcoal-light mb-6">
              Более 7 лет помогаю брендам говорить на языке своей аудитории — через сильный контент, точечную рекламу и видео, которое запоминается.
            </p>
            <p className="text-sm leading-relaxed text-charcoal-light mb-10">
              Работал с компаниями из e-commerce, EdTech и FMCG сегментов. Знаю, как превратить идею в историю, а историю — в результат.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-charcoal/10">
              {[["7+", "лет опыта"], ["50+", "проектов"], ["30+", "клиентов"]].map(([n, l]) => (
                <div key={n}>
                  <p className="font-display text-4xl font-light text-charcoal">{n}</p>
                  <p className="text-xs tracking-widest uppercase text-charcoal-light mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://cdn.poehali.dev/projects/96e0769a-0953-4e4e-b200-f48931195b34/files/2756ae3b-d92e-44e0-b78d-279ceed60a3c.jpg"
              className="w-full h-[440px] object-cover rounded-sm"
              alt="about"
            />
            <div className="absolute top-6 -left-6 px-5 py-4 bg-charcoal text-white rounded-sm shadow-xl">
              <p className="font-display text-2xl">8.4%</p>
              <p className="text-xs tracking-wider uppercase" style={{ color: "hsl(var(--gold))" }}>средняя конверсия</p>
            </div>
          </div>
        </div>
      </Section>

      {/* WORKS */}
      <Section id="works" className="py-28" style={{ background: "hsl(20,10%,95%)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(var(--gold))" }}>Работы</p>
              <h2 className="font-display text-5xl font-light text-charcoal">Избранные<br /><em>проекты</em></h2>
            </div>
            <p className="hidden md:block text-sm text-charcoal-light max-w-xs text-right">
              Нажмите на карточку, чтобы увидеть работу в полном размере
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <div
                key={p.id}
                className="group cursor-pointer bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => setLightbox(p)}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full p-4">
                      <Icon name="ZoomIn" size={22} className="text-white" />
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase font-medium rounded-sm"
                    style={{ background: "hsl(var(--gold))", color: "hsl(var(--charcoal))" }}>
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-light text-charcoal mb-2">{p.title}</h3>
                  <p className="text-sm text-charcoal-light mb-4 leading-relaxed">{p.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-1 text-xs tracking-wide border border-charcoal/15 text-charcoal-light rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(var(--gold))" }}>Навыки</p>
          <h2 className="font-display text-5xl font-light text-charcoal mb-16">Экспертиза</h2>
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
            {SKILLS.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Icon name={s.icon as "Video"} size={18} className="text-charcoal-light" />
                    <span className="text-sm tracking-wide text-charcoal font-medium">{s.name}</span>
                  </div>
                  <span className="text-xs text-charcoal-light font-light">{s.level}%</span>
                </div>
                <div className="h-px bg-charcoal/10 relative">
                  <div
                    className="h-full absolute top-0 left-0"
                    style={{ width: `${s.level}%`, background: "hsl(var(--gold))" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "Video", title: "Premiere Pro", sub: "Adobe" },
              { icon: "Zap", title: "After Effects", sub: "Adobe" },
              { icon: "BarChart2", title: "Google Ads", sub: "Аналитика" },
              { icon: "Target", title: "Meta Ads", sub: "Таргет" },
            ].map((tool) => (
              <div key={tool.title} className="border border-charcoal/10 rounded-sm p-5 hover:border-gold transition-colors duration-300 text-center group">
                <Icon name={tool.icon as "Video"} size={28} className="mx-auto mb-3 text-charcoal-light group-hover:text-charcoal transition-colors" />
                <p className="text-sm font-medium text-charcoal">{tool.title}</p>
                <p className="text-xs text-charcoal-light mt-0.5">{tool.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-28" style={{ background: "hsl(var(--charcoal))" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(var(--gold))" }}>Контакты</p>
              <h2 className="font-display text-5xl font-light text-white mb-6 leading-tight">
                Готовы к<br /><em style={{ color: "hsl(var(--gold-light))" }}>сотрудничеству?</em>
              </h2>
              <p className="text-sm font-light leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
                Обсудим ваш проект и найдём решение, которое работает на результат.
              </p>
              <div className="flex flex-col gap-6">
                {[
                  { icon: "Mail", label: "Email", value: "hello@example.com" },
                  { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00" },
                  { icon: "MapPin", label: "Город", value: "Москва, Россия" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.07)" }}>
                      <Icon name={c.icon as "Mail"} size={16} style={{ color: "hsl(var(--gold))" }} />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{c.label}</p>
                      <p className="text-sm text-white font-light">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Имя</label>
                  <input className="w-full px-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder-white/20 rounded-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="Иван" />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Email</label>
                  <input className="w-full px-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder-white/20 rounded-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="ivan@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Тема</label>
                <input className="w-full px-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder-white/20 rounded-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="Проект / Вопрос" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Сообщение</label>
                <textarea className="w-full px-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder-white/20 rounded-sm focus:outline-none focus:border-white/40 transition-colors resize-none h-32" placeholder="Расскажите о вашем проекте..." />
              </div>
              <button
                type="submit"
                className="w-full py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-90 mt-2"
                style={{ background: "hsl(var(--gold))", color: "hsl(var(--charcoal))" }}
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/5" style={{ background: "hsl(var(--charcoal))" }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="font-display text-lg font-light text-white/40">А<span style={{ color: "hsl(var(--gold))" }}>.</span></span>
          <p className="text-xs text-white/25 tracking-widest">© 2024 Алексей Новиков</p>
          <div className="flex gap-3">
            {["Instagram", "Youtube", "Linkedin"] .map((s) => (
              <button key={s} className="w-8 h-8 rounded-sm flex items-center justify-center text-white/30 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.05)" }}>
                <Icon name={s as "Instagram"} size={14} />
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(15,18,25,0.95)" }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-charcoal rounded-sm overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition"
              onClick={() => setLightbox(null)}
            >
              <Icon name="X" size={16} />
            </button>
            <img src={lightbox.img} alt={lightbox.title} className="w-full h-[55vh] object-cover" />
            <div className="p-8">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-3xl font-light text-white">{lightbox.title}</h3>
                <span className="px-3 py-1 text-xs tracking-widest uppercase font-medium ml-4 shrink-0 rounded-sm"
                  style={{ background: "hsl(var(--gold))", color: "hsl(var(--charcoal))" }}>
                  {lightbox.category}
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-6">{lightbox.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {lightbox.tags.map((t) => (
                  <span key={t} className="px-3 py-1.5 text-xs tracking-wide border border-white/15 text-white/50 rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
