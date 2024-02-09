import React from 'react';
import {useNavigate} from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import imgAccueilVoiture from '../../Image/categorie-accueil/voiture-accueil.jpg'
import imgAccueilMoto from '../../Image/categorie-accueil/moto-accueil.jpg'
import imgAccueilTracteur from '../../Image/categorie-accueil/tracteur-accueil.jpg'
import imgAccueilPiece from '../../Image/categorie-accueil/piece-accueil.jpg'
import imgAccueilFigurine from '../../Image/categorie-accueil/figurine-accueil.jpg'


const SwipperAccueil = () => {

    const navigate = useNavigate();

    return ( <>


<div className="slider-responsive2">   
    <Swiper 
        slidesPerView={2} 
        spaceBetween={30} 
        slidesPerGroup={1} 
        loopFillGroupWithBlank={true} 
        pagination={{
            "clickable": true
        }} 
        navigation={true}
        className="mySwiper">
        <SwiperSlide>
            <div className='card-categorie3' onClick={() => navigate('/categorieAccueil/voiture')}>
                <img className='img-voiture' src={imgAccueilVoiture} alt="" />
                <div className="overlay3">
                    <p className='main-text3'>VOITURES</p>
                    <p className='second-text3'>découvrir</p>
                </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='card-categorie3' onClick={() => navigate('/categorieAccueil/moto')}>
                <img className='img-voiture' src={imgAccueilMoto} alt="" />
                <div className="overlay3">
                    <p className='main-text3'>MOTOS</p>
                    <p className='second-text3'>découvrir</p>
                </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='card-categorie3' onClick={() => navigate('/categorieAccueil/tracteur')}>
                <img className='img-voiture' src={imgAccueilTracteur} alt="" />
                <p>TRACTEURS</p>
                <div className="overlay3">
                    <p className='main-text3'>TRACTEURS</p>
                    <p className='second-text3'>découvrir</p>
                </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='card-categorie3' onClick={() => navigate('/categorie/Piece')}>
                <img className='img-voiture' src={imgAccueilPiece} alt="" />
                <p>MONNAIE</p>
                <div className="overlay3">
                    <p className='main-text3'>MONNAIE</p>
                    <p className='second-text3'>découvrir</p>
                </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='card-categorie3' onClick={() => navigate('/categorie/Figurine')}>
                <img className='img-voiture' src={imgAccueilFigurine} alt="" />
                <p>FIGURINES</p>
                <div className="overlay3">
                    <p className='main-text3'>FIGURINES</p>
                    <p className='second-text3'>découvrir</p>
                </div>
                </div>
        </SwiperSlide>
    </Swiper>
</div>

    

    </> );
}
 
export default SwipperAccueil;