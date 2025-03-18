// import React from 'react';
// import {useEffect, useState} from "react";
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
//
//
// const ViewPlot = () => {
//     const { imageKey } = useParams();
//     const navigate = useNavigate();
//     const [imageSrc, setImageSrc] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//
//     useEffect(() =>{
//         const fetchImage = async () => {
//             setIsLoading(true);
//             try {
//                 const imageResponse = await axios.get(
//                     `http://127.0.0.1:8000/solarclient/image/?image_key=${encodeURIComponent(imageKey)}`,
//                     { responseType: 'blob' }
//                 );
//                 const imageUrl = URL.createObjectURL(imageResponse.data);
//                 setImageSrc(imageUrl);
//             } catch (error){
//                 console.error('Error fetching image:', error);
//                 alert('Error fetching image.');
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         if (imageKey) {
//             fetchImage();
//         }
//     }, [imageKey]);
//     return(
//         <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
//         <div className="card w-full max-w-screen-lg bg-base-100 shadow-xl">
//         <div className="view-plot-container">
//             <h1 className="card-title">Solar Prediction Plot</h1>
//
//             {isLoading && <div><strong>Loading Plot...</strong></div>}
//
//             {!isLoading && imageSrc && (
//                 <img src={imageSrc} alt="Solar Prediction Plot" />
//             )}
//
//             {/*<button onClick={() => navigate('/homePage')}>Back to Home</button>*/}
//         </div>
//         </div>
//         </div>
//     );
// };
// export default ViewPlot;
import React from 'react';

const ViewPlot = ({ imageSrc }) => {
    return (
        <div className="view-plot-container p-4 max-w-3xl mx-auto">
            {imageSrc ? (
                <div className="plot-image-container border border-gray-300 rounded-md shadow-md p-4">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Solar Power Prediction Plot</h2>
                    <img
                        src={imageSrc}
                        alt="Solar Prediction"
                        className="w-full h-auto object-contain"
                    />
                </div>
            ) : (
                <div className="text-center text-red-600 text-lg p-4 bg-gray-100 border rounded-md">
                    <strong>Error:</strong> Unable to display image. Please retry.
                </div>
            )}
        </div>
    );
};

export default ViewPlot;