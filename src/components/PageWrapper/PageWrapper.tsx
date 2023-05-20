'use client'

import { useLockr } from '@/lib/lockr-auth/contexts/LockrContext'
import cx from 'classnames'
import { useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'

interface PageWrapperProps {
    children: ReactNode
    className?: string
    requireLoggedIn?: boolean
    requireAdminRole?: boolean
}

const PageWrapper: FC<PageWrapperProps> = ({
    children,
    className,
    requireLoggedIn = false,
    requireAdminRole = false,
}) => {
    const router = useRouter()
    const { user, isAdmin } = useLockr()

    function redirectToHome() {
        router.push('/')
        return null
    }

    if (requireLoggedIn) {
        if (!user) return redirectToHome()
    }

    if (requireAdminRole) {
        if (!isAdmin) return redirectToHome()
    }

    return <main className={cx('p-5 min-h-screen-header', className)}>{children}</main>
}

export default PageWrapper
