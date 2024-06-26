import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react'

const GoogleMap = forwardRef(({ start, end, travelMode }, ref) => {
  const [directionsData, setDirectionsData] = useState()
  // Expose a function to calculate and display route externally
  useImperativeHandle(ref, () => ({
    calculateRoute: () => {
      if (start && end) {
        calculateAndDisplayRoute()
      } else {
        console.log('Start and End must be set before calculating route')
      }
    },
  }))
  // Define initMap function
  const initMap = () => {
    const directionsService = new window.google.maps.DirectionsService()
    const directionsRenderer = new window.google.maps.DirectionsRenderer()
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: { lat: -36.880184, lng: 174.754739 },
    })
    directionsRenderer.setMap(map)
    directionsRenderer.setPanel(document.getElementById('directionsPanel'))

    window.directionsService = directionsService
    window.directionsRenderer = directionsRenderer
  }

  // Function to calculate and display route
  const calculateAndDisplayRoute = () => {
    const { directionsService, directionsRenderer } = window
    directionsService.route(
      {
        origin: { query: start },
        destination: { query: end },
        travelMode: window.google.maps.TravelMode[travelMode],
      },
      (response, status) => {
        if (status === 'OK') {
          setDirectionsData(response.routes[0].legs[0].steps)
          directionsRenderer.setDirections(response)
        } else {
          window.alert('Directions request failed due to ' + status)
        }
      }
    )
  }

  // Effect to load Google Maps API script
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
    script.async = true
    script.defer = true

    // Define initMap in the global scope for Google Maps API to access
    window.initMap = initMap

    // Append the script to the document head
    document.head.appendChild(script)

    // Clean up function to remove the script from the head
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // Effect to initialize the map when Google Maps API is ready
  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap()
    }
  }, [])
  console.log(directionsData)
  return (
    <div>
      <div id="map" style={{ height: '710px', width: '100%' }}></div>
      <div className="mt-2">
        <div className="flex font-bold">
          <div className="flex gap-2">
            <div className="ml-2">3:30</div>
            <div>Location</div>
          </div>
          <div className="ml-2">Depart from {start}</div>
        </div>

        <ul>
          {directionsData.map((direction) => (
            <li key={direction.instructions}>
              <p>{direction.instructions}</p>
              <p>{direction.duration.text}</p>
            </li>
          ))}
        </ul>

        <div className="flex font-bold justify-between">
          <div className="flex gap-2">
            <div className="ml-2">4:30</div>
            <div>flag icon</div>
            <div>Arrive at {end}</div>
          </div>

          <div>
            <button className="bg-black text-white font-bold py-2 px-4 rounded mr-3 mb-5">
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default GoogleMap
