"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Siren, Ambulance } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("police");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "police") {
      router.push("/police-dashboard");
    } else {
      router.push("/medical-dashboard");
    }
  };

  return (
    <Tabs defaultValue="police" className="w-full max-w-md" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="police">
          <Siren className="w-4 h-4 mr-2" />
          Police
        </TabsTrigger>
        <TabsTrigger value="medical">
          <Ambulance className="w-4 h-4 mr-2" />
          Medical
        </TabsTrigger>
      </TabsList>
      <form onSubmit={handleLogin}>
        <TabsContent value="police">
          <Card>
            <CardHeader>
              <CardTitle>Police Login</CardTitle>
              <CardDescription>
                Enter your service credentials to access the incident dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="police-id">Service ID</Label>
                <Input id="police-id" defaultValue="P-12345" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="police-password">Password</Label>
                <Input id="police-password" type="password" required defaultValue="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Medical Services Login</CardTitle>
              <CardDescription>
                Enter your service credentials to access the patient dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medical-id">Service ID</Label>
                <Input id="medical-id" defaultValue="M-67890" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medical-password">Password</Label>
                <Input id="medical-password" type="password" required defaultValue="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </form>
    </Tabs>
  );
}
