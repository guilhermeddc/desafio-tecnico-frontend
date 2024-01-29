import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes } from "./routes";
import { queryClient } from "./services/queryClient";
import { AppProvider } from "./common/context";
import { AlertComponent } from "./components";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Routes />
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />

      <AlertComponent />
    </QueryClientProvider>
  );
}

export default App;
