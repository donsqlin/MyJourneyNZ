function NavBar() {
  return (
    <nav className="bg-[#3479C2] flex justify-between text-white fixed top-0	right-0 left-0">
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8 flex items-center content-center h-16 gap-2">
        <div className="relative flex h-16 items-center">
          <button className="w-5 h-5 rounded-full bg-white text-center">
            <p className="text-[#3479C2] font-bold	text-2xl mt-[-8px]">&lt;</p>
          </button>
        </div>

        <div className=" flex gap-2 ">
          <img
            src="../src/assets/bus-white.png"
            alt="car"
            className="max-w-6"
          />
          <img
            src="../src/assets/train-white.png"
            alt="car"
            className="max-w-6"
          />
        </div>
      </div>

      <div className="max-w-7xl px-2 sm:px-6 lg:px-8 h-16 gap-2 content-center ">
        <div className="flex items-center gap-1">
          <img
            src="../src/assets/finish-flag-white.png"
            alt="car"
            className="max-w-3"
          />
          <div>Destination</div>
        </div>

        <div className="flex items-center gap-1">
          <img
            src="../src/assets/location-white.png"
            alt="car"
            className="max-w-3"
          />
          <div>Current Location</div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
