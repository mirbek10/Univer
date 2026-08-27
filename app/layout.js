import './globals.css'
import { ToastProvider } from '@/shared/lib/useToast'
import { I18nProvider } from '@/shared/lib/useI18n'
import Header from '@/widgets/Header'
import Footer from '@/widgets/Footer'
import ToastContainerWidget from '@/widgets/ToastContainer'

export const metadata = {
  title: {
    default: 'КММУ — Кыргызский международный медицинский университет',
    template: '%s | КММУ',
  },
  description: 'Кыргызский международный медицинский университет — ведущий медицинский вуз Кыргызстана. Современные программы в медицине, стоматологии, фармации и педиатрии.',
  keywords: ['КММУ', 'Кыргызский международный медицинский университет', 'медицинский университет', 'образование', 'Бишкек', 'Кыргызстан'],
  authors: [{ name: 'КММУ' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Кыргызский международный медицинский университет',
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
