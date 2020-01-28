import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

function WishlistsList({onWishlistSelected}) {
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

    return(
        <select name="wishlist" onChange={onWishlistSelected}>
            {data.wishlists.map(wishlist => (
                <option key={wishlist.id} value={parseInt(wishlist.id, 10)}>
                    {wishlist.opportunitySFID}
                </option>
            ))}  
        </select>
    );
}



function WishlistEntries({wishlistID}) {
    console.log("fetching entry with" + wishlistID);
    const id = wishlistID.wishlistID;
    const {loading, error, data} = useQuery(gql`
        query EntriesByWishlistID($wishlistID: ID!) {
            wishlistEntryByWishlistID(wishlistID: $wishlistID){
                id,
                reservableUUID,
                createdBy
            }
        }`, {
            variables: { wishlistID },
    });

    if(loading) return null;
    if(error) return `Error! ${error}`;

    return (
        data.wishlistEntryByWishlistID.map(entry => (
            <p>
                <div>{ entry.id } </div>
                <div> { entry.reservableUUID } </div>
                <div> { entry.createdBy }  </div>
            </p>
        )));
}

class WishlistsContainer extends React.Component{
    state = { selectedWishlist: null}

    onWishlistSelected = ({ target }) => {
        console.log('changed wishlist' + target.value);
        this.setState(() => ({ selectedWishlist: target.value }));
    };

    render() {
        return (
        <div>
            <WishlistsList onWishlistSelected={this.onWishlistSelected} />

            { this.state.selectedWishlist &&  <WishlistEntries wishlistID={this.state.selectedWishlist}/>}
        </div>
        );
    }
}

export default WishlistsContainer;