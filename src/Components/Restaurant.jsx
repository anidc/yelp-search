import { useEffect, useState } from "react";
import Map from "./Map";
import Review from "./Review";
import { Link, useParams } from "react-router-dom";
import StarRating from "./StarRating";

const Restaurant = () => {
    const [restaurant, setRestaurant] = useState()
    const [reviews, setReviews] = useState()
    const { id } = useParams()

    useEffect(() => {
        const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://api.yelp.com/v3/businesses/${id}`);
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ` + process.env.REACT_APP_YELP_API_KEY
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(response => setRestaurant(response))
            .catch(error => console.error(error))

        fetch('https://corsproxy.io/?' + encodeURIComponent(`https://api.yelp.com/v3/businesses/${id}/reviews?limit=20&sort_by=yelp_sort`), options)
            .then(response => response.json())
            .then(response => setReviews(response.reviews))
            .catch(err => console.error(err));
    }, [id, restaurant])

    return (
        <div className="restaurant-wrapper">
            <div className="image-wrapper">
                {
                    restaurant && restaurant.photos.map(photo => (
                        <img src={photo} alt="" />
                    ))
                }
                <h2>{restaurant && restaurant.name}</h2>
                <div className="header-rating">
                    <StarRating rating={restaurant && restaurant.rating} />
                    <p className="review-count">{restaurant && restaurant.review_count} Reviews</p>
                    {
                        restaurant && restaurant.categories.map(cat => (
                            <p className="bullet" key={cat.alias}>{cat.title}</p>
                        ))
                    }
                </div>
            </div>
            <div className="restaurant-content">
                <div className="location-wrapper">
                    <h4>Location & Hours</h4>
                    <div className="location-website">


                        <div className="location-hours">
                            <div className="location">
                                {
                                    restaurant && <Map coordinates={restaurant?.coordinates} />
                                }
                                <div className="location-text">
                                    <p className="address1">{restaurant && restaurant.location.address1}</p>
                                    <p className="city">{restaurant && `${restaurant.location.city}, ${restaurant.location.country} ${restaurant.location.zip_code}`}</p>
                                </div>
                            </div>
                            <div className="hours">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Mon</td>
                                            <td>9:00 AM - 5:30 PM</td>
                                        </tr>
                                        <tr>
                                            <td>Tue</td>
                                            <td>9:00 AM - 5:30 PM</td>
                                        </tr>
                                        <tr>
                                            <td>Wed</td>
                                            <td>9:00 AM - 5:30 PM</td>
                                        </tr>
                                        <tr>
                                            <td>Thu</td>
                                            <td>9:00 AM - 5:30 PM</td>
                                        </tr>
                                        <tr>
                                            <td>Fri</td>
                                            <td>9:00 AM - 5:30 PM</td>
                                        </tr>
                                        <tr>
                                            <td>Sat</td>
                                            <td>9:00 AM - 5:30 PM</td>
                                        </tr>
                                        <tr>
                                            <td>Sun</td>
                                            <td>11:00 AM - 5:30 PM</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className="phone-website">
                            <p className="child phone">+49 30 23883840</p>
                            <Link className="child website" to={restaurant && restaurant.url}>Website</Link>
                        </div>
                    </div>
                </div>
                <div className="reviews">
                    {
                        reviews && reviews.map(review => (
                            <Review key={review.id} data={review} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Restaurant;