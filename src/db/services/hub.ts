import { mapHub, mapHubs } from '@/db/mappers/hub'
import prisma from '@/lib/prisma'

export default class HubService {
    async getHubs() {
        const data = await prisma.hub.findMany({
            include: {
                sections: {
                    include: {
                        guides: {
                            include: {
                                comments: true,
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
                                comments: true,
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
                                comments: true,
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
}
