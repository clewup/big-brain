'use client'

import PageWrapper from '@/components/PageWrapper/PageWrapper'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { usePathname, useRouter } from 'next/navigation'
import React, { FC } from 'react'

const FourOhFour: FC = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { queryParams } = useQueryParams()

    const formattedQueryParams = Object.entries(queryParams).map(
        ([key, value]) => `${key}=${String(new URLSearchParams(String(value))).replace('=', '')}`
    )

    return (
        <PageWrapper className="flex justify-center items-center">
            <div className="text-center flex flex-col gap-5">
                <h1 className="text-6xl font-semibold">404</h1>

                <span>
                    <p className="text-xl">
                        &quot;{pathname}?{formattedQueryParams.join('&')}&quot;
                    </p>
                    <p className="text-xl">does not exist.</p>
                </span>

                <div>
                    <button
                        className="bg-primary rounded-md px-4 py-2 text-white text-xl"
                        onClick={() => router.push('/')}>
                        Home
                    </button>
                </div>
            </div>
        </PageWrapper>
    )
}

export default FourOhFour
