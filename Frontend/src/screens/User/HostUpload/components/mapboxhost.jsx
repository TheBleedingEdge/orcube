import { ClassNames } from '@emotion/react';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl'
import { mapBoxKey } from '../../../../config/mapbox';
import getCenter from 'geolib/es/getCenter'
import './mapboxhost.css'
import { hostUploadReq, hostUploadSuccess, hostUploadFail } from '../../../../features/hostSlice/hostUploadSlice';

function MapboxHost({latit, longit}) {

    const [marker, setMarker] = useState({
        longitude: 0,
        latitude: 0
    });

    console.log("place here", latit,longit);

    const dispatch = useDispatch();
    const center = getCenter([{ latitude: latit, longitude: longit }]);

    useEffect(() => {
        dispatch(hostUploadSuccess(marker))
    }, [marker]);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 6
    });

    return (
        <div className="h-[500px]">
            <ReactMapGL
                mapStyle='mapbox://styles/raymond3301/clfnog6qt00s001mxvf9j7rau'
                mapboxAccessToken={mapBoxKey}
                {...viewport}
                onMove={evt => setViewport(evt.viewState)}
                onClick={(event) => {
                    setMarker({
                        longitude: event.lngLat.lng,
                        latitude: event.lngLat.lat
                    });
                }}
            >
                {marker && (<Marker longitude={marker.longitude} latitude={marker.latitude} offsetLeft={-20} offsetTop={-10}>
                </Marker>
                )}

            </ReactMapGL>
        </div>
    )
}

export default MapboxHost