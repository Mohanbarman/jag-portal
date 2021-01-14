import React from 'react';


const Banner = ({ title, image }) => {
    return (
        <section className='banner'>
            <img src={image} alt={title} className='banner-image' />
            <div className='banner-title-container'>
                <h3>{title}</h3>
            </div>
        </section>
    )
}

export default Banner;