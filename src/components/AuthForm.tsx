"use client"

import { AuthFormProps } from "@/types";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Beams from '@/components/Beams';
import Link from "next/link";
import Image from "next/image";


const AuthForm = ({ mode }: AuthFormProps) => {
    const isLogin = mode === "signin"

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0 rounded-3xl ring-5 ring-gray-200">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8 space-y-2">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                {isLogin ? (
                                    <>
                                        <h1 className="text-2xl font-sans font-medium text-blue-600" role="heading" >
                                            Sign in to Targetly.
                                        </h1>
                                        <p className="text-muted-foreground text-sm ">
                                            Set your goals. Fund your dreams.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="text-2xl font-medium text-blue-600" role="heading">
                                            Create an account
                                        </h1>
                                        <p className="text-muted-foreground">
                                           Start your journey with us.
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="grid gap-4" >
                                {!isLogin && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" >Full name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="youremail@gmail.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {isLogin && (
                                        <Link href={"#"} className="ml-auto text-sm underline-offset-2 hover:underline">
                                            Forgot your password?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="•••••••••••••"
                                    required />
                            </div>
                            <Button type="submit" className="w-full">
                                {isLogin ? "Sign in" : "Sign up"}
                            </Button>

                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>

                            <Button variant="outline" type="button" className="flex w-full items-center gap-2">
                                <Image
                                    src={"/images/google.svg"}
                                    width={20}
                                    height={20}
                                    alt="Google Logo"
                                />
                                Login with Google
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
                    <div className="bg-muted relative hidden md:block overflow-hidden">
                        <Beams
                            beamWidth={2}
                            beamHeight={15}
                            beamNumber={12}
                            lightColor="#ffffff"
                            speed={6}
                            noiseIntensity={1.75}
                            scale={0.2}
                            rotation={30}
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground text-center text-xs text-balance">
                By clicking continue, you agree to our{' '}
                <Link
                    className="underline underline-offset-4"
                    href={"#"}
                    aria-label="View our Terms of Service"
                >
                    Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                    className="underline underline-offset-4"
                    href={"#"}
                    aria-label="View our Privacy Policy"
                >
                    Privacy Policy
                </Link>.
            </div>
        </div>
    )
}

export default AuthForm