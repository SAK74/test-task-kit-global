import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { routes } from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";
import { BASE_URL } from "../base";
import { Header } from "./components/Header";

const router = createBrowserRouter(routes, { basename: BASE_URL });

function App() {
  return (
    <>
      <Header />
      <main className="p-4">
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </main>
    </>
  );
}

export default App;
