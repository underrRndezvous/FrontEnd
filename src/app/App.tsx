import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const element = useRoutes(routes);
  return (
    <div>
<<<<<<< HEAD
      <p className="sub-01 text-point">폰트 Test</p>
=======
      {element}
>>>>>>> e8d653557c228198eab0f83a9beee48053b998d7
    </div>
  );
}

export default App;