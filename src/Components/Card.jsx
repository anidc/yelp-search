import StarRating from "./StarRating";
import image from "../images/steps_02.jpg"
import { Link } from "react-router-dom";

const Card = ({ data }) => {
    return (
        <Link className="card-link" to={`/restaurant/${data.id}`}>
            <div className="card-wrapper">
                <div className="image-container">
                    <img src={(data && data.image_url) || image} alt="" />
                </div>
                <div className="card-content">
                    <div className="card-title">
                        <h3>{data && data?.name}</h3>
                    </div>
                    <div className="categ-reviews">
                        <p className="categ">{data && data.categories[0]?.title}</p>
                    </div>
                    <hr />
                    <div className="price">
                        {
                            data && data.price ? (
                                data.price.length <= 2 ? (<h3 className="green">{data.price}</h3>) : (<h3 className="red">{data.price}</h3>)
                            ) : (
                                <h3 className="orange">?</h3>
                            )
                        }
                        <div className="reviews"><StarRating rating={(data && data?.rating) || 0} /> {data && data?.review_count} Reviews</div>
                    </div>

                </div>
            </div>
        </Link>
    )
}
export default Card;