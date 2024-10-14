import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/header';




const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Suhel ali Portfolio',
  description: 'Welcome to the Portfolio of Suhelali Pakjade',
}

export default function RootLayout({ children }) {
  // const [started, setStarted] = useState(false);
  return (
    <html lang="en">
      
      <body className={inter.className}>
       

        <Header />
        {children}
        
      </body>
    </html>
  )
}
