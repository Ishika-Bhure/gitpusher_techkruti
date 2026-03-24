import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Layout
import MainLayout from './components/layout/MainLayout'

// Auth/Public Pages
import SignInPage from './pages/SignInPage'

// Protected/Main Pages
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Workers from './pages/Workers'
import PostJob from './pages/PostJob'
import MapPage from './pages/Map'
import WorkerProfile from './pages/WorkerProfile'
import CustomerProfile from './pages/CustomerProfile'
import Dashboard from './pages/Dashboard'
import Notifications from './pages/Notifications'
import SOS from './pages/SOS'
import BoostProfile from './pages/BoostProfile'
import JobDetail from './pages/JobDetail'
import WorkerDetail from './pages/WorkerDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes without Navbar/BottomNav */}
        <Route path="/signin" element={<SignInPage />} />
        {/* Make root redirect to signin by default */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* Protected/Main Routes wrapper */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/worker-profile" element={<WorkerProfile />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/boost-profile" element={<BoostProfile />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/worker/:id" element={<WorkerDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
