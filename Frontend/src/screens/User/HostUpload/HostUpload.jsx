import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; //because using multer need form element with axios header as mulripart/form-data
import MapboxHost from './components/mapboxhost';
import { SpaceUpload } from '../../../actions/hostActions';
import Header from '../../../components/common/Header';
import { mapBoxKey } from '../../../config/mapbox';
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

function HostUpload() {

  const [Title, setTitle] = useState();
  const [Address, setAddress] = useState();
  const [Discription, setDiscription] = useState();
  const [Price, setPrice] = useState();
  const [isCheckedwifi, setIsCheckedwifi] = useState(false);
  const [isCheckedparking, setIsCheckedparking] = useState(false);
  const [isCheckedtv, setIsCheckedtv] = useState(false);
  const [isCheckedkitchen, setIsCheckedkitchen] = useState(false);
  const [isCheckedentrance, setIsCheckedentrance] = useState(false);

  const [countAdult, setCountAdult] = useState(1);
  const [countChildren, setCountChildren] = useState(0);
  const [countPets, setCountPets] = useState(0);

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [longit, setLongtit] = useState(0);
  const [latit, setLatit] = useState(0);
 
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${mapBoxKey}`
      );

      setSuggestions(response.data.features);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // [longit, latit] = suggestion.center;
    setLatit(suggestion.center[0])
    setLongtit(suggestion.center[1])
    setInputValue(suggestion.place_name);
    setSuggestions([]);
  };

  // const [imageurl, setImageUrl] = useState('');

  const [images, setImages] = useState([]);

  const ref = useRef({
    imageurl: ""
  });

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo } = userLogin;
  if (userInfo) {
    var HostId = userInfo._id
  }

  const { hostcoord } = useSelector((state) => state.hostUpload);
  const dispatch = useDispatch();

  const submitPic = async event => {
    event.preventDefault()
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('image', image);
    });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'multipart/form-data'
      },
    };
    console.log(images);
    const { data } = await axios.post("http://127.0.0.1:5000/api/host/spaceuploadpic", formData, config);
    if (data != null) {
      toast.success("Images successfully Uploaded")
      console.log('dataaa', data.locationArray);
      ref.current.imageurl = data.locationArray
      // imageurl = data;
    }else{
      toast.error("Error in image upload")
    }
  }

  const submitData = async () => {
    console.log("Imagae data here", ref.current.imageurl);
    const imageUrl = ref.current.imageurl
    dispatch(SpaceUpload(HostId, imageUrl, Title, Address, Discription, Price, isCheckedwifi, isCheckedparking, isCheckedtv, isCheckedkitchen, isCheckedentrance, countAdult, countChildren, countPets, hostcoord, inputValue))
    toast.success("Space Saved Successfully")
    navigate('/');
  }

  // const fileSelected = event => {
  //   const files = event.target.files[4]
  //   const fileList = [];
  //   for (let i = 0; i < files.length; i++) {
  //     fileList.push(files[i]);
  //   }
  //   setFile(fileList)

  //   console.log("Files here",file);
  // }

  const fileSelected = (event) => {
    const newImages = Array.from(event.target.files);
    setImages([...images, ...newImages]);
  };

  return (

    <div>
      <Header />
      <div className="px-10 py-20 bg-slate-50 rounded-lg shadow-xl">
        <ToastContainer/>
        <div className='mb-5 mx-16'>
          <h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>Upload here</h1>
        </div>

        <div className='lg:flex md:flex container mx-auto gap-5'>
          {/* //flex can be given here */}
          <section className='border bg-slate-200 shadow-2xl rounded-lg'>
            <div className="px-8 py-6">
              <form>
                <div className="mb-4">
                  <label htmlFor="title" className="block font-medium mb-2">Title</label>
                  <input onChange={ev => setTitle(ev.target.value)} id="title" type="text" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block font-medium mb-2">Address</label>
                  <textarea onChange={ev => setAddress(ev.target.value)} id="description" className="textarea w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" rows="3"></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block font-medium mb-2">Description</label>
                  <textarea onChange={ev => setDiscription(ev.target.value)} id="description" className="textarea w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" rows="3"></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="photos" className="block font-medium mb-2">Photos</label>
                  <form>
                    <input onChange={fileSelected} type="file" name='image' className="file-input file-input-bordered w-full max-w-xs" multiple />
                    <button onClick={submitPic} className="mt-4 btn gap-3 bg-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Upload
                    </button>
                  </form>
                </div>

                <div className="mb-4">
                  <label htmlFor="price" className="block font-medium mb-2">Price per night</label>
                  <input onChange={ev => setPrice(ev.target.value)} id="price" type="number" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                </div>
              </form>
            </div>
          </section>


          <div className="px-8 py-6 mx-auto bg-slate-200 border shadow-2xl rounded-lg">
            <span className='text-2xl'>Guests</span>
            <div className=''> {/* div for mapbox also */}
              <section className='mt-10'>
                <div className='flex'>
                  <h2 className='font-medium'>Adult</h2>
                  <div className="ml-10 mb-4">
                    <button onClick={() => setCountAdult((obj) => obj - 1)} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                      </svg>
                    </button>
                    <input value={countAdult} type="number" className="w-16 text-xl text-center border-b border-gray-700 px-3 py-1 rounded-md focus:outline-none" />
                    <button onClick={() => setCountAdult((obj) => obj + 1)} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className='flex'>
                  <h2 className='font-medium'>Children</h2>
                  <div className="ml-5 mb-4">
                    <button onClick={() => setCountChildren((obj) => obj - 1)} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                      </svg>
                    </button>
                    <input value={countChildren} type="number" className="w-16 text-xl text-center border-b border-gray-700 px-3 py-1 rounded-md focus:outline-none" />
                    <button onClick={() => setCountChildren((obj) => obj + 1)} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className='flex'>
                  <h2 className='font-medium'>Pets</h2>
                  <div className="ml-12 mb-4">
                    <button onClick={() => setCountPets((obj) => obj - 1)} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                      </svg>
                    </button>
                    <input value={countPets} type="number" className="w-16 text-xl text-center border-b border-gray-700 px-3 py-1 rounded-md focus:outline-none" />
                    <button onClick={() => setCountPets((obj) => obj + 1)} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </section>

              <section className='border border-black'>
                <MapboxHost latit={latit} longit={longit} />
              </section>
    
                <div className="form-control w-full max-w-xs relative">
                  <label className="label">
                    <span className="label-text">Select Place</span>
                  </label>
                  <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                  <label className="label">
                  </label>

                  <ul className="menu bg-base-100 w-65 rounded-box flex absolute mt-24">
                    {suggestions.map((suggestion) => (
                      <li className='hover-bordered' key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}><a>
                        {suggestion.place_name}
                        </a></li>
                    ))}
                  </ul>


                </div>
      
            </div>



            <section className='mt-10'>
              <span className='text-2xl'>Perks</span>
              <div className='mt-2 grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
                <label className="border bg-blue-100 hover:bg-blue-200 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                  <input onChange={event => setIsCheckedwifi(event.target.checked)} type="checkbox" className="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                  </svg>
                  <span>Wifi</span>
                </label>
                <label className="border bg-blue-100 hover:bg-blue-200 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                  <input onChange={event => setIsCheckedparking(event.target.checked)} type="checkbox" className="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <span>Free parking</span>
                </label>
                <label className="border bg-blue-100 hover:bg-blue-200 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                  <input onChange={event => setIsCheckedtv(event.target.checked)} type="checkbox" className="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  <span>TV</span>
                </label>
                <label className="border bg-blue-100 hover:bg-blue-200 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                  <input onChange={event => setIsCheckedkitchen(event.target.checked)} type="checkbox" className="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                  </svg>
                  <span>Kitchen</span>
                </label>
                <label className="border bg-blue-100 hover:bg-blue-200 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                  <input onChange={event => setIsCheckedentrance(event.target.checked)} type="checkbox" className="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  <span>Private entrance</span>
                </label>
              </div>
            </section>
            <section className='my-20 justify-center '>
              <button onClick={submitData}  className="btn btn-md  w-1/3 bg-blue-400">Save</button>
            </section>
          </div>

        </div>
      </div >
    </div>

  )
}

export default HostUpload