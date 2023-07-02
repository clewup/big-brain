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
                                hubSection: {
                                    include: {
                                        hub: true,
                                    },
                                },
                                comments: true,
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
        const data = await prisma.hub.findUnique({
            where: { id: id },
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
                                comments: true,
                                sections: true,
                            },
                        },
                    },
                },
            },
        })

        if (!data) return null

        return mapHub(data)
    }

    async getHubByTitle(title: string) {
        const data = await prisma.hub.findFirst({
            where: { title: title },
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
                                comments: true,
                                sections: true,
                            },
                        },
                    },
                },
            },
        })

        if (!data) return null

        return mapHub(data)
    }
}
