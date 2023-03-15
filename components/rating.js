import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

function StarRating({ count }) {
  const fullStars = Math.floor(count);
  const hasHalfStar = count % 1 !== 0;
  const halfStar = hasHalfStar ? (
    <StarHalfIcon
      style={{ verticalAlign: "middle" }}
      fontSize="small"
      sx={{ color: "#ffc721" }}
    />
  ) : null;

  const stars = Array.from({ length: fullStars }, (_, index) => (
    <StarIcon
      key={index}
      style={{ verticalAlign: "middle" }}
      fontSize="small"
      sx={{ color: "#ffc721" }}
    />
  ));

  const emptyStars = Array.from({ length: 5 - Math.ceil(count) }, (_, index) => (
    <StarOutlineIcon
      key={index}
      style={{ verticalAlign: "middle" }}
      fontSize="small"
      sx={{ color: "#ffc721" }}
    />
  ));

  return (
    <div style={{ display: "inline-block" }}>
      <div style={{ display: "flex", alignItems: "center", lineHeight: 0 }}>
        {stars}
        {halfStar}
        {emptyStars}
      </div>
    </div>
  );
}

export default StarRating;
