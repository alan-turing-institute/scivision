// Component: A badge indicating a task with the given name
// TODO: distinct colours for each task

type BadgeProps = {
    taskName?: string
    usageBool?: boolean
    tagName?: string
}
export const TaskBadge = (props: BadgeProps) => {
    return (
        <span className="mb-1 mr-1 inline-flex items-center rounded-full bg-scipurple-light px-2 py-1 text-xs font-medium text-scipurple ring-1 ring-inset ring-scipurple-dark/10">
            {props.taskName}
        </span>
    )
}

export const TagBadge = (props: BadgeProps) => {
    return (
        <span className="mb-1 mr-1  inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {props.tagName}
        </span>
    )
}

// Component: A badge indicating whether a model is usable with scivision
export const UsageBadge = (props: BadgeProps) => {
    return (
        <>
            {props.usageBool ? (
                <span className="mb-1 mr-1 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Scivision.Py ready
                </span>
            ) : (
                // <span className="inline-flex mr-1 mb-1 items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                // 	Manual setup
                // </span>
                <></>
            )}
        </>
    )
}
