import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'
import { Providers } from './providers'
import SideNav from '@/app/ui/components/sidenav'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-100`}>
        <Providers>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
