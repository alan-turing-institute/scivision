import { FaCopyright, FaGithub} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className="mx-auto flex max-w-3xl items-center justify-between border-t border-gray-200 px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="inline-flex items-center gap-2 text-sm text-gray-500 sm:text-left">
                    <FaCopyright />
                    <span className="font-mono">
                        The Scivision Project was founded by <a href="https://www.turing.ac.uk/">
                        The Alan Turing Institute
                    </a>
                    </span>
                </div>
                <div className="inline-flex items-center gap-3 text-gray-500">
                    <Link to="https://github.com/alan-turing-institute/scivision" className="text-gray-500 hover:text-scipurple">
                        <FaGithub />
                    </Link>                    
                </div>
            </div>
        </footer>
    )
}

export default Footer
