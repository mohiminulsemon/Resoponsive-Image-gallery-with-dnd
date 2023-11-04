import React from "react";
import { BsCheckSquareFill } from "react-icons/bs";

const Header = ({ selectedImages, deleteSelectedImages }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-xl font-bold p-5 ">
        {selectedImages.length === 0 ? (
          "Gallery"
        ) : (
          <span className="flex items-center gap-2">
            <BsCheckSquareFill className="text-blue-500"></BsCheckSquareFill>{" "}
            {selectedImages.length}{" "}
            {selectedImages.length === 1 ? "File" : "Files"} Selected
          </span>
        )}
      </p>
      {selectedImages.length > 0 && (
        <button
          className="text-lg font-semibold text-red-500 p-5 hover:underline"
          onClick={deleteSelectedImages}
          cursor="pointer"
        >
          Delete {selectedImages.length === 1 ? "file" : "files"}
        </button>
      )}
    </div>
  );
};

export default Header;
