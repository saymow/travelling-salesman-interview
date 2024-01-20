import ClientProvider from "./resources/client/client-provider";
import Router from "./router";
import "./app.css";

function App() {
  return (
    <ClientProvider>
      <Router />
    </ClientProvider>
  );
}

export default App;
