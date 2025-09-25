import { FAQItem, ImpactMetric, PartnerLogo, Testimonial, TeamMember } from "@shared/api";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Amara",
    role: "Parent of 4-year-old",
    quote:
      "HeartStep gave my daughter the words and confidence to share her ideas. The change at home and preschool has been beautiful.",
    photoUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    alt: "Smiling parent holding child in warm sunlight",
  },
  {
    id: "t2",
    name: "Aleksandra",
    role: "Early Childhood Educator",
    quote:
      "The tools are practical and caring. I see quieter children participating more every week.",
    photoUrl:
      "./parent1.jpg",
    alt: "Teacher smiling in a classroom setting",
  },
  {
    id: "t3",
    name: "Merjen",
    role: "Speech Therapist",
    quote:
      "A warm, evidence-based approach that meets families where they are. Highly recommend.",
    photoUrl:
      "./parent2.jpg",
    alt: "Therapist smiling with natural light",
  },
  {
    id: "t4",
    name: "Sona",
    role: "Parent",
    quote:
      "Our son now initiates conversations at dinner. Small, consistent steps made a big difference.",
    photoUrl:
      "./parent3.jpg",
    alt: "Parent smiling at home in warm light",
  },
  {
    id: "t5",
    name: "Muhammet",
    role: "Kindergarten Teacher",
    quote:
      "HeartStep’s playful routines helped my quieter students connect with peers joyfully.",
    photoUrl:
      "./parent4.jpg",
    alt: "Teacher portrait with soft light",
  },
];

export const partners: PartnerLogo[] = [
  {
    id: "p1",
    name: "BrightStart",
    logoUrl: "https://dummyimage.com/120x40/ffeadc/ff8a65&text=BrightStart",
    alt: "BrightStart logo",
  },
  {
    id: "p2",
    name: "KinderCare+",
    logoUrl: "https://dummyimage.com/120x40/dcf7ea/4ba883&text=KinderCare+",
    alt: "KinderCare+ logo",
  },
  {
    id: "p3",
    name: "FamilyFirst",
    logoUrl: "https://dummyimage.com/120x40/ffe0d1/ff8a65&text=FamilyFirst",
    alt: "FamilyFirst logo",
  },
];

export const impact: ImpactMetric[] = [
  { id: "i1", label: "Number of Cards", value: +200 },
  { id: "i2", label: "number of specialists", value: 12 },
  { id: "i3", label: "Volunteer hours", value: 312 },
];

export const faqs: FAQItem[] = [
  {
    id: "f1",
    question: "Who is HeartStep for?",
    answer:
      "HeartStep supports children aged 3–7, their families, and early childhood educators seeking warm, practical tools for communication growth.",
  },
  {
    id: "f2",
    question: "How do I get involved?",
    answer:
      "You can register your child, volunteer with community sessions, or donate to sponsor materials and training.",
  },
  {
    id: "f3",
    question: "Is this evidence-based?",
    answer:
      "Yes. HeartStep blends child-led communication strategies with research-backed coaching for families and educators.",
  },
];

export const team: TeamMember[] = [
  {
    id: "m1",
    name: "Baynazar Muhammedov",
    role: "Project Manager",
    photoUrl: "./baynazar.jpg",
    alt: "Portrait of Program Director in warm light",
  },
  {
    id: "m2",
    name: "Jeyhun Jumashov",
    role: "Content Creator",
    photoUrl: "./Jeyhun_Jumashov.jpg",
    alt: "Portrait of educator smiling",
  },
  {
    id: "m3",
    name: "Aygul Sayilova",
    role: "Speech Therapist",
    photoUrl: "./aygul.jpg",
    alt: "Portrait of therapist",
  },
  {
    id: "m4",
    name: "Elena Garsula",
    role: "Community Lead",
    photoUrl: "./yelena.jpg",
    alt: "Сhild psychologist",
  },
  
];
