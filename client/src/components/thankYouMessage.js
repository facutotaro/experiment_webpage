import '../pages/experiment.css';
import { useEffect } from 'react';

export default function ThankYouMessage() {
  useEffect(() => {
    window.history.pushState(null, null, '/');
    window.history.pushState(null, null, '/');
  }, []);

  return (
    <div>
      <h1 className='ThankYou'> ¡Gracias por participar! </h1>
      <h2 className='BlueSubHeader'> Por favor comparte nuestro experimento </h2>
    </div>
  );
}
