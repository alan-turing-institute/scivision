import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Toggle() {
    const [enabled, setEnabled] = useState(false)

    const navigate = useNavigate()
    const toggleDesigns = () => {
        enabled ? navigate('/') : navigate('/newhome')
    }

    return (
        <Switch.Group
            as="div"
            className="fixed bottom-4 right-4 flex items-center"
        >
            <Switch
                checked={enabled}
                onChange={setEnabled}
                onClick={toggleDesigns}
                className={classNames(
                    enabled ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>
            {/* <Switch.Label as="span" className="ml-3 text-sm">
				<span className="font-medium text-gray-900">New Design</span>
			</Switch.Label> */}
        </Switch.Group>
    )
}
