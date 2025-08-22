import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CarouselComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const images = [
    '/candidatos/outros/Cristiano_Palma.png',
    '/candidatos/outros/Andreia_Baiao.png',
    '/candidatos/outros/Margarida_Vasconcelos_1.png',
  ];

  return (
    <section id="carousel" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Galeria de Imagens</h2>
        <div className="max-w-4xl mx-auto">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Slide ${index + 1}`} className="w-full h-96 object-cover rounded-lg shadow-lg" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default CarouselComponent;