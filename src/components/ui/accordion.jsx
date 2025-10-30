import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext({});

const Accordion = React.forwardRef(
  ({ children, type = "single", collapsible = false, defaultValue, value, onValueChange, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || (type === "multiple" ? [] : ""));

    const currentValue = value !== undefined ? value : internalValue;

    const handleValueChange = React.useCallback((itemValue) => {
      let newValue;

      if (type === "multiple") {
        newValue = currentValue.includes(itemValue)
          ? currentValue.filter(v => v !== itemValue)
          : [...currentValue, itemValue];
      } else {
        newValue = currentValue === itemValue && collapsible ? "" : itemValue;
      }

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    }, [currentValue, type, collapsible, value, onValueChange]);

    const isItemOpen = React.useCallback((itemValue) => {
      if (type === "multiple") {
        return currentValue.includes(itemValue);
      }
      return currentValue === itemValue;
    }, [currentValue, type]);

    return (
      <AccordionContext.Provider value={{ isItemOpen, handleValueChange }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef(({ children, value, className, ...props }, ref) => {
  return (
    <div ref={ref} className={className} data-value={value} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value });
        }
        return child;
      })}
    </div>
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ children, value, className, ...props }, ref) => {
  const { isItemOpen, handleValueChange } = React.useContext(AccordionContext);
  const isOpen = isItemOpen(value);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center justify-between py-3 px-4 font-medium transition-all hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      onClick={() => handleValueChange(value)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ children, value, className, ...props }, ref) => {
  const { isItemOpen } = React.useContext(AccordionContext);
  const isOpen = isItemOpen(value);

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        !isOpen && "hidden"
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>
        {children}
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
