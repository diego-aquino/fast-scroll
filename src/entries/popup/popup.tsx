import React from 'react';
import ReactDOM from 'react-dom';
import 'tailwindcss/tailwind.css'; // eslint-disable-line import/no-extraneous-dependencies

import PopUpPage from '~/components/pages/PopUpPage/PopUpPage';

ReactDOM.render(
  <React.StrictMode>
    <PopUpPage />
  </React.StrictMode>,
  document.getElementById('popup'),
);
