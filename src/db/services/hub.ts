import { mapHub, mapHubs } from '@/db/mappers/hub'
import prisma from '@/lib/prisma'
import { HubType } from '@/types/hubTypes'

export default class HubService {
    async getHubs() {
        const data = await prisma.hub.findMany({
            include: {
                sections: {
                    include: {
                        guides: {
                            include: {
                                hubSection: {
                                    include: {
                                        hub: true,
                                    },
                                },
                                sections: true,
                            },
                        },
                    },
                },
            },
            where: { isUpcoming: false },
        })

        return mapHubs(data)
    }

    async getUpcomingHubs() {
        const data = await prisma.hub.findMany({
            include: {
                sections: {
                    include: {
                        guides: {
                            include: {
                                hubSection: {
                                    include: {
                                        hub: true,
                                    },
                                },
                                sections: true,
                            },
                        },
                    },
                },
            },
            where: { isUpcoming: true },
        })

        return mapHubs(data)
    }

    async getHubById(id: number) {
        if (isNaN(id)) return null

        const data = await prisma.hub.findFirst({
            include: {
                sections: {
                    include: {
                        guides: {
                            include: {
                                hubSection: {
                                    include: {
                                        hub: true,
                                    },
                                },
                                sections: true,
                            },
                        },
                    },
                },
            },
            where: { id: id, isUpcoming: false },
        })

        if (!data) return null

        return mapHub(data)
    }

    async getHubByTitle(title: string) {
        const data = await prisma.hub.findFirst({
            include: {
                sections: {
                    include: {
                        guides: {
                            include: {
                                hubSection: {
                                    include: {
                                        hub: true,
                                    },
                                },
                                sections: true,
                            },
                        },
                    },
                },
            },
            where: { isUpcoming: false, title: title },
        })

        if (!data) return null

        return mapHub(data)
    }

    async upsertHub(hub: HubType) {
        const hubToUpsert = await prisma.hub.upsert({
            create: {
                createdBy: '',
                features: hub.features,
                image: hub.image,
                title: hub.title,
                updatedBy: '',
            },
            update: {
                features: hub.features,
                image: hub.image,
                title: hub.title,
                updatedBy: '',
            },
            where: { id: hub.id ?? 0 },
        })

        for (const section of hub.sections) {
            let sectionToUpsert = await prisma.hubSection.findUnique({
                where: { id: section.id ?? 0 },
            })

            if (!sectionToUpsert) {
                sectionToUpsert = await prisma.hubSection.create({
                    data: {
                        createdBy: '',
                        hub: { connect: { id: hubToUpsert.id } },
                        title: section.title,
                        updatedBy: '',
                    },
                })
            } else {
                sectionToUpsert = await prisma.hubSection.update({
                    data: {
                        title: section.title,
                        updatedBy: '',
                    },
                    where: { id: sectionToUpsert.id },
                })
            }

            for (const guide of section.guides) {
                let guideToUpsert = await prisma.guide.findUnique({
                    where: { id: guide.id ?? 0 },
                })

                if (!guideToUpsert) {
                    guideToUpsert = await prisma.guide.create({
                        data: {
                            categories: guide.categories,
                            createdBy: '',
                            hubSection: { connect: { id: sectionToUpsert.id } },
                            image: guide.image,
                            title: guide.title,
                            updatedBy: '',
                        },
                    })
                } else {
                    guideToUpsert = await prisma.guide.update({
                        data: {
                            categories: guide.categories,
                            image: guide.image,
                            title: guide.title,
                            updatedBy: '',
                        },
                        where: { id: guideToUpsert.id },
                    })
                }

                for (const guideSection of guide.sections) {
                    let guideSectionToUpsert = await prisma.guideSection.findUnique({
                        where: { id: guideSection.id ?? 0 },
                    })

                    if (!guideSectionToUpsert) {
                        guideSectionToUpsert = await prisma.guideSection.create({
                            data: {
                                content: guideSection.content,
                                createdBy: '',
                                guide: { connect: { id: guideToUpsert.id } },
                                title: guideSection.title,
                                updatedBy: '',
                            },
                        })
                    } else {
                        guideSectionToUpsert = await prisma.guideSection.update({
                            data: {
                                content: guideSection.content,
                                title: guideSection.title,
                                updatedBy: '',
                            },
                            where: { id: guideSectionToUpsert.id },
                        })
                    }
                }
            }
        }

        return this.getHubById(hubToUpsert.id)
    }
}
