import React,{useEffect} from 'react'

const GoogleMap = ({ latitude, longitude }) => {
    useEffect(()=>{
                const ifameData=document.getElementById("iframeId")
                const lat= latitude;
                const lon= longitude;
                ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
            })
  return (
    <div>
        <iframe 
            id="iframeId" 
            height="300" 
            width="100%" 
            style={{ border: 0 }} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    </div>
  )
}

export default GoogleMap
