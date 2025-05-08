import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/avatar/home-icon.gif";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
  },
};

function Grouplist() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [arrlenght, setArrLenght] = useState(10);
  const [groupErorr, setGroupErorr] = useState({});
  const [gorupInfo, setGroupInfo] = useState({
    groupTagName: "",
    groupName: "",
    groupImage: ""
  });
  function openModal() {
    setIsOpen(true);
  }

   // validate from input 
   const validationFiled = () => {
    let error = {};
    for (let files in gorupInfo) {
      if (gorupInfo[files] == "") {
        error[`${files}Error`] = `${files} Missing Filed the input`;
      }
    }
    setGroupErorr(error);
    return Object.keys(error).length === 0;
  };


  //input onchange button function
  const handleChangeButton = (event) => {
    const { files, id, value } = event.target;
    const newValue = id === "groupImage" ? files[0] : value;
// Update the group info 
    setGroupInfo((prev) => ({
      ...prev,
      [id] : newValue,
    }));
    // clear the error for the current field if it hsas a value 
    setGroupErorr((prevErrors)=>{
      const newErrors = {...prevErrors};
      if (newValue !== "") {
        delete newErrors[`${id}Error`]
      }
      return newErrors
    })
  };


  const handleSubmit = () => {
  const isValid =  validationFiled();
  if (!isValid) return
  };

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <div className="max-w-md mx-auto mt-4">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
            placeholder="Search Mockups"
            required
          />
        </div>
      </div>
      {/* Grouplist */}
      <div className="flex items-center justify-between pt-6">
        <h1 className="relative">
          Groups List{" "}
          <span className="absolute right-[-28px] top-0 flex items-center w-5 h-5 rounded-full bg-green-300">
            {arrlenght}
          </span>
        </h1>
        <span>
          <HiOutlineDotsVertical />
        </span>
      </div>
      <button
        type="button"
        onClick={openModal}
        class="focus:outline-none w-full mt-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-5 cursor-pointer"
      >
        Creat Group
      </button>
      <div className="overflow-y-scroll h-[40dvh]">
        {[...new Array(arrlenght)].map((_, index) => (
          <div
            className={
              arrlenght - 1 === index
                ? "flex items-center justify-between pt-3 border-b-[#000000] pb-2"
                : "flex items-center justify-between pt-3 border-b border-b-[#000000] pb-2"
            }
          >
            <div className="w-[50px] h-[50px]">
              <picture>
                <img
                  src={Avatar}
                  alt={Avatar}
                  className="w-full h-full rounded-full"
                />
              </picture>
            </div>
            <div className="">
              <h1 className="text-[18px] font-semibold">Friends Reunion</h1>
              <p className="text-sm ">Hi Guys, Wassup!</p>
            </div>
            <button
              type="button"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
            >
              join
            </button>
          </div>
        ))}
      </div>
      {/* modal components */}
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <button className="cursor-pointer text-red-700" onClick={closeModal}>
            close
          </button>

          <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form class="space-y-6" action="#" onSubmit={(e)=>e.preventDefault()}>
                <div>
                  <label
                    for="groupName"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Group Name
                  </label>
                  <input
                    type="text"
                    onChange={handleChangeButton}
                    id="groupName"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="type your group name"
                    required
                  />
                  {groupErorr.groupNameError && 
                  <span className="text-red-500">{groupErorr.groupNameError}</span>
                  }
                </div>
                <div>
                  <label
                    for="groupTagName"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    GroupTag Name
                  </label>
                  <input
                    type="text"
                    onChange={handleChangeButton}
                    id="groupTagName"
                    placeholder="groupTagName"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                  {groupErorr.groupTagNameError && 
                  <span className="text-red-500">{groupErorr.groupTagNameError}</span>
                  }
                </div>

                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Upload file
                </label>
                <input
                  onChange={handleChangeButton}
                  class="block w-full py-2 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="groupImage"
                  type="file"
                />
                {groupErorr.groupImageError && 
                  <span className="text-red-500">{groupErorr.groupImageError}</span>
                  }
                <button
                  type="submit"
                  onClick={handleSubmit}
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Creat Group
                </button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Grouplist;
