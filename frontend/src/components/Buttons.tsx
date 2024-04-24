import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'

type ContributeButtonProps = {
    link: string
}

export const ContributeButton = ({ link }: ContributeButtonProps) => {
    return (
        <Link to={link}>
            <button
                type="button"
                className="flex items-center rounded-md bg-scipurple px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-scipurple-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-scipurple-dark"
            >
                <FaGithub className="mr-2 h-6 w-6" />
                <span>Contribute via Github</span>
            </button>
        </Link>
    )
}
