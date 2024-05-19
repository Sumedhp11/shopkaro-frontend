import { getAllCategories, getAllProducts } from "@/apis/ProductAPI";
import CategoryScrollBar from "@/components/CategoryScrollBar";
import { userData } from "@/components/Header";
import Loader from "@/components/Loader";
import ProductsComponent from "@/components/ProductsComponent";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
const productsPerPage = 10;
export interface CategoryDataInterface
  extends Array<{
    _id: string;
    CategoryName: string;
  }> {}

const Shop = ({ user }: { user: userData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setsearchQuery] = useState<string | null>(null);
  const [selectedCategory, setselectedCategory] = useState<string | null>(null);
  const [timeoutid, settimeoutid] = useState<NodeJS.Timeout | null>(null);

  const { data: productsData, isLoading: ProductDataisLoading } = useQuery({
    queryKey: ["products", currentPage, selectedCategory, searchQuery],
    queryFn: () =>
      getAllProducts({ currentPage, selectedCategory, searchQuery }),
    retry: false,
  });

  const { data: categoryData, isLoading: categoryDataIsLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const totalDocs = productsData?.TotalDocs || 0;
  const totalPages = Math.ceil(totalDocs / productsPerPage);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleSearchInput = (searchQuery: string) => {
    if (timeoutid) {
      clearTimeout(timeoutid);
    }
    const newtimeOutId = setTimeout(() => {
      setsearchQuery(searchQuery);
    }, 2000);
    settimeoutid(newtimeOutId);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col space-y-5">
      {categoryDataIsLoading ? (
        <Loader />
      ) : (
        <CategoryScrollBar
          categoryData={categoryData}
          setselectedCategory={setselectedCategory}
        />
      )}

      <div className="w-[94%] flex justify-start px-2 py-4">
        <Input
          placeholder="search Products"
          className="border border-black focus:outline-none focus:border-2  placeholder:text-sm placeholder:font-mono placeholder:font-normal text-base w-[100%] md:w-[30%]"
          onChange={(e) => handleSearchInput(e.target.value)}
        />
      </div>
      {ProductDataisLoading ? (
        <Loader />
      ) : (
        <ProductsComponent productData={productsData?.products} user={user} />
      )}

      {productsData?.products.length > 0 && (
        <div className="flex justify-end my-5 flex-wrap">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>

              {pages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    className="cursor-pointer"
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Shop;
