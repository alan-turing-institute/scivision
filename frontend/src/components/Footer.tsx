import { FaCopyright, FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className="mx-auto flex max-w-3xl items-center justify-between border-t border-gray-200 px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="inline-flex items-center gap-2 text-sm text-gray-500 sm:text-left">
                    <FaCopyright />
                    <span className="font-mono">
                        Some text about Turing and/or SciVision.
                    </span>
                </div>
                <div className="inline-flex items-center gap-3 text-gray-500">
                    <Link to="#" className="text-gray-500 hover:text-scipurple">
                        <FaYoutube />
                    </Link>
                    <Link to="#" className="text-gray-500 hover:text-scipurple">
                        <FaGithub />
                    </Link>
                    <Link to="#" className="text-gray-500 hover:text-scipurple">
                        <FaTwitter />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
