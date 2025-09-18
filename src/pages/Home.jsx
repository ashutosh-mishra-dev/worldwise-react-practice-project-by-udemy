import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

function Home() {
  return (
    <div>
      {/* <a href="/product">product</a> //this is not good for spa becouse
      page loaded */}

      <PageNav />
      <h1 className="test">Worldwise</h1>

      <Link to="app">go to App layout</Link>
    </div>
  );
}

export default Home;
