import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd"; // Import ConfigProvider for theming

// Public Pages
import {
  HomePage,
  AboutPage,
  PresidentMessagePage,
  AthletePage,
  EventsPage,
  GalleryPage,
  AnnouncementPage,
} from "./pages/index";
import {
  Header,
  Login,
  Signup,
  AdminRoute,
  AthleteRoute,
  EventDetails,
  AthleteProfile,
  Chat,
} from "./components/index";

import store from "./redux/store";


import { Provider } from "react-redux";

import DashboardPage from "./pages/admin/DashboardPage";
import AthleteDetailsDashboard from "./components/adminDashboard/athleteManagement/AthleteDetailsDashboard.js";
import EventDetailsDashboard from "./components/adminDashboard/eventManagement/EventDetailsDashboard.js";
import "./App.css";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1DA57A", // Custom primary color
          colorBgLayout: "#f5f5f5",
          colorBgContainer: "#f0f2f5", // Background container color
          colorText: "#000000", // Default text color
          fontSizeBase: 16, // Base font size
          borderRadius: 6, // Border radius
        },
      }}
    >
      <div className="App">
        <Provider store={store}>
          <Router>
            <Header />

            <div className="content-container">
              <Routes>
                {/* Authentication routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* routes for all authenticated users */}
                <Route
                  path="/news"
                  element={
                    <AthleteRoute>
                      <AnnouncementPage />
                    </AthleteRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <AthleteRoute>
                      <AboutPage />
                    </AthleteRoute>
                  }
                />
                <Route
                  path="/president-message"
                  element={
                    <AthleteRoute>
                      <PresidentMessagePage />
                    </AthleteRoute>
                  }
                />
                <Route
                  path="/athletes"
                  element={
                    <AthleteRoute>
                      <AthletePage />
                    </AthleteRoute>
                  }
                />
                <Route
                  path="/events"
                  element={
                    <AthleteRoute>
                      <EventsPage />
                    </AthleteRoute>
                  }
                />
                <Route
                  path="/event-details/:eventId"
                  element={
                    <AthleteRoute>
                      <EventDetails />
                    </AthleteRoute>
                  }
                />
                <Route
                  path="/athlete-profile/:athleteId"
                  element={
                    <AthleteRoute>
                      <AthleteProfile />
                    </AthleteRoute>
                  }
                />
                <Route
                  path="/gallery"
                  element={
                    <AthleteRoute>
                      <GalleryPage />
                    </AthleteRoute>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <AthleteRoute>
                      <Chat />
                    </AthleteRoute>
                  }
                />

                {/* routes for admins only */}
                <Route
                  path="/dashboard/*"
                  element={
                    <AdminRoute>
                      <DashboardPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/dashboard/athlete-details/:athleteId"
                  element={
                    <AdminRoute>
                      <AthleteDetailsDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/dashboard/event-details/:eventId"
                  element={
                    <AdminRoute>
                      <EventDetailsDashboard />
                    </AdminRoute>
                  }
                />

                {/* Home route  */}
                <Route path="/" element={<HomePage />} />
              </Routes>
            </div>

          </Router>
        </Provider>
      </div>
    </ConfigProvider>
  );
};

export default App;
