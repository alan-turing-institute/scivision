import content from './content.md?raw'
import ParseMarkdown from '@/utils/ParseMarkdown'

// Component: The community tab
// route: /community
export default function Community() {
    return (
        <>
            <ParseMarkdown markdown={content} />
        </>
    )
}
