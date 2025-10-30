import { useRef, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ReviewApprovalUI({
  reviewed,
  fieldsToReview,
  setReviewed,
  currentFieldIndex,
  setCurrentFieldIndex,
}) {
  const fieldRefs = useRef({});

  // Scroll to current field when index changes
  useEffect(() => {
    if (currentFieldIndex !== null && fieldsToReview[currentFieldIndex]) {
      const field = fieldsToReview[currentFieldIndex];
      const element = fieldRefs.current[field.key];

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentFieldIndex, fieldsToReview]);

  // Approve field - mark as reviewed and move to next
  const approveField = (key) => {
    setReviewed((prev) => {
      const updated = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];

      if (!prev.includes(key)) {
        // Find next unreviewed field
        const currentIndex = fieldsToReview.findIndex((f) => f.key === key);
        const nextField = fieldsToReview
          .slice(currentIndex + 1)
          .find((f) => !updated.includes(f.key));

        if (nextField) {
          const nextIndex = fieldsToReview.findIndex((f) => f.key === nextField.key);
          setCurrentFieldIndex(nextIndex);
        }
      }

      return updated;
    });
  };

  // Render field value based on type
  const renderFieldValue = (value) => {
    // Case 1: Array of objects
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-muted-foreground italic">Empty Array</span>;
      }

      const isArrayOfObjects = value.every(
        (item) => typeof item === "object" && item !== null
      );

      if (isArrayOfObjects) {
        return (
          <div className="space-y-3">
            {value.map((obj, idx) => (
              <Card key={idx} className="border-muted">
                <CardContent className="pt-4">
                  {Object.entries(obj).map(([k, val]) => (
                    <div key={k} className="flex items-start gap-3 text-sm mb-3 last:mb-0">
                      <span className="font-medium text-foreground min-w-32 capitalize">
                        {k.replace(/_/g, " ")}:
                      </span>
                      <span className="text-muted-foreground flex-1">
                        {Array.isArray(val) ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {val.map((item, i) => (
                              <li key={i}>{item?.toString?.() ?? "—"}</li>
                            ))}
                          </ul>
                        ) : typeof val === "object" && val !== null ? (
                          <pre className="whitespace-pre-wrap text-xs bg-muted border rounded p-2 overflow-x-auto">
                            {JSON.stringify(val, null, 2)}
                          </pre>
                        ) : (
                          val?.toString?.() ?? "—"
                        )}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        );
      } else {
        return (
          <div className="flex flex-wrap gap-2">
            {value.map((item, i) => (
              <Badge key={i} variant="secondary">
                {item?.toString?.() ?? "—"}
              </Badge>
            ))}
          </div>
        );
      }
    }

    // Case 2: Object (non-array)
    if (typeof value === "object" && value !== null) {
      return (
        <pre className="whitespace-pre-wrap text-sm bg-muted border rounded-lg p-4 overflow-x-auto max-h-96">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }

    // Case 3: Primitives (string, number, boolean, null)
    if (typeof value === "string" && value.length > 200) {
      return (
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {value}
        </p>
      );
    }

    return (
      <p className="text-sm font-medium">
        {value?.toString?.() ?? "—"}
      </p>
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 space-y-3">
        {fieldsToReview.map((field, index) => {
          const isReviewed = reviewed.includes(field.key);
          const isCurrent = currentFieldIndex === index;

          return (
            <Card
              key={field.key}
              ref={(el) => (fieldRefs.current[field.key] = el)}
              className={cn(
                "transition-all duration-200 border",
                isReviewed && "opacity-50 bg-green-50/50 border-green-200",
                isCurrent && !isReviewed && "border-foreground shadow-sm",
                !isCurrent && !isReviewed && "border-border"
              )}
            >
              {/* Header with Approve Button */}
              <CardHeader className="pb-3 px-4 pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      {field.label}
                      {isCurrent && !isReviewed && (
                        <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4">
                          Current
                        </Badge>
                      )}
                    </CardTitle>
                    {isReviewed && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Approved
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => approveField(field.key)}
                    variant={isReviewed ? "outline" : "default"}
                    size="sm"
                    className={cn(
                      "flex-shrink-0 gap-1.5 h-8 text-xs",
                      isReviewed && "border-green-500 text-green-700 hover:bg-green-50"
                    )}
                  >
                    {isReviewed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approved
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        Approve
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>

              {/* Field Value */}
              <CardContent className="px-4 pb-4">
                {renderFieldValue(field.value)}
              </CardContent>
            </Card>
          );
        })}

        {/* Empty State */}
        {fieldsToReview.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground text-sm">
                No fields to review
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
