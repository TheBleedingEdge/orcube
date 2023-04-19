import { ClassNames } from '@emotion/react';
import React, { useState } from 'react'
import ReacMapGL, { Marker } from 'react-map-gl'
import { mapBoxKey } from '../../../../../config/mapbox'
;
function Mapbox({ mapData }) {

    console.log("Mapdatahere", mapData);
    const lang = mapData?.longitude;
    const lat = mapData?.latitude

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        longitude: lang || 78.9629,
        latitude: lat || 20.5937,
        zoom: 3
    });

    return (
        <div style={{ height: '50vh' }} className="px-10">
            <ReacMapGL
                mapStyle='mapbox://styles/raymond3301/clfnog6qt00s001mxvf9j7rau'
                mapboxAccessToken={mapBoxKey}
                {...viewport}
                onMove={evt => setViewport(evt.viewState)}
            >

                {mapData?.longitude && mapData?.latitude && (<Marker longitude={mapData?.longitude} latitude={mapData?.latitude} offsetLeft={-20} offsetTop={-10}>
                </Marker>
                )}
            </ReacMapGL>
        </div>
    )
}

export default Mapbox