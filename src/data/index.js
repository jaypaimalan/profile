import { IC } from '../icons'

export const NAV = [
  { label: 'Home',    icon: IC.home,    id: 'sec-home'    },
  { label: 'About',   icon: IC.about,   id: 'sec-about'   },
  { label: 'Works',   icon: IC.works,   id: 'sec-works'   },
  { label: 'Contact', icon: IC.contact, id: 'sec-contact' },
]

export const EXPERIENCE = [
  {
    role: 'WordPress Developer',
    company: 'Proweaver Inc.',
    location: 'Cebu City, Philippines',
    period: 'Sep 2023 – Jan 2026',
    bullets: [
      'Developed performance-optimized WordPress websites using Elementor, HTML, CSS, JavaScript, and PHP',
      'Converted Figma designs into pixel-perfect, responsive website layouts',
      'Implemented on-page and technical SEO best practices to improve ranking and visibility',
      'Ensured cross-browser compatibility, accessibility compliance, and mobile-first responsiveness',
      'Integrated WooCommerce, ACF, CPTs, and custom plugin configurations for extended functionality',
      'Collaborated with designers and PMs to deliver fast iterations while maintaining code quality',
      'Managed deployments using Git workflows and cPanel hosting (HostGator)',
    ],
  },
  {
    role: '2D Animator',
    company: 'Honey Entertainment Inc.',
    location: 'Cebu City, Philippines',
    period: 'Jul 2019 – Dec 2022',
    bullets: [
      'Produced high-quality 2D animations with strong visual storytelling and timing principles',
      'Enhanced creative discipline and attention to detail, improving later front-end development precision',
      'Delivered animation assets under tight production timelines while maintaining consistency',
      'Collaborated with creative directors and storyboard teams on multi-episode projects',
    ],
  },
]

export const SKILLS = [
  {
    category: 'Front-End',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap', 'TailwindCSS', 'Responsive / Mobile-First Development', 'Cross-Browser Compatibility'
    ],
  },
  {
    category: 'WordPress & CMS',
    items: [
      'Shopify', 'Webflow', 'Framer', 'PHP', 'Elementor', 'Divi', 'WPBakery', 'Cornerstone',
      'WooCommerce', 'ACF', 'Shopify', 'Custom Post Types', 'Custom Themes'
    ],
  }, 
  {
    category: 'Tools & Optimization',
    items: [
      'Git', 'Figma', 'Canva', 'Google Analytics', 'Google Search Console',
      'Google Tag Manager', 'SEO (On-page & Technical)', 'Core Web Vitals',
      'UX & Accessibility', 'cPanel / HostGator Deployment', 'AI-Assisted Development'
    ],
  },
]

export const WORKS = [
  {
    title: 'Hope College of Arts and Sciences',
    type: 'Healthcare Education · School & Training Site',
    bg: 'linear-gradient(145deg,#5ecfca,#30a89e)',
    accent: '#5ecfca',
    link: 'https://www.hcas.edu/',
    imgsrc: '/thumbnails/newproject1.png',
  },
  {
    title: 'Septic Cleaning Insurance Group',
    type: 'Insurance Services · Lead Generation Site',
    bg: 'linear-gradient(145deg,#f5c5ae,#e8a07a)',
    accent: '#ec4899',
    link: 'https://septiccleaninginsurance.com/',
    imgsrc: '/thumbnails/newproject2.png',
  },
  {
    title: 'Wee Care Daycare',
    type: 'Childcare Center · Local Services Site',
    bg: 'linear-gradient(145deg,#f5c5ae,#e8a07a)',
    accent: '#ec4899',
    link: 'https://www.weecaredc.com/',
    imgsrc: '/thumbnails/project6.png',
  },  
  {
    title: 'TaiVenture Childcare',
    type: 'Childcare & Education · Service Site',
    bg: 'linear-gradient(145deg,#5ecfca,#30a89e)',
    accent: '#5ecfca',
    link: 'https://www.taiventurechildcare.com/',
    imgsrc: '/thumbnails/project1.png',
  },
  {
    title: 'Goschen Angels Home Care',
    type: 'Home Health Care · Service Site',
    bg: 'linear-gradient(145deg,#f5c5ae,#e8a07a)',
    accent: '#ec4899',
    link: 'https://www.goschenangelshomecare.com/',
    imgsrc: '/thumbnails/project2.png',
  },
  {
    title: 'Restoration Medical Supply, LLC',
    type: 'Medical Supply · E-Commerce Store',
    bg: 'linear-gradient(145deg,#f5c5ae,#e8a07a)',
    accent: '#ec4899',
    link: 'https://www.restorationmedsupply.com/',
    imgsrc: '/thumbnails/project11.png',
  },
  {
    title: 'Greater Caring Provider Helpers',
    type: 'Virtual Healthcare · Service Site',
    bg: 'linear-gradient(145deg,#5ecfca,#30a89e)',
    accent: '#5ecfca',
    link: 'https://www.greatercaringproviderhelpersllc.com/',
    imgsrc: '/thumbnails/project5.png',
  },
  {
    title: 'Touching Lives Ministries',
    type: 'Home Health Care · Service Site',
    bg: 'linear-gradient(145deg,#f5c5ae,#e8a07a)',
    accent: '#ec4899',
    link: 'https://www.touchinglivesministries.org/',
    imgsrc: '/thumbnails/newproject3.png',
  },
  {
    title: 'Jullok Lux',
    type: 'Medical Spa · Beauty & Aesthetics Site',
    bg: 'linear-gradient(145deg,#f5c5ae,#e8a07a)',
    accent: '#ec4899',
    link: 'https://www.jullokluxbeauty.com/',
    imgsrc: '/thumbnails/project10.png',
  },
]

export const CONTACT_INFO = [
  { icon: IC.mail,  label: 'EMAIL',    value: 'jaypaimalan@gmail.com',       href: 'mailto:jaypaimalan@gmail.com' },
  { icon: IC.phone, label: 'PHONE',    value: '+63 946 261 8278',             href: 'tel:+639462618278' },
  { icon: IC.pin,   label: 'LOCATION', value: 'Lapu-Lapu City, Cebu, Philippines', href: null },
]

export const SOCIAL_LINKS = [
  { href: 'mailto:jaypaimalan@gmail.com',        icon: IC.mail,     title: 'Email'    },
  { href: 'https://github.com/jaypaimalan',      icon: IC.github,   title: 'GitHub'   },
  { href: 'https://linkedin.com/in/francis-paimalan', icon: IC.linkedin, title: 'LinkedIn' },
]