// import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom'

import {
    StarIcon,
    TableCellsIcon,
    RectangleGroupIcon,
} from '@heroicons/react/24/outline'

import { PageTitle } from '@/components/Typography'

const actions = [
    {
        title: 'Contribute a new model',
        href: '/new-model',
        icon: RectangleGroupIcon,
        text: 'Add some text about contributing a new model',
    },
    {
        title: 'Add a new data source',
        href: '/new-datasource',
        icon: TableCellsIcon,
        text: 'Add some text about adding a new data source',
    },
    {
        title: 'Add a new project',
        href: '/new-project',
        icon: StarIcon,
        text: 'Add some text about adding a new project',
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Contribute() {
    return (
        <>
            <PageTitle>Contribute a catalog entry</PageTitle>

            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-1 sm:gap-px sm:divide-y-0 md:grid-cols-3">
                {actions.map((action, actionIdx) => (
                    <div
                        key={action.title}
                        className={classNames(
                            actionIdx === 0
                                ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                                : '',
                            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                            actionIdx === actions.length - 2
                                ? 'sm:rounded-bl-lg'
                                : '',
                            actionIdx === actions.length - 1
                                ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                                : '',
                            'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                        )}
                    >
                        <div>
                            <span className="inline-flex rounded-lg bg-scipurple p-3 text-white ring-4 ring-white">
                                <action.icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                <Link
                                    to={action.href}
                                    className="focus:outline-none"
                                >
                                    {/* Extend touch target to entire panel */}
                                    <span
                                        className="absolute inset-0"
                                        aria-hidden="true"
                                    />
                                    {action.title}
                                </Link>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 md:text-base">
                                {action.text}
                            </p>
                        </div>
                        <span
                            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                        </span>
                    </div>
                ))}
            </div>
        </>
    )
}
