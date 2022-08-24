import { Footer } from "./Footer";
import { Header } from "./Header";
import { Router } from "./Router";
import { useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.hook";
import { AuthContext } from "./context/AuthContext";

function App() {
  const location = useLocation();
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;

  const isAuthPage = location.pathname.includes("auth") || false;

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
        <div className="container flex flex-col">
          <Header isAuthPage={isAuthPage} />
          <main className="content">
            <Router />
          </main>
          <Footer isAuthPage={isAuthPage} />
        </div>
    </AuthContext.Provider>
  );
}

export default App;
