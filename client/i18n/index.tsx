import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "tm" | "ru" | "ms";
const SUPPORTED: Lang[] = ["en", "tm", "ru", "ms"];
const STORAGE_KEY = "hs_lang";

// Basic translator with dot-path lookup
function get(obj: any, path: string) {
  return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}

const translations = {
  en: {
    common: {
      brand: "HeartStep",
      join: "Join",
      support: "Support",
      register: "Register",
      volunteer: "Volunteer",
      donate: "Donate",
      privacy: "Privacy",
      terms: "Terms",
    },
    hero: {
      title: "Helping little hearts find their voice",
      b_sub: "Practical steps, playful practice, and caring community for early communication growth.",
      trusted: "Trusted by families, educators, and therapists",
      play: "Google Play",
      parentsGuide: "Parent's Guide",
    },
    problem: {
      heading: "Why HeartStep",
      p1: "Early years shape a lifetime. Many little ones struggle to express needs and feelings—and caregivers often feel unsure where to start.",
      p2: "HeartStep offers warm, practical steps that build everyday communication and confidence, one small win at a time.",
      items: {
        one: { stat: "1 in 5", label: "Children face communication challenges" },
        two: { stat: "3x", label: "Better outcomes with early support" },
        three: { stat: "90%", label: "Families report higher confidence" },
      },
    },
    how: {
      heading: "How it works",
      steps: [
        { title: "Connect", desc: "Tell us about your child and goals. We listen with care." },
        { title: "Plan", desc: "Get a warm, simple plan tailored for everyday moments." },
        { title: "Practice", desc: "Playful activities build skills at home and in class." },
        { title: "Celebrate", desc: "Track progress and cheer on growing confidence." },
      ],
    },
    benefits: {
      heading: "Benefits",
      items: [
        { title: "Trustworthy", desc: "Evidence-based methods delivered with warmth." },
        { title: "Practical", desc: "Simple steps that fit real family life." },
        { title: "Playful", desc: "Joyful practice that children love." },
        { title: "Community", desc: "Support for caregivers, teachers, and teams." },
      ],
    },
    testimonials: {
      heading: "Feedbacks",
      sub: "Warm words from families and educators.",
      items: {
        t1: { name: "Amara", role: "Parent of 4-year-old", quote: "HeartStep gave my daughter the words and confidence to share her ideas. The change at home and preschool has been beautiful.", alt: "Smiling parent holding child in warm sunlight" },
        t2: { name: "Luis", role: "Early Childhood Educator", quote: "The tools are practical and caring. I see quieter children participating more every week.", alt: "Teacher smiling in a classroom setting" },
        t3: { name: "Sofia", role: "Speech Therapist", quote: "A warm, evidence-based approach that meets families where they are. Highly recommend.", alt: "Therapist smiling with natural light" },
        t4: { name: "Dilan", role: "Parent", quote: "Our son now initiates conversations at dinner. Small, consistent steps made a big difference.", alt: "Parent smiling at home in warm light" },
        t5: { name: "Mira", role: "Kindergarten Teacher", quote: "HeartStep’s playful routines helped my quieter students connect with peers joyfully.", alt: "Teacher portrait with soft light" },
      },
    },
    team: { heading: "Team Members" },
    impact: {
      heading: "Our impact",
      labels: {
        i1: "Children supported",
        i2: "Classrooms engaged",
        i3: "Volunteer hours",
      },
      charts: { weekly: "Weekly participation growth", confidence: "Caregiver confidence" },
    },
    help: {
      heading: "Ways to help",
      register: { title: "Register", desc: "Start a warm, simple plan for your child." },
      volunteer: { title: "Volunteer", desc: "Share time and care in community sessions." },
      donate: { title: "Donate", desc: "Sponsor materials and training for families." },
    },
    faq: {
      heading: "FAQs",
      items: [
        { q: "Who is HeartStep for?", a: "HeartStep supports children aged 3–7, their families, and early childhood educators seeking warm, practical tools for communication growth." },
        { q: "How do I get involved?", a: "You can register your child, volunteer with community sessions, or donate to sponsor materials and training." },
        { q: "Is this evidence-based?", a: "Yes. HeartStep blends child-led communication strategies with research-backed coaching for families and educators." },
      ],
    },
    contact: {
      heading: "Contact us",
      sub: "We’d love to learn about your goals.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      newsletter: "Newsletter",
      newsletter_sub: "Short, helpful updates—no spam.",
      subscribe: "Subscribe",
      toast_contact: "Thanks! We'll be in touch soon.",
      toast_news: "Subscribed! Welcome to HeartStep.",
    },
    footer: { tagline: "Helping little hearts find their voice." },
  },
  tm: {
    common: {
      brand: "HeartStep",
      join: "Goşul",
      support: "Goldaw ber",
      register: "Hasaba al",
      volunteer: "Gönüllü bol",
      donate: "Bagyşla",
      privacy: "Gizlinlik",
      terms: "Şertler",
    },
    hero: {
      title: "Kiçi ýürekleriň ses tapmagyna ýardam edýäris",
      a_sub: "Erken medeniýet üçin maşgala we mugallymlar üçin mähirli, ynamly goldaw.",
      b_sub: "Amaly ädimler, oýnaýyş tejribesi we aladaly jemgyýet arkaly irki aragatnaşyk ösüşi.",
      trusted: "Maşgalalar, mugallymlar we terapevtler tarapyndan ynanylýar",
      play: "Google Play",
      parentsGuide: "Parent's Guide",
    },
    problem: {
      heading: "Näme üçin HeartStep",
      p1: "Erken ýyllar ömre täsir edýär. Käbir çagalara mätäçliklerini aýdmak kyn – hossarlar nireden başlamalydygyny bilmeýär.",
      p2: "HeartStep gündelik aragatnaşygy we öz-özüňe ynamy gurýan mähirli, amaly ädimleri hödürleýär.",
      items: {
        one: { stat: "5-den 1-si", label: "Çagalaryň biri aragatnaşykda kynçylyk görýär" },
        two: { stat: "3x", label: "Erken goldaw bilen netijeler ýokarlanýar" },
        three: { stat: "90%", label: "Maşgalalaryň köpüsi ýokary ynam habar berýär" },
      },
    },
    how: {
      heading: "Näme edip işleýär",
      steps: [
        { title: "Baglanyşyk", desc: "Çagaňyz we maksatlaryňyz barada gürrüň beriň – üns bilen diňleýäris." },
        { title: "Meýilnama", desc: "Gündelik pursatlar üçin ýönekeý, mähirli meýilnama alyň." },
        { title: "Maslahat", desc: "Oýunly işjeňlik öýde we synpda endikleri ösdürýär." },
        { title: "Bilelikde begendik", desc: "Ösüşi yzarlaň we artýan ynamy bilelikde belleň." },
      ],
    },
    benefits: {
      heading: "Üstünlikler",
      items: [
        { title: "Ynamly", desc: "Subutnamalara esaslanýan usullar – mähir bilen." },
        { title: "Amaly", desc: "Hakyky maşgala durmuşy üçin ýönekeý ädimler." },
        { title: "Oýunly", desc: "Çagalaryň halýan şat praktikasy." },
        { title: "Jemgyýet", desc: "Hossarlar we mugallymlar üçin goldaw." },
      ],
    },
    testimonials: {
      heading: "Teswirler",
      sub: "Maşgalalardan we mugallymlardan mähirli s��zler.",
      items: {
        t1: { name: "Amara", role: "4 ýaşly çaganyň ene-atasy", quote: "HeartStep gyzyma pikirlerini paýlaşmaga sözleri we öz-özüne ynamy berdi. Öýde we bagçada üýtgeşme örän owadan boldy.", alt: "Mähirli gün şöhlesinde çagasyny gujaklaýan ýylgyryan ene-ata" },
        t2: { name: "Luis", role: "Irki çagalyk mugallymy", quote: "Gurallar amaly we aladaly. Has ýuwaş çagalaryň her hepde has işjeň gatnaşýandygyny görýärin.", alt: "Synp otagynda ýylgyryp duran mugallym" },
        t3: { name: "Sofia", role: "Nutuk terapevti", quote: "Maşgalalary ýagdaýynda garşy alýan, subutnamalara esaslanýan mähirli çemeleşme. Gaty maslahat berýärin.", alt: "Prirodaly ýagtylykda ýylgyrýan terapevt" },
        t4: { name: "Dilan", role: "Ene-ata", quote: "Oglumyz indi agşamlykda söhbeti özi başlaýar. Kiçi, yzygiderli ädimler uly tapawut döretdi.", alt: "Öýde mähirli ýagtylykda ýylgyrýan ene-ata" },
        t5: { name: "Mira", role: "Bagça mugallymy", quote: "HeartStep-iň oýunly endikleri utanjaň okuwçylarymy deň-duşlary bilen şatlyk bilen baglanyşdyrdy.", alt: "Ýumşak ýagtylykda mugallymyň portreti" },
      },
    },
    team: { heading: "Topar agzalary" },
    impact: {
      heading: "Täsirimiz",
      labels: { i1: "Goldanylan çagalar", i2: "Synplar gatnaşdy", i3: "Gönüllü sagatlar" },
      charts: { weekly: "Hepdelik gatnaşmak artýar", confidence: "Hossarlaryň ynamy" },
    },
    help: {
      heading: "Näme bilen kömek etmek",
      register: { title: "Hasaba al", desc: "Çagaňyz üçin ýönekeý, mähirli meýilnama başlaň." },
      volunteer: { title: "Gönüllü bol", desc: "Jemgyýet seanslarynda wagtyňyzy paýlaşyň." },
      donate: { title: "Bagyşla", desc: "Materiallary we okuwlary goldaň." },
    },
    faq: {
      heading: "Soraglar",
      items: [
        { q: "HeartStep kime niýetlenendir?", a: "HeartStep 3–7 ýaşly çagalara, maşgalalara we irki çagalyk mugallymlaryna goldaw berýär." },
        { q: "Nädip gatnaşyp bilerin?", a: "Çagaňyzy hasaba alyp bilersiňiz, gönüllü bolup bilersiňiz ýa-da goldaw berip bilersiňiz." },
        { q: "Ylmy esas barmy?", a: "Hawa. HeartStep barlaglara esaslanýan maşgalalar we mugallymlar üçin usullary birleşdirýär." },
      ],
    },
    contact: {
      heading: "Biziň bilen habarlaşyň",
      sub: "Maksatlaryňyz barada eşitmek isleýäris.",
      name: "Ady",
      email: "Email",
      message: "Habar",
      send: "Ugrat",
      newsletter: "Täzelikler",
      newsletter_sub: "Gysga peýdaly täzelikler – spam ýok.",
      subscribe: "Ýazyl",
      toast_contact: "Sag boluň! Gysgalykda jogap bereris.",
      toast_news: "Abuna ýazylanyňyz üçin sag boluň!",
    },
    footer: { tagline: "Kiçi ýürekleriň ses tapmagyna ýardam edýäris." },
  },
  ru: {
    common: { brand: "HeartStep", join: "Присоединиться", support: "Поддержать", register: "Зарегистрировать", volunteer: "Волонтёрство", donate: "Пожертвовать", privacy: "Политика", terms: "Условия" },
    hero: {
      title: "PECS карточки для развития детей",
      b_sub: "Помогаем детям изучать слова, предложения и улучшать общение с помощью системы общения через обмен карточками",
      trusted: "Нам доверяют семьи, педагоги и терапевты",
      play: "Google Play",
      parentsGuide: "Руководство для родителей",
    },
    problem: {
      heading: "Почему HeartStep",
      p1: "Ранние годы формируют жизнь. Многим детям трудно выразить потребности, а взрослые не знают, с чего начать.",
      p2: "HeartStep предлагает тёплые, простые шаги, укрепляющие ежедневную коммуникацию и уверенность.",
      items: {
        one: { stat: "3", label: "Поддерживаемые языки" },
        two: { stat: "4.8/5", label: "Средний рейтинг" },
        three: { stat: "8", label: "Психологи-партнеры" },
      },
    },
    how: { heading: "Как это работает", steps: [ { title: "Связаться", desc: "Расскажите о ребёнке и целях. Мы внимательно слушаем." }, { title: "План", desc: "Получите простой и тёплый план для повседневных моментов." }, { title: "Практика", desc: "Игровые занятия развивают навыки дома и в классе." }, { title: "Празднуем", desc: "Отслеживаем прогресс и радуемся уверенности." } ] },
    benefits: { heading: "Преимущества", items: [ { title: "Легко настраивать", desc: "Создавайте индивидуальные карточки, адаптированные под конкретные потребности и стиль общения вашего ребенка." }, { title: "Несколько языков", desc: "Наше приложение поддерживает 3 языка, помогая детям общаться по всему миру." }, { title: "Просто в использовании", desc: "Простой и интуитивно понятный интерфейс, разработанный специально для детей и воспитателей." }, { title: "Разработано экспертами", desc: "Создано при участии логопедов и специалистов в области образования." } ] },
    testimonials: {
      heading: "Отзывы",
      sub: "Тёплые слова от семей и педагогов.",
      items: {
        t1: { name: "Amara", role: "Родитель 4‑летнего ребёнка", quote: "HeartStep дал моей дочери слова и уверенность, чтобы делиться идеями. Изменения дома и в садике — просто чудо.", alt: "Улыбающийся родитель д��ржит ребёнка на тёплом солнце" },
        t2: { name: "Luis", role: "Педагог дошкольного образования", quote: "Инструменты практичные и заботливые. Я вижу, как более тихие дети участвуют всё активнее каждую неделю.", alt: "Учитель улыбается в классе" },
        t3: { name: "Sofia", role: "Логопед", quote: "Тёплый, основанный на доказательствах подход, который встречает семьи там, где они есть. Очень рекомендую.", alt: "Терапевт улыбается при естественном освещении" },
        t4: { name: "Dilan", role: "Родитель", quote: "Наш сын теперь начинает разговоры за ужином. Маленькие, но постоянные шаги дали большой результат.", alt: "Родитель улыбается дома в тёплом свете" },
        t5: { name: "Mira", role: "Воспитатель детского сада", quote: "Игровые рутины HeartStep помогли моим более застенчивым ученикам радостно сближаться со сверстниками.", alt: "Портрет учителя в мягком свете" },
      },
    },
    team: { heading: "Наша команда" },
    impact: { heading: "Наше влияние", labels: { i1: "Число скачиваний приложений", i2: "Количество карточек", i3: "Количество скачиваний GuideBook" }, charts: { weekly: "Рост участия по неделям", confidence: "Уверенность заботящихся" } },
    help: { heading: "Как помочь", register: { title: "Зарегистрировать", desc: "Начните тёплый, простой план для ребёнка." }, volunteer: { title: "Волонтёрство", desc: "Поделитесь временем на встречах сообщества." }, donate: { title: "Пожертвовать", desc: "Поддержите материалы и обучение." } },
    faq: { heading: "Вопросы и ответы", items: [ { q: "Для кого HeartStep?", a: "Для детей 3–7 лет, их семей и педагогов дошкольного образования." }, { q: "Как присоединиться?", a: "Зарегистрируйте ребёнка, станьте волонтёром или поддержите пожертвованием." }, { q: "Есть ли научная база?", a: "Да. HeartStep сочетает стратегии, основанные на исследованиях, для семей и педагогов." } ] },
    contact: { heading: "Свяжитесь с нами", sub: "Мы хотим узнать о ваших целях.", name: "Имя", email: "Email", message: "Сообщение", send: "Отправить", newsletter: "Рассылка", newsletter_sub: "Короткие полезные письма — без спама.", subscribe: "Подписаться", toast_contact: "Спасибо! Мы скоро свяжемся.", toast_news: "Подписка оформлена!" },
    footer: { tagline: "Помогаем маленьким сердцам обрести голос." },
  },
  ms: {
    common: { brand: "HeartStep", join: "Sertai", support: "Sokong", register: "Daftar", volunteer: "Sukarelawan", donate: "Derma", privacy: "Privasi", terms: "Terma" },
    hero: {
      title: "Membantu hati kecil menemukan suara",
      b_sub: "Langkah praktikal, latihan menyeronokkan, dan komuniti yang prihatin.",
      trusted: "Dipercayai keluarga, pendidik dan ahli terapi di seluruh dunia",
      play: "Google Play",
      parentsGuide: "Panduan Ibu Bapa",
    },
    problem: { heading: "Mengapa HeartStep", p1: "Tahun awal membentuk kehidupan. Ramai kanak-kanak sukar menyatakan keperluan, dan penjaga tidak pasti dari mana hendak bermula.", p2: "HeartStep menawarkan langkah hangat dan praktikal yang membina komunikasi dan keyakinan setiap hari.", items: { one: { stat: "1 dari 5", label: "Kanak-kanak menghadapi cabaran komunikasi" }, two: { stat: "3x", label: "Hasil lebih baik dengan sokongan awal" }, three: { stat: "90%", label: "Keluarga melaporkan keyakinan yang lebih tinggi" } } },
    how: { heading: "Cara ia berfungsi", steps: [ { title: "Hubung", desc: "Ceritakan tentang anak dan matlamat anda. Kami mendengar dengan prihatin." }, { title: "Rancang", desc: "Dapatkan pelan ringkas dan hangat untuk detik harian." }, { title: "Amal", desc: "Aktiviti menyeronokkan membina kemahiran di rumah dan kelas." }, { title: "Raikan", desc: "Jejak kemajuan dan raikan keyakinan yang berkembang." } ] },
    benefits: { heading: "Manfaat", items: [ { title: "Dipercayai", desc: "Kaedah berasaskan bukti dengan sentuhan mesra." }, { title: "Praktikal", desc: "Langkah mudah sesuai kehidupan keluarga." }, { title: "Seronok", desc: "Amalan yang disukai kanak-kanak." }, { title: "Komuniti", desc: "Sokongan untuk penjaga dan pendidik." } ] },
    testimonials: {
      heading: "Maklum Balas",
      sub: "Kata-kata hangat daripada keluarga dan pendidik.",
      items: {
        t1: { name: "Amara", role: "Ibu bapa kepada anak 4 tahun", quote: "HeartStep memberi anak perempuan saya kata-kata dan keyakinan untuk berkongsi idea. Perubahan di rumah dan prasekolah sangat indah.", alt: "Ibu bapa tersenyum memeluk anak dalam cahaya hangat" },
        t2: { name: "Luis", role: "Pendidik Awal Kanak-kanak", quote: "Alatnya praktikal dan penuh empati. Saya lihat kanak-kanak yang lebih pendiam semakin banyak mengambil bahagian setiap minggu.", alt: "Guru tersenyum di dalam kelas" },
        t3: { name: "Sofia", role: "Ahli Terapi Pertuturan", quote: "Pendekatan yang hangat dan berasaskan bukti yang bertemu keluarga di mana mereka berada. Sangat disyorkan.", alt: "Ahli terapi tersenyum dengan cahaya semula jadi" },
        t4: { name: "Dilan", role: "Ibu bapa", quote: "Anak lelaki kami kini memulakan perbualan semasa makan malam. Langkah kecil yang konsisten membawa perbezaan besar.", alt: "Ibu bapa tersenyum di rumah dalam cahaya hangat" },
        t5: { name: "Mira", role: "Guru Tadika", quote: "Rutin bermain HeartStep membantu murid saya yang lebih pemalu berhubung dengan rakan sebaya dengan gembira.", alt: "Potret guru dalam cahaya lembut" },
      },
    },
    team: { heading: "Ahli Pasukan" },
    impact: { heading: "Kesan kami", labels: { i1: "Kanak-kanak disokong", i2: "Kelas terlibat", i3: "Jam sukarelawan" }, charts: { weekly: "Pertumbuhan penyertaan mingguan", confidence: "Keyakinan penjaga" } },
    help: { heading: "Cara membantu", register: { title: "Daftar", desc: "Mulakan pelan ringkas dan hangat untuk anak anda." }, volunteer: { title: "Sukarelawan", desc: "Sumbang masa dalam sesi komuniti." }, donate: { title: "Derma", desc: "Taja bahan dan latihan." } },
    faq: { heading: "Soalan Lazim", items: [ { q: "Untuk siapa HeartStep?", a: "Untuk kanak-kanak 3–7 tahun, keluarga mereka, dan pendidik awal kanak-kanak." }, { q: "Bagaimana untuk terlibat?", a: "Daftar anak anda, jadi sukarelawan, atau derma untuk sokong program." }, { q: "Adakah berasaskan bukti?", a: "Ya, kami gabungkan strategi berasaskan penyelidikan untuk keluarga dan pendidik." } ] },
    contact: { heading: "Hubungi kami", sub: "Kami ingin tahu matlamat anda.", name: "Nama", email: "Emel", message: "Mesej", send: "Hantar", newsletter: "Surat berita", newsletter_sub: "Kemas kini ringkas dan bermanfaat — tanpa spam.", subscribe: "Langgan", toast_contact: "Terima kasih! Kami akan hubungi anda.", toast_news: "Langganan berjaya!" },
    footer: { tagline: "Membantu hati kecil menemukan suara." },
  },
} as const;

export interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => any;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const fromStorage = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Lang | null;
    return (fromStorage && SUPPORTED.includes(fromStorage) ? fromStorage : "en");
  });
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  };
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);
  const t = useMemo(() => (key: string) => get(translations[lang], key) ?? get(translations.en, key) ?? key, [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "tm", label: "TM" },
  { code: "ru", label: "RU" },
  { code: "ms", label: "MS" },
];
