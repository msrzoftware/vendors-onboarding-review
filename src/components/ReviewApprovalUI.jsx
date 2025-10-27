/** ============================== VARIATION - 1 ============================ */
// import { useRef, useEffect } from "react";
// import { CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";

// export default function ReviewApprovalUI({
//   reviewed,
//   fieldsToReview,
//   setExpanded,
//   setReviewed,
//   expanded,
// }) {
//   const fieldRefs = useRef({});

//   // Toggle expand/collapse
//   const toggleExpand = (key) => {
//     setExpanded((prev) =>
//       prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
//     );
//   };

//   // Toggle reviewed state
//   const toggleReview = (key) => {
//     setReviewed((prev) => {
//       const updated = prev.includes(key)
//         ? prev.filter((k) => k !== key)
//         : [...prev, key];

//       // Auto-collapse if newly reviewed
//       if (!prev.includes(key)) {
//         setExpanded((exp) => exp.filter((k) => k !== key));

//         // Find next unreviewed field and scroll to it
//         const currentIndex = fieldsToReview.findIndex((f) => f.key === key);
//         const nextField = fieldsToReview
//           .slice(currentIndex + 1)
//           .find((f) => !prev.includes(f.key));

//         if (nextField && fieldRefs.current[nextField.key]) {
//           setTimeout(() => {
//             fieldRefs.current[nextField.key].scrollIntoView({
//               behavior: "smooth",
//               block: "center",
//             });
//           }, 250); // Delay to allow collapse animation
//         }
//       }

//       return updated;
//     });
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50 overflow-y-auto">
//       <div className="max-w-full min-h-screen mx-auto bg-white p-6 space-y-6 border border-gray-200">
//         <div className="space-y-4">
//           {fieldsToReview.map((field) => {
//             const isOpen = expanded.includes(field.key);
//             const isReviewed = reviewed.includes(field.key);

//             return (
//               <div
//                 key={field.key}
//                 ref={(el) => (fieldRefs.current[field.key] = el)}
//                 className={`border rounded-xl bg-white shadow-sm transition-all duration-200 ${
//                   isReviewed
//                     ? "opacity-60 cursor-not-allowed"
//                     : "hover:shadow-md"
//                 }`}
//               >
//                 {/* Header Row */}
//                 <div
//                   className={`flex items-center justify-between p-4 ${
//                     isReviewed ? "cursor-not-allowed" : "cursor-pointer"
//                   }`}
//                   onClick={() => {
//                     if (!isReviewed) toggleExpand(field.key);
//                   }}
//                 >
//                   {/* Field Label */}
//                   <h3 className="font-medium text-gray-700">{field.label}</h3>

//                   {/* Action Buttons */}
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleReview(field.key);
//                       }}
//                       className={`transition ${
//                         isReviewed
//                           ? "text-green-500"
//                           : "text-gray-500 hover:text-green-500"
//                       }`}
//                     >
//                       {isReviewed ? (
//                         <CheckCircle2 className="w-6 h-6" />
//                       ) : (
//                         <Circle className="w-6 h-6" />
//                       )}
//                     </button>

//                     {!isReviewed &&
//                       (isOpen ? (
//                         <ChevronUp className="text-gray-500 transition-transform duration-300" />
//                       ) : (
//                         <ChevronDown className="text-gray-500 transition-transform duration-300" />
//                       ))}
//                   </div>
//                 </div>

//                 {/* Collapsible Content */}
//                 {isOpen && !isReviewed && (
//                   <div className="p-4 border-t bg-gray-50 text-sm text-gray-700 animate-fadeIn">
//                     {field.value}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

/** ============================== VARIATION - 2 ============================ */
// import { useEffect, useRef } from "react";
// import { CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";

// export default function ReviewApprovalUI({
//   reviewed,
//   fieldsToReview,
//   setExpanded,
//   setReviewed,
//   expanded,
// }) {
//   const fieldRefs = useRef({});

//   // ✅ Expand first card by default on mount
//   useEffect(() => {
//     if (fieldsToReview.length > 0 && expanded.length === 0) {
//       setExpanded([fieldsToReview[0].key]);
//     }
//   }, [fieldsToReview, expanded, setExpanded]);

//   // 🔽 Toggle expand/collapse manually
//   const toggleExpand = (key) => {
//     setExpanded((prev) =>
//       prev.includes(key) ? prev.filter((k) => k !== key) : [key]
//     );
//   };

//   // ✅ Toggle reviewed + auto expand next
//   const toggleReview = (key) => {
//     setReviewed((prev) => {
//       const isAlreadyReviewed = prev.includes(key);
//       const updated = isAlreadyReviewed
//         ? prev.filter((k) => k !== key)
//         : [...prev, key];

//       if (!isAlreadyReviewed) {
//         // Collapse current
//         setExpanded((exp) => exp.filter((k) => k !== key));

//         // Find next unreviewed
//         const currentIndex = fieldsToReview.findIndex((f) => f.key === key);
//         const nextField = fieldsToReview
//           .slice(currentIndex + 1)
//           .find((f) => !updated.includes(f.key));

