import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query"; // I'll create this if it doesn't exist
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/app/components/ui/dialog";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from "@/app/components/ui/drawer";
import { cn } from "@/lib/utils";

interface ResponsiveDialogProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function ResponsiveDialog({
  children,
  trigger,
  title,
  open,
  onOpenChange,
  className
}: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const renderTrigger = (TriggerComponent: React.ElementType) => {
    if (!trigger) return null;

    if (React.isValidElement(trigger)) {
      const { className, children, ...props } = trigger.props as any;
      return (
        <TriggerComponent className={className} {...props}>
          {children}
        </TriggerComponent>
      );
    }

    return <TriggerComponent>{trigger}</TriggerComponent>;
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {renderTrigger(DialogTrigger)}
        <DialogContent className={cn("sm:max-w-[600px] rounded-[2rem] p-0 border-none bg-white", className)}>
          {title && (
            <DialogHeader className="px-8 pt-8">
              <DialogTitle className="text-2xl font-black text-brand-navy">{title}</DialogTitle>
            </DialogHeader>
          )}
          <div className="px-8 pb-8 pt-4">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {renderTrigger(DrawerTrigger)}
      <DrawerContent className={cn("rounded-t-[3rem] p-0 border-none bg-white", className)}>
        {title && (
          <DrawerHeader className="px-8 pt-8">
            <DrawerTitle className="text-2xl font-black text-brand-navy">{title}</DrawerTitle>
          </DrawerHeader>
        )}
        <div className="px-8 pb-12 pt-4">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
