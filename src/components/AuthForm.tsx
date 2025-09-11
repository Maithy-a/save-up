"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    signInSchema,
    signUpSchema,
    SignInValues,
    SignUpValues
} from "@/lib/validator/auth";
import { AuthFormProps } from "@/types";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Beams from '@/components/Beams';
import Link from "next/link";
import Image from "next/image";
import { Loader } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";


const AuthForm = ({ mode }: AuthFormProps) => {
    
    const router = useRouter();
    const isLogin = mode === "signin"

    const schema = isLogin ? signInSchema : signUpSchema

    const form = useForm<SignInValues | SignUpValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const [isLoading, setLoading] = useState(false);

    const onSubmit = async (values: SignInValues | SignUpValues) => {
        try {
            setLoading(true);
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email: (values as SignInValues).email,
                    password: (values as SignInValues).password,
                });
                if (error) {
                    form.setError("root", { message: error.message });
                    return;
                }
                // redirect
                router.push("/");
            } else {
                const { error } = await supabase.auth.signUp({
                    email: (values as SignUpValues).email,
                    password: (values as SignUpValues).password,
                    options: {
                        data: {
                            name: (values as SignUpValues).name
                        }
                    }
                });

                if (error) {
                    form.setError("root", { message: error.message });
                    return;
                }
                // redirect to signin
                router.push("/signin");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                form.setError("root", { message: err.message });
            } else {
                form.setError("root", { message: "Something went wrong" });
            }
        } finally {
            setLoading(false);
        }
    };

    // OAuth google
    const handleGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL,
                },
            });
            if (error) {
                form.setError("root", { message: error.message });
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                form.setError("root", { message: err.message });
            } else {
                form.setError("root", { message: "OAuth error" });
            }
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0 rounded-3xl ring-5 ring-gray-200">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-2 font-sans">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <header className="text-2xl font-semibold">
                                        {isLogin ? "Sign in to Targetly." : "Create an account"}
                                    </header>
                                    <p className="text-sm mt-2 text-muted-foreground">
                                        {isLogin ? "Set your goals. Fund your dreams." : "Start your journey with us."}
                                    </p>
                                </div>

                                {form.formState.errors.root && (
                                    <p className="text-destructive font-medium text-sm text-center">
                                        {form.formState.errors.root.message}
                                    </p>
                                )}

                                {!isLogin && (
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your full name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="youremail@gmail.com" {...field} />
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
                                            <div className="flex items-center justify-between">
                                                <FormLabel>Password</FormLabel>
                                                {isLogin && (
                                                    <Link href="#" className="text-sm text-blue-800 underline-offset-4 hover:underline">
                                                        Forgot your password?
                                                    </Link>
                                                )}
                                            </div>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="•••••••••••"
                                                    autoComplete={isLogin ? "current-password" : "new-password"}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2"
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <Loader className="h-4 w-4 animate-spin" />
                                    )}
                                    {isLogin ? "Sign in" : "Sign up"}
                                </Button>

                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        Or continue with
                                    </span>
                                </div>

                                <Button 
                                variant="outline" 
                                type="button" 
                                onClick={handleGoogle} 
                                className="flex w-full items-center gap-2">
                                    <Image
                                        src={"/images/google.svg"}
                                        width={16}
                                        height={16}
                                        alt="Google Logo"
                                    />
                                    {isLogin ? "Sign in with google" : "Sign up with google"}
                                </Button>

                                <div className="text-center text-sm">
                                    {isLogin
                                        ? (
                                            <>
                                                Don&apos;t have an account? {" "}
                                                <Link href={"/signup"} className="text-blue-600 underline underline-offset-4">
                                                    Create an account
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                Already have an account? {" "}
                                                <Link href={"/signin"} className="text-blue-600 underline underline-offset-4" >
                                                    Log in
                                                </Link>
                                            </>
                                        )

                                    }

                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-muted relative hidden md:block overflow-hidden">
                        <Beams
                            beamWidth={2}
                            beamHeight={15}
                            beamNumber={12}
                            lightColor="#ffffff"
                            speed={3}
                            noiseIntensity={1.75}
                            scale={0.2}
                            rotation={30}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};

export default AuthForm