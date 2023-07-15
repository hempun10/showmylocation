import { useState } from "react";
import "./App.css";
import { AiOutlineCopy } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [shareableUrl, setShareableUrl] = useState("");
  const url = "https://www.google.com/maps?q=";

  const getLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const shareableUrl = `${url}${latitude},${longitude}`;
          setShareableUrl(shareableUrl);
          setIsLoading(false);
          toast.success("Location fetched successfully!");
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
          toast.error("Failed to fetch location.");
        }
      );
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center justify-center flex-col relative h-screen gap-5">
      <img src="/logo.svg" alt="img" className="w-[250px]  top-0" />
      <div className="button">
        <button onClick={getLocation} disabled={isLoading}>
          {isLoading ? "Loading..." : "Get my Location"}
        </button>
      </div>
      <div className="link mt-3">
        {shareableUrl && (
          <div className="urlContainer w-[80%] m-auto  lg:w-[100%] font-comic-neue">
            <a href={shareableUrl} target="_blank" rel="noopener noreferrer">
              <p>{shareableUrl}</p> 
            </a>
            <AiOutlineCopy
              onClick={handleCopy}
              className="cursor-pointer w-12 h-12 text-red-600 lg:w-6 lg:h-6 "
            />
          </div>
        )}
      </div>
      <div className="instructions w-[90%] lg:w-[40%] text-center p-5 ">
        <p>
          <img
            src="/instruction.jpg"
            alt="instruction"
            className="w-[300px] m-auto mb-2"
          />
          Please make sure to "Allow" the browser to share your location when
          prompted, so we can generate the shareable URL for you.
        </p>
      </div>
      <div className="copyright absolute bottom-0 right-5">
        <p>
          Powered By{" "}
          <a
            href="https://momohubcloud.blanxer.com/"
            target="_blank"
            className=" text-red-700 font-bold"
          >
            MoMo Hub Cloud
          </a>
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
