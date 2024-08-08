import { Link } from 'react-router-dom'

import { TaskBadge, UsageBadge } from '@/components/Badges'

import {
    fallbackThumbnail,
    extractThumbnailFromName,
} from '@/utils/ExtractThumbnails'

type CardProps = {
    name: string
    type: 'model' | 'datasource' | 'project'
    description?: string
    tasks?: string[]
    scivision_usable?: boolean
    labels_provided?: boolean
    tags?: string[]
    domains?: string[]
    institution?: string
    header?: string
}

const Card = ({
    name,
    description,
    tasks,
    scivision_usable,
    type,
}: CardProps) => {
    const thumbnailFromName = extractThumbnailFromName(type, name)

    return (
        <div key={name} className="group relative">
            <Link to={`/${type}/` + encodeURIComponent(name)}>
                <div className="aspect-square w-1/2 overflow-hidden rounded-md bg-gray-200 shadow-sm group-hover:opacity-75 md:w-full">
                    {thumbnailFromName === undefined ||
                    thumbnailFromName.endsWith('undefined') ? (
                        fallbackThumbnail(name)
                    ) : (
                        <img
                            // src={new URL(thumbnailFromName, import.meta.url).href}
                            src={`/catalog/data/thumbnails/${type}s/${name}.jpg`}
                            alt={name}
                            className="h-full w-full object-cover object-center"
                        />
                    )}
                </div>
            </Link>
            <h3 className="mt-4 break-words font-mono text-gray-700">{name}</h3>

            <p className="mb-2 mt-1 text-sm text-gray-500 md:min-h-20 md:text-base">
                {description}
            </p>

            <Link to={`/${type}/` + encodeURIComponent(name)}>
                <button
                    type="button"
                    className="w-full rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-scipurple shadow-sm ring-1 ring-inset ring-scipurple hover:bg-gray-50 md:text-base"
                >{`View ${type}`}</button>
            </Link>
            <div className="my-4">
                <UsageBadge usageBool={scivision_usable} />
                {tasks?.map((task) => <TaskBadge taskName={task} key={task} />)}
            </div>
        </div>
    )
}

export default Card

export const CardSidebar = ({
    name,
    description,
    tasks,
    scivision_usable,
    type,
    header,
}: CardProps) => {
    const thumbnailFromName = extractThumbnailFromName(type, name)

    return (
        <div key={name} className="group relative border-b-2 border-gray-300">
            <Link
                to={`/${type}/` + encodeURIComponent(name)}
                className="text-black no-underline"
            >
                <h3 className="mt-4 break-words font-semibold">{header}</h3>
            </Link>
            <div className="flex">
                <div className="mr-4 aspect-square w-5/12 overflow-hidden rounded-md bg-gray-200 shadow-sm group-hover:opacity-75">
                    {thumbnailFromName === undefined ||
                    thumbnailFromName.endsWith('undefined') ? (
                        fallbackThumbnail(name)
                    ) : (
                        <img
                            // src={new URL(thumbnailFromName, import.meta.url).href}
                            src={`/catalog/data/thumbnails/${type}s/${name}.jpg`}
                            alt={name}
                            className="h-full w-full object-cover object-center"
                        />
                    )}
                </div>
                <div className="w-3/4">
                    <p className="my-2 text-sm text-gray-500 md:text-base">
                        {description}
                    </p>
                    <Link to={`/${type}/` + encodeURIComponent(name)}>
                        <button
                            type="button"
                            className="w-full rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-scipurple shadow-sm ring-1 ring-inset ring-scipurple hover:bg-gray-50"
                        >{`View ${type}`}</button>
                    </Link>
                </div>
            </div>

            <div className="my-4">
                <UsageBadge usageBool={scivision_usable} />
                {tasks?.map((task) => <TaskBadge taskName={task} key={task} />)}
            </div>
        </div>
    )
}

export const ProjectCard = ({
    name,
    description,
    tasks,
    scivision_usable,
    type,
    header,
}: CardProps) => {
    const thumbnailFromName = extractThumbnailFromName(type, name)

    return (
        <div key={name} className="group relative">
            <div className="flex">
                <div className="w-5/12">
                    <div className=" mr-4 aspect-square overflow-hidden rounded-md shadow-sm group-hover:opacity-75">
                        {thumbnailFromName === undefined ||
                        thumbnailFromName.endsWith('undefined') ? (
                            fallbackThumbnail(name)
                        ) : (
                            <img
                                // src={new URL(thumbnailFromName, import.meta.url).href}
                                src={`/catalog/data/thumbnails/${type}s/${name}.jpg`}
                                alt={name}
                                className="h-full w-full object-cover object-center"
                            />
                        )}
                    </div>
                </div>
                <div className="w-3/4">
                    <Link
                        to={`/${type}/` + encodeURIComponent(name)}
                        className="text-black no-underline"
                    >
                        <h3 className="mt-4 break-words font-semibold">
                            {header}
                        </h3>
                    </Link>
                    <p className="my-2 text-sm text-gray-500 md:text-base">
                        {description}
                    </p>
                    <Link to={`/${type}/` + encodeURIComponent(name)}>
                        <button
                            type="button"
                            className="w-full rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-scipurple shadow-sm ring-1 ring-inset ring-scipurple hover:bg-gray-50"
                        >{`View ${type}`}</button>
                    </Link>
                </div>
            </div>
            <div className="my-4">
                <UsageBadge usageBool={scivision_usable} />
                {tasks?.map((task) => <TaskBadge taskName={task} key={task} />)}
            </div>
        </div>
    )
}

export const MiniCard = ({ name, type }: CardProps) => {
    const thumbnailFromName = extractThumbnailFromName(type, name)

    return (
        <div key={name} className="group relative">
            <h3 className="my-2 break-words text-gray-700">{name}</h3>
            <Link to={`/${type}/` + encodeURIComponent(name)}>
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 shadow-sm group-hover:opacity-75">
                    {thumbnailFromName === undefined ||
                    thumbnailFromName.endsWith('undefined') ? (
                        fallbackThumbnail(name)
                    ) : (
                        <img
                            // src={new URL(thumbnailFromName, import.meta.url).href}
                            src={`/catalog/data/thumbnails/${type}s/${name}.jpg`}
                            alt={name}
                            className="h-full w-full object-cover object-center"
                        />
                    )}
                </div>
            </Link>

            <Link to={`/${type}/` + encodeURIComponent(name)}>
                <button
                    type="button"
                    className="mt-4 w-full rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-scipurple shadow-sm ring-1 ring-inset ring-scipurple hover:bg-gray-50"
                >{`View ${type}`}</button>
            </Link>
        </div>
    )
}
