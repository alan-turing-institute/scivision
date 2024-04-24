import { TableCellsIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

export default function GridTableSwitcher(type: string) {
    const viewOptions = [
        {
            name: 'Grid View',
            href: `/${type}-grid`,
            icon: RectangleGroupIcon,
        },
        {
            name: 'Table View',
            href: `/${type}-table`,
            icon: TableCellsIcon,
        },
    ]

    return (
        <div className="mb-4 flex place-content-end gap-2">
            {viewOptions.map((view) => (
                <NavLink
                    key={view.href}
                    to={view.href}
                    className={({ isActive }) =>
                        isActive
                            ? ' group inline-flex items-center gap-1 px-1 py-4  text-sm font-medium text-scipurple no-underline'
                            : ' group inline-flex items-center gap-1 px-1  py-4 text-sm font-medium text-gray-500 no-underline hover:text-gray-700'
                    }
                >
                    <view.icon className="h-5 w-5" aria-hidden="true" />
                    <span className="">{view.name}</span>
                </NavLink>
            ))}
        </div>
    )
}
