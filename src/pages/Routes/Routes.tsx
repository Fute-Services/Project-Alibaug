import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Layouts from Layout.tsx
import { BlankLayout } from "./Layout";

// Main Pages (lazy-loaded so each route's images/JS only load when visited)
const Home = lazy(() => import("../HomePage"));
const IntroPage = lazy(() => import("../IntroPage"));
const Amenities = lazy(() => import("../Amenities"));
const Gallery = lazy(() => import("../Gallery"));
const Brochure = lazy(() => import("../Brochure"));
const Project_info = lazy(() => import("../Peoject_info"));
const Legacypage = lazy(() => import("../Legacypage"));
const ProjectDetails = lazy(() => import("../projectDetails/ProjectDetails"));
const Coral_court = lazy(() => import("../projectDetails/Coral_court"));
const Coral_nest = lazy(() => import("../projectDetails/Coral_nest"));
const Coral_bay = lazy(() => import("../projectDetails/Coral_bay"));
const Location = lazy(() => import("../Location"));
const Page360 = lazy(() => import("../page360"));
const Walkthrough = lazy(() => import("../Walkthrough"));

// import Project_Details from "../Pages/Project details/Project_Details";
// import InitialPage from "../Pages/Home/HomeNew";
// import Initial2 from "../Pages/Home/intial2";

// Sub-components / Additional Pages
// import Broucher from "../Components/Home/Broucher";
// import Construction from "../Components/Home/Construction";
// import Project_info from "../Components/Home/Project_info";
// import Walkthrough from "../Components/Home/Walkthrough";
// import Droneview from "../Components/Home/Droneview";

// Project Details Sub-Pages
// import Circulation from "../Components/Project details/Circulation";
// import Mobility from "../Components/Project details/Mobility";
// import VerticalTransport from "../Components/Project details/VerticalTransport";
// import Overview from "../Components/Project details/OverviewNew";
// import AnimatedOverview from '../Components/Project details/AnimatedOverview';
// import UnitPlanPage from "../Components/Project details/UnitPlanPage";
// import Specification from "../Components/Home/Specification";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
      <Routes>

        {/* --- PAGES WITH LEFT NAVBAR --- */}
        {/* <Route element={<Layout />}> */}

        {/* Main Navigation Pages */}
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/location" element={<Location />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/360" element={<Page360 />} />
        {/* <Route path="/vr" element={<></>} /> */}

        {/* Other Views */}
        <Route path="/brochure" element={<Brochure />} />
        <Route path="/project-info" element={<Project_info />} />
        <Route path="/Legacypage" element={<Legacypage />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="/coral-court" element={<Coral_court />} />
        <Route path="/coral-nest" element={<Coral_nest />} />
        <Route path="/coral-bay" element={<Coral_bay />} />
        <Route path="/walkthrough" element={<Walkthrough />} />
        {/* <Route path="/droneview" element={<Droneview />} /> */}

        {/* Project Details & The 4 Navigation Pages */}

        {/* <Route path="/circulation" element={<Circulation />} />
          <Route path="/mobility" element={<Mobility />} />
          <Route path="/vertical-transport" element={<VerticalTransport />} /> */}


        {/* </Route> */}

        {/* --- PAGES WITHOUT LEFT NAVBAR --- */}
        <Route element={<BlankLayout />}>
          {/* <Route path="/" element={<InitialPage />} />
           <Route path="/initial2" element={<Initial2 />} />
          <Route path="/sustainability" element={<AnimatedOverview />} />
          <Route path="/concept-summary" element={<AnimatedOverview />} />

          <Route path="/project-info" element={<Project_info />} />
          <Route path="/project-details" element={<Project_Details />} />

          <Route path="/specification" element={<Specification />} />

          <Route path="/unitplan/:id" element={<UnitPlanPage />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/overview" element={<Overview />} /> */}

        </Route>

      </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;