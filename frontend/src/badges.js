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

// Component: A badge indicating whether a model is usable with scivision
export function UsageBadge({usageBool}) {
    if (usageBool) {
        var badge = <>
            <span className="badge badge-success">Use with Scivision.Py</span>
            &nbsp;
        </>
    } else {
      var badge = <>
          <span className="badge badge-secondary">See my Homepage</span>
          &nbsp;
      </>
    }
    return (
        badge
    );
}