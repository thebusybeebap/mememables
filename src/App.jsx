import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from 'react'

import { ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { theme } from "./utils/theme";

import AppLayout from "./ui/AppLayout";
import Memes from "./pages/Memes";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Meme from "./pages/Meme";
import PostMeme from "./pages/PostMeme";
import User from "./pages/User";
import ProtectedRoute from "./ui/ProtectedRoute";
import CustomToaster from "./ui/CustomToaster";

let queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        }
    }
});

const ReactQueryDevtoolsProduction = React.lazy(() =>
    import('@tanstack/react-query-devtools/production').then((d) => ({
      default: d.ReactQueryDevtools,
    })),
  )

function App(){

    const [showDevtools, setShowDevtools] = React.useState(false)

    React.useEffect(() => {
      // @ts-ignore
      window.toggleDevtools = () => setShowDevtools((old) => !old)
    }, [])
  

    return(
        <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Navigate replace to="memes" />}/>
                        <Route path="memes" element={<Memes />}/>
                        <Route path="memes/:memeId" element={<Meme />}/>
                        <Route path="memes/:memeId/comments" element={<Meme />}/>
                        <Route path="users/:username" element={<User />}/>
                        <Route path="post" element={<ProtectedRoute><PostMeme /></ProtectedRoute>}/>
                    </Route>
                    <Route path="login" element={<Login />}/>
                    <Route path=".*" element={<NotFound />}/>
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </BrowserRouter>

            <CustomToaster />

        </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;