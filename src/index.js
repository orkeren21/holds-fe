import React from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { render } from '@testing-library/react';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
})


const EXCHANGE_RATES = gql`
    {
        rates(currency: "USD") {
            currency
            rate
        }
    }
`;


function Whislists() {
    const { loading, error, data } = useQuery(gql `
    {
        wishlists{
            opportunitySFID,
            id
          }
    }
    `);
    
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error :(</p>;

    return data.wishlists.map(( { opportunitySFID, id }) => (
        <div key={id}>
            <p>
                {id}: {opportunitySFID}
            </p>
        </div>

    ));
}


const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo App</h2>
            <Whislists />
        </div>
    </ApolloProvider>
);

render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

