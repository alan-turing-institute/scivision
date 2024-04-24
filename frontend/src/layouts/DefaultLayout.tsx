import { Outlet } from 'react-router'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Body from '@/components/Body'

// Component: The app
//
// Display the header and sidebar, and handle routing with React Router
const DefaultLayout = () => {
    return (
        <div className="min-h-full">
            <Header />
            <Body>
                <Outlet />
            </Body>
            <Footer />
        </div>
    )
}

export default DefaultLayout
