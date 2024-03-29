import "./App.css";
import SalesEntry from "./Pages/SalesEntry/SalesEntry";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="w-full h-full bg-app-bg ">
        <SalesEntry />
      </div>
    </Provider>
  );
}

export default App;
