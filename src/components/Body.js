// import {createBrowserRouter} from 'react-router-dom'
// import Login from './Login'
// import Browse from './Browse'
// import { RouterProvider } from 'react-router-dom'
// import Profile from './Profile'
// import BrowseTv from './BrowseTv'
// import PlayingMovie from './PlayingMovie'

// const Body = () => {

    
//     const appRouter = createBrowserRouter([
//       {
//         path: "/",
//         element: <Login />,
//       },
//       {
//         path: "/browse",
//         element: <Browse />,
//       },
//       {
//         path: "/browse/Tv",
//         element: <BrowseTv />,
//       },
//       {
//         path: "/playing",
//         element: <PlayingMovie />,
//       },
//       {
//         path: "/profile",
//         element: <Profile />,
//       }
//     ]);

    
   
    

//   return (
//     <div>
//         <RouterProvider router={appRouter}/>
//     </div>
//   )
// }

// export default Body



import { createBrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import { RouterProvider } from 'react-router-dom';
import Profile from './Profile';
import BrowseTv from './BrowseTv';
import PlayingMovie from './PlayingMovie';
import ProtectedRoute from './ProtectedRoute';
import GPTSearch from './GPTSearch';

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse/*",
      element: (
        <ProtectedRoute>
          <Routes>
            <Route index element={<Browse />} />
            <Route path="Tv" element={<BrowseTv />} />
            <Route path="playing" element={<PlayingMovie />} />
            <Route path="profile" element={<Profile />} />
            <Route path="gpt" element={<GPTSearch />} />
          </Routes>
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;