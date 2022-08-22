import { Footer } from "./Footer";
import { Header } from "./Header";
import { Router } from "./Router";

const isAuthenticated = false;

function App() {
  return (
    <div className="container flex flex-col">
      <Header isAuthenticated={isAuthenticated}/>
      <main className="content">
        <Router />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
