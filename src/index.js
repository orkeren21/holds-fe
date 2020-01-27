import React from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { render } from '@testing-library/react';

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
})


const EXCHANGE_RATES = gql`
    {
        rates(currency: "USD") {
            currency
            rate
        }
    }
`;

function ExchangeRates() {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error :(</p>;

    return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
            <p>
                {currency}: {rate}
            </p>
        </div>
    ));
}


const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo App</h2>
            <ExchangeRates />
        </div>
    </ApolloProvider>
);

render(<App />, document.getElementById('root'));


// client.query({
//     query: gql`
//         {
//             rates(currency: "USD") {
//                 currency
//             }
//         }
//     `
// }).then(result => console.log(result));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

