import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import IssueBook from "./components/IssueBook";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      {/* <IssueBook /> */}
    </div>
  );
}

export default App;
