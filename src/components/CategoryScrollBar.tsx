import { CategoryDataInterface } from "@/pages/Shop";

export interface category {
  _id: string;
  CategoryName: string;
}
const CategoryScrollBar = ({
  categoryData,
  setselectedCategory,
}: {
  categoryData: CategoryDataInterface;
  setselectedCategory: (categoryId: string) => void;
}) => {
  return (
    <div className="w-full flex flex-wrap justify-center gap-3 md:gap-5  items-center mt-3">
      {categoryData.map((category: category) => (
        <div
          key={category._id}
          className="text-nowrap px-4 py-2 bg-black/85 text-white text-sm md:text-base  rounded-lg cursor-pointer font-medium"
          onClick={() => setselectedCategory(category._id)}
        >
          {category.CategoryName}
        </div>
      ))}
    </div>
  );
};

export default CategoryScrollBar;
