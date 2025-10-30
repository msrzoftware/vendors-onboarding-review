import ReviewApprovalUI from "./ReviewApprovalUI";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProductDetail from "../hooks/use-product-detail";
import useKeyboardShortcuts from "../hooks/use-keyboard-shortcuts";
import { ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reviewed, setReviewed] = useState([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

  // Get product from location state
  const productFromState = location.state;
  const slug = productFromState?.product_slug;

  // Fetch full product details by slug
  const { product, isLoading, error } = useProductDetail(slug);

  // Use fetched product, fallback to state if not yet loaded
  const currentProduct = product || productFromState;

  // ✅ Helper to check if value is empty
  const isEmpty = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === "object" && Object.keys(value).length === 0) return true;
    return false;
  };

  // ✅ Flatten nested objects for review
  const flattenObject = (obj, parentKey = "") => {
    const fields = [];

    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      // Skip if value is empty/null/undefined
      if (isEmpty(value)) {
        return;
      }

      // Handle arrays
      if (Array.isArray(value)) {
        // Check if array of objects
        const isArrayOfObjects = value.every(
          (item) => typeof item === "object" && item !== null && !Array.isArray(item)
        );

        if (isArrayOfObjects && value.length > 0) {
          // Create individual fields for each object in the array
          value.forEach((item, index) => {
            const itemKey = `${fullKey}[${index}]`;
            const itemLabel = `${fullKey
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())} #${index + 1}`;

            // Flatten each object in the array
            Object.entries(item).forEach(([subKey, subValue]) => {
              if (isEmpty(subValue)) return;

              const subFullKey = `${itemKey}.${subKey}`;
              const subLabel = `${itemLabel} > ${subKey
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}`;

              // Handle nested arrays within array items
              if (Array.isArray(subValue)) {
                fields.push({
                  key: subFullKey,
                  label: subLabel,
                  value: subValue,
                });
              } else if (typeof subValue === "object" && subValue !== null) {
                // Flatten nested objects within array items
                fields.push(...flattenObject(subValue, subFullKey));
              } else {
                fields.push({
                  key: subFullKey,
                  label: subLabel,
                  value: typeof subValue === "boolean" ? (subValue ? "True" : "False") : subValue,
                });
              }
            });
          });
        } else {
          // Array of primitives
          fields.push({
            key: fullKey,
            label: fullKey
              .replace(/_/g, " ")
              .replace(/\./g, " > ")
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            value: value,
          });
        }
        return;
      }

      // Handle objects - always flatten
      if (typeof value === "object") {
        fields.push(...flattenObject(value, fullKey));
        return;
      }

      // Handle primitives
      fields.push({
        key: fullKey,
        label: fullKey
          .replace(/_/g, " ")
          .replace(/\./g, " > ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        value: typeof value === "boolean" ? (value ? "True" : "False") : value,
      });
    });

    return fields;
  };

  // ✅ Convert the product snapshot into an array of key-value pairs for rendering
  const fieldsToReview = useMemo(() => {
    if (!currentProduct?.snapshot) return [];
    return flattenObject(currentProduct.snapshot);
  }, [currentProduct]);

  console.log("currentProduct", currentProduct);
  console.log("fieldsToReview", fieldsToReview);

  // ✅ Compute progress
  const progress = useMemo(() => {
    if (!fieldsToReview.length) return 0;
    return Math.round((reviewed.length / fieldsToReview.length) * 100);
  }, [reviewed, fieldsToReview.length]);

  // Get approved fields for the sheet
  const approvedFields = useMemo(() => {
    return fieldsToReview.filter((field) => reviewed.includes(field.key));
  }, [fieldsToReview, reviewed]);

  // Keyboard shortcuts
  const handleApprove = () => {
    if (currentFieldIndex !== null && fieldsToReview[currentFieldIndex]) {
      const currentField = fieldsToReview[currentFieldIndex];
      const isAlreadyReviewed = reviewed.includes(currentField.key);

      if (!isAlreadyReviewed) {
        setReviewed((prev) => [...prev, currentField.key]);

        // Move to next unreviewed field
        const nextField = fieldsToReview
          .slice(currentFieldIndex + 1)
          .find((f) => !reviewed.includes(f.key));

        if (nextField) {
          const nextIndex = fieldsToReview.findIndex((f) => f.key === nextField.key);
          setCurrentFieldIndex(nextIndex);
        }
      }
    }
  };

  const handleNext = () => {
    if (currentFieldIndex < fieldsToReview.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1);
    }
  };

  // Use keyboard shortcuts
  useKeyboardShortcuts({
    onApprove: handleApprove,
    onNext: handleNext,
    onPrevious: handlePrevious,
    enabled: !isLoading && fieldsToReview.length > 0,
  });

  // Handle sidebar field click
  const handleFieldClick = (index) => {
    setCurrentFieldIndex(index);
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Product
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // No product selected
  if (!currentProduct && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No Product Selected
          </h2>
          <p className="text-gray-600 mb-6">
            Please select a product from the list to review
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 bg-background border-r hidden md:flex flex-col h-screen">
        {/* Product Header */}
        <div className="flex items-center gap-2 py-3 px-3 border-b flex-shrink-0">
          <div className="w-8 h-8 flex-shrink-0">
            <img
              src={currentProduct?.logo_url}
              alt={currentProduct?.product_name}
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/32?text=" +
                  (currentProduct?.product_name?.[0] || "P");
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold truncate">
              {currentProduct?.product_name || "Product"}
            </h2>
            <p className="text-xs text-muted-foreground truncate">
              {currentProduct?.company_name || "Company"}
            </p>
          </div>
        </div>

        {/* Scrollable Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Pending Fields Section */}
          <div className="p-2">
            <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              Pending ({fieldsToReview.length - reviewed.length})
            </h3>
            <nav className="flex flex-col space-y-0.5">
              {fieldsToReview.map((field, index) => {
                const isReviewed = reviewed.includes(field.key);
                const isCurrent = currentFieldIndex === index;

                if (isReviewed) return null;

                return (
                  <button
                    key={field.key}
                    onClick={() => handleFieldClick(index)}
                    className={cn(
                      "px-2 py-1.5 rounded transition-all text-left w-full text-xs",
                      isCurrent ? "bg-foreground text-background font-medium" : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full flex-shrink-0",
                          isCurrent ? "bg-background" : "bg-muted-foreground/40"
                        )}
                      />
                      <p className="truncate">
                        {field.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Approved Fields Section */}
          {approvedFields.length > 0 && (
            <>
              <div className="h-px bg-border my-2" />
              <div className="p-2">
                <h3 className="text-[10px] font-semibold text-green-600 uppercase tracking-wider mb-2 px-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Approved ({approvedFields.length})
                </h3>
                <nav className="flex flex-col space-y-0.5">
                  {approvedFields.map((field) => {
                    const index = fieldsToReview.findIndex(f => f.key === field.key);
                    return (
                      <button
                        key={field.key}
                        onClick={() => handleFieldClick(index)}
                        className="px-2 py-1.5 rounded transition-all text-left w-full text-xs bg-green-50 hover:bg-green-100"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <p className="text-green-900 truncate">
                            {field.label}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden h-screen">
        {/* Header with Back Button and Title */}
        <div className="border-b px-4 py-2.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              title="Back to Products"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-sm font-semibold">
              Review Fields
            </h1>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            {reviewed.length} / {fieldsToReview.length}
          </Badge>
        </div>

        {/* Progress Section */}
        <div className="border-b px-4 py-2 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-muted h-1 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300 bg-green-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap min-w-[3ch]">
              {progress}%
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600">Loading product details...</p>
            </div>
          </div>
        )}

        {/* Fields Review Container */}
        {!isLoading && (
          <div className="flex-1 overflow-y-auto relative">
            <ReviewApprovalUI
              reviewed={reviewed}
              setReviewed={setReviewed}
              fieldsToReview={fieldsToReview}
              currentFieldIndex={currentFieldIndex}
              setCurrentFieldIndex={setCurrentFieldIndex}
            />

            {/* Floating Keyboard Shortcuts Hints */}
            {fieldsToReview.length > 0 && (
              <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
                {/* Approve Shortcut */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium">Approve</span>
                  <kbd className="px-3 py-2 text-sm border rounded-md shadow-sm bg-background font-mono font-semibold">
                    Space
                  </kbd>
                </div>

                {/* Next Shortcut */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium">Next</span>
                  <div className="flex gap-1.5 items-center">
                    <kbd className="px-3 py-2 text-sm border rounded-md shadow-sm bg-background font-mono font-semibold">
                      J
                    </kbd>
                    <span className="text-[10px]">or</span>
                    <kbd className="px-3 py-2 text-sm border rounded-md shadow-sm bg-background font-mono font-semibold">
                      ↓
                    </kbd>
                  </div>
                </div>

                {/* Previous Shortcut */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium">Previous</span>
                  <div className="flex gap-1.5 items-center">
                    <kbd className="px-3 py-2 text-sm border rounded-md shadow-sm bg-background font-mono font-semibold">
                      K
                    </kbd>
                    <span className="text-[10px]">or</span>
                    <kbd className="px-3 py-2 text-sm border rounded-md shadow-sm bg-background font-mono font-semibold">
                      ↑
                    </kbd>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ReviewPage;
