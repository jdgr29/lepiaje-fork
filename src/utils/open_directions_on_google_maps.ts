import { google_maps_url } from "@/constants/google_maps_url";
import { Directions } from "@/types";

export function open_directions_on_google_maps(to: Directions,): string {
    const google_maps: string = `${google_maps_url!}?api=1&destination=${to.latitude},${to.longitude}&travelmode=driving`
    return google_maps!;
}