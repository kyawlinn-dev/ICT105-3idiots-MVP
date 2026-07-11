export type ParsedGoogleMapsLocation = { latitude: number; longitude: number }

const isValidCoordinate = ({ latitude, longitude }: ParsedGoogleMapsLocation) =>
  latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180

const fromMatch = (match: RegExpMatchArray | null): ParsedGoogleMapsLocation | null => {
  if (!match?.[1] || !match[2]) {
    return null
  }

  const location = { latitude: Number(match[1]), longitude: Number(match[2]) }
  return Number.isFinite(location.latitude) && Number.isFinite(location.longitude) && isValidCoordinate(location) ? location : null
}

const parseCoordinateValue = (value: string | null) => {
  if (!value) {
    return null
  }

  return fromMatch(value.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/))
}

const isGoogleMapsHost = (hostname: string) => {
  const host = hostname.toLowerCase()
  return host === "goo.gl" || host.endsWith(".goo.gl") || host === "google.com" || host.endsWith(".google.com")
}

export const parseGoogleMapsLocation = (value: string): ParsedGoogleMapsLocation | null => {
  const trimmed = value.trim()
  const rawCoordinates = parseCoordinateValue(trimmed)
  if (rawCoordinates) {
    return rawCoordinates
  }

  try {
    const url = new URL(trimmed)
    if (!isGoogleMapsHost(url.hostname)) {
      return null
    }

    for (const key of ["q", "query", "ll", "destination"]) {
      const parsed = parseCoordinateValue(url.searchParams.get(key))
      if (parsed) {
        return parsed
      }
    }
  } catch {
    return null
  }

  return (
    fromMatch(trimmed.match(/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/)) ??
    fromMatch(trimmed.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/))
  )
}

export const googleMapsUrlFromCoordinates = (latitude: number, longitude: number, zoom = 17) =>
  `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`

export const googleMapsPlaceUrl = (placeId: string) =>
  `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`
