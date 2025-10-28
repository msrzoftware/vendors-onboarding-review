import { Search, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const Navigate = useNavigate();
  const pendingProducts = [
    {
      id: "62cfea81a10437da5c6c65da",
      logo: "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724661707672.webp",
      name: "Mailchimp",
      company: "Mailchimp Inc.",
      created_on: "2022-06-22",
      description:
        "Cloud-based marketing automation platform for email and campaign management.",
      category: ["Marketing", "Automation"],
      status: "Pending Review",
    },
    {
      id: "62cffb9a3d2a37dfbc6c78e2",
      logo: "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724661800124.webp",
      name: "Slack",
      company: "Slack Technologies",
      created_on: "2023-03-18",
      description:
        "Collaboration and messaging tool designed for teams to communicate efficiently.",
      category: ["Communication", "Productivity"],
      status: "Pending Review",
    },
    {
      id: "62d00a713a04c8bfab7d91c2",
      logo: "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724661823456.webp",
      name: "Canva",
      company: "Canva Pty Ltd",
      created_on: "2023-07-09",
      description:
        "Online graphic design tool used for creating visuals, presentations, and social media content.",
      category: ["Design", "Marketing"],
      status: "Pending Review",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Pending Product Reviews
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={product.logo}
                alt={product.name}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.company}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {product.category.map((cat, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock size={16} /> {product.created_on}
              </div>
              <span className="text-yellow-600 font-medium">
                {product.status}
              </span>
            </div>

            <button
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-xl flex items-center justify-center gap-2 transition"
              onClick={() => Navigate("/review", { state: product })}
            >
              Review Product <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