//         // Auto-expand & scroll to next
//         if (nextField) {
//           setTimeout(() => {
//             setExpanded([nextField.key]);
//             fieldRefs.current[nextField.key]?.scrollIntoView({
//               behavior: "smooth",
//               block: "center",
//             });
//           }, 300);
//         }
//       }

//       return updated;
//     });
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50 overflow-y-auto">
//       <div className="max-w-full min-h-screen mx-auto bg-white p-6 space-y-6 border border-gray-200">
//         <div className="space-y-4">
//           {fieldsToReview.map((field) => {
//             const isOpen = expanded.includes(field.key);
//             const isReviewed = reviewed.includes(field.key);

//             return (
//               <div
//                 key={field.key}
//                 ref={(el) => (fieldRefs.current[field.key] = el)}
//                 className={`border rounded-xl bg-white shadow-sm transition-all duration-200 ${
//                   isReviewed
//                     ? "opacity-60 cursor-not-allowed"
//                     : "hover:shadow-md"
//                 }`}
//               >
//                 {/* Header Row */}
//                 <div
//                   className={`flex items-center justify-between p-4 ${
//                     isReviewed ? "cursor-not-allowed" : "cursor-pointer"
//                   }`}
//                   onClick={() => {
//                     if (!isReviewed) toggleExpand(field.key);
//                   }}
//                 >
//                   <h3 className="font-medium text-gray-700">{field.label}</h3>

//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleReview(field.key);
//                       }}
//                       className={`transition ${
//                         isReviewed
//                           ? "text-green-500"
//                           : "text-gray-500 hover:text-green-500"
//                       }`}
//                     >
//                       {isReviewed ? (
//                         <CheckCircle2 className="w-6 h-6" />
//                       ) : (
//                         <Circle className="w-6 h-6" />
//                       )}
//                     </button>

//                     {!isReviewed &&
//                       (isOpen ? (
//                         <ChevronUp className="text-gray-500 transition-transform duration-300" />
//                       ) : (
//                         <ChevronDown className="text-gray-500 transition-transform duration-300" />
//                       ))}
//                   </div>
//                 </div>

//                 {/* Collapsible Content */}
//                 {isOpen && !isReviewed && (
//                   <div className="p-4 border-t bg-gray-50 text-sm text-gray-700 animate-fadeIn">
//                     {field.value}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

/** ============================== VARIATION - 3 ============================ */
import { useRef, useMemo } from "react";
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";

export default function ReviewApprovalUI({
  reviewed,
  fieldsToReview,
  setExpanded,
  setReviewed,
  expanded,
}) {
  const fieldRefs = useRef({});

  // Reorder: Unreviewed on top, Reviewed at bottom
  const sortedFields = useMemo(() => {
    return [
      ...fieldsToReview.filter((f) => !reviewed.includes(f.key)),
      ...fieldsToReview.filter((f) => reviewed.includes(f.key)),
    ];
  }, [fieldsToReview, reviewed]);

  // Toggle expand/collapse
  const toggleExpand = (key) => {
    setExpanded((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Toggle reviewed state + auto-scroll + reorder
  const toggleReview = (key) => {
    setReviewed((prev) => {
      const updated = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];

      // Collapse if newly reviewed
      if (!prev.includes(key)) {
        setExpanded((exp) => exp.filter((k) => k !== key));

        // Scroll to next unreviewed
        const currentIndex = fieldsToReview.findIndex((f) => f.key === key);
        const nextField = fieldsToReview
          .slice(currentIndex + 1)
          .find((f) => !prev.includes(f.key));

        if (nextField && fieldRefs.current[nextField.key]) {
          setTimeout(() => {
            fieldRefs.current[nextField.key].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 300);
        }
      }

      return updated;
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 overflow-y-auto">
      <div className="max-w-full min-h-screen mx-auto bg-white p-6 space-y-6 border border-gray-200">
        <div className="space-y-4">
          {sortedFields.map((field) => {
            const isOpen = expanded.includes(field.key);
            const isReviewed = reviewed.includes(field.key);

            return (
              <div
                key={field.key}
                ref={(el) => (fieldRefs.current[field.key] = el)}
                className={`border rounded-xl bg-white shadow-sm transition-all duration-200 ${
                  isReviewed
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-md"
                }`}
              >
                {/* Header Row */}
                <div
                  className={`flex items-center justify-between p-4 ${
                    isReviewed ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!isReviewed) toggleExpand(field.key);
                  }}
                >
                  <h3 className="font-medium text-gray-700">{field.label}</h3>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReview(field.key);
                      }}
                      className={`transition ${
                        isReviewed
                          ? "text-green-500"
                          : "text-gray-500 hover:text-green-500"
                      }`}
                    >
                      {isReviewed ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>

                    {!isReviewed &&
                      (isOpen ? (
                        <ChevronUp className="text-gray-500 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="text-gray-500 transition-transform duration-300" />
                      ))}
                  </div>
                </div>

                {/* Collapsible Content */}
                {isOpen && !isReviewed && (
                  <div className="p-4 border-t bg-gray-50 text-sm text-gray-700 animate-fadeIn">
                    {field.value}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
