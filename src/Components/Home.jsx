import { FiSearch } from "react-icons/fi"
import Card from "./Card";
import { useEffect, useRef, useState } from "react";

const Home = () => {
    const nameRef = useRef()
    const locationRef = useRef()
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getRestaurants()
    }, [])

    const getRestaurants = () => {
        const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.yelp.com/v3/businesses/search?location=new%20york&term=restaurants&caregories=restaurants&sort_by=best_match');
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.REACT_APP_YELP_API_KEY
            }
        };
        // instead of (fakeapi), just put (url, options)
        const fakeapi = 'https://corsproxy.io/?' + encodeURIComponent(`https://yelp-backend.netlify.app/.netlify/functions/search?location=new%20york&term=restaurants&categories=restaurant`)
        fetch(fakeapi)
            .then(response => response.json())
            .then(response => setRestaurants(response.businesses))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))

    }

    // function triggers on search
    const handleSearch = (e) => {
        e.preventDefault()

        setLoading(true)
        const nameSearchValue = nameRef.current.value ? nameRef.current.value : "restaurants";
        const locationSearchValue = locationRef.current.value ? locationRef.current.value : "new york";

        const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://api.yelp.com/v3/businesses/search?location=${locationSearchValue}&term=${nameSearchValue}&caregories=restaurants&sort_by=best_match`);
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.REACT_APP_YELP_API_KEY
            }
        };
        // instead of (fakeapi), just put (url, options)
        const fakeapi = 'https://corsproxy.io/?' + encodeURIComponent(`https://yelp-backend.netlify.app/.netlify/functions/search?location=${locationSearchValue}&term=${nameSearchValue}&categories=restaurant`)
        fetch(fakeapi)
            .then(response => response.json())
            .then(response => setRestaurants(response.businesses))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    }

    return (
        <div className="home">
            <div className="search-bar">
                <input type="search" ref={nameRef} name="name-search" id="name-search" placeholder="Name of restaurant" />
                <input type="search" ref={locationRef} name="location-search" id="location-search" placeholder="Location" />
                <button onClick={handleSearch}><FiSearch /></button>
            </div>

            <div className="restaurants">
                {
                    loading ? (
                        <div className="loading">
                            <p>Loading...</p>
                            <div className="spinner">

                            </div>
                        </div>
                    ) : (
                        restaurants && restaurants.length > 0 ? (
                            restaurants.map(restaurant => (
                                <Card key={restaurant.id} data={restaurant} />
                            ))
                        ) : (

                            <p>No restaurants found.</p>

                        )
                    )
                }
            </div>
        </div>
    )
}
export default Home;