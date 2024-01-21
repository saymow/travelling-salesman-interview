import ClientProvider from "./resources/client/client-provider";
import Router from "./router";
import PathProvider from "./resources/path/path-provider";
import "./app.css";

function App() {
  return (
    <ClientProvider>
      <PathProvider>
        <Router />
      </PathProvider>
    </ClientProvider>
  );
}

export default App;
