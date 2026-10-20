export const metadata = {
  title: "Uchenna's Blog - My Voice, Nigeria's Stories",
  description: "Naija News, Gist, Jobs"
}
export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-white">{children}</body>
    </html>
  )
}
