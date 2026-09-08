export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://kmmu.kg/sitemap.xml',
    host: 'https://kmmu.kg',
  }
}
