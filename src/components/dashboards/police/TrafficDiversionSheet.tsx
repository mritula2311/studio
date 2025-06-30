"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { List } from "lucide-react";

interface TrafficDiversionSheetProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TrafficDiversionSheet({ children, open, onOpenChange }: TrafficDiversionSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Traffic Diversion Plan</SheetTitle>
          <SheetDescription>
            Optimal alternate routes to mitigate traffic congestion.
          </SheetDescription>
        </SheetHeader>
        <div className="py-8 space-y-6">
            <div className="relative h-64 w-full rounded-lg overflow-hidden border">
                <Image
                    src="https://placehold.co/600x400.png"
                    alt="Map with diversion routes"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="map route"
                />
            </div>
            <div>
                <h3 className="font-semibold mb-2 flex items-center"><List className="w-4 h-4 mr-2" /> Suggested Routes</h3>
                <ul className="list-disc list-inside space-y-2 text-sm bg-muted/50 p-4 rounded-md">
                    <li>
                        <strong>Route 1:</strong> Via N De Anza Blvd, take exit onto Stevens Creek Blvd. Expected delay: 5-10 mins.
                    </li>
                    <li>
                        <strong>Route 2:</strong> Use I-85 S to CA-87 N. Reroute through downtown. Expected delay: 15-20 mins.
                    </li>
                     <li>
                        <strong>Route 3:</strong> Local roads via Homestead Rd to Lawrence Expy. Not recommended for heavy vehicles.
                    </li>
                </ul>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
