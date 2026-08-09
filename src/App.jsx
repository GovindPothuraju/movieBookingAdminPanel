import { Routes, Route ,BrowserRouter} from 'react-router-dom'
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import Body from "./pages/Body";
import Error from "./utils/Error";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";

const DashBoard = lazy(() => import("./pages/DashBoard"));
const Theaters = lazy(() => import("./pages/Theaters"));
const Screens = lazy(() => import("./pages/Screens"));
const Movies = lazy(() => import("./pages/Movies"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Profile = lazy(() => import("./pages/Profile"));
const Shows = lazy(() => import("./pages/Shows"));
const ManageScreens = lazy(() => import("./pages/ManageScreens"));
const ManageSeats = lazy(() => import("./pages/ManageSeats"));

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
              <Route element={<Body />}>
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/admin/theaters" element={<Theaters />} />
                <Route path="/admin/screens" element={<Screens />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/shows" element={<Shows/>}/>
                <Route path="/admin/theaters/:theaterId/screens" element={<ManageScreens />} />
                <Route path="/screens/:screenId/seats" element={<ManageSeats />} />
              </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;