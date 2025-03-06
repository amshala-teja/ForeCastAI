import React, { useState, useRef } from 'react'
import Papa from 'papaparse'
import GoogleMap from './GoogleMap'

const HomePage = () => {
  // Form state
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: ''
  })

  // Checkbox states
  const [options, setOptions] = useState({
    solar: false,
    wind: false,
    actualData: false,
    modelData: false
  })

  // Solar specific fields
  const [solarData, setSolarData] = useState({
    tilt: '',
    size: '',
    systemRatio: '',
    gcr: '',
    arrayTpe:'',
    losses: '',
    inverterEfficiency:'',
    azimuthAngle: '',
    adjustConstant: '',

  })

  // File upload state
  const [selectedFile, setSelectedFile] = useState(null)
  const [parsedCsvData, setParsedCsvData] = useState(null)
  const fileInputRef = useRef(null)

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setOptions(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  // Handle solar data changes
  const handleSolarDataChange = (e) => {
    const { name, value } = e.target
    setSolarData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // File selection handler
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'text/csv') {
      setSelectedFile(file)
      
      // Parse CSV file
      Papa.parse(file, {
        complete: (results) => {
          console.log('Parsed CSV data:', results.data)
          setParsedCsvData(results.data)
        },
        header: true,
        skipEmptyLines: true,
        error: (error) => {
          console.error('CSV Parsing Error:', error)
          alert('Error parsing CSV file')
        }
      })
    } else {
      alert('Please select a valid CSV file')
      setSelectedFile(null)
      setParsedCsvData(null)
    }
  }

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Compile all form data
    const submissionData = {
      projectDetails: formData,
      options,
      solarData: options.solar ? solarData : null,
      csvData: parsedCsvData
    }

    console.log('Submission Data:', submissionData)
    // Add your submission logic here
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body overflow-y-auto max-h-[600px]">
          <h2 className="card-title mb-4">Project Details</h2>
          
          {/* Basic Project Details */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Latitude</span>
            </label>
            <input 
              type="text" 
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              placeholder="Enter here..." 
              className="input input-bordered w-full" 
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Longitude</span>
            </label>
            <input 
              type="text" 
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              placeholder="Enter here..." 
              className="input input-bordered w-full" 
              required
            />
          </div>
          <GoogleMap 
            latitude={formData.latitude} 
            longitude={formData.longitude} 
          />


          <div className="divider">Options</div>

          {/* Solar Option */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Solar</span>
              <input 
                type="checkbox" 
                name="solar"
                checked={options.solar}
                onChange={handleCheckboxChange}
                className="checkbox" 
              />
            </label>
          </div>

          {options.solar && (
            <>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Tilt Angle</span>
                </label>
                <input 
                  type="text" 
                  name="tilt"
                  value={solarData.tilt}
                  onChange={handleSolarDataChange}
                  placeholder="Enter here..." 
                  className="input input-bordered w-full" 
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">System Size</span>
                </label>
                <input 
                  type="text" 
                  name="size"
                  value={solarData.size}
                  onChange={handleSolarDataChange}
                  placeholder="Enter here..." 
                  className="input input-bordered w-full" 
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">AC:DC Ratio</span>
                </label>
                <input 
                  type="text" 
                  name="systemRatio"
                  value={solarData.systemRatio}
                  onChange={handleSolarDataChange}
                  placeholder="Enter here..." 
                  className="input input-bordered w-full" 
                />
              </div>
              <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Azimuth Angle</span>
            </label>
            <input 
              type="text" 
              name="author"
              value={solarData.azimuthAngle}
              onChange={handleSolarDataChange}
              placeholder="Enter here..." 
              className="input input-bordered w-full" 
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Inverter Efficiency</span>
            </label>
            <input 
              type="text" 
              name="author"
              value={solarData.inverterEfficiency}
              onChange={handleSolarDataChange}
              placeholder="Enter here..." 
              className="input input-bordered w-full" 
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Losses</span>
            </label>
            <input 
              type="text" 
              name="author"
              value={solarData.losses}
              onChange={handleSolarDataChange}
              placeholder="Enter here..." 
              className="input input-bordered w-full" 
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Array Type</span>
            </label>
            <input 
              type="text" 
              name="author"
              value={solarData.arrayTpe}
              onChange={handleSolarDataChange}
              placeholder="Enter here..." 
              className="input input-bordered w-full" 
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">GCR</span>
            </label>
            <input 
              type="text" 
              name="author"
              value={solarData.gcr}
              onChange={handleSolarDataChange}
              placeholder="Enter here..." 
              className="input input-bordered w-full" 
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Adjust Constant</span>
            </label>
            <input 
              type="text" 
              name="author"
              value={solarData.adjustConstant}
              onChange={handleSolarDataChange}
              placeholder="Enter here..." 
              className="input input-bordered w-full" 
              required
            />
          </div>
            </>
          )}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Wind</span>
              <input 
                type="checkbox" 
                name="wind"
                checked={options.wind}
                onChange={handleCheckboxChange}
                className="checkbox" 
              />
            </label>
          </div>

          {/* Other Options */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Actual Data</span>
              <input 
                type="checkbox" 
                name="actualData"
                checked={options.actualData}
                onChange={handleCheckboxChange}
                className="checkbox" 
              />
            </label>
          </div>



          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Model Data</span>
              <input 
                type="checkbox" 
                name="modelData"
                checked={options.modelData}
                onChange={handleCheckboxChange}
                className="checkbox" 
              />
            </label>
          </div>

          {/* CSV Upload */}
          {options.actualData && (
            <div className="form-control">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".csv"
                className="hidden" 
              />
              
              <button 
                type="button"
                className="btn btn-primary btn-sm mt-2" 
                onClick={triggerFileInput}
              >
                {selectedFile ? selectedFile.name : 'Upload CSV'}
              </button>

              {selectedFile && (
                <div className="text-sm text-gray-500 mt-2">
                  Selected: {selectedFile.name}
                </div>
              )}

              {parsedCsvData && (
                <div className="mt-2">
                  <details className="collapse bg-base-200">
                    <summary className="collapse-title text-sm font-medium">
                      View Parsed CSV Data
                    </summary>
                    <div className="collapse-content overflow-x-auto max-h-40">
                      <table className="table table-xs">
                        <thead>
                          <tr>
                            {Object.keys(parsedCsvData[0] || {}).map((header, index) => (
                              <th key={index}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {parsedCsvData.slice(0, 5).map((row, index) => (
                            <tr key={index}>
                              {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex}>{value}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="card-actions justify-end mt-4">
            <button 
              type="submit" 
              className="btn btn-success btn-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HomePage
// import React, { useState, useRef, useCallback } from 'react'
// import { 
//   GoogleMap, 
//   useJsApiLoader, 
//   Marker, 
//   Autocomplete 
// } from '@react-google-maps/api'
// import Papa from 'papaparse'

// const HomePage = () => {
//   // Google Maps loader
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries: ['places']
//   })

//   // Form state
//   const [formData, setFormData] = useState({
//     latitude: '',
//     longitude: '',
//     author: ''
//   })

//   // Checkbox states
//   const [options, setOptions] = useState({
//     solar: false,
//     wind: false,
//     actualData: false,
//     modelData: false
//   })

//   // Solar-specific details
//   const [solarDetails, setSolarDetails] = useState({
//     tilt: '',
//     size: '',
//     systemRatio: ''
//   })

//   // File upload state
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [parsedCsvData, setParsedCsvData] = useState(null)

//   // Map location state
//   const [mapLocation, setMapLocation] = useState({
//     center: { lat: 0, lng: 0 },
//     marker: null
//   })

//   // Refs
//   const fileInputRef = useRef(null)
//   const autocompleteRef = useRef(null)

//   // Input change handlers
//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))

//     // Update map if latitude or longitude changes
//     if ((name === 'latitude' || name === 'longitude') && !isNaN(parseFloat(value))) {
//       const lat = name === 'latitude' ? parseFloat(value) : parseFloat(formData.latitude)
//       const lng = name === 'longitude' ? parseFloat(value) : parseFloat(formData.longitude)

//       if (!isNaN(lat) && !isNaN(lng)) {
//         setMapLocation({
//           center: { lat, lng },
//           marker: { lat, lng }
//         })
//       }
//     }
//   }

//   // Checkbox toggle handler
//   const handleOptionToggle = (e) => {
//     const { name, checked } = e.target
//     setOptions(prev => ({
//       ...prev,
//       [name]: checked
//     }))
//   }

//   // Solar details change handler
//   const handleSolarDetailsChange = (e) => {
//     const { name, value } = e.target
//     setSolarDetails(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   // Map click handler
//   const handleMapClick = (event) => {
//     const lat = event.latLng.lat()
//     const lng = event.latLng.lng()

//     setFormData(prev => ({
//       ...prev,
//       latitude: lat.toFixed(6),
//       longitude: lng.toFixed(6)
//     }))

//     setMapLocation({
//       center: { lat, lng },
//       marker: { lat, lng }
//     })
//   }

//   // Place autocomplete handler
//   const handlePlaceSelect = () => {
//     const place = autocompleteRef.current.getPlace()
    
//     if (place.geometry) {
//       const lat = place.geometry.location.lat()
//       const lng = place.geometry.location.lng()

//       setFormData(prev => ({
//         ...prev,
//         latitude: lat.toFixed(6),
//         longitude: lng.toFixed(6)
//       }))

//       setMapLocation({
//         center: { lat, lng },
//         marker: { lat, lng }
//       })
//     }
//   }

//   // File upload handler
//   const handleFileSelect = (event) => {
//     const file = event.target.files[0]
//     if (file && file.type === 'text/csv') {
//       setSelectedFile(file)
      
//       Papa.parse(file, {
//         complete: (results) => {
//           console.log('Parsed CSV data:', results.data)
//           setParsedCsvData(results.data)
//         },
//         header: true,
//         skipEmptyLines: true
//       })
//     } else {
//       alert('Please select a valid CSV file')
//       setSelectedFile(null)
//       setParsedCsvData(null)
//     }
//   }

//   // Form submission handler
//   const handleSubmit = (e) => {
//     e.preventDefault()
    
//     const submissionData = {
//       location: formData,
//       options,
//       solarDetails: options.solar ? solarDetails : null,
//       csvData: parsedCsvData
//     }

//     console.log('Submission Data:', submissionData)
//     // Add your submission logic here
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
//       <div className="card w-96 bg-base-100 shadow-xl">
//         <form onSubmit={handleSubmit} className="card-body overflow-y-auto max-h-[600px]">
//           <h2 className="card-title">Details of the Project</h2>
          
//           {/* Location Search */}
//           {isLoaded && (
//             <div className="form-control w-full mb-2">
//               <Autocomplete
//                 onLoad={(autocomplete) => {
//                   autocompleteRef.current = autocomplete
//                 }}
//                 onPlaceChanged={handlePlaceSelect}
//               >
//                 <input 
//                   type="text"
//                   placeholder="Search location"
//                   className="input input-bordered w-full"
//                 />
//               </Autocomplete>
//             </div>
//           )}

//           {/* Latitude Input */}
//           <div className="form-control w-full">
//             <label className="label">
//               <span className="label-text">Latitude</span>
//             </label>
//             <input 
//               type="text" 
//               name="latitude"
//               value={formData.latitude}
//               onChange={handleInputChange}
//               placeholder="Enter Latitude" 
//               className="input input-bordered w-full" 
//               required
//             />
//           </div>

//           {/* Longitude Input */}
//           <div className="form-control w-full">
//             <label className="label">
//               <span className="label-text">Longitude</span>
//             </label>
//             <input 
//               type="text" 
//               name="longitude"
//               value={formData.longitude}
//               onChange={handleInputChange}
//               placeholder="Enter Longitude" 
//               className="input input-bordered w-full" 
//               required
//             />
//           </div>

//           {/* Author Input */}
//           <div className="form-control w-full">
//             <label className="label">
//               <span className="label-text">Author</span>
//             </label>
//             <input 
//               type="text" 
//               name="author"
//               value={formData.author}
//               onChange={handleInputChange}
//               placeholder="Name" 
//               className="input input-bordered w-full" 
//               required
//             />
//           </div>

//           {/* Google Maps */}
//           {isLoaded && (
//             <div className="mt-4">
//               <GoogleMap
//                 mapContainerStyle={{
//                   width: '100%',
//                   height: '300px'
//                 }}
//                 center={mapLocation.center}
//                 zoom={10}
//                 onClick={handleMapClick}
//               >
//                 {mapLocation.marker && (
//                   <Marker 
//                     position={{ 
//                       lat: mapLocation.marker.lat, 
//                       lng: mapLocation.marker.lng 
//                     }}
//                   />
//                 )}
//               </GoogleMap>
//             </div>
//           )}

//           {/* Options Section */}
//           <div className="divider">Options</div>

//           {/* Solar Option */}
//           <div className="form-control">
//             <label className="label cursor-pointer">
//               <span className="label-text">Solar</span>
//               <input 
//                 type="checkbox" 
//                 name="solar"
//                 checked={options.solar}
//                 onChange={handleOptionToggle}
//                 className="checkbox" 
//               />
//             </label>
//           </div>

//           {/* Solar Details */}
//           {options.solar && (
//             <div className="space-y-2">
//               <div className="form-control w-full">
//                 <label className="label">
//                   <span className="label-text">Tilt</span>
//                 </label>
//                 <input 
//                   type="text" 
//                   name="tilt"
//                   value={solarDetails.tilt}
//                   onChange={handleSolarDetailsChange}
//                   placeholder="Enter Tilt" 
//                   className="input input-bordered w-full" 
//                 />
//               </div>
//               <div className="form-control w-full">
//                 <label className="label">
//                   <span className="label-text">Size</span>
//                 </label>
//                 <input 
//                   type="text" 
//                   name="size"
//                   value={solarDetails.size}
//                   onChange={handleSolarDetailsChange}
//                   placeholder="Enter Size" 
//                   className="input input-bordered w-full" 
//                 />
//               </div>
//               <div className="form-control w-full">
//                 <label className="label">
//                   <span className="label-text">System Ratio</span>
//                 </label>
//                 <input 
//                   type="text" 
//                   name="systemRatio"
//                   value={solarDetails.systemRatio}
//                   onChange={handleSolarDetailsChange}
//                   placeholder="Enter System Ratio" 
//                   className="input input-bordered w-full" 
//                 />
//               </div>
//             </div>
//           )}

//           {/* Other Options */}
//           <div className="form-control">
//             <label className="label cursor-pointer">
//               <span className="label-text">Wind</span>
//               <input 
//                 type="checkbox" 
//                 name="wind"
//                 checked={options.wind}
//                 onChange={handleOptionToggle}
//                 className="checkbox" 
//               />
//             </label>
//           </div>

//           <div className="form-control">
//             <label className="label cursor-pointer">
//               <span className="label-text">Actual Data</span>
//               <input 
//                 type="checkbox" 
//                 name="actualData"
//                 checked={options.actualData}
//                 onChange={handleOptionToggle}
//                 className="checkbox" 
//               />
//             </label>
//           </div>

//           {/* CSV Upload */}
//           {options.actualData && (
//             <div className="form-control mt-2">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileSelect}
//                 accept=".csv"
//                 className="hidden"
//               />
//               <button
//                 type="button"
//                 className="btn btn-primary btn-sm"
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 {selectedFile ? selectedFile.name : 'Upload CSV'}
//               </button>

//               {parsedCsvData && (
//                 <div className="collapse bg-base-200 mt-2">
//                   <input type="checkbox" className="peer" />
//                   <div className="collapse-title">
//                     View Parsed CSV Data
//                   </div>
//                   <div className="collapse-content overflow-x-auto">
//                     <table className="table table-xs">
//                       <thead>
//                         <tr>
//                           {Object.keys(parsedCsvData[0] || {}).map((header) => (
//                             <th key={header}>{header}</th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {parsedCsvData.slice(0, 5).map((row, index) => (
//                           <tr key={index}>
//                             {Object.values(row).map((value, colIndex) => (
//                               <td key={colIndex}>{value}</td>
//                             ))}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Submit Button */}
//           <div className="form-control mt-4">
//             <button type="submit" className="btn btn-success">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default HomePage