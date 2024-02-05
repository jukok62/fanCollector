import React from 'react';
import Header2 from '../components/Header2';
import '../styles/aPropos.css'
import imgHistoire from '../Image/Apropos/notre-histoire.jpg'
import imgUnivers from '../Image/Apropos/univers-miniature.jpg'
import imgLocalisation from '../Image/Apropos/localisation.jpg'

const Apropos = () => {
    return ( <>
    
    <Header2/>
    <div className='Apropos-de-nous'>
        <h2>À PROPOS DE NOUS</h2>
        <p>Bienvenue chez Fan Collector, votre destination exclusive pour les passionnés de miniatures de collection à Arras, dans le Pas-de-Calais !</p>
    </div>
    <div className='conteneur-Div'>
        <img src={imgHistoire} alt="image d'illustration" />
        <div className="text">
            <h3>Notre Histoire</h3>
            <p><span className='first-quote'>"</span><br />Fondée avec passion par des collectionneurs enthousiastes, notre histoire débute avec le désir partagé de créer un espace dédié à la découverte, à la passion et à la préservation de miniatures uniques. Inspirés par la richesse de l'histoire et la diversité des collections, nous avons décidé de partager notre amour pour les objets de collection à travers Fan Collector. <br /><span className='last-quote'>"</span></p>
        </div>
    </div>
    <div className='conteneur-Div'>
        <div className="text">
            <h3>Un Univers de Miniatures Exceptionnelles</h3>
            <p><span className='first-quote'>"</span> <br />Que vous soyez passionné de voitures miniatures, de soldats de plomb, de motos miniatures, de tracteurs miniatures, de figurines ou de pièces de monnaie, notre boutique offre une sélection soigneusement choisie pour répondre à tous les goûts et intérêts. Chaque miniature que nous proposons est choisie pour sa qualité exceptionnelle, son histoire unique et son pouvoir d'évoquer des souvenirs et des émotions.<br /><span className='last-quote'>"</span></p>
        </div>
        <img src={imgUnivers} alt=" image d'illustartion" />
    </div>
    <div className='conteneur-Div'>
        <img src={imgLocalisation} alt="e de la ville d'arras" />
        <div className="text">
            <h3>Localisation</h3>
            <p><span className='first-quote'>"</span> <br />Notre boutique physique est située au cœur de la charmante ville d'Arras, dans le Pas-de-Calais, en France. Imprégnez-vous de l'atmosphère historique de cette région tandis que vous explorez notre collection captivante d'objets miniatures. Nous sommes fiers d'être un membre actif de la communauté locale et de contribuer à l'enrichissement culturel de notre belle ville.<br /><span className='last-quote'>"</span></p>
        </div>
    </div>
    <div className="text engagement">
        <h3>Notre Engagement</h3>
        <p><span className='first-quote'>"</span> <br />Chez Fan Collector, notre engagement va au-delà de la simple vente d'objets de collection. Nous croyons en la création d'une expérience immersive pour nos clients, où chaque visite est une aventure à part entière. Notre équipe dévouée est là pour vous guider, partager des anecdotes fascinantes sur les miniatures et vous aider à trouver la pièce parfaite pour compléter votre collection.
Explorez notre site en ligne ou visitez notre boutique à Arras pour plonger dans le monde captivant des miniatures de collection. Merci de faire partie de notre histoire chez Fan Collector.<br /><span className='last-quote'>"</span></p>
    </div>
    
    </> );
}
 
export default Apropos;