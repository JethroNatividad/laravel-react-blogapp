import { Button } from "@/Components/Button";
import { Checkbox } from "@/Components/Checkbox";
import { Input } from "@/Components/Input";
import InputError from "@/Components/InputError";
import { Label } from "@/Components/Label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email"> Email </Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        autoComplete="username"
                    />

                    <InputError message={errors.email} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password"> Password </Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        autoComplete="current-password"
                    />

                    <InputError message={errors.password} />
                </div>

                <div className="block">
                    <label className="flex items-center space-x-2">
                        <Checkbox
                            name="remember"
                            id="remember"
                            checked={data.remember}
                            onCheckedChange={(checked: boolean) =>
                                setData("remember", checked)
                            }
                        />
                        <Label htmlFor="remember" className="text-gray-600">
                            Remember me
                        </Label>
                        {/* <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span> */}
                    </label>
                </div>

                <div className="flex items-center justify-end space-x-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>
                <Button className="w-full" disabled={processing} type="submit">
                    Login
                </Button>

                <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm text-gray-600">
                        Don't have an account?
                    </span>
                    <Link
                        href={route("register")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Create one
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
