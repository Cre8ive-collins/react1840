import "./App.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./providers/app_commons"
import Homepage from "./views/pages/Homepage"
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'




const App = () => {
  return (
    <div >
      <QueryClientProvider client={queryClient}>
        <Homepage />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App