import { Outlet } from 'react-router'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Component: The app
//
// Display the header and sidebar, and handle routing with React Router
const HomeLayout = () => {
    return (
        <div className="min-h-full">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default HomeLayout
