import { useState, useEffect } from 'react';
import './App.css';

interface YesNoData {
  answer: string;
  forced: boolean;
  image: string;
}

function App() {
  const [yesno, setYesno] = useState<YesNoData | null>(null);

  const fetchYesNoData = async () => {
    try {
      setYesno(null);
      const response = await fetch('https://yesno.wtf/api');
      const data = await response.json();
      setYesno(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchYesNoData()
  }, []);

  return (
    <>
      <div className="App">
        <h1>Pregúntame</h1>
        <div>Realiza una pregunta que se conteste con sí o no en tu mente y presiona contestar</div>
        <button onClick={() => fetchYesNoData()}>Contestar</button>
        <p>{yesno && yesno.answer=='yes'? 'Sí':'No' }</p>
        
        {yesno && yesno.image && <p>
          <img 
            id='imagen'
            src={yesno.image} 
            alt="imagen respuesta" 
            loading="lazy"/>
        </p>}
      </div>
    </>
  );
}

export default App;
