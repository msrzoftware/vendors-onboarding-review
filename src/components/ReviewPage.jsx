import ReviewApprovalUI from "./ReviewApprovalUI";
import { useMemo, useState } from "react";
import productData from "../data/product.json";
import { pendingProducts } from "../data/product.json";

const ReviewPage = () => {
  const [reviewed, setReviewed] = useState([]);
  const [expanded, setExpanded] = useState([]);

  // ✅ Access the fieldsToReview object (make sure there’s no trailing space in JSON key)
  const currentProduct = productData.fieldsToReview;

  // ✅ Convert the JSON object into an array of key-value pairs for rendering
  const fieldsToReview = currentProduct
    ? Object.entries(currentProduct).map(([key, value]) => {
        let displayValue;

        if (value === null || value === undefined) {
          displayValue = "—"; // graceful null/undefined
        } else if (Array.isArray(value)) {
          displayValue = value; // keep as array
        } else if (typeof value === "object") {
          displayValue = JSON.stringify(value, null, 2); // pretty-print object
        } else if (typeof value === "boolean") {
          displayValue = value ? "True" : "False"; // readable boolean
        } else {
          displayValue = value; // number or string
        }

        return {
          key,
          label: key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          value: displayValue,
        };
      })
    : [];

  console.log("fieldsToReview", fieldsToReview);

  // ✅ Compute progress
  const progress = useMemo(() => {
    if (!fieldsToReview.length) return 0;
    return Math.round((reviewed.length / fieldsToReview.length) * 100);
  }, [reviewed, fieldsToReview.length]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-[28%] bg-white shadow-lg hidden md:flex flex-col max-h-screen">
        <div className="flex items-center gap-2 py-3 px-4 bg-slate-50 border-b border-gray-200">
          <img
            src={currentProduct?.logo_url}
            alt={currentProduct?.product_name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {currentProduct?.product_name || "Unnamed Product"}
            </h2>
            <p className="text-gray-600 text-sm">
              {currentProduct?.company || "Company"}
            </p>
            <span className="text-yellow-600 text-sm font-medium">
              {currentProduct?.subscription_plan || "Basic"}
            </span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col overflow-y-auto">
          {fieldsToReview.map((field) => {
            const isReviewed = reviewed.includes(field.key); // ✅ check if reviewed
            const isCurrent = expanded.includes(field.key); // ✅ check if this field is currently expanded (active)
            return (
              <button
                key={field.key}
                className={`text-gray-700 font-medium text-left border-b border-gray-200/60 px-5 py-3 transition-all duration-200
                  hover:text-indigo-600 hover:bg-indigo-50
                  ${
                    isCurrent
                      ? "bg-yellow-100 text-yellow-800" // ✅ active field being reviewed
                      : isReviewed
                      ? "bg-green-100 text-green-800" // ✅ reviewed/approved fields
                      : "bg-gray-50"
                  }`}
              >
                {field.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className=" flex flex-col border-b border-gray-200">
          <div className="bg-white left-0 z-10 w-full min-h-[100px] flex items-center text-gray-700 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shadow-sm">
            {pendingProducts.map((item, index) => (
              <div
                key={index}
                className={`min-w-[180px] ${
                  index === 0
                    ? "bg-yellow-100 border-b-4 border-yellow-500"
                    : ""
                } h-full px-4 py-2 flex flex-col items-center justify-center border-r border-gray-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer`}
                // onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-10 h-10 object-contain rounded-md"
                />
                <div className="font-semibold text-sm mt-2">{item.name}</div>
                <div className="text-xs text-gray-500">{item.company}</div>
                <span className="mt-1 text-[11px] bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                  Pending Review
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards Section */}
        <div className="overflow-auto relative">
          <div className="sticky top-0 left-0 flex items-center justify-between min-h-[87.99px] px-8 bg-white z-10 border-b border-gray-200">
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
          <ReviewApprovalUI
            reviewed={reviewed}
            expanded={expanded}
            setExpanded={setExpanded}
            setReviewed={setReviewed}
            fieldsToReview={fieldsToReview}
          />
        </div>
        {/* <footer className="h-20 bg-white flex items-center justify-end gap-4 px-6 shadow-inner border-t border-gray-200">
          <button className="bg-blue-600 text-white min-w-[150px] h-12 rounded-lg hover:bg-blue-700 transition">
            Prev
          </button>
          <button className="bg-blue-600 text-white min-w-[150px] h-12 rounded-lg hover:bg-blue-700 transition">
            Next
          </button>
        </footer> */}
      </main>
    </div>
  );
};

export default ReviewPage;
