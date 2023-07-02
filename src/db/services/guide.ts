import { mapGuide, mapGuides } from '@/db/mappers/guide'
import prisma from '@/lib/prisma'

export default class GuideService {
    async getGuides() {
        const data = await prisma.guide.findMany({
            include: { hubSection: { include: { hub: true } }, comments: true, sections: true },
        })

        return mapGuides(data)
    }

    async getGuideById(id: number) {
        if (isNaN(id)) {
            return null
        }

        const data = await prisma.guide.findUnique({
            where: { id: id },
            include: { hubSection: { include: { hub: true } }, comments: true, sections: true },
        })

        if (!data) return null

        return mapGuide(data)
    }

    async getGuideByTitle(title: string) {
        const data = await prisma.guide.findFirst({
            where: { title: title },
            include: { hubSection: { include: { hub: true } }, comments: true, sections: true },
        })

        if (!data) return null

        return mapGuide(data)
    }

    async getGuideCategories() {
        const data = await prisma.guide.findMany({
            select: { categories: true },
            orderBy: { categories: 'asc' },
            distinct: ['categories'],
        })

        return data.flatMap((guide) => guide.categories)
    }
}
