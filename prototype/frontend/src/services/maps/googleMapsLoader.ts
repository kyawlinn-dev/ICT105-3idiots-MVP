import { importLibrary, setOptions } from "@googlemaps/js-api-loader"

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

export type LoadedGoogleMaps = {
  Map: typeof google.maps.Map
  LatLngBounds: typeof google.maps.LatLngBounds
  Marker: typeof google.maps.Marker
  InfoWindow: typeof google.maps.InfoWindow
}

let loaderConfigured = false
let mapsPromise: Promise<LoadedGoogleMaps> | null = null
let placesPromise: Promise<google.maps.PlacesLibrary> | null = null

const configureLoader = () => {
  if (!googleMapsApiKey) {
    throw new Error("Google Maps API key is missing.")
  }

  if (!loaderConfigured) {
    setOptions({ key: googleMapsApiKey, v: "weekly" })
    loaderConfigured = true
  }
}

export const loadGoogleMaps = async () => {
  configureLoader()

  mapsPromise ??= Promise.all([importLibrary("maps"), importLibrary("marker")]).then(([mapsLibrary]) => {
    const { Map, InfoWindow } = mapsLibrary as google.maps.MapsLibrary
    return { Map, LatLngBounds: google.maps.LatLngBounds, Marker: google.maps.Marker, InfoWindow }
  })

  return mapsPromise
}

export const loadGooglePlaces = async () => {
  configureLoader()
  placesPromise ??= importLibrary("places") as Promise<google.maps.PlacesLibrary>
  return placesPromise
}
