import { useState, useRef } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

function DisplayImage(props) {
  const screenshotsArray = props.screenshots;
  const [selectedScreenShot, setSelectedScreenshot] = useState(0);
  const thumbnailContainerRef = useRef(null); // Add a ref to the thumbnail container

  const imageNextClickHanlder = () => {
    if (selectedScreenShot < screenshotsArray.length - 1) {
      const newId = selectedScreenShot + 1;
      setSelectedScreenshot(newId);
      scrollToThumbnail(newId); // Scroll to the new thumbnail
    }
  };
  const imagePrevClickHandler = () => {
    if (selectedScreenShot > 0) {
      const newId = selectedScreenShot - 1;
      setSelectedScreenshot(newId);
      scrollToThumbnail(newId); // Scroll to the new thumbnail
    }
  };

  const imageTileClickHandler = (index) => {
    setSelectedScreenshot(index);
    scrollToThumbnail(index); // Scroll to the clicked thumbnail
  };

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      imageNextClickHanlder();
    } else {
      imagePrevClickHandler();
    }
  };

  const scrollToThumbnail = (index) => {
    const thumbnailContainer = thumbnailContainerRef.current;
    const thumbnailElement = thumbnailContainer.children[index];
    thumbnailElement.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  return (
    <div className="flex flex-col overflow-y-auto w-[60%] gap-1">
      {/* Main Img Div */}
      <div className="flex justify-center h-[67vh]" onWheel={handleWheel}>
        <img
          className="object-cover w-full"
          src={
            "http://localhost:8080/screenshots" +
            screenshotsArray[selectedScreenShot]
          }
        />
      </div>
      {/* X-Scrollbar Div */}
      <div
        ref={thumbnailContainerRef} // Add the ref to the thumbnail container
        className="inline-flex overflow-x-scroll flex-row gap-2 pb-1"
      >
        {screenshotsArray.map((item, index) => (
          <div key={index} className={`w-32 min-w-32`}>
            <button onClick={() => imageTileClickHandler(index)}>
              <img
                src={
                  "http://localhost:8080/screenshots" + screenshotsArray[index]
                }
                className={`w-32 max-h-[4.5rem] ${
                  index === selectedScreenShot ? "border-2" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center mt-1 mb-2">
        <button onClick={imagePrevClickHandler} className="mx-2">
          <GrPrevious size={30} />
        </button>
        <button onClick={imageNextClickHanlder} className="mx-2">
          <GrNext size={30} />
        </button>
      </div>
    </div>
  );
}

export default DisplayImage;
