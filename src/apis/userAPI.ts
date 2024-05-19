interface loginData {
  email: string;
  password: string;
}
interface registerData {
  email: string;
  password: string;
  phone: string;
  fullName: string;
}
const loginAPI = async (userData: loginData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/auth/sign-in`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserProfile = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER}/auth/me`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

const registerAPI = async (userData: registerData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const LogoutAPI = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER}/auth/logout`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.message;
};

export { loginAPI, getUserProfile, registerAPI, LogoutAPI };
