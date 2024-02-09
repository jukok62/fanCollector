import React  from 'react';
import {Link, useNavigate} from 'react-router-dom'

import img1 from '../Image/slider/aston-slider.jpg';
import img2 from '../Image/slider/camion-slider.jpg'
import img3 from '../Image/slider/moto-slider.jpg'
import img4 from '../Image/slider/slider-tracteur.jpg'
import imgFond from '../Image/fond-accueil2.png'
import imgAccueilVoiture from '../Image/categorie-accueil/voiture-accueil.jpg'
import imgAccueilMoto from '../Image/categorie-accueil/moto-accueil.jpg'
import imgAccueilTracteur from '../Image/categorie-accueil/tracteur-accueil.jpg'
import imgAccueilPiece from '../Image/categorie-accueil/piece-accueil.jpg'
import imgAccueilFigurine from '../Image/categorie-accueil/figurine-accueil.jpg'
import imgApropos from '../Image/categorie-accueil/A-Propos.jpg'


import '../styles/accueil.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import SwipperAccueil from '../components/Accueil/SwipperAccueil';
import SwiperAccueil2 from '../components/Accueil/SwiperAccueil2';



const Accueil = () => {


  const navigate = useNavigate();
  
 

    return ( <>
   
    <Header2/>
    <div className='slider'>
    <Swiper 
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img className='img1' src={img1} alt="" /></SwiperSlide>
        <SwiperSlide><img className='img2' src={img2} alt="" /></SwiperSlide>
        <SwiperSlide><img className='img3' src={img3} alt="" /></SwiperSlide>
        <SwiperSlide><img className='img4' src={img4} alt="" /></SwiperSlide>
        
      </Swiper>
      </div>
   {/* PARTIE CATEGORIE */}

   <div className='div-img-fond-Accueil'>
    <img className='img-fond-Acceuil'src={imgFond} alt="" />
    </div>
    <div className='categorie'>
    <h2>CATEGORIES</h2>
      <div className='conteneur-flex-card-categorie'>
        
        <div className='card-categorie' onClick={() => navigate('/categorieAccueil/voiture')}>
          <img className='img-voiture' src={imgAccueilVoiture} alt="" />
          <p>VOITURES</p>
          <div className="overlay">
            <p className='main-text'>VOITURES</p>
            <p className='second-text'>découvrir</p>
          </div>
        </div>
        <div className='card-categorie' onClick={() => navigate('/categorieAccueil/moto')}>
          <img className='img-voiture' src={imgAccueilMoto} alt="" />
          <p>MOTOS</p>
          <div className="overlay">
            <p className='main-text'>MOTOS</p>
            <p className='second-text'>découvrir</p>
          </div>
        </div>
        <div className='card-categorie' onClick={() => navigate('/categorieAccueil/tracteur')}>
          <img className='img-voiture' src={imgAccueilTracteur} alt="" />
          <p>TRACTEURS</p>
          <div className="overlay">
            <p className='main-text'>TRACTEURS</p>
            <p className='second-text'>découvrir</p>
          </div>
        </div>
        <div className='card-categorie' onClick={() => navigate('/categorie/Piece')}>
          <img className='img-voiture' src={imgAccueilPiece} alt="" />
          <p>MONNAIE</p>
          <div className="overlay">
            <p className='main-text'>MONNAIE</p>
            <p className='second-text'>découvrir</p>
          </div>
        </div>
        <div className='card-categorie' onClick={() => navigate('/categorie/Figurine')}>
          <img className='img-voiture' src={imgAccueilFigurine} alt="" />
          <p>FIGURINES</p>
          <div className="overlay">
            <p className='main-text'>FIGURINES</p>
            <p className='second-text'>découvrir</p>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
    {/* PARTIE SLIDER CATEGORIE RESPONSIVE */}
    <SwipperAccueil/>
    <SwiperAccueil2/>

    
    {/* PARTIE A PROPOS */}

    <div className="conteneur-aPropos ">
      <div className="text-aPropos ">
        <p>Notre boutique est née de la passion de 2
          collectionneurs. Notre expertise dans le domaine de la collection sera etc..........
          Il faut imaginer qu’il y aura du texte a cette endroit, mais que pour l’instant il n’y a rien du tout !!!!</p>
        <Link to={'/aPropos'}><button>À PROPOS</button></Link>
      </div>
      <div className='div-img-aPropos'>
        <img className='imgApropos' src={imgApropos} alt="" />
      </div>
    </div>
    
    
    <Footer/>
    </> );
}
 
export default Accueil;