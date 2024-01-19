import ClientProvider from "./resources/client/client-provider";
import Router from "./router";

function App() {
  return (
    <ClientProvider>
      <Router />
    </ClientProvider>
  );
}

export default App;
