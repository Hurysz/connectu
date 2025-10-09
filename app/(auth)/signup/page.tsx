"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";

const formSchema = z.object({
  names: z.string().min(1, "Name is required"),
  lastNames: z.string().min(1, "Last name is required"),
  nickname: z.string().min(1, "Nickname is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email().refine(
    (email) => email.endsWith("@ucvvirtual.edu.pe"),
    { message: "Email must be a valid '@ucvvirtual.edu.pe' address." }
  ),
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      names: "",
      lastNames: "",
      nickname: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Account Created",
      description: "You can now log in with your new credentials.",
    });
    router.push("/login");
  }

  return (
     <div className="w-full max-w-md">
       <Card className="w-full bg-card border-border/60 shadow-xl">
        <CardHeader className="text-center items-center">
            <Logo className="text-primary h-12 w-auto mb-2" />
          <CardTitle className="text-2xl font-bold tracking-tight">Crea tu cuenta</CardTitle>
          <CardDescription>Únete a la comunidad de ConnectU</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="names"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombres</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} className="bg-background border-border" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastNames"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} className="bg-background border-border" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe" {...field} className="bg-background border-border" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UCV Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@ucvvirtual.edu.pe" {...field} className="bg-background border-border" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="bg-background border-border" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full !mt-6">
                Crear Cuenta
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center p-6 pt-2 text-sm">
             <p className="text-muted-foreground">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/login" className="font-medium text-primary hover:underline">
                    Inicia Sesión
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
