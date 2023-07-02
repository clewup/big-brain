import { PageContext } from '@/lib/common/types/nextTypes'
import React from 'react'

async function getKnowledgeHub(name: string) {
    return {}
}

export default async function Page({ params }: PageContext) {
    const hub = await getKnowledgeHub(params.slug)

    return <></>
}
