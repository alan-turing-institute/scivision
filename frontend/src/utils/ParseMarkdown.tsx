// import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import { PageTitle } from '@/components/Typography'
import Markdown from 'markdown-to-jsx'
import matter from 'gray-matter'
import CopyToClipboard from '@/components/CopyToClipboard'

type CodeAdapterProps = {
    children?: string
    className?: string
}

const CodeAdapter = ({ children, className, ...rest }: CodeAdapterProps) => {
    const codeText = Array.isArray(children)
        ? children.join('')
        : String(children ?? '')
    const lang = className || 'language-text'

    return <CopyToClipboard codeText={codeText} lang={lang} {...rest} />
}

const ParseMarkdown = (props: { markdown: string }) => {
    const parsedMarkdown = matter(props.markdown)

    return (
        <>
            <PageTitle>{parsedMarkdown.data.title}</PageTitle>
            <div className="prose max-w-screen-md">
                <Markdown
                    options={{
                        overrides: {
                            Link,
                            ReactPlayer,
                            code: {
                                component: CodeAdapter,
                            },
                        },
                    }}
                >
                    {parsedMarkdown.content}
                </Markdown>
            </div>
        </>
    )
}

export default ParseMarkdown
