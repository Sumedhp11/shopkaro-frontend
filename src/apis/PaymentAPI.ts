export const createPaymentIntent = async (amount: number) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/payment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ amount: amount }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }

    return data?.clientSecret;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
