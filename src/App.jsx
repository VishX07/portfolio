import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Dock from './components/Dock';
import Terminal from './components/Terminal';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import DSAPage from './pages/DSAPage';

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="grain-bg min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <PageWrapper>
                <ProjectDetail />
              </PageWrapper>
            }
          />
          <Route
            path="/dsa"
            element={
              <PageWrapper>
                <DSAPage />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
      {/* <Dock /> */}
      <Terminal />
    </div>
  );
}
