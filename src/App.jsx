import { Routes, Route ,BrowserRouter} from 'react-router-dom'
import Home from "./pages/Home";
import Body from "./pages/Body";
import Error from "./utils/Error";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";

import DashBoard from "./pages/DashBoard";
import Theaters from "./pages/Theaters";
import Screens from "./pages/Screens";
import Movies from "./pages/Movies";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Shows from "./pages/Shows";
import ManageScreens from "./pages/ManageScreens";
import ManageSeats from "./pages/ManageSeats";
function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter>
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
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;
