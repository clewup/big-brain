import React, { FC } from 'react'

interface HeadingProps {
    children: string
}

const Heading: FC<HeadingProps> = ({ children: text }) => {
    return <h1 className="font-porkys text-6xl pb-5">{text}</h1>
}
export default Heading
