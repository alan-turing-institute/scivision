import React from 'react';

// Component: A badge indicating a task with the given name
// TODO: distinct colours for each task
export function TaskBadge({taskName}) {
    return (
        <>
            <span className="badge badge-primary">{taskName}</span>
            &nbsp;
        </>
    );
}
