// import { useContext } from 'react'
// import { NavLink } from 'react-router-dom'
// import { BackgroundContext } from '../../Pages/Home/Home'

// import dayIcon from '../../assets/Home/icons/day.png'
// import nightIcon from '../../assets/Home/icons/night.png'
// import infoIcon from '../../assets/Home/icons/project_inco_icon.svg'
// import progressIcon from '../../assets/Home/icons/construction_icon.svg'
// import videoIcon from '../../assets/Home/icons/walkthrogh.svg'
// import galleryIcon from '../../assets/Home/icons/gallery.svg'

// const navItems = [
//   { path: '/project-info', label: 'Project Info', icon: infoIcon, isCustom: true },
//   { path: '/construction', label: 'Construction\nProgress', icon: progressIcon, isCustom: true },
//   { path: '/walkthrough', label: 'Walkthrough', icon: videoIcon, isCustom: true },
//   { path: '/gallery', label: 'Gallery', icon: galleryIcon, isCustom: true },
// ]

// const RightNavbar = () => {
//   const { bgTheme, setBgTheme } = useContext(BackgroundContext)

//   const darkCircle = 'w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1e2018]/80 transition-all duration-300'
//   const goldenCircle = 'w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#FFCF77] transition-all duration-300'

//   // New style for inactive state in toggle
//   const inactiveToggleCircle = 'w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#FFCF77]/10 hover:bg-[#FFCF77]/40 transition-all duration-300'

//   return (
//     <nav
//       className="fixed right-8 top-1/2 -translate-y-1/2  z-50 flex flex-col items-center rounded-[44px] w-[60px] py-4 mt-5"
//       style={{
//         background: 'rgba(42, 46, 34, 0.37)',
//         backdropFilter: 'blur(18px)',
//         WebkitBackdropFilter: 'blur(18px)',
//         border: '1px solid rgba(255, 255, 255, 0)',
//         boxShadow: '0 8px 32px rgba(0, 0, 0, 0)',
//       }}
//     >
//       {/* ── Toggle Container ── */}
//       <div className="flex flex-col items-center gap-4 bg-[#FFCF77]/20 rounded-[30px] mb-4">
//         <button onClick={() => setBgTheme('day')} className="mb-[2px]">
//           <div className={bgTheme === 'day' ? goldenCircle : inactiveToggleCircle}>
//             <img src={dayIcon} alt="Day" style={{ filter: bgTheme === 'day' ? 'brightness(0)' : 'brightness(0) invert(1)' }} className="w-[22px] h-[22px]" />
//           </div>
//         </button>
//         <button onClick={() => setBgTheme('night')}>
//           <div className={bgTheme === 'night' ? goldenCircle : inactiveToggleCircle}>
//             <img src={nightIcon} alt="Night" style={{ filter: bgTheme === 'night' ? 'brightness(0)' : 'brightness(0) invert(1)' }} className="w-[22px] h-[22px]" />
//           </div>
//         </button>
//       </div>

//       {/* ── Nav Links ── */}
//       {navItems.map((item) => (
//         <NavLink key={item.path} to={item.path} className="flex flex-col items-center py-[5px] w-full">
//           {({ isActive }) => (
//             <>
//               <div className={isActive ? goldenCircle : darkCircle}>
//                 <img src={item.icon} alt={item.label} style={{ filter: isActive ? 'brightness(0)' : 'brightness(0) invert(1)' }} className="w-[22px] h-[22px]" />
//               </div>
//               <span className="text-[9px] text-white mt-[3px] text-center whitespace-pre-line leading-[1.3]">
//                 {item.label}
//               </span>
//             </>
//           )}
//         </NavLink>
//       ))}
//     </nav>
//   )
// }

// export default RightNavbar


import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import infoIcon from '../../assets/Home/icons/project_inco_icon.svg'
// import progressIcon from '../../assets/Home/icons/construction_icon.svg'
import videoIcon from '../../assets/Home/icons/walkthrogh.svg'
import galleryIcon from '../../assets/Home/icons/gallery.svg'
// import circulationIcon from '../../assets/Home/icons/Circulation.svg'
// import droneviewIcon from '../../assets/Home/icons/Droneview.webp'

const navItems = [
  // { path: '/circulation', label: 'Circulation', icon: circulationIcon, isCustom: true },
  { path: '/project-info', label: 'Project Info', icon: infoIcon, isCustom: true },
  // { path: '/construction', label: 'Construction\nProgress', icon: progressIcon, isCustom: true },
  { path: '/walkthrough', label: 'Walkthrough', icon: videoIcon, isCustom: true },
  { path: '/gallery', label: 'Gallery', icon: galleryIcon, isCustom: true },
  // { path: '/droneview', label: 'Drone View', icon: droneviewIcon, isCustom: true },
]

const RightNavbar = () => {
  const navigate = useNavigate()
  // const { bgTheme, setBgTheme } = useContext(BackgroundContext)
  // const location = useLocation() // Get the current active route

  const darkCircle = 'w-[36px] md:w-[40px] lg:w-[48px] h-[36px] md:h-[40px] lg:h-[48px] rounded-full flex items-center justify-center bg-[#1e2018]/80 transition-all duration-300'
  const goldenCircle = 'w-[36px] md:w-[40px] lg:w-[48px] h-[36px] md:h-[40px] lg:h-[48px] rounded-full flex items-center justify-center bg-[#FFCF77] transition-all duration-300'

  return (
    <>
      <div className="fixed right-4 md:right-5 lg:right-8 top-[50%] lg:top-1/2 font-sans -translate-y-1/2 z-50 flex flex-col items-center w-[46px] md:w-[52px] lg:w-[60px] scale-[.5] md:scale-[.72] lg:scale-100">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "tween", ease: [0.25, 1, 0.5, 1], duration: 1.2, delay: 0.2 }}
          className="flex flex-col items-center w-full"
        >
          <nav
            className="font-sans z-50 flex flex-col items-center rounded-[80px] w-full py-2 px-1 gap-2"
            style={{
              background: 'rgba(42, 46, 34, 0.5)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0)',
            }}
          >
            {/* ── Nav Links ── */}
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className="flex flex-col items-center py-[2px] lg:py-[5px] w-full">
                {({ isActive }) => (
                  <>
                    <div className={isActive ? goldenCircle : darkCircle}>
                      <img src={item.icon} alt={item.label} style={{ filter: isActive ? 'brightness(0)' : 'brightness(0) invert(1)' }} className="w-[17px] h-[17px] md:w-[19px] md:h-[19px] lg:w-[22px] lg:h-[22px]" />
                    </div>
                    <span className="text-[7.5px] md:text-[8px] lg:text-[9px] text-white mt-[3px] text-center whitespace-pre-line leading-[1.3] select-none">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* 360 Button */}
          <button
            onClick={() => navigate("/360")}
            className="mt-2 w-[36px] md:w-[40px] lg:w-12 h-[36px] md:h-[40px] lg:h-12 rounded-full bg-gradient-to-b border border-white/20
            bg-gradient-to-br from-[#A56A09] cursor-pointer to-[#8C5707]/70
            text-white/80 font-medium text-[9px] md:text-[9.5px] lg:text-[10px] shadow-sm shadow-black/40
            flex items-center justify-center duration-300 translate-all hover:text-black/60
            hover:scale-110 transition-all"
          >
            360°
          </button>
        </motion.div>
      </div>
    </>
  );
}

export default RightNavbar;