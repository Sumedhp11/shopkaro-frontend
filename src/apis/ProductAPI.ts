export const getRandomProducts = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER}/product/random-products`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getAllProducts = async ({
  currentPage,
  selectedCategory,
  searchQuery,
}: {
  currentPage: number;
  selectedCategory: string | null;
  searchQuery: string | null;
}) => {
  try {
    let query = "";
    if (selectedCategory) {
      query += `&categoryId=${selectedCategory}`;
    }
    if (searchQuery) {
      query += `&search=${searchQuery}`;
    }
    const res = await fetch(
      `${import.meta.env.VITE_SERVER}/product/all?page=${currentPage}${query}`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getAllCategories = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER}/product/categories`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addtoCart = async ({
  userId,
  productId,
  quantity = 1,
}: {
  userId: string;
  productId: string;
  quantity: number;
}) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
        productId,
        quantity,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return { data: data?.data, message: data?.message };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
