import "./App.css";
import CarouselCard from "./Components/CarouselCard";

function App() {

  const cardData = 
    {
      title : 'Drone Pilot',
      description : 'Mr Holadashdjasvjdas dasuisjbdasndbashjg',
      media_arr : [
        {
          id: 1,
          media:
            "https://i.pinimg.com/736x/50/08/ef/5008efb9df96969624d2674645027a3a.jpg",
          type: "Image",
        },
        {
          id: 2,
          media:
            "https://aerialborne-partner-images-videos.s3.ap-south-1.amazonaws.com//uploads/17169736978621716206015537_import_63119f0a21d660.84264523.mp4",
          type: "Video",
        },
        {
          id: 3,
          media:
            "https://i.pinimg.com/736x/50/08/ef/5008efb9df96969624d2674645027a3a.jpg",
          type: "Image",
        },
        {
          id: 4,
          media:
            "https://aerialborne-partner-images-videos.s3.ap-south-1.amazonaws.com//uploads/17169736978621716206015537_import_63119f0a21d660.84264523.mp4",
          type: "Video",
        },
      ]
    }
 
  return (
    <div className="App">
      <div className="cardsContainer">
        <CarouselCard cardData={cardData} />
      </div>
    </div>
  );
}

export default App;
