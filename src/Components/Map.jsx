import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { Icon } from 'leaflet'
import "leaflet/dist/leaflet.css"

const Map = ({ coordinates }) => {

    const position = [coordinates?.latitude, coordinates?.longitude];

    const markerIcon = new Icon({
        iconSize: [32, 32],
        iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png"
    })

    return (
        <MapContainer className='map-container' center={position} zoom={14} scrollWheelZoom={false} style={{ height: 200, width: 400 }} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon}>
                <Popup>
                    Don't just click<br /> Visit us!
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map;