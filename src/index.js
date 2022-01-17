import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloProvider } from "@apollo/client";
import client from './graphql/client';

import './commons/styles/global.scss';

ReactDOM.render(
    <ApolloProvider client={ client }>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
)
;

reportWebVitals();
