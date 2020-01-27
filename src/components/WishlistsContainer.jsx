import React from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

function WishlistsList() {
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

class WishlistsContainer extends React.Component{
    render() {
        return (
        <div>
            <WishlistsList />
        </div>
        );
    }
}

export default WishlistsContainer;