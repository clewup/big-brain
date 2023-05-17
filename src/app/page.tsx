import PageWrapper from '@/components/PageWrapper/PageWrapper'
import React from 'react'

export default async function Home() {
    return (
        <PageWrapper className="flex">
            <div className="w-1/4 h-full min-h-screen-header">
                <h1 className="text-7xl font-satisfice text-green-600">THE LATEST</h1>
            </div>
            <span className="divider divider-horizontal" />
        </PageWrapper>
    )
}
