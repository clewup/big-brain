'use client'

import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import cx from 'classnames'
import { useRouter } from 'next/navigation'
import React, { FC, ReactNode } from 'react'

interface PageWrapperProps {
    children: ReactNode
    className?: string
    requireLoggedIn?: boolean
    requireAdminRole?: boolean
}

const PageWrapper: FC<PageWrapperProps> = ({
    children,
    className,
    requireAdminRole = false,
    requireLoggedIn = false,
}) => {
    const router = useRouter()
    const { isAdmin, user } = useLockr()

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

    return <main className={cx('p-5 md:px-40 min-h-screen-header', className)}>{children}</main>
}

export default PageWrapper
