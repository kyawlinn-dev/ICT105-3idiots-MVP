import { ExternalLink, MapPin } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { formatCurrency } from "../../lib/utils"
import type { ListingMapMarker } from "../../services/api/types"
import { googleMapsPlaceUrl, googleMapsUrlFromCoordinates } from "../../services/maps/googleMapsLinks"
import { loadGoogleMaps } from "../../services/maps/googleMapsLoader"
import { Card, CardContent } from "../ui/card"

const defaultCenter = { lat: 13.9649, lng: 100.6059 }

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")

const markerInfoContent = (marker: ListingMapMarker) => `
  <div style="min-width: 180px; max-width: 220px; font-family: Inter, Arial, sans-serif;">
    <strong style="display: block; margin-bottom: 6px; color: #020617;">${escapeHtml(marker.name)}</strong>
    <span style="display: block; margin-bottom: 4px; color: #2563eb; font-size: 12px; font-weight: 700;">${marker.distanceFromCampus} km from campus</span>
    <span style="display: block; margin-bottom: 10px; color: #475569; font-size: 12px;">${formatCurrency(marker.price)} THB/month</span>
    <a href="/apartments/${encodeURIComponent(marker.id)}" style="color: #2563eb; font-size: 12px; font-weight: 700; text-decoration: none;">View apartment</a>
  </div>
`

type GoogleMapCanvasProps = {
  markers: ListingMapMarker[]
  center?: { lat: number; lng: number }
  zoom?: number
  className: string
  fitToMarkers?: boolean
}

function GoogleMapCanvas({ markers, center = defaultCenter, zoom = 14, className, fitToMarkers = false }: GoogleMapCanvasProps) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [error, setError] = useState("")
  const { lat: centerLat, lng: centerLng } = center

  useEffect(() => {
    let cancelled = false
    const renderedMarkers: google.maps.Marker[] = []
    const infoWindows: google.maps.InfoWindow[] = []

    setError("")

    loadGoogleMaps()
      .then(({ Map, LatLngBounds, Marker, InfoWindow }) => {
        const mapElement = mapRef.current
        if (cancelled || !mapElement) {
          return
        }

        const map = new Map(mapElement, {
          center: { lat: centerLat, lng: centerLng },
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          clickableIcons: false,
        })

        const bounds = new LatLngBounds()

        markers.forEach((marker) => {
          const position = { lat: marker.latitude, lng: marker.longitude }
          bounds.extend(position)

          const mapMarker = new Marker({
            map,
            position,
            title: marker.name,
          })
          const infoWindow = new InfoWindow({ content: markerInfoContent(marker) })

          mapMarker.addListener("click", () => {
            infoWindows.forEach((current) => current.close())
            infoWindow.open({ anchor: mapMarker, map })
          })

          renderedMarkers.push(mapMarker)
          infoWindows.push(infoWindow)
        })

        if (fitToMarkers && markers.length > 1) {
          map.fitBounds(bounds)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Google Maps is unavailable. Check the API key and browser restrictions.")
        }
      })

    return () => {
      cancelled = true
      infoWindows.forEach((infoWindow) => infoWindow.close())
      renderedMarkers.forEach((marker) => marker.setMap(null))
    }
  }, [centerLat, centerLng, fitToMarkers, markers, zoom])

  if (error) {
    return (
      <div className={`${className} grid place-items-center bg-slate-100 p-6 text-center`}>
        <div>
          <MapPin className="mx-auto h-7 w-7 text-blue-600" />
          <p className="mt-3 text-sm font-bold text-slate-950">Map unavailable</p>
          <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">{error}</p>
        </div>
      </div>
    )
  }

  return <div ref={mapRef} className={className} />
}

type OverviewMapProps = {
  markers: ListingMapMarker[]
}

export function ListingOverviewMap({ markers }: OverviewMapProps) {
  const hasMarkers = markers.length > 0

  return (
    <Card className="overflow-hidden">
      <CardContent className="grid gap-0 p-0 lg:grid-cols-[1fr_320px]">
        {hasMarkers ? (
          <GoogleMapCanvas markers={markers} className="h-[320px] w-full sm:h-[360px]" fitToMarkers />
        ) : (
          <div className="grid h-[320px] place-items-center bg-slate-100 p-6 text-center sm:h-[360px]">
            <div>
              <MapPin className="mx-auto h-7 w-7 text-blue-600" />
              <p className="mt-3 text-sm font-bold text-slate-950">No available map locations</p>
              <p className="mt-1 text-xs text-slate-500">Approved owner listings with confirmed coordinates will appear here.</p>
            </div>
          </div>
        )}
        <div className="max-h-[360px] overflow-y-auto border-t border-slate-200 bg-white p-4 lg:border-l lg:border-t-0">
          <div className="mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <p className="text-sm font-bold text-slate-950">{markers.length} available locations</p>
          </div>
          <div className="grid gap-3">
            {markers.map((marker) => (
              <Link key={marker.id} to={`/apartments/${marker.id}`} className="rounded-lg border border-slate-200 p-3 transition hover:border-blue-200 hover:bg-blue-50/40">
                <p className="text-sm font-bold text-slate-950">{marker.name}</p>
                <p className="mt-1 text-xs font-semibold text-blue-600">{marker.distanceFromCampus} km from campus</p>
                <p className="mt-1 text-xs text-slate-500">{formatCurrency(marker.price)} THB/month</p>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type DetailMapProps = {
  marker: ListingMapMarker
}

export function ListingDetailMap({ marker }: DetailMapProps) {
  const mapUrl = useMemo(
    () => marker.googlePlaceId ? googleMapsPlaceUrl(marker.googlePlaceId) : marker.googleMapsUrl ?? googleMapsUrlFromCoordinates(marker.latitude, marker.longitude),
    [marker.googlePlaceId, marker.googleMapsUrl, marker.latitude, marker.longitude],
  )
  const markers = useMemo(() => [marker], [marker])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <GoogleMapCanvas markers={markers} center={{ lat: marker.latitude, lng: marker.longitude }} zoom={16} className="h-52 w-full sm:h-56" />
        <div className="flex flex-col gap-3 border-t border-slate-100 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-950">{marker.name}</p>
            <p className="mt-1 text-xs text-slate-500">
              Approx. {marker.distanceFromCampus} km from campus. Coordinates come from the owner-confirmed location.
            </p>
          </div>
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open in Google Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
