import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "fabric";
import { Image as FabricImage } from "fabric";
import PostOfficeBtn from "../../component/PostOfficeBtn";
import Products from "../../products.json"; // Import the JSON file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CreateYours = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null); // Track selected pin
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category for pins
  const [pins, setPins] = useState([]); // Track current pins
  const [selectedColor, setSelectedColor] = useState(""); // Track selected color
  // Array to hold the selected pins
  const [selectedPins, setSelectedPins] = useState([]);

  // Function to load images (pins and cases)
  const loadImage = (
    src,
    scale = 0.1,
    isCase = true,
    pinWidth = 10,
    pinHeight = 10
  ) => {
    return new Promise((resolve, reject) => {
      if (!canvas) return reject("Canvas not initialized");
  
      const imgElement = new window.Image();
      imgElement.src = src;
  
      imgElement.onload = () => {
        const scaleX = isCase ? scale : pinWidth / imgElement.width;
        const scaleY = isCase ? scale : pinHeight / imgElement.height;
  
        const imgInstance = new FabricImage(imgElement, {
          left: canvas.getWidth() / 2 - (imgElement.width * scaleX) / 2,
          top: canvas.getHeight() / 2 - (imgElement.height * scaleY) / 2,
          scaleX,
          scaleY,
          selectable: !isCase,
          hasControls: isCase,
          lockScalingX: true,
          lockScalingY: true,
          borderColor: isCase ? "transparent" : "gray",
          borderDashArray: isCase ? [] : [3, 5],
          cornerSize: 0,
          transparentCorners: false,
          rotatingPointOffset: 30,
          isCase: isCase, 

        });
  
        canvas.add(imgInstance);
        resolve(imgInstance);
      };
  
      imgElement.onerror = () => {
        reject("Error loading image");
      };
    });
  };
  

  // Initialize the canvas
  useEffect(() => {
    const fabricCanvas = new Canvas(canvasRef.current);
    fabricCanvas.setWidth(490);
    fabricCanvas.setHeight(500);
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Load default image after canvas initialization
  useEffect(() => {
    if (canvas) {
      console.log("Canvas is ready. Loading default image...");
      loadImage("/assets/images/SmartCase/smartcasepink.png", 0.5, true);
      setSelectedColor("#f49f90"); // Set default color
    }
  }, [canvas]);

  // Handle pin selection
  const handlePinSelection = async (pin) => {
    try {
      const imgInstance = await loadImage(pin.src, 0.5, false, 120, 120);
  
      // Store the selected pin in state
      setSelectedPins((prevPins) => [...prevPins, imgInstance]);
  
      // Ensure the new pin gets selected
      imgInstance.on("selected", () => {
        setSelectedPin(imgInstance);
        canvas.setActiveObject(imgInstance);
      });
  
      canvas.add(imgInstance);
      canvas.setActiveObject(imgInstance);
      canvas.renderAll();
  
      // Force the state update with a small delay
      setTimeout(() => setSelectedPin(imgInstance), 10);
    } catch (error) {
      console.error("Failed to load pin:", error);
    }
  };
  
  const handleColorSelection = (color, image) => {
    setSelectedColor(color);  
  
    loadImage(image, 0.5, true).then((newCaseImage) => {
      // Remove previous case
      canvas.getObjects().forEach((obj) => {
        if (obj.isCase) {
          canvas.remove(obj);
        }
      });
  
      // Add the new case image at the bottom
      newCaseImage.isCase = true;
      canvas.add(newCaseImage);

      // Re-add all previously selected pins
      selectedPins.forEach((pin) => {
        canvas.add(pin);
        // canvas.bringToFront(pin);
      });
  
      canvas.renderAll();
    }).catch((error) => {
      console.error("Failed to load case image:", error);
    });
  };
  
  


  useEffect(() => {
    if (selectedCategory) {
      setPins(Products.pins[selectedCategory] || []); // Ensure pins are loaded for selected category
    } else {
      setPins([]); // Reset pins when no category is selected
    }
  }, [selectedCategory]);

  // Rotate selected pin
  const handleRotatePins = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.rotate((activeObject.angle || 0) + 20); // Rotate pin by 40 degrees
      canvas.renderAll();
    }
  };
  const handleRotatePinsLeft = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.rotate((activeObject.angle || 0) - 20); // Rotate pin by 40 degrees
      canvas.renderAll();
    }
  };

  // Delete selected pin
  const handleDeletePin = () => {
    if (!selectedPin || !canvas) return; // Ensure a pin is selected before deleting
    // Remove the selected pin from the canvas
    canvas.remove(selectedPin);
  
    // Remove from the selected pins array immediately
    setSelectedPins((prevSelectedPins) =>
      prevSelectedPins.filter((pin) => pin !== selectedPin)
    );
      setSelectedPin(null);
  };
  
  return (
    <div className="flex flex-row-reverse mt-10 p-6 justify-around">
      <div className="mb-4 space-y-7 p-6">
        {/* Color selection */}
        <div>
          <p className="text-lg font-bold">Colour</p>
          <div className="flex space-x-4">
            {Products.colors.map(({ color, image }) => (
              <div
                key={color}
                className="cursor-pointer hover:shadow-2xl hover:shadow-black"
                onClick={() => handleColorSelection(color, image)}
              >
                <div
                  className={`w-8 h-8 rounded-full ${
                    selectedColor === color
                      ? "rounded-full border-2 border-gray-800 p-2 shadow-2xl"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pin selection */}
        <div>
          <p className="text-lg font-bold">Pins</p>
          <select
            className="border rounded p-2 w-full mb-4"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="bronze">Bronze Pins</option>
            <option value="colorful">Colorful Pins</option>
          </select>

          {selectedCategory && (
  <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
    <div className="grid grid-cols-2 gap-2">
      {pins.map((pin) => (
        <div
          key={pin.name}
          className="cursor-pointer flex flex-col items-center space-y-2"
          onClick={() => handlePinSelection(pin)}
        >
          <img
            src={pin.src}
            alt={pin.name}
            className={`w-28 h-28 rounded ${
              selectedPins.some((p) => p.name === pin.name)
                ? "border-2 border-gray-800 shadow-lg"
                : "border border-gray-300"
            }`}
          />
          <span className="text-sm">{pin.name}</span>
        </div>
      ))}
    </div>
  </div>
)}
        </div>

        <div>
          <PostOfficeBtn />
        </div>
      </div>

      <canvas ref={canvasRef} className="border relative" />

      {/* Conditionally render Rotate and Delete buttons */}
      {selectedPin && (
        <>
          <div className="absolute left-64 bottom-40">
            <button
              onClick={handleRotatePins}
              className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-blue-800"
            >
              <FontAwesomeIcon icon={faRotateRight} className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute left-56 bottom-40">
            <button
              onClick={handleRotatePinsLeft}
              className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-blue-800"
            >
              <FontAwesomeIcon icon={faRotateLeft} className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute left-72 bottom-40">
            <button
              onClick={handleDeletePin}
              className="flex items-center justify-center w-10 h-10 text-red-600 hover:text-red-800"
            >
              <FontAwesomeIcon icon={faX} className="h-5 w-5" />
            </button>
          </div>
          
        </>
      )}
    </div>
  );
};

export default CreateYours;

