// import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import { PageTitle } from '@/components/Typography'
import Markdown from 'markdown-to-jsx'
import matter from 'gray-matter'

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
