import { Search, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
    {
      id: "62d01a8c2f3a17a0bcd5e3b4",
      logo: "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724661839871.webp",
      name: "HubSpot CRM",
      company: "HubSpot Inc.",
      created_on: "2023-08-11",
      description:
        "Customer relationship management software for sales, marketing, and customer service.",
      category: ["CRM", "Sales"],
      status: "Pending Review",
    },
    {
      id: "62d02c9e3d4b27b1cde6f5f5",
      logo: "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724661854312.webp",
      name: "Trello",
      company: "Atlassian",
      created_on: "2023-09-20",
      description:
        "Visual project management tool using boards, lists, and cards to organize workflows.",
      category: ["Project Management", "Productivity"],
      status: "Pending Review",
    },
    {
      id: "62d03dbb4e5c38c2dff7a8a6",
      logo: "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724661870549.webp",
      name: "Notion",
      company: "Notion Labs Inc.",
      created_on: "2023-11-05",
      description:
        "All-in-one workspace for notes, tasks, databases, and collaboration.",
      category: ["Productivity", "Documentation"],
      status: "Pending Review",
    },
    {
      id: "62d04fbe5f6d49d3eff8b9b7",
      logo: "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724661883921.webp",
      name: "Asana",
      company: "Asana Inc.",
      created_on: "2024-01-14",
      description:
        "Work management platform helping teams organize, track, and manage their projects.",
      category: ["Project Management", "Collaboration"],
      status: "Pending Review",
    },
    {
      id: "62d061ce6a7e50e4f0f9cab8",
      logo: "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724661900654.webp",
      name: "Zendesk",
      company: "Zendesk Inc.",
      created_on: "2024-02-28",
      description:
        "Customer service and engagement platform for support, sales, and customer success.",
      category: ["Customer Support", "Helpdesk"],
      status: "Pending Review",
    },
    {
      id: "62d072dc7b8f61f5010adbc9",
      logo: "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724661924123.webp",
      name: "Airtable",
      company: "Airtable Inc.",
      created_on: "2024-04-17",
      description:
        "Flexible platform combining spreadsheets and databases for teams to build custom workflows.",
      category: ["Database", "Productivity"],
      status: "Pending Review",
    },
    {
      id: "62d084ea8c9f72f6121bcdca",
      logo: "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724661939987.webp",
      name: "Zoom",
      company: "Zoom Video Communications",
      created_on: "2024-05-25",
      description:
        "Cloud-based platform for video meetings, webinars, and online collaboration.",
      category: ["Video Conferencing", "Communication"],
      status: "Pending Review",
    },
  ];

  /** t2 */

  //   const pendingProducts =[
  //     {
  //   "id": "62cfea81a10437da5c6c65da",
  //   "created_on": "2022-06-22T17:16:33.005Z",
  //   "is_active": true,
  //   "updated_on": "2024-04-23T11:02:48.819Z",
  //   "is_verify": false,
  //   "verification_raised_on": null,
  //   "verified_on": null,
  //   "product_name": "Mailchimp",
  //   "description": "Mailchimp is a leading cloud-based marketing automation platform and email marketing service provider that has become a staple for businesses looking to enhance their digital marketing efforts.",
  //   "website": "https://mailchimp.com/",
  //   "overview": "Mailchimp is a leading cloud-based marketing automation platform and email marketing service provider that has become a staple for businesses looking to enhance their digital marketing efforts. Mailchimp's capabilities extend beyond email marketing. The platform offers robust marketing automation features, allowing businesses to automate customer journeys and engage with their audience at critical moments.",
  //   "category": ["64e5ebea4558409aac79717f", "64e5ebea4558409aac7971b0"],
  //   "company": "Mailchimp",
  //   "logo_url": "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724661707672.webp",
  //   "industry": ["64e5e837ad51f2176725fcd9"],
  //   "pricing_details_web_url": "https://mailchimp.com/pricing/marketing/",
  //   "industry_size": ["Small Businesses (1-99)", "Mid Market (100-500)", "Enterprise (500+)"],
  //   "other_features": [
  //     "Activity Dashboard",
  //     "Alerts/Notifications",
  //     "Archiving & Retention",
  //     "Campaign Analytics",
  //     "Campaign Management",
  //     "Email Marketing",
  //     "Email Templates",
  //     "Landing Pages/Web Forms",
  //     "Lead Capture",
  //     "Lead Nurturing",
  //     "Marketing Automation",
  //     "Multi-Channel Marketing",
  //     "Referral Tracking",
  //     "Reporting & Statistics",
  //     "Reporting/Analytics",
  //     "Automated Responses",
  //     "Audience Targeting",
  //     "A/B Testing",
  //     "API"
  //   ],
  //   "pricing": [
  //     {
  //       "plan": "Premium",
  //       "entity": "User",
  //       "amount": "350",
  //       "currency": "USD",
  //       "period": "Month",
  //       "description": [
  //         "No additional cost add-on",
  //         "Up to 200 journey points",
  //         "Reporting & Analytics",
  //         "Phone & Priority Support",
  //         "Custom-coded Templates",
  //         "10,000 contacts"
  //       ],
  //       "updated_on": "2024-08-26T10:52:08.478Z",
  //       "isPlanFree": false,
  //       "id": "662795580b29aad67ca41205"
  //     },
  //     {
  //       "plan": "Best Value",
  //       "entity": "User",
  //       "amount": "20",
  //       "currency": "USD",
  //       "period": "Month",
  //       "description": [
  //         "No additional cost add-on",
  //         "Up to 200 journey points",
  //         "24/7 Email & Chat Support",
  //         "mo for 500 contacts"
  //       ],
  //       "updated_on": "2024-08-26T10:53:45.393Z",
  //       "isPlanFree": false,
  //       "id": "662795580b29aad67ca41206"
  //     },
  //     {
  //       "plan": "Essentials",
  //       "entity": "User",
  //       "amount": "13",
  //       "currency": "USD",
  //       "period": "Month",
  //       "description": [
  //         "Up to 4 journey points",
  //         "Limited",
  //         "24/7 Email & Chat Support",
  //         "for 500 contact"
  //       ],
  //       "updated_on": "2024-08-26T10:54:56.980Z",
  //       "isPlanFree": false,
  //       "id": "662795580b29aad67ca41207"
  //     },
  //     {
  //       "plan": "Free",
  //       "entity": "User",
  //       "amount": "0",
  //       "currency": "USD",
  //       "period": "Month",
  //       "description": [],
  //       "isPlanFree": true,
  //       "id": "662795580b29aad67ca41208"
  //     }
  //   ],
  //   "company_id": "64cb75e4f97200308cec189d",
  //   "features": [
  //     "66bb0fbb58c8e12709006fb8",
  //     "66bb0fbb58c8e12709006fba",
  //     "66bb0fbb58c8e12709006fbf",
  //     "66bb0fbb58c8e12709006fc0"
  //   ],
  //   "supports": ["66bb0fa658c8e12709006fb2", "66bb0fa658c8e12709006fb3"],
  //   "snapshots": [
  //     {
  //       "name": "mailchimp.webp",
  //       "type": "image/webp",
  //       "url": "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724671599828.webp"
  //     },
  //     {
  //       "name": "mailchimp 1.webp",
  //       "type": "image/webp",
  //       "url": "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724671602189.webp"
  //     },
  //     {
  //       "name": "mailchimp 2.webp",
  //       "type": "image/webp",
  //       "url": "https://zoftware-logo.s3.ap-south-1.amazonaws.com/1724671607994.webp"
  //     }
  //   ],
  //   "metaKeys": {
  //     "description": "Review of Mailchimp: product details, features, and price. Connect with integrators and compare Mailchimp with similar softwares",
  //     "title": "Mailchimp Review, Features, Pricing, Integrators",
  //     "h1": "Mailchimp"
  //   },
  //   "weburl": "mailchimp",
  //   "integrations": [
  //     { "name": "Google Drive", "website": "https://www.google.com/drive/" },
  //     { "name": "Microsoft Excel", "website": "https://www.microsoft.com/en-us/microsoft-365/excel" },
  //     { "name": "Slack", "website": "https://slack.com/" },
  //     { "name": "Trello", "website": "https://trello.com/en" },
  //     { "name": "PayPal", "website": "https://www.paypal.com/ng/home" },
  //     { "name": "Asana", "website": "https://asana.com/" }
  //   ],
  //   "usp": "Mailchimp's user-friendly interface and comprehensive support resources make it accessible to businesses of all sizes.",
  //   "support_email": "support@mailchimp.com",
  //   "updated_by": "saheed@zoftwarehub.com",
  //   "region": "in",
  //   "ratings": {
  //     "overall_rating": 4.18,
  //     "ease_of_use": 4.5,
  //     "breadth_of_features": 4.37,
  //     "ease_of_implementation": 4.45,
  //     "value_for_money": 4.47,
  //     "customer_support": 4.4,
  //     "total_reviews": 72422
  //   },
  //   "subscription_plan": "Basic",
  //   "hq_location": "Atlanta, GA, USA",
  //   "languages": [
  //     "66c5a446c6c6f0649cefdec8",
  //     "66c5a446c6c6f0649cefdec9",
  //     "66c5a446c6c6f0649cefdede",
  //     "66c5a446c6c6f0649cefdedf"
  //   ],
  //   "pricing_overview": "Mailchimp offers Free, Essentials, Standard, and Premium plans, starting from $0 to $350/month.",
  //   "social_links": {
  //     "linkedin": "https://www.linkedin.com/company/intuitmailchimp/about/",
  //     "instagram": "https://www.instagram.com/mailchimp/",
  //     "twitter": "https://x.com/Mailchimp",
  //     "facebook": "https://www.facebook.com/mailchimp/"
  //   },
  //   "year_founded": 2001,
  //   "hq_contact": "+1 8003155939",
  //   "company_website": "https://mailchimp.com/",
  //   "feature_overview": "Mailchimp provides tools for automation, email campaigns, analytics, and integrations with a wide range of apps.",
  //   "reviews_strengths": [
  //     "Analytics and Reporting",
  //     "Customer Support",
  //     "Free and Flexible Pricing Plans",
  //     "Integration Capabilities",
  //     "AI Tools",
  //     "Comprehensive Features"
  //   ],
  //   "reviews_weakness": [
  //     "Data Overages",
  //     "Feature Availability by Plan",
  //     "Deliverability Issues",
  //     "Limited Customization",
  //     "Complexity for Advanced Features",
  //     "Pricing Structure"
  //   ],
  //   "ai_status": {
  //     "fed": true,
  //     "fed_at": "2025-09-07T14:22:30.775Z"
  //   }
  // }

  //   ]

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

export default Home;
