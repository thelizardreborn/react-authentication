import { createContext, useState } from "react";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  const signIn = async (credentials) => {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    };

    const response = await fetch("http://localhost:5000/api/users", fetchOptions);
    if (response.status === 200) {
      const user = await response.json();
      setAuthUser(user);
      Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  const signOut = () => {
    Cookies.remove("authenticatedUser");
    setAuthUser(null);
  }

  return (
    <UserContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut,
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;