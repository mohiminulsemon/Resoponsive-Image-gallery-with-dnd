import  { useState } from "react";
import { FaImage } from "react-icons/fa";
import Header from "./Header";
import ImageItem from "./ImageItem";

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

function Gallery() {
  const [images, setImages] = useState(initialImages);
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleSelection = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const deleteSelectedImages = () => {
    const remainingImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(remainingImages);
    setSelectedImages([]);
  };

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
        <Header selectedImages={selectedImages} deleteSelectedImages={deleteSelectedImages} />
        <hr className="border-0 h-1 bg-gray-500 mb-3" />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-2 w-[90%] mx-auto my-2"
          onDragOver={handleDragOver}
        >
          {images.map((image, index) => (
            <ImageItem
              key={image.id}
              image={image}
              selectedImages={selectedImages}
              toggleSelection={toggleSelection}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              index={index}
            />
          ))}
          {images.length < 12 && (
            <div className="col-span-1 h-42 w-full rounded-xl border-dashed border-2 flex flex-col items-center justify-center">
              <span> <FaImage className="text-xl" /> </span>
              <p className="font-semibold text-lg">Add Images</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
