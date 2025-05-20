import { useState } from "react";
import { CgWorkAlt } from "react-icons/cg"; 
import { FaQuestionCircle, FaInfoCircle } from "react-icons/fa"; 
import { BsPeopleFill } from "react-icons/bs"; 
import { MdRateReview } from "react-icons/md"; 
import { HiOutlineNewspaper } from "react-icons/hi"; 
import { AiFillHome, AiOutlineShoppingCart } from "react-icons/ai";
import { RiCustomerService2Fill } from "react-icons/ri";

export default function MenuList() {
  // ✅ Tambahkan ini
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { icon: <AiFillHome className="text-xl text-gray-600 mr-4" />, label: "Home"},
    { icon: <AiOutlineShoppingCart className="text-xl text-gray-600 mr-4" />, label: "Cart" },
    { icon: <HiOutlineNewspaper className="text-xl text-gray-600 mr-4"/>, label: "News"},
    { icon: <RiCustomerService2Fill className="text-xl text-gray-600 mr-4" />, label: "Contact Us" },
    { icon: <FaInfoCircle className="text-xl text-gray-600 mr-4"/>, label: "About Us"},
    { icon: <BsPeopleFill className="text-xl text-gray-600 mr-4"/>, label: "Our Team"},
    { icon: <FaQuestionCircle className="text-xl text-gray-600 mr-4"/>, label: "FAQ Page"},
    { icon: <CgWorkAlt className="text-xl text-gray-600 mr-4"/>, label: "Career Page"},
  ];

  return (
    <div className="mt-10 w-full">
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index} className="w-full">
            <div
              onClick={() => setActiveIndex(index)}
              className={`relative flex items-center cursor-pointer rounded-xl pl-2 pr-4 py-3 font-medium text-gray-600 hover:bg-green-200 hover:text-hijau hover:font-extrabold transition-colors duration-200 ${
                activeIndex === index ? "bg-green-200 text-hijau font-extrabold" : ""
              }`}
            >
              {activeIndex === index && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-hijau"></div>
              )}
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
