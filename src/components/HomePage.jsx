import React, { useState, useRef } from 'react'
import Papa from 'papaparse'
import GoogleMap from './GoogleMap'
import SubmitButton from "./SubmitButton.jsx";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import ViewPlot from "./ViewPlot.jsx";

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
    arrayType:'',
    losses: '',
    inverterEfficiency:'',
    azimuthAngle: '',
    adjustConstant: '',

  })

  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedCsvData, setParsedCsvData] = useState(null);
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [serverData, setServerData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);


  const fileInputRef = useRef(null)

  // Handle input changes
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }))
  // }

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      options,
      solarData: options.solar ? solarData : null,
      csvData: parsedCsvData,
    };

    setIsLoading(true);       // explicitly START loading here (as soon as submit begins)
    // setServerData(null);
    setImageSrc(null);

    try {
      const response = await axios.post(
          'http://127.0.0.1:8000/solarclient/generate-prediction/',
          submissionData,
          { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Server Response:', response.data);
      // const imageKey = response.data.image_key;
      // navigate(`/view-plot/${encodeURIComponent(imageKey)}`);
      const imageResponse = await axios.get(
          `http://127.0.0.1:8000/solarclient/image/?image_key=${encodeURIComponent(response.data.image_key)}`,
          { responseType: 'blob' }
      );
      const imageURL = URL.createObjectURL(imageResponse.data);
      setImageSrc(imageURL);
      // setServerData(response.data);
      //
      // // Once POST finishes, fetch the image from backend using provided image_key clearly

      //
      // // convert to blob to URL explicitly

      //
      //
      // // alert('Data successfully submitted!');
    } catch (error) {
      console.error('Error during POST:', error);
      setError('An error occurred while generating the prediction.');
    } finally {
      setIsLoading(false);
    }
  };

  //   // Compile all form data
  //   const submissionData = {
  //     projectDetails: formData,
  //     options,
  //     solarData: options.solar ? solarData : null,
  //     csvData: parsedCsvData,
  //   };
  //   console.log('Submission Data:', submissionData);
  //   // Add your submission logic here...
  // };


  return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
        <div className="card w-full max-w-screen-lg bg-base-100 shadow-xl">
          <form onSubmit={handleSubmit} className="card-body overflow-y-auto max-h-[600px]">
            <h2 className="card-title mb-4">Project Details</h2>
          {/* Basic Project Details */}
          {/*  Latitude Input*/}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Latitude</span>
            </label>
            <input 
              type="text" 
              name="latitude"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              placeholder="Enter here..." 
              className="input input-bordered w-full" 
              required
            />
          </div>
          {/*Longitude Input*/}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Longitude</span>
            </label>
            <input 
              type="text" 
              name="longitude"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
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
              name="azimuthAngle"
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
              name="inverterEfficiency"
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
              name="losses"
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
              name="arrayType"
              value={solarData.arrayType}
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
              name="gcr"
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
              name="adjustConstant"
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
          <div className="mt-4">

            {!imageSrc ? (
                <SubmitButton
                label="Submit"
                className="btn btn-primary w-full"
            />
            ):(
                <button
                    onClick={() => {
                      setImageSrc(null);
                      setIsLoading(false);
                    }}
                    className="btn btn-secondary w-full"> Reset </button>
            )}
          </div>

        </form>
          {/* Explicitly render loading just once, clearly at the top */}
          {isLoading && (
              <div>

            <div aria-label="status" className="status status-xs"></div>
            <div aria-label="status" className="status status-sm"></div>
            <div aria-label="status" className="status status-md"></div>
            <div aria-label="status" className="status status-lg"></div>
            <div aria-label="status" className="status status-xl"></div> Generating the Solar Power Prediction Plot...</div>
          )}
          {/* Explicit error handler */}
          {error && <div className="text-red-500 my-4 text-center">{error}</div>}
          {/* Explicitly display ViewPlot after fetching the image */}
          {!isLoading && imageSrc && (
              <div className="my-6">
                <ViewPlot imageSrc={imageSrc} />
              </div>
          )}



          {/*/!* Your normal data display once loaded explicitly *!/*/}
          {/*{!isLoading && serverData && (*/}
          {/*    <>*/}
          {/*      /!*<div>*!/*/}
          {/*      /!*  <h3>Prediction Data:</h3>*!/*/}
          {/*      /!*  <div><strong>Latitude:</strong> {serverData.serializer_data.latitude}</div>*!/*/}
          {/*      /!*  <div><strong>Longitude:</strong> {serverData.serializer_data.longitude}</div>*!/*/}

          {/*      /!*  <h4>Metrics:</h4>*!/*/}
          {/*      /!*  <pre>{JSON.stringify(serverData.metrics, null, 2)}</pre>*!/*/}

          {/*      /!*  <h4>Predictions:</h4>*!/*/}
          {/*      /!*  <pre>{JSON.stringify(serverData.predictions, null, 2)}</pre>*!/*/}

          {/*      /!*  <h4>Actual Test Data (y_test):</h4>*!/*/}
          {/*      /!*  <pre>{JSON.stringify(serverData.y_test, null, 2)}</pre>*!/*/}

          {/*      /!*  <h4>Hours:</h4>*!/*/}
          {/*      /!*  <pre>{JSON.stringify(serverData.hours, null, 2)}</pre>*!/*/}
          {/*      /!*</div>*!/*/}

          {/*      <div>*/}
          {/*        <h4>Prediction Image:</h4>*/}
          {/*        {imageSrc && <img src={imageSrc} alt="Solar Prediction Result"/>}*/}
          {/*      </div>*/}
          {/*    </>*/}
          {/*)}*/}

        </div>
    </div>
  )
}

export default HomePage