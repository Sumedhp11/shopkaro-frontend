export const getCartByUserId = async ({ userId }: { userId: string }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER}/cart/get-cart/${userId}`,
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
