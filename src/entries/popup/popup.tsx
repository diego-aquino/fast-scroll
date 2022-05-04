import React from 'react';
import ReactDOM from 'react-dom';
import '~/styles/global.css';

import PopUpPage from '~/components/pages/PopUpPage/PopUpPage';

ReactDOM.render(
  <React.StrictMode>
    <PopUpPage />
  </React.StrictMode>,
  document.getElementById('popup'),
);
