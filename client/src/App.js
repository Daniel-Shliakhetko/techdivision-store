import { Footer } from "./Footer";
import { Header } from "./Header";
import { Router } from "./Router";

function App() {
  return (
    <div className="container flex flex-col">
      <Header />
      <main className="content">
        <Router />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
