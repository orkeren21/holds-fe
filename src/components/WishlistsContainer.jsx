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
            <div>
                <div>{ entry.id } </div>
                <div> { entry.reservableUUID } </div>
                <div> { entry.createdBy }  </div>
            </div>
        )));
}

class WishlistsContainer extends React.Component{
    state = { selectedWishlist: null, selectedWishlist2: null}

    componentDidMount() {
        fetch('http://localhost:4000/api/v1/wishlists/')
            .then(response => response.json())
            .then(data => this.setState({ wishlists: data.wishlists }));
    };

    onWishlistSelected = ({ target }) => {
        this.setState(() => ({ selectedWishlist: target.value }));
    };

    onWishlistSelectedREST = ({ target }) => {
        fetch(`http://localhost:4000/api/v1/wishlist-entries?wishlistID=${target.value}`)
            .then(response => response.json())
            .then(data => this.setState({ entries: data.entries }));
    };


    renderWishlists = () => {
        return(
                <select name="wishlist" onChange={this.onWishlistSelectedREST}>
                    {this.state.wishlists.map(wishlist => (
                        <option key={wishlist.id} value={parseInt(wishlist.id, 10)}>
                            {wishlist.opportunitySFID}
                        </option>
                    ))}  
                </select>
        );
    }

    renderEntries= () => {
        const entries = this.state.entries;
        return (
            entries.map(entry => (
                <div>
                    <div>{ entry.id } </div>
                    <div> { entry.reservableUUID } </div>
                    <div> { entry.createdBy }  </div>
                </div>
            )));
    }


    render() {
        return (
            <div align="center">
                <div name="graphQL">
                    GraphQL<br/><br/>
                    <WishlistsList onWishlistSelected={this.onWishlistSelected} />

                    { this.state.selectedWishlist &&  <WishlistEntries wishlistID={this.state.selectedWishlist}/>}
                </div>
                <hr></hr>
                <div name="REST">
                    REST <br/><br/>
                    <div>
                        { this.state.wishlists && this.renderWishlists() }
                    </div>
                    <div>
                        {this.state.entries && this.renderEntries() }
                    </div>
                </div>
            </div>
        );
    }
}

export default WishlistsContainer;
