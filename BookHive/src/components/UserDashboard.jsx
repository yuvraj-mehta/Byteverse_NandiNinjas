import React, { useEffect, useState } from "react";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";
import ChatbotPopup from "./ChatBotPopup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfTotalBorrowedBooks = userBorrowedBooks.filter(
      (book) => book.returned === false
    );
    let numberOfTotalReturnedBooks = userBorrowedBooks.filter(
      (book) => book.returned === true
    );
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [userBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <main className="relative flex-1 p-4 pt-24 bg-gray-50 min-h-screen">
        <Header />
        <div className="flex flex-col-reverse xl:flex-row gap-6">
          {/* LEFT SIDE */}
          <div className="flex-[4] flex flex-col gap-6 justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: bookIcon, text: "My Borrowed Books" },
                { icon: returnIcon, text: "Books I've Returned" },
                { icon: browseIcon, text: "Explore Library" },
              ].map(({ icon, text }, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition-all border-l-4 border-black"
                >
                  <span className="bg-gray-100 p-4 rounded-lg">
                    <img src={icon} alt="book-icon" className="w-6 h-6" />
                  </span>
                  <p className="text-base sm:text-lg font-medium text-gray-800">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 text-lg sm:text-xl lg:text-2xl font-semibold relative rounded-2xl shadow">
              <h4>
                "Through every borrowed book begins a journey of wisdom, nurturing the soul and shaping the path to excellence and inner refinement."
              </h4>
              <p className="text-gray-600 text-sm absolute bottom-4 right-6">
                ~ NandiNinjas
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-[2] flex flex-col items-center gap-6">
            <div className="w-full max-w-sm bg-white p-4 rounded-xl shadow-md">
              <Pie data={data} options={{ cutout: 0 }} />
            </div>

            <div className="flex items-center gap-4 bg-white p-4 w-full max-w-sm rounded-xl shadow">
              <img src={logo} alt="logo" className="h-12 w-auto" />
              <span className="w-[2px] bg-black h-16 mx-2"></span>
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
                  Total Borrowed Books
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
                  Total Returned Books
                </p>
              </div>
            </div>
          </div>
        </div>
        <ChatbotPopup />
      </main>
    </>
  );
};

export default UserDashboard;
