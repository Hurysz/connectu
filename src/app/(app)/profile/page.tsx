"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().max(200, "Description must be 200 characters or less"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  validationCode: z.string().length(7, "Code must be 7 digits").optional(),
});

function ProfileForm() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "Alex Doe",
            description: "Student at UCV, passionate about technology and community building. Looking forward to connecting with fellow students!",
        },
    });

    function onSubmit(values: z.infer<typeof profileSchema>) {
        console.log(values);
        toast({
            title: "Profile Updated",
            description: "Your profile information has been saved.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Public Profile</CardTitle>
                <CardDescription>This is how others will see you on the site.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://picsum.photos/seed/101/200/200" data-ai-hint="portrait" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <Button type="button" variant="outline">Change Picture</Button>
                        </div>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Update Profile</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

function PasswordForm() {
    const { toast } = useToast();
    const [codeSent, setCodeSent] = useState(false);
    const [codeValidated, setCodeValidated] = useState(false);

    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            validationCode: "",
        },
    });
    
    function handleSendCode() {
        // Mock sending code
        setCodeSent(true);
        toast({
            title: "Validation Code Sent",
            description: "A 7-digit code has been sent to your university email.",
        });
    }
    
    function handleValidateCode() {
        const code = form.getValues("validationCode");
        if(code === "1234567") { // Mock validation
            setCodeValidated(true);
            toast({
                title: "Code Validated",
                description: "You can now set your new password.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Invalid Code",
                description: "The code you entered is incorrect. Please try again.",
            });
        }
    }

    function onSubmit(values: z.infer<typeof passwordSchema>) {
        console.log(values);
        toast({
            title: "Password Changed",
            description: "Your password has been successfully updated.",
        });
        form.reset();
        setCodeSent(false);
        setCodeValidated(false);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                         <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {codeSent && !codeValidated && (
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="validationCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>7-Digit Validation Code</FormLabel>
                                            <FormControl>
                                                <div className="flex gap-2">
                                                     <Input placeholder="1234567" {...field} />
                                                     <Button type="button" onClick={handleValidateCode}>Validate</Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {!codeSent && <Button type="button" variant="secondary" onClick={handleSendCode}>Send Validation Code</Button>}
                        
                        <Button type="submit" disabled={!codeValidated}>Update Password</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <h1 className="font-headline text-3xl font-bold">Account Settings</h1>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="mt-6">
                    <ProfileForm />
                </TabsContent>
                <TabsContent value="security" className="mt-6">
                    <PasswordForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
