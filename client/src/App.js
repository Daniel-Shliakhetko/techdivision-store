import { Footer } from "./Footer";
import { Header } from "./Header";
import { Router } from "./Router";
import { useLocation } from 'react-router-dom';

const isAuthenticated = false;

function App() {
const location = useLocation()


  const isAuthPage = location.pathname.includes("auth") || false;

  return (
    <div className="container flex flex-col">
      <Header isAuthenticated={isAuthenticated} isAuthPage={isAuthPage}/>
      <main className="content">
        <Router />
      </main>
      <Footer isAuthPage={isAuthPage}/>
    </div>
  );
}

export default App;
