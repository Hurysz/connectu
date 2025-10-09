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
  email: z.string().email({
    message: "Por favor, ingresa una dirección de correo válida.",
  }).refine(
    (email) => email.endsWith("@ucvvirtual.edu.pe"),
    { message: "El correo debe ser una dirección de '@ucvvirtual.edu.pe' válida." }
  ),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Correo de recuperación enviado",
      description: `Se ha enviado un enlace para restablecer tu contraseña a ${values.email}.`,
    });
    router.push("/login");
  }

  return (
    <div className="w-full max-w-md">
      <Card className="w-full bg-card border-border/60 shadow-xl">
        <CardHeader className="text-center items-center">
            <Logo className="text-primary h-12 w-auto mb-2" />
          <CardTitle className="text-2xl font-bold tracking-tight">¿Olvidaste tu contraseña?</CardTitle>
          <CardDescription>Ingresa tu correo para recibir un enlace de recuperación.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de UCV</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="user@ucvvirtual.edu.pe"
                        {...field}
                        className="bg-background border-border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full !mt-6" variant="default">
                Enviar enlace de recuperación
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center p-6 pt-2 text-sm">
            <p className="text-muted-foreground">
                <Link href="/login" className="font-medium text-primary hover:underline">
                    Volver a Iniciar Sesión
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
