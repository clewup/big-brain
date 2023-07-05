'use client'

import GuideEditor from '@/components/HubEditor/components/GuideEditor/GuideEditor'
import HubDetailsEditor from '@/components/HubEditor/components/HubDetailsEditor/HubDetailsEditor'
import HubSectionsEditor from '@/components/HubEditor/components/HubSectionsEditor/HubSectionsEditor'
import useApi from '@/lib/common/hooks/useApi/useApi'
import { AuthorType } from '@/types/authorTypes'
import { HubType } from '@/types/hubTypes'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'

const HubEditor = () => {
    const { post } = useApi()

    const [activeSectionIndex, setActiveSectionIndex] = useState(0)
    const [activeGuideIndex, setActiveGuideIndex] = useState(0)

    const initialValues: HubType = {
        features: [],
        image: '',
        sections: [
            {
                guides: [
                    {
                        author: {} as AuthorType,
                        categories: [],
                        comments: [],
                        image: '',
                        sections: [
                            {
                                content: 'Content',
                                title: 'Section 1',
                            },
                        ],
                        title: 'Guide 1',
                    },
                ],
                title: '',
            },
        ],
        title: '',
    }

    function onSubmit(formValues: HubType) {
        post<HubType>('/api/hub', formValues)
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {() => {
                return (
                    <Form>
                        <HubDetailsEditor />
                        <HubSectionsEditor
                            setActiveGuideIndex={setActiveGuideIndex}
                            setActiveSectionIndex={setActiveSectionIndex}
                        />
                        <GuideEditor activeGuideIndex={activeGuideIndex} activeSectionIndex={activeSectionIndex} />
                    </Form>
                )
            }}
        </Formik>
    )
}

export default HubEditor
