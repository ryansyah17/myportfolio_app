import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    {/* pt-20 agar konten tidak tertutup navbar fixed */}
    <main className="pt-20">
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default Layout