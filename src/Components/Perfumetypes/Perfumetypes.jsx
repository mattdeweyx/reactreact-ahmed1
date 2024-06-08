import React from 'react';
import './Perfumetypes.css';

import pefumebottle1 from '../Assets/2_5rb.png';
import pefumebottle2 from '../Assets/5_15rb.png';
import pefumebottle3 from '../Assets/15_20rb.png';
import pefumebottle4 from '../Assets/20_40rb.png';

function Perfumetypes() {
  return (
    <div className="container">
      <div className="category-heading" style={{marginTop:'40px'}}>
        <hr />
        <h1 >PERFUME CONCENTRATION</h1>
        <hr/>
      </div>
      <div className="perfumetypes">
        <div className="perfume-item">
          <img src={pefumebottle1} alt="Perfume 1" />
          <hr />
          <p >Concentration of <br />Parfum</p>
        </div>
        <div className="perfume-item">
          <img src={pefumebottle2} alt="Perfume 2" />
          <hr />
          <p >Concentration of <br />Eau de Parfum</p>
        </div>
        <div className="perfume-item">
          <img src={pefumebottle3} alt="Perfume 3" />
          <hr />
          <p >Concentration of <br />Eau de Toilette</p>
        </div>
        <div className="perfume-item">
          <img src={pefumebottle4} alt="Perfume 4" />
          <hr />
          <p >Concentration of <br />Eau de Cologne</p>
        </div>
      </div>
    </div>
  );
}

export default Perfumetypes;
