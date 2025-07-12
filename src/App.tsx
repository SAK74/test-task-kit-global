import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { routes } from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";

const router = createBrowserRouter(routes);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
