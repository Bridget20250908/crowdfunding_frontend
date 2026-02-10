import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
// import {AuthProvider} from "./context/AuthContext.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx"
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import CreateFundraiserPage from './pages/CreateFundraiserPage.jsx'
import ViewFundraiserPage from './pages/ViewFundraiserPage.jsx'
import UpdateFundraiserPage from './pages/UpdateFundraiserPage.jsx'
import CreatePledgePage from './pages/CreatePledgePage.jsx'
import ViewPledgePage from './pages/ViewPledgePage.jsx'
import UpdatePledgePage from './pages/UpdatePledgePage.jsx'
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/login", element: <LoginPage/>},
            {path: "/signup", element: <SignupPage/>},
            {path: "/create-fundraiser", element: <CreateFundraiserPage/>},
            {path: "/fundraiser/:id", element: <ViewFundraiserPage/>},
            {path: "/update-fundraiser/:id", element: <UpdateFundraiserPage/>},
            {path: "/create-pledge/:id", element: <CreatePledgePage/>},
            {path: "/pledge/:id", element: <ViewPledgePage/>},
            {path: "/update-pledge/:id", element: <UpdatePledgePage/>},
            {path: "/about", element: <AboutPage/>},
            {path: "/contact", element: <ContactPage/>},
            {path: "*", element: <NotFoundPage/>},
        ]
    }]
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={myRouter}/>
        </AuthProvider>
    </StrictMode>,
)
