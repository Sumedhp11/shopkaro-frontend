export const newOrderAPI = async ({
  userId,
  items,
  totalAmount,
  shippingAddress,
}: {
  userId: string;
  items: [];
  totalAmount: number;
  shippingAddress: string;
}) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/order/new-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
        items,
        totalAmount,
        shippingAddress,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message);
    }
    return data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOrderById = async ({ userId }: { userId: string }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/order/${userId}`, {
      credentials: "include",
    });
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
