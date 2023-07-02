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
                                sections: true,
                            },
                        },
                    },
                },
            },
        })

        return mapHubs(data)
    }

    async getHubByTitle(title: string) {
        const data = await prisma.hub.findFirst({
            where: { title: title },
            include: {
                sections: {
                    include: {
                        guides: {
                            include: {
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
