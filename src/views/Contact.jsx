import React from 'react';
import {Link} from 'react-router-dom';
import Header2 from '../components/Header2';
import '../styles/contact.css';
import img from '../Image/contact/img-contact.jpg';
import icon from '../Image/icon/maps.png';

const Contact = () => {
    return ( <>
    
    <Header2/>
    <div  className='conteneur-contact'>
        <img className='img-contact' src={img} alt="" />
        <div className='nous-trouver'>
            <h3>Nous Trouver</h3>
            <p>Fan Collector</p>
            <p>1 rue de Paris</p>
            <p>62000 Arras</p>
            <div className="icon-Google">
                <img src={icon} width={25}height={25} alt="icon pour google map" />
               <Link to={'https://www.google.fr/maps'}> <p>Google Maps</p></Link>
            </div>

            <iframe
                title='Google Maps'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2549.0259765144706!2d2.7682382125934213!3d50.291442971443566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd47ed26ac0953%3A0xa17cde386c3d899e!2sFAN%20COLLECTOR!5e0!3m2!1sfr!2sfr!4v1705583783804!5m2!1sfr!2sfr'>
            </iframe>

        </div>

        <div className="contact">
            <p>Fan Collector</p>
            <a href='mailto:fanCollector@hotmail.fr'><p>fanCollector@hotmail.fr</p></a>
            <p>06.74.81.37.73</p>
        </div>
        
    </div>
    
    </> );
}
 
export default Contact;