'use client'

import { AuthorType } from '@/types/authorTypes'
import { HubType } from '@/types/hubTypes'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'
import { Minus, Plus } from 'react-feather'

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

    function onSubmit() {
        return
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ setFieldValue, values }) => {
                function addSection() {
                    setFieldValue('sections', [
                        ...values.sections,
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
                                            title: 'Section 1',
                                        },
                                    ],
                                    title: 'Guide 1',
                                },
                            ],
                            title: '',
                        },
                    ])
                }
                function removeSection(sectionIndex: number) {
                    if (sectionIndex === 0) return

                    const _sections = values.sections
                    _sections.splice(sectionIndex, 1)

                    setActiveSectionIndex(0)
                    setActiveGuideIndex(0)
                    setFieldValue('sections', _sections)
                }

                function addGuide(sectionIndex: number) {
                    setFieldValue(`sections[${sectionIndex}].guides`, [
                        ...values.sections[sectionIndex].guides,
                        {
                            author: {} as AuthorType,
                            categories: [],
                            comments: [],
                            createdAt: moment().toDate(),
                            image: '',
                            sections: [
                                {
                                    content: 'Content',
                                    title: 'Section 1',
                                },
                            ],
                            title: `Guide ${values.sections[sectionIndex].guides.length + 1}`,
                        },
                    ])
                }
                function removeGuide(sectionIndex: number, guideIndex: number) {
                    const _guides = values.sections[sectionIndex].guides
                    _guides.splice(guideIndex, 1)

                    setActiveSectionIndex(0)
                    setActiveGuideIndex(0)
                    setFieldValue(`sections[${sectionIndex}].guides`, _guides)
                }

                function addGuideSection(sectionIndex: number, guideIndex: number) {
                    setFieldValue(`sections[${sectionIndex}].guides[${guideIndex}].sections`, [
                        ...values.sections[sectionIndex].guides[guideIndex].sections,
                        {
                            content: 'Content',
                            title: `Section ${values.sections[sectionIndex].guides[guideIndex].sections.length + 1}`,
                        },
                    ])
                }

                function removeGuideSection(sectionIndex: number, guideIndex: number, guideSectionIndex: number) {
                    const _guideSections = values.sections[sectionIndex].guides[guideIndex].sections
                    _guideSections.splice(guideSectionIndex, 1)

                    setFieldValue(`sections[${sectionIndex}].guides[${guideIndex}].sections`, _guideSections)
                }

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

                                {values.sections.map((section, sectionIndex) => (
                                    <div key={sectionIndex}>
                                        <div className="flex gap-2">
                                            <Field
                                                name={`sections[${sectionIndex}].title`}
                                                placeholder="Section Title"
                                                className="font-semibold"
                                            />

                                            {sectionIndex > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSection(sectionIndex)}
                                                    className="text-neutral">
                                                    <Minus />
                                                </button>
                                            )}
                                        </div>

                                        <div className="ml-10">
                                            {section.guides.map((guide, guideIndex) => (
                                                <div key={guideIndex} className="flex gap-2">
                                                    <p
                                                        onClick={() => {
                                                            setActiveSectionIndex(sectionIndex)
                                                            setActiveGuideIndex(guideIndex)
                                                        }}
                                                        className="cursor-pointer">
                                                        {guide.title}
                                                    </p>

                                                    {guideIndex > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeGuide(sectionIndex, guideIndex)}
                                                            className="text-neutral">
                                                            <Minus />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={() => addGuide(sectionIndex)}
                                                className="text-neutral">
                                                <Plus />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button type="button" onClick={addSection} className="text-neutral mt-5">
                                    <Plus />
                                </button>
                            </div>
                        </div>

                        <div className="w-4/5">
                            <Field
                                name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].title`}
                                className="text-4xl py-5 font-semibold"
                            />

                            {values.sections[activeSectionIndex].guides[activeGuideIndex].sections.map(
                                (section, guideSectionIndex) => (
                                    <div key={guideSectionIndex} className="flex flex-col mb-10 relative">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeGuideSection(
                                                    activeSectionIndex,
                                                    activeGuideIndex,
                                                    guideSectionIndex
                                                )
                                            }
                                            className="text-neutral absolute top-0 right-0">
                                            <Minus />
                                        </button>

                                        <Field
                                            name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[${guideSectionIndex}].title`}
                                        />
                                        <Field
                                            name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[${guideSectionIndex}].content`}
                                        />
                                    </div>
                                )
                            )}

                            <button
                                type="button"
                                onClick={() => addGuideSection(activeSectionIndex, activeGuideIndex)}
                                className="w-full bg-primary py-3 text-white rounded-md flex justify-center">
                                <Plus size={30} />
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default HubEditor
