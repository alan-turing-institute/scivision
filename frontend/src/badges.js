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

// Component: A badge indicating whether a model is installable with scivision
export function InstallBadge({installBool}) {
    if (installBool) {
        var badge = <>
            <span className="badge badge-success">Use me with Scivision.Py</span>
            &nbsp;
        </>
    } else {
      var badge = <>
          <span className="badge badge-secondary">Use me with my Homepage instructions</span>
          &nbsp;
      </>
    }
    return (
        badge
    );
}