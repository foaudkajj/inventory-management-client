import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { LoginRequest, LoginResponse, UserStatus } from "../models";
import { AuthService } from "../services";

type AuthContextType = {
  user: LoginResponse | null;
  loading: boolean;
  logIn?: (loginRequest: LoginRequest) => Promise<void>;
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

  const logIn = useCallback(async (loginRequest) => {

    // Send login request
    const data = await AuthService.login(loginRequest)
    const loginResponse: LoginResponse = {
      access_token: data.access_token,
      user: {
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        username: data.user.username,
        status: data.user.status
      }
    };
    if (loginResponse) {
      localStorage.setItem("user", JSON.stringify(loginResponse));
      localStorage.setItem("token", loginResponse.access_token);
      setUser(loginResponse);
    }
  }, []);

  const logOut = useCallback(() => {
    // Clear user data

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  useEffect(() => {
    // Retrieve and save user data on initial load
    const user = JSON.parse(localStorage.getItem("user") ?? "false");
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
