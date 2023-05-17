import cx from 'classnames'
import { FC, ReactNode } from 'react'

interface PageWrapperProps {
    children: ReactNode
    className?: string
}

const PageWrapper: FC<PageWrapperProps> = ({ children, className }) => {
    return <main className={cx('py-5 min-h-screen-header', className)}>{children}</main>
}

export default PageWrapper
