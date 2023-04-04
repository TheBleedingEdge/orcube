import { ClassNames } from '@emotion/react';
import React, { useState } from 'react'
import ReacMapGL from 'react-map-gl'
import { mapBoxKey } from '../../../../../config/mapbox'

function Mapbox() {

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        longitude: -100,
        latitude: 40,
        zoom: 7
    });

    return (
        <div style={{ height: '50vh'}} className="px-10">
            <ReacMapGL
                mapStyle='mapbox://styles/raymond3301/clfnog6qt00s001mxvf9j7rau'
                mapboxAccessToken={mapBoxKey}
                {...viewport}
                onMove={evt => setViewport(evt.viewState)}
            >
            </ReacMapGL>
        </div>
    )
}

export default Mapbox