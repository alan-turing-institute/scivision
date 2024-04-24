import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { TagBadge, TaskBadge, UsageBadge } from '@/components/Badges'

import {
    extractThumbnailFromName,
    fallbackThumbnail,
} from '@/utils/ExtractThumbnails'
import { PageTitle } from '@/components/Typography'
import { MiniCard } from '@/components/Card'

import ReactMarkdown from 'react-markdown'

type ModelSingleViewProps = {
    name: string
    type: 'model' | 'datasource' | 'project'
    description: string
    tasks: string[]
    scivision_usable: boolean
    url: string
    pkg_url: string
}

export function ModelSingleView({
    name,
    type,
    description,
    tasks,
    scivision_usable,
    url,
    pkg_url,
}: ModelSingleViewProps) {
    useEffect(() => {
        window.Prism?.highlightAll()
    })
    const thumbnailFromName = extractThumbnailFromName(type, name)

    const scivision_code = scivision_usable ? (
        <>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                    Use me with{' '}
                    <Link to="https://scivision.readthedocs.io/en/latest/api.html">
                        Scivision.Py
                    </Link>
                    :
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <pre>
                        <code className="language-python">
                            from scivision import load_pretrained_model
                        </code>
                    </pre>
                    <pre>
                        <code className="language-python">
                            load_pretrained_model("{url}")
                        </code>
                    </pre>
                </dd>
            </div>
        </>
    ) : (
        <></>
    )

    return (
        <div>
            <div className="px-4 sm:px-0">
                <PageTitle>{name}</PageTitle>

                <div className="mr-4 aspect-square w-full overflow-hidden rounded-md bg-gray-200 shadow-sm group-hover:opacity-75 md:w-1/4">
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
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Description
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
                            {description ? description : 'No description given'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Tasks
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                <UsageBadge usageBool={scivision_usable} />
                                {tasks.map((task) => (
                                    <TaskBadge taskName={task} key={task} />
                                ))}
                            </div>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Website
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <Link to={url}>{url}</Link>
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Install with pip
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <pre>
                                <code className="language-python">
                                    pip install {pkg_url}
                                </code>
                            </pre>
                        </dd>
                    </div>
                    {scivision_code}
                </dl>
            </div>
        </div>
    )
}

type DatasourceSingleViewProps = {
    name: string
    type: 'model' | 'datasource' | 'project'
    description: string
    tasks: string[]
    tags: string[]
    labels_provided: boolean
    url: string
    institution: string[]
    domains?: string[]
}

export function DatasourceSingleView({
    name,
    type,
    description,
    tasks,
    tags,
    url,
    institution,
    domains,
}: DatasourceSingleViewProps) {
    useEffect(() => {
        window.Prism?.highlightAll()
    })
    const thumbnailFromName = extractThumbnailFromName(type, name)

    return (
        <div>
            <div className="px-4 sm:px-0">
                <PageTitle>{name}</PageTitle>

                <div className="mr-4 aspect-square w-full overflow-hidden rounded-md bg-gray-200 shadow-sm group-hover:opacity-75 md:w-1/4">
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
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Description
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {description ? description : 'No description given'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900 md:text-base">
                            Tasks
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                {tasks.map((task) => (
                                    <TaskBadge taskName={task} key={task} />
                                ))}
                            </div>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Tags
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                {tags.map((tag) => (
                                    <TagBadge tagName={tag} key={tag} />
                                ))}
                            </div>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Website
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <Link to={url}>{url}</Link>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Domain(s):
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="gap-2 divide-y divide-dashed">
                                {domains?.map((domain) => (
                                    <div key={domain}>{domain}</div>
                                ))}
                            </div>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900 md:text-base">
                            Institution(s):
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="gap-2 divide-y divide-dashed">
                                {institution?.map((institution) => (
                                    <div key={institution}>{institution}</div>
                                ))}
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

type ProjectSingleViewProps = {
    name: string
    type: 'model' | 'datasource' | 'project'
    description: string
    page: string
    header: string
    tasks: string[]
    tags: string[]
    models: string[]
    datasources: string[]
    institution: string[]
}

export function ProjectSingleView({
    name,
    type,
    description,
    page,
    header,
    tasks,
    tags,
    models,
    datasources,
    institution,
}: ProjectSingleViewProps) {
    const thumbnailFromName = extractThumbnailFromName(type, name)

    return (
        <div>
            <div className="px-4 sm:px-0">
                <PageTitle>{header}</PageTitle>
                <small>{name}</small>

                <div className="mr-4 aspect-square w-full overflow-hidden rounded-md bg-gray-200 shadow-sm group-hover:opacity-75 md:w-1/4">
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
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Description
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
                            {description ? description : 'No description given'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Tasks
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                {tasks.map((task) => (
                                    <TaskBadge taskName={task} key={task} />
                                ))}
                            </div>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Tags
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                {tags.map((tag) => (
                                    <TagBadge tagName={tag} key={tag} />
                                ))}
                            </div>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            About
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <ReactMarkdown className="prose">
                                {page}
                            </ReactMarkdown>
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900 md:text-base">
                            Institution(s):
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="gap-2 divide-y divide-dashed">
                                {institution?.map((institution) => (
                                    <div key={institution}>{institution}</div>
                                ))}
                            </div>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Model(s):
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {models?.map((model) => (
                                    <MiniCard
                                        name={model}
                                        type={'model'}
                                        key={model}
                                    />
                                ))}
                            </div>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Data source(s):
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {datasources?.map((ds) => (
                                    <MiniCard
                                        name={ds}
                                        type={'datasource'}
                                        key={ds}
                                    />
                                ))}
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
