import StarRating from "./StarRating";

const Review = ({ data }) => {
    return (
        <div className="review">
            <div className="user">
                <div className="image-wrapper">
                    <img src={data && data.user.image_url} alt="" />
                </div>
                <div className="name-rating">
                    <h3>{data && data.user.name}</h3>
                    <StarRating rating={data && data.rating} />
                </div>
            </div>
            <p className="review-text">{data && data.text}</p>
        </div>
    )
}

export default Review;