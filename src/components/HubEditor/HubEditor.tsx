'use client'

import { AuthorType } from '@/types/authorTypes'
import { HubType } from '@/types/hubTypes'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'

const HubEditor = () => {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0)
    const [activeGuideIndex, setActiveGuideIndex] = useState(0)

    const initialValues: HubType = {
        createdAt: moment().toDate(),
        features: [],
        image: '',
        sections: [
            {
                guides: [
                    {
                        author: {} as AuthorType,
                        categories: [],
                        comments: [],
                        createdAt: moment().toDate(),
                        image: '',
                        sections: [
                            {
                                content: 'Content',
                                title: 'Title',
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

    function onSubmit() {
        return
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values }) => {
                return (
                    <Form className="flex w-full">
                        <div className="w-1/5 relative">
                            <div className="sticky top-10 pb-10">
                                <div className="flex justify-between items-end">
                                    <Field
                                        name="title"
                                        placeholder="Title"
                                        className="pb-5 text-4xl font-semibold w-full"
                                    />
                                </div>

                                {values.sections.map((section, index) => (
                                    <div key={index}>
                                        <Field
                                            name={`sections[${index}].title`}
                                            placeholder="Section Title"
                                            className="font-semibold"
                                        />

                                        <div className="ml-10">
                                            {section.guides.map((guide, index) => (
                                                <p
                                                    key={index}
                                                    onClick={() => {
                                                        setActiveSectionIndex(values.sections.indexOf(section))
                                                        setActiveGuideIndex(index)
                                                    }}
                                                    className="cursor-pointer">
                                                    {guide.title}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-4/5">
                            <Field
                                name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].title`}
                                className="text-4xl py-5 font-semibold"
                            />

                            {values.sections[activeSectionIndex].guides[activeGuideIndex].sections.map(
                                (section, index) => (
                                    <div key={index} className="flex flex-col">
                                        <Field
                                            name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[${index}].title`}
                                        />
                                        <Field
                                            name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[${index}].content`}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default HubEditor
