import {createBrowserRouter} from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import { RouterProvider } from 'react-router-dom'
import Profile from './Profile'
import BrowseTv from './BrowseTv'
import PlayingMovie from './PlayingMovie'

const Body = () => {

    
    const appRouter = createBrowserRouter([
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/browse/Tv",
        element: <BrowseTv />,
      },
      {
        path: "/playing",
        element: <PlayingMovie />,
      },
      {
        path: "/profile",
        element: <Profile />,
      }
    ]);

    
   
    

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body