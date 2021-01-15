import React from 'react';


const RoundedImageContainer = ({ image, label }) => {
    return (
        <div className="core-leader-item">
            <div className='core-leader-image-container'>
                <img className="core-leader-image" src={image} alt='' />
            </div>
            <p className="core-leader-label">{label}</p>
        </div>
    );
}

export default RoundedImageContainer;