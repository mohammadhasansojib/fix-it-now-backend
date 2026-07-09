import { prisma } from "../../lib/prisma.js";


class CategoryRepo {
    // get all categories
    async getAllCategoriesFromDB() {
        const categories = await prisma.category.findMany();

        return categories;
    }

}

const categoryRepo = new CategoryRepo();
export default categoryRepo;