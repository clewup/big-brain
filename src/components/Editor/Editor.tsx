'use client'

import GuideEditor from '@/components/Editor/components/GuideEditor/GuideEditor'
import HubDetailsEditor from '@/components/Editor/components/HubDetailsEditor/HubDetailsEditor'
import HubSectionsEditor from '@/components/Editor/components/HubSectionsEditor/HubSectionsEditor'
import useApi from '@/lib/common/hooks/useApi/useApi'
import { HubType } from '@/types/hubTypes'
import { Form, Formik } from 'formik'
import React, { FC, FunctionComponent, useState } from 'react'
import { BookOpen, IconProps, Info, Layers } from 'react-feather'
import * as Yup from 'yup'

type Step = {
    component: JSX.Element
    index: number
    label: string
    route: string
    icon: FunctionComponent<IconProps>
}

interface EditorProps {
    hub: HubType | null
}

const Editor: FC<EditorProps> = ({ hub }) => {
    const { patch } = useApi()

    const editorSteps: Step[] = [
        {
            component: <HubDetailsEditor handleNavigation={handleNavigation} />,
            icon: Info,
            index: 0,
            label: 'Details',
            route: 'details',
        },
        {
            component: <HubSectionsEditor handleNavigation={handleNavigation} />,
            icon: Layers,
            index: 1,
            label: 'Sections',
            route: 'sections',
        },
        {
            component: <GuideEditor handleNavigation={handleNavigation} />,
            icon: BookOpen,
            index: 2,
            label: 'Guide',
            route: 'guide',
        },
    ]

    const [currentStep, setCurrentStep] = useState<Step>(editorSteps[0])

    const initialValues: HubType = hub ?? {
        features: [],
        image: '',
        sections: [
            {
                guides: [
                    {
                        categories: [],
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

    function handleNavigation(index: number) {
        const nextStep = editorSteps[index]
        setCurrentStep(nextStep)
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    function onSubmit(formValues: HubType) {
        patch<HubType>('/api/hub', formValues)
    }

    const validationSchema = Yup.object().shape({
        features: Yup.array().of(Yup.string()),
        image: Yup.string().required('Please provide an image for the hub.'),
        sections: Yup.array()
            .of(
                Yup.object().shape({
                    guides: Yup.array()
                        .of(
                            Yup.object().shape({
                                categories: Yup.array().of(Yup.string()),
                                image: Yup.string().required('Please provide an image for each guide.'),
                                sections: Yup.array()
                                    .of(
                                        Yup.object().shape({
                                            content: Yup.string().required(
                                                'Please provide content for each guide section.'
                                            ),
                                            title: Yup.string().required(
                                                'Please provide a title for each guide section.'
                                            ),
                                        })
                                    )
                                    .min(1, 'Please provide at least one section for each guide.'),
                                title: Yup.string().required('Please provide a title for each guide.'),
                            })
                        )
                        .min(1, 'Please provide at least one guide for the hub.'),
                    title: Yup.string().required('Please provide a title for each section of the hub.'),
                })
            )
            .min(1, 'Please provide at least one section for the hub.'),
        title: Yup.string().required('Please provide a title for the hub.'),
    })

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {() => {
                return <Form>{currentStep.component}</Form>
            }}
        </Formik>
    )
}

export default Editor
