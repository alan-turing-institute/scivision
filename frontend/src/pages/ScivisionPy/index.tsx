import { useEffect } from 'react'
import content from './content.md?raw'
import ParseMarkdown from '@/utils/ParseMarkdown'

// Component: The Scivision.Py tab
// route: /scivisionpy

export default function ScivisionPy() {
    useEffect(() => {
        window.Prism?.highlightAll()
    })
    return (
        <>
            <ParseMarkdown markdown={content} />
        </>
    )
}
