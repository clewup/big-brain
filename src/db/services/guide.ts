import { mapGuide, mapGuides } from '@/db/mappers/guide'
import prisma from '@/lib/prisma'

export default class GuideService {
    async getGuides(query?: object) {
        const data = await prisma.guide.findMany({
            include: { hubSection: { include: { hub: true } }, sections: true },
            ...query,
        })

        return mapGuides(data)
    }

    async getGuideById(id: number) {
        if (isNaN(id)) {
            return null
        }

        const data = await prisma.guide.findUnique({
            include: { hubSection: { include: { hub: true } }, sections: true },
            where: { id: id },
        })

        if (!data) return null

        return mapGuide(data)
    }

    async getGuideByTitle(title: string) {
        const data = await prisma.guide.findFirst({
            include: { hubSection: { include: { hub: true } }, sections: true },
            where: { title: title },
        })

        console.log(data)

        if (!data) return null

        return mapGuide(data)
    }

    async getGuideCategories() {
        const data = await prisma.guide.findMany({
            distinct: ['categories'],
            orderBy: { categories: 'asc' },
            select: { categories: true },
        })

        return data
            .flatMap((value) => value.categories)
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort()
    }
}
