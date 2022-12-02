import React, {useState} from "react";
import FavoriteRestaurants from "./FavoriteRestaurants";
import ReviewTile from "./ReviewTile";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";


function ReviewsDisplay({allFilterResults, allReviews, setAllReviews}){

const [favoriteRestaurants, setfavoriteRestaurants] = useState([])

let {path} = useRouteMatch()
const reviewsMap = allFilterResults.map((review) =>(
<ReviewTile key={review.restaurant} review={review} handleDeletedReview={handleDeletedReview} handleUpdatedReview={handleUpdatedReview} addRestaurantToFavorites={addRestaurantToFavorites}/>
))

function addRestaurantToFavorites(review){
    console.log("CHECK",review)
    
    setfavoriteRestaurants([...favoriteRestaurants, review])
    console.log("FAVORITES", favoriteRestaurants)

}
function handleDeletedReview(deletedReview){
    const updatedReviews = allReviews.filter((review) => review.id !== deletedReview.id);
    setAllReviews(updatedReviews);
}

function handleUpdatedReview(updatedReview){
    const updatedItems = allReviews.map((review) => {
        if (review.id === updatedReview.id) {
          return updatedReview;
        } else {
          return review;
        }
      });
      setAllReviews(updatedItems);
}

    return(
        <div>
            
         <Switch>
            <Route exact path = {path}>
                 <h1> All Reviews</h1>
                {reviewsMap}
            </Route>
            <Route path = {`${path}/FavoriteRestaurants`}>
                <FavoriteRestaurants favoriteRestaurants={favoriteRestaurants}/>
            </Route>
        </Switch> 
           
        </div>
    )
}

export default ReviewsDisplay;