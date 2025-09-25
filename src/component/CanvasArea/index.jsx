import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faRotateRight, faX } from "@fortawesome/free-solid-svg-icons";

const CanvasArea = ({
  canvasRef,
  canvas,
  selectedPin,
  selectedPins,
  onRotateRight,
  onRotateLeft,
  onDelete,
  onSave,
  setSelectedPin,
}) => (
  <div className="flex flex-col items-center  ">
    <canvas ref={canvasRef} className="border" />

    <button
      onClick={onSave}
      className="mt-2 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
    >
      Save Image
    </button>

    {selectedPin && (
      <div className="flex justify-center ">
        <button
          onClick={onRotateRight}
          className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-blue-800"
        >
          <FontAwesomeIcon icon={faRotateRight} className="h-5 w-5" />
        </button>

        <button
          onClick={onRotateLeft}
          className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-blue-800"
        >
          <FontAwesomeIcon icon={faRotateLeft} className="h-5 w-5" />
        </button>

        <button
          onClick={onDelete}
          className="flex items-center justify-center w-10 h-10 text-red-600 hover:text-red-800"
        >
          <FontAwesomeIcon icon={faX} className="h-5 w-5" />
        </button>
      </div>
    )}
  </div>
);

export default CanvasArea;
