import React from "react";
import { ShimmerThumbnail,ShimmerTitle,ShimmerSectionHeader  } from "react-shimmer-effects";

function loding(){
    
    return(
        <><div className="continer-sm position-absolute top-50 start-50 translate-middle" style={{width: "23rem"}}>

            <div className="rounded">
            
            <ShimmerThumbnail height={250} rounded />
            </div>
        
            
        <div className="m-4">
        <ShimmerTitle line={2} gap={10} variant="primary" />
        <ShimmerSectionHeader />
        
        </div>
        
        </div></>
                
    )
}

export default loding;