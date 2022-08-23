import React from "react";

export const Footer = (props) => {
    const {isAuthPage} = props;
    return(
        !isAuthPage && <div className="footer w-full h-20 bg-gray-100">
            
        </div>
    )
};
