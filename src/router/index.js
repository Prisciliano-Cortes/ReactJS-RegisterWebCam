import { createBrowserRouter } from "react-router-dom";
import { User } from "../pages/user";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Certificate } from "../pages/certificate";
import { RootLayout } from "../layout/rootLayout";
import { PrivateLayout } from "../layout/privateLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Register />,
            },
            {
                path: 'user',
                element: <User />
            },
            {
                path: 'certificate',
                element: <Login />
            },
            {
                path: 'diploma',
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <Certificate />
                    }
                ]
            },
        ],
    },
])