
const ImageItem = ({
  image,
  selectedImages,
  toggleSelection,
  handleDragStart,
  handleDrop,
  index,
}) => {
  return (
    <div
      key={image.id}
      draggable
      onDragStart={(e) => handleDragStart(e, image.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, image.id)}
      className={` relative group   rounded-xl border-2 ${
        index === 0
          ? "col-span-2 row-span-2 h-82 w-full"
          : "col-span-1 h-42 w-full"
      }`}
    >
      <img
        src={image.src}
        alt={`Image ${image.id}`}
        className="w-full h-full object-center  hover:opacity-[0.5]  rounded-xl duration-300 bg-white "
        style={{ opacity: selectedImages.includes(image.id) ? 0.5 : 1 }}
      />
      <div
        className={`absolute w-full h-full bg-black top-0 left-0 hover:opacity-50 duration-300 cursor-move rounded-xl ${
          selectedImages.includes(image.id) ? "opacity-30" : "opacity-0"
        }`}
      >
        <input
          className="h-5 w-5 ml-5 mt-5 cursor-pointer"
          type="checkbox"
          name="checkbox"
          onChange={() => toggleSelection(image.id)}
          checked={selectedImages.includes(image.id)}
        ></input>
      </div>
    </div>
  );
};

export default ImageItem;
