import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const fullStarIcons = Array.from({ length: fullStars }, (_, index) => (
        <BsStarFill key={index} />
    ));

    const halfStarIcon = hasHalfStar ? <BsStarHalf /> : null;

    const emptyStarIcons = Array.from({ length: emptyStars }, (_, index) => (
        <BsStar key={index} />
    ));

    return (
        <div className='star-rating'>
            {fullStarIcons}
            {halfStarIcon}
            {emptyStarIcons}
        </div>
    );
};

export default StarRating;