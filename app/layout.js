export const metadata = {
  title: "Uchenna's Blog",
  description: "Nigerian News - Entertainment, Sports, Gist, Jobs, Politics"
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}