export function makeExcerpt(text: string) {
    let excerpt
    text.length > 100
        ? (excerpt = text.substring(0, 100) + '[...]')
        : (excerpt = text)
    return excerpt
}
