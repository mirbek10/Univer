import './globals.css'
import { ToastProvider } from '@/shared/lib/useToast'
import { I18nProvider } from '@/shared/lib/useI18n'
import Header from '@/widgets/Header'
import Footer from '@/widgets/Footer'
import ToastContainerWidget from '@/widgets/ToastContainer'
import icon from "../public/favicon.svg"

const BASE_URL = 'https://kmmy.kg'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'КММУ — Кыргызский международный медицинский университет',
    template: '%s | КММУ',
  },
  description:
    'Кыргызский международный медицинский университет — ведущий медицинский вуз Кыргызстана. Аккредитован WFME. Программы по медицине, стоматологии, фармации и педиатрии в Бишкеке.',
  keywords: [
    'КММУ',
    'Кыргызский международный медицинский университет',
    'медицинский университет Кыргызстан',
    'медицинский вуз Бишкек',
    'поступление в медицинский',
    'стоматология',
    'педиатрия',
    'фармация',
    'лечебное дело',
    'WFME аккредитация',
  ],
  authors: [{ name: 'КММУ', url: BASE_URL }],
  creator: 'КММУ',
  publisher: 'Кыргызский международный медицинский университет',
  category: 'education',
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/icon", type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    locale: 'ru_RU',
    siteName: 'КММУ — Кыргызский международный медицинский университет',
    title: 'КММУ — Кыргызский международный медицинский университет',
    description:
      'Ведущий медицинский вуз Кыргызстана. Аккредитован WFME. Программы по медицине, стоматологии, фармации и педиатрии.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'КММУ — Кыргызский международный медицинский университет',
    description:
      'Ведущий медицинский вуз Кыргызстана. Аккредитован WFME. Программы по медицине, стоматологии, фармации и педиатрии.',
    site: '@kmmy_kg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '95d0345a5d36c216',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        
      </head>
      <body>
        <I18nProvider>
          <ToastProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <ToastContainerWidget />
          </ToastProvider>
        </I18nProvider>
      </body>
    </html>
  )
}