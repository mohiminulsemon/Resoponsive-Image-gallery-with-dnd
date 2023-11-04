import { useState } from "react";
import "./App.css";
import { FaImage } from "react-icons/fa";
import { BsCheckSquareFill } from "react-icons/bs";

const initialImages = [
  {
    id: '1',
    src: "./images/image-1.webp",
  },
  {
    id: '2',
    src: "./images/image-2.webp",
  },
  {
    id: '3',
    src: "./images/image-3.webp",
  },
  {
    id: '4',
    src: "./images/image-4.webp",
  },
  {
    id: '5',
    src: "./images/image-5.webp",
  },
  {
    id: '6',
    src: "./images/image-6.webp",
  },
  {
    id: '7',
    src: "./images/image-7.webp",
  },
  {
    id: '8',
    src: "./images/image-8.webp",
  },
  {
    id: '9',
    src: "./images/image-9.webp",
  },
  {
    id: '10',
    src: "./images/image-10.jpeg",
  },
  {
    id: '11',
    src: "./images/image-11.jpeg",
  },
];

function App() {
  const [images, setImages] = useState(initialImages);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDeleteVisible, setDeleteVisible] = useState(false);

  function toggleSelection(id) {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  }

  function deleteSelectedImages() {
    const remainingImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(remainingImages);
    setSelectedImages([]);
    setDeleteVisible(false);
  }

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData("imageId", id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetId) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData("imageId");

    if (sourceId !== targetId) {
      const updatedImages = images.slice();
      const sourceIndex = images.findIndex((image) => image.id === sourceId);
      const targetIndex = images.findIndex((image) => image.id === targetId);

      const [movedImage] = updatedImages.splice(sourceIndex, 1);
      updatedImages.splice(targetIndex, 0, movedImage);

      setImages(updatedImages);
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-slate-200">
      <div className="w-[90%] h-auto my-0 mx-auto bg-white rounded-lg">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold p-5 ">
            {selectedImages.length === 0 ? "Gallery" : (
              <span className="flex items-center gap-2">
                <BsCheckSquareFill></BsCheckSquareFill> {selectedImages.length} Images Selected
              </span>
            )}
          </p>
          {selectedImages.length === 1 && (
            <button className="text-xl font-bold p-5 " onClick={deleteSelectedImages} cursor="pointer">
              Delete file
            </button>
          )}
          {selectedImages.length > 1 && (
            <button className="text-xl font-bold p-5 " onClick={deleteSelectedImages} cursor="pointer">
              Delete files
            </button>
          )}
        </div>
        <hr className="border-0 h-1 bg-gray-500 mb-3" />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-2 w-[90%] mx-auto my-2"
          onDragOver={handleDragOver}
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              draggable
              onDragStart={(e) => handleDragStart(e, image.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, image.id)}
              className={` relative group hover:bg-opacity-50 rounded-xl border-2 ${
                selectedImages.includes(image.id) && "border-4 border-blue-500"
              } transition-opacity duration-300 ease-in-out ${index === 0 ? "col-span-2 row-span-2 h-82 w-full" : "col-span-1 h-42 w-full"}`}
              style={{ opacity: selectedImages.includes(image.id) ? 0.5 : 1 }}
            >
              <img
                src={image.src}
                alt={`Image ${image.id}`}
                className="w-full h-full object-center rounded-xl"
              />
              <input
                type="checkbox"
                className="hidden group-hover:inline-block absolute top-2 left-2 z-10"
                onChange={() => toggleSelection(image.id)}
                checked={selectedImages.includes(image.id)}
              />
            </div>
          ))}
          {images.length < 12 && (
            <div className="col-span-1 h-42 w-full rounded-xl border-dashed border-2 flex flex-col items-center justify-center">
              <span> <FaImage className="text-3xl" /> </span>
              <p className="font-semibold text-lg">Add Image</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
