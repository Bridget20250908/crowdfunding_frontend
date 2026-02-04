import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import CreateFundraiserPage from './pages/CreateFundraiserPage.jsx'
import ViewFundraiserPage from './pages/ViewFundraiserPage.jsx'
import UpdateFundraiserPage from './pages/UpdateFundraiserPage.jsx'
import LoginPage from "./pages/LoginPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/create-fundraiser", element: <CreateFundraiserPage /> },
        { path: "/fundraiser/:id", element: <ViewFundraiserPage /> },
        { path: "/update-fundraiser/:id", element: <UpdateFundraiserPage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/contact", element: <ContactPage /> },
    ]
  }]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter} />
  </StrictMode>,
)
