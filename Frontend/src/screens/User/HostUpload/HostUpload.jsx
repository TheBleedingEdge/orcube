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

    <div className="w-full mt-10 bg-white rounded-lg shadow-md">
      <h1 className='text-2xl font-bold mb-4'>Upload here</h1>

      <div className='lg:flex md:flex'>
        {/* //flex can be given here */}

        <div className="px-8 py-6">
          <form>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-2">Title</label>
              <input id="title" type="text" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-2">Description</label>
              <textarea id="description" className="textarea w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" rows="5"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="photos" className="block font-medium mb-2">Photos</label>
              <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block font-medium mb-2">Price per night</label>
              <input id="price" type="number" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            </div>
          </form>
        </div>


        <div className="px-8 py-6 mx-auto">
          <span className='text-2xl'>Guests</span>
          <form>
            <section className='mt-10'>
              <div className='flex'>
                <h2 className='font-medium'>Adult</h2>
                <div className="ml-10 mb-4">
                  <button onClick={(e)=> {
                    e.preventDefault()
                  }} className="btn btn-circle bg-gray-400 btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                    </svg>
                  </button>
                  <input type="number" className="w-16 text-center border-b border-gray-700 px-3 py-1 rounded-md focus:outline-none" />
                  <button className="btn btn-circle bg-gray-400 btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className='flex'>
                <h2 className='font-medium'>Children</h2>
                <div className="ml-5 mb-4">
                  <button className="btn btn-circle bg-gray-400 btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                    </svg>
                  </button>
                  <input type="number" className="w-16 text-center border-b border-gray-700 px-3 py-1 rounded-md focus:outline-none" />
                  <button className="btn btn-circle bg-gray-400 btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className='flex'>
                <h2 className='font-medium'>Pets</h2>
                <div className="ml-12 mb-4">
                  <button className="btn btn-circle bg-gray-400 btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                    </svg>
                  </button>
                  <input type="number" className="w-16 text-center border-b border-gray-700 px-3 py-1 rounded-md focus:outline-none" />
                  <button className="btn btn-circle bg-gray-400 btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>



            <section className='mt-10'>
              <span className='text-2xl'>Perks</span>
              <div className='mt-2 grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
                <label className="border bg-blue-100 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                  <input type="checkbox" className="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                  </svg>
                  <span>Wifi</span>
                </label>
                <label className="border bg-blue-100 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                  <input type="checkbox" className="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <span>Free parking</span>
                </label>
                <label className="border bg-blue-100 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                  <input type="checkbox" className="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  <span>TV</span>
                </label>
                <label className="border bg-blue-100 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                  <input type="checkbox" className="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                  </svg>
                  <span>Kitchen</span>
                </label>
                <label className="border bg-blue-100 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                  <input type="checkbox" className="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                  <span>Pets</span>
                </label>
                <label className="border bg-blue-100 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                  <input type="checkbox" className="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  <span>Private entrance</span>
                </label>
              </div>
            </section>


          </form>
          <section className='mt-12 ml-auto'>
            <button type="submit" className="btn btn-md  w-1/3 bg-blue-400">Save</button>
          </section>
        </div >
      </div>


    </div >

  )
}

export default HostUpload