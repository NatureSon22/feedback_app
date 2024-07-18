import FeedSlider from "../components/FeedSlider";
import HeaderFeed from "../components/HeaderFeed";

const MainBoard = () => {
  return (
    <div className="w-full flex-1">
      <HeaderFeed />
      <FeedSlider />
    </div>
  );
};

export default MainBoard;
