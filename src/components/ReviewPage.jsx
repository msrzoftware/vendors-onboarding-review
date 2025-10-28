import { CheckCircle, XCircle, Clock, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import ReviewApprovalUI from "./ReviewApprovalUI";
import { useMemo, useState } from "react";

const ReviewPage = () => {
  const location = useLocation();
  const product = location.state;

  const productFields = [
    { label: "Product Name", value: "iPhone 15 Pro" },
    { label: "Product Name 2", value: "iPhone 14 Pro" },
    { label: "Product Name 3", value: "iPhone 13 Pro" },
    { label: "Product Name 4", value: "iPhone 12 Pro" },
    { label: "Product Name 5", value: "iPhone 11 Pro" },
    { label: "Product Name 6", value: "iPhone X" },
    { label: "Product Name 7", value: "iPhone 8" },
    { label: "Product Name 8", value: "iPhone 7" },
    { label: "Product Name 9", value: "iPhone 6" },
    { label: "Product Name 10", value: "iPhone 5" },
  ];

  const fieldsToReview = [
    {
      key: "product_name",
      label: "Product Name",
      value: product?.name || "N/A",
    },
    {
      key: "description",
      label: "Description",
      value:
        product?.description ||
        "Mailchimp is a leading cloud-based marketing automation platform...",
    },
    {
      key: "overview",
      label: "Overview",
      value:
        "This product provides tools for businesses to manage their campaigns effectively.",
    },
    {
      key: "pricing",
      label: "Pricing",
      value: "4 plans: Free, Essentials, Standard, Premium",
    },
    {
      key: "integrations",
      label: "Integrations",
      value: "Google Drive, Slack, Trello, PayPal, Asana",
    },
    {
      key: "usp",
      label: "USP",
      value: "User-friendly interface with multiple pricing tiers",
    },
  ];
  const [reviewed, setReviewed] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const progress = useMemo(
    () => Math.round((reviewed.length / fieldsToReview.length) * 100),
    [reviewed, fieldsToReview.length]
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-[33%] bg-white shadow-lg hidden md:flex flex-col">
        <div className="flex items-center gap-2 py-1.5 px-2 bg-slate-50">
          <img
            src={product?.logo}
            alt={product?.name}
            className="w-16 h-16 rounded-xl object-cover"
          />

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {product?.name}
            </h2>
            <p className="text-gray-600 text-sm">{product?.company}</p>
            <span className="text-yellow-600 text-sm font-medium">
              {product?.status}
            </span>
          </div>
        </div>
        <nav className="flex flex-col">
          <button className="text-gray-700 font-medium hover:text-indigo-600 bg-yellow-100 px-5 py-3 text-left border-b border-indigo-600/5">
            optionnnnnnn
          </button>
          <button className="text-gray-700 font-medium hover:text-indigo-600 bg-green-100 px-5 py-3 text-left border-b border-indigo-600/5">
            optionnnnnnn
          </button>
          <button className="text-gray-700 font-medium hover:text-indigo-600 bg-gray-100 px-5 py-3 text-left borde-b border-indigo-600/5">
            optiooptionnnnnnnnn
          </button>
          <button className="text-gray-700 font-medium hover:text-indigo-600 bg-gray-100 px-5 py-3 text-left borde-b border-indigo-600/5">
            optiooptionnnnnnnnn
          </button>{" "}
          <button className="text-gray-700 font-medium hover:text-indigo-600 bg-gray-100 px-5 py-3 text-left borde-b border-indigo-600/5">
            optiooptionnnnnnnnn
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className=" flex flex-col border-b border-gray-200">
          <div className=" bg-white left-0 z-10 w-full min-h-[87.99px] flex items-center text-gray-700 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {productFields.map((item, index) => (
              <div
                key={index}
                className={`min-w-[150px] ${
                  index === 0 ? "border-b-4 border-b-blue-600" : ""
                } h-full px-4 flex flex-col items-center justify-center border-r-2 border-black/5 last:border-none hover:bg-blue-50 transition-all duration-200`}
              >
                <div className="font-semibold text-sm text-gray-800 whitespace-nowrap">
                  {item.label}
                </div>
                <div className="text-sm text-gray-600 mt-1 whitespace-nowrap">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between min-h-[87.99px] px-8 shadow">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  progress === 100 ? "bg-green-500" : "bg-indigo-500"
                } transition-all`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2 ml-4 text-nowrap">
                {reviewed.length}/{fieldsToReview.length} Reviewed
              </span>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="overflow-auto">
          <ReviewApprovalUI
            reviewed={reviewed}
            fieldsToReview={fieldsToReview}
            expanded={expanded}
            setExpanded={setExpanded}
            setReviewed={setReviewed}
          />
        </div>
        <footer className="h-20 bg-white flex items-center justify-end gap-4 px-6 shadow-inner border-t border-gray-200">
          <button className="bg-blue-600 text-white min-w-[150px] h-12 rounded-lg hover:bg-blue-700 transition">
            Prev
          </button>
          <button className="bg-blue-600 text-white min-w-[150px] h-12 rounded-lg hover:bg-blue-700 transition">
            Next
          </button>
        </footer>
      </main>
    </div>
  );
};

export default ReviewPage;
