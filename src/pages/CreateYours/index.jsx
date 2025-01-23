import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from 'fabric'; // Import the Canvas class
import { Image as FabricImage } from 'fabric'; // Import the Image class
import PostOfficeBtn from '../../component/PostOfficeBtn';
import Products from '../../products.json'; // Import the JSON file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

const CreateYours = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null); // Track selected pin
  const [selectedColor, setSelectedColor] = useState(""); // Track selected color

  // Function to rotate pins only
  const handleRotatePins = () => {
    if (!canvas) return;

    canvas.getObjects().forEach((obj) => {
      if (!obj.isCase) {
        // Only rotate objects that are not marked as cases
        obj.rotate((obj.angle || 0) + 40); // Rotate by 15 degrees
      }
    });
    canvas.renderAll(); // Re-render the canvas
  };

  // Function to delete the selected pin
  const handleDeletePin = () => {
    if (!canvas || !selectedPin) return;

    const objectToDelete = canvas.getObjects().find(
      (obj) => obj.src === selectedPin
    );

    if (objectToDelete) {
      canvas.remove(objectToDelete);
      canvas.renderAll(); // Re-render the canvas after deletion
      setSelectedPin(null); // Reset selected pin
    }
  };

  // Load an image onto the canvas
  const loadImage = (src, scale = 0.5, isCase = true, pinWidth = 50, pinHeight = 50) => {
    if (!canvas) return;

    // Remove previous case images if needed
    if (isCase) {
      canvas.getObjects().forEach((obj) => {
        if (obj.isCase) canvas.remove(obj);
      });
    }

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
        hasControls: !isCase,
        lockScalingX: true,
        lockScalingY: true,
        borderColor: isCase ? 'transparent' : 'gray',
        borderDashArray: isCase ? [] : [3, 5],
        cornerSize: 0, // Larger corner size for pins
        transparentCorners: false,
        rotatingPointOffset: 30, // Offset for rotation control
        isCase, // Custom property to identify cases
        src, // Store src to identify the object later
      });

      canvas.add(imgInstance);
      canvas.renderAll();
    };

    imgElement.onerror = () => {
      console.error("Error loading image:", src);
    };
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

  const handlePinSelection = (pin) => {
    setSelectedPin(pin.src);
    loadImage(pin.src, 0.2, false, 150, 150); // Set pin size to 150x150 pixels
  };

  const handleColorSelection = (color, image) => {
    setSelectedColor(color);
    setSelectedPin(null);  // Reset selected pin when changing the case
    loadImage(image, 0.5, true); // Cases use the scale parameter
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
          <div className="grid grid-cols-3 gap-4">
            {Products.pins.map((pin) => (
              <div
                key={pin.name}
                className="cursor-pointer flex flex-col items-center space-y-2"
                onClick={() => handlePinSelection(pin)}
              >
                <img
                  src={pin.src}
                  alt={pin.name}
                  className={`w-16 h-16 rounded ${
                    selectedPin === pin.src
                      ? "border-2 border-gray-800 shadow-lg"
                      : "border border-gray-300"
                  }`}
                />
                <span className="text-sm">{pin.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <PostOfficeBtn />
        </div>
      </div>
      <canvas ref={canvasRef} className="border relative" />

      {/* Conditionally render Rotate and Delete buttons */}
      {selectedPin && (
        <>
          {/* Rotate Pins Button */}
          <div className="absolute left-56 bottom-40">
            <button
              onClick={handleRotatePins}
              className="flex items-center justify-center w-10 h-10 text-blue-600 hover:text-blue-800"
            >
              <FontAwesomeIcon icon={faRotateRight} className="h-5 w-5" />
            </button>
          </div>

          {/* Exclude Pins Button (Delete selected pin) */}
          <div className="absolute left-64 bottom-40">
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

