

import './App.css'
import AppRoutes from './pages/Routes/Routes'


function App() {


  return (
    <>
      <AppRoutes />
      <div className="fixed bottom-3 right-2 lg:bottom-2 lg:right-2 z-[9999] pointer-events-none select-none">
        <div className="px-2.5 py-1 rounded-full bg-black/10 backdrop-blur-md border border-white/15  text-[7px] lg:text-[7px] text-white/70 font-sans tracking-widest uppercase font-medium">
          Design by Fute Services
        </div>
      </div>
    </>
  )
}

export default App
