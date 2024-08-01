export interface BodyProps {
    children: React.ReactElement
}
const Body = (props: BodyProps) => {
    return (
        <main className="-mt-24 pb-8">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="overflow-hidden rounded-lg bg-white p-4 pt-12 shadow md:p-12">
                    {props.children}
                </div>
            </div>
        </main>
    )
}

export default Body
