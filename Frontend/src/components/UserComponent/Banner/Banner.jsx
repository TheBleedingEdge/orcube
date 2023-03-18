import React from 'react'

function Banner() {
    return (
        <div>
            <div class="mx-auto bg-im h-96 rounded-md flex items-center bg-center bg-cover" style={{ backgroundImage: `url('https://in.musafir.com/uploads/banner_6d96d9b9a1.png')` }}>
                <div class="sm:ml-20 text-gray-50 text-center sm:text-left">
                    <h1 class="text-5xl font-bold mb-4">
                        Book saunas <br />
                        everywhere.
                    </h1>
                    <p class="text-lg inline-block sm:block">The largest online community to rent saunas in Finland.</p>
                    <button class="mt-8 px-4 py-2 bg-gray-600 rounded">Browse saunas</button>
                </div>
            </div>
        </div>
    )
}

export default Banner