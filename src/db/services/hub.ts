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
        })

        return mapHubs(data)
    }

    async getHubById(id: number) {
        if (isNaN(id)) return null

        const data = await prisma.hub.findUnique({
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
            where: { id: id },
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
            where: { title: title },
        })

        if (!data) return null

        return mapHub(data)
    }

    async createHub(hub: HubType) {
        const createdHub = await prisma.hub.create({
            data: {
                createdBy: '',
                features: hub.features,
                image: hub.image,
                title: hub.title,
                updatedBy: '',
            },
        })

        for (const section of hub.sections) {
            const createdSection = await prisma.hubSection.create({
                data: {
                    createdBy: '',
                    hub: {
                        connect: {
                            id: createdHub.id,
                        },
                    },
                    title: section.title,
                    updatedBy: '',
                },
            })

            for (const guide of section.guides) {
                const createdGuide = await prisma.guide.create({
                    data: {
                        categories: guide.categories,
                        createdBy: '',
                        hubSection: {
                            connect: {
                                id: createdSection.id,
                            },
                        },
                        image: guide.title,
                        title: guide.title,
                        updatedBy: '',
                    },
                })

                for (const guideSection of guide.sections) {
                    await prisma.guideSection.create({
                        data: {
                            content: guideSection.content,
                            createdBy: '',
                            guide: {
                                connect: {
                                    id: createdGuide.id,
                                },
                            },
                            title: guideSection.title,
                            updatedBy: '',
                        },
                    })
                }
            }
        }

        return this.getHubById(createdHub.id)
    }
}
