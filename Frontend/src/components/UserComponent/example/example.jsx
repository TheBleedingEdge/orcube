import React from 'react'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function HostUpload() {
  const top100Films = [
    { title: 'WIFI', year: 1994 },
    { title: 'Free Parking Spot', year: 1972 },
    { title: 'TV', year: 1974 },
    { title: 'Ratio', year: 2008 },
    { title: 'Pets', year: 1957 },
    { title: "Private Entrance", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ];




  return (
    <div className="min-h-screen bg-slate-50 flex items-center">
      <div className="card mx-auto w-full max-w-xl  shadow-xl">
        <div className="  bg-base-100 rounded-xl">
          <div className=''>
            <form className=" bg-blue-400  bg-opacity-20 shadow-md rounded px-8 pt-6 mb-4 pl-10">



              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
                  Place Name
                </label>
                <input type="text" placeholder="Type here" className="input w-full max-w-md rounded-full" />
              </div>


              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
                  Address
                </label>
                <input type="text" placeholder="Type here" className="input w-full max-w-md rounded-full" />
              </div>


              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Photo Upload
                </label>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Pick a file</span>
                    <span className="label-text-alt"> </span>
                  </label>
                  <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                  <label className="label">
                    <span className="label-text-alt"> </span>
                    <span className="label-text-alt"> </span>
                  </label>
                </div>
              </div>



              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                  Perks
                </label>
                <Stack spacing={3} sx={{ width: 375 }}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[top100Films[1]]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Multiple values"
                        placeholder="Favorites"
                      />
                    )}
                  />
                </Stack>
              </div>



              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                  Extra INFO
                </label>
                <textarea className="textarea textarea-accent xl:w-1/3 sm:w-full " placeholder="Features"></textarea>
              </div>

              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostUpload