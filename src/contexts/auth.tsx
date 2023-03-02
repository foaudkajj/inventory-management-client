import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { LoginResponse } from "../models";
import { AuthService } from "../services";

type AuthContextType = {
  user: LoginResponse | null;
  loading: boolean;
  logIn?: (email: string, password: string) => Promise<void>;
  logOut?: any;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
});
const useAuth = () => useContext(AuthContext);

function AuthProvider(props: any) {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const logIn = useCallback(async (username, password) => {
    // Send login request

    const loginResponse = await AuthService.login({
      username: username,
      password: password,
    });
    if (loginResponse) {
      sessionStorage.setItem("user", JSON.stringify(loginResponse));
      sessionStorage.setItem("token", loginResponse.token);
      setUser(loginResponse);
    }
  }, []);

  const logOut = useCallback(() => {
    // Clear user data

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
  }, []);

  useEffect(() => {
    // Retrieve and save user data on initial load
    const user = JSON.parse(sessionStorage.getItem("user") ?? "false");
    if (user) {
      setUser(user as LoginResponse);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, loading }} {...props} />
  );
}

export { AuthProvider, useAuth };
