import cx from 'classnames'
import { FC, ReactNode } from 'react'

interface PageWrapperProps {
    children: ReactNode
    className?: string
}

const PageWrapper: FC<PageWrapperProps> = ({ children, className }) => {
    return <main className={cx('p-5 min-h-screen-header mt-5', className)}>{children}</main>
}

export default PageWrapper
