import {useRef} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import FiveStarsRating from '../components/StarRating.js';

import './experiment.css';


function TutorialCompareImages() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state;
    const fiveStarsRatingRef = useRef(null);

    const handleGoToExperiment = async () => {
        if(fiveStarsRatingRef.current.currentRating() > 0){
          const timestamp = new Date().getTime();
          const response = await axios.post('https://experiment-webpage-server.vercel.app/api/addTutorialTime', {
            userId: userId,
            tutorialTime: timestamp
          });
          navigate('/experiment', {state: {userId: userId}} );
        }else{
            alert("Por favor, califique la imagen antes de continuar")
        }
        
    }

  return (
    <div>
        <div className='BlueSubHeader'>
            Fase de prueba
        </div>
        <p className='experiment-explanation'>
          Te vamos a mostrar dos imágenes. La imágen de la izquierda fue mostrada a las personas y descrita en texto. La imágen de la derecha fue generada por una Inteligencia Artificial u otro humano a partir de una descripción. Necesitamos que compares las imágenes y suponiendo que la imágen de la derecha fue generada con una descripción de la imágen original ¿Cuán bien te parece que salió el proceso? Para esto usamos un sistema de estrellas donde 1 estrella es la menor puntuación y 5 estrellas la máxima. 
        </p>
      <div className='SubHeader'>
        Suponiendo que la imágen de la derecha fue generada con una descripción la imágen original ¿Cuán bien te parece que salió el proceso?

        </div>
        <div className='Center'> <i>(1 es muy mal y 5 muy bien)</i> </div>

        <div className='outer-container'>
            <div className='image-container-exp'>
                <h4>Imagen original</h4>
                  <div className="image-container">
                    <img 
                    src={process.env.PUBLIC_URL + "../images/img_original/img44.png"} 
                    alt=''/>
                  </div>
                  
            </div>
            <div className='image-container-exp'>
                <h4>Imagen generada</h4> 
                  <div className="image-container">
                    <img 
                    src={process.env.PUBLIC_URL + "../images/DeMolenRembrandt.jpg"} 
                    alt=''></img>
                  </div>
                
            </div>
      
      
      <div className='rating-container'>
        <div className='inner-star-rating-container'>
          <FiveStarsRating ref={fiveStarsRatingRef}/>
        </div>
        <div className='inner-button-container'>
          <div className='button-container'>
         <button onClick={handleGoToExperiment} className='SubmitButton'>Comenzar con el experimento</button>
         </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default TutorialCompareImages;