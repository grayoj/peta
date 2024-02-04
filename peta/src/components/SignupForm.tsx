import * as react from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import { AuthRequest } from "../services/AuthRequests";
import { Loader } from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const schema = z.object({
  firstname: z.string().trim().min(1, { message: "First name is required" }),
  lastname: z.string().trim().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type FormValues = z.infer<typeof schema>;

type ResolverResult<T> = {
  values: T;
  errors: Record<string, string>;
};

export default function SignupForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: async (data) => {
      try {
        const validatedData = await schema.parseAsync(data);
        return {
          values: validatedData,
          errors: {},
        } as ResolverResult<FormValues>;
      } catch (error) {
        const formErrors = (error as ZodError<FormValues>).formErrors;
        return {
          values: {} as FormValues,
          errors: formErrors.fieldErrors,
        } as ResolverResult<FormValues>;
      }
    },
  });

  const isLoading = react.useRef<boolean>(false);
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (isLoading.current) return;
    try {
      isLoading.current = true;
      console.log("Form submitted with data:", data);
      await AuthRequest<FormValues>({
        method: "post",
        endpoint: "/signup",
        data,
      });
      navigate("/login");
      toast.success("Signup successful");
      console.log("Signup successful");
    } catch (error: unknown) {
      toast.error("Signup failed");
      console.error("Signup failed:", (error as Error).message);
    } finally {
      isLoading.current = false;
    }
  };
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-neutral-800">
            Create a Peta Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Login to your account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-sm sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="firstname"
                    type="text"
                    autoComplete="given-name"
                    {...register("firstname")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm sm:text-sm focus:border-neutral-300 focus:outline-none focus:ring-0"
                  />
                </div>
                {Array.isArray(errors.firstname) &&
                  errors.firstname.map((error: string, index: number) => (
                    <div key={index} className="text-red-500 my-2 text-sm">
                      {error}
                    </div>
                  ))}
              </div>

              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="lastname"
                    type="text"
                    autoComplete="family-name"
                    {...register("lastname")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm sm:text-sm focus:border-neutral-300 focus:outline-none focus:ring-0"
                  />
                </div>
                {Array.isArray(errors.lastname) &&
                  errors.lastname.map((error: string, index: number) => (
                    <div key={index} className="text-red-500 my-2 text-sm">
                      {error}
                    </div>
                  ))}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm sm:text-sm focus:border-neutral-300 focus:outline-none focus:ring-0"
                  />
                </div>
                {Array.isArray(errors.email) &&
                  errors.email.map((error: string, index: number) => (
                    <div key={index} className="text-red-500 my-2 text-sm">
                      {error}
                    </div>
                  ))}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    {...register("password")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm sm:text-sm focus:border-neutral-300 focus:outline-none focus:ring-0"
                  />
                </div>

                {Array.isArray(errors.password) &&
                  errors.password.map((error: string, index: number) => (
                    <div key={index} className="text-red-500 my-2 text-sm">
                      {error}
                    </div>
                  ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 rounded-sm focus:border-neutral-300 focus:outline-none focus:ring-0"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-orange-600"
                  disabled={isLoading.current}
                >
                  {isLoading.current ? <Loader visible={true} /> : "Sign Up"}
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
