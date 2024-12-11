"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useState } from "react";
import { createUser, State } from "@/app/lib/actions";
import { SingleImageDropzone } from "./single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";

const roles = z.enum(["ADMIN", "USER", "MANAGER", "WORKER"], {
  required_error: "You must select a role.",
});

const initialState: State = { message: null, errors: {} };

const formSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name must be at least 2 characters.",
    }),
    surname: z.string().min(3, {
      message: "Surname must be at least 3 characters.",
    }),
    address: z.string().min(5, {
      message: "Address must be at least 5 characters.",
    }),
    email: z.string().email({
      message: "Please insert a valid email.",
    }),
    phoneNumber: z.string().min(9, {
      message: "Phone number must be at least 9 characters.",
    }),
    role: roles,
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function CreateUserForm() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );
  const [profilePictureThumbnailUrl, setProfilePictureThumbnailUrl] = useState<
    string | null
  >(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      address: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form values:", values);

      // Create a FormData instance
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("address", values.address);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("role", values.role);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);

      // Handle file upload if a file is selected
      if (file) {
        const res = await edgestore.publicImages.upload({
          file,
          onProgressChange: (progress) => setProgress(progress),
        });

        // Set uploaded image URLs if successful
        setProfilePictureUrl(res.url);
        setProfilePictureThumbnailUrl(res.thumbnailUrl);

        
           // Append the uploaded image URLs directly to FormData if successful
      if (res.url) {
        formData.append("profilePictureUrl", res.url);
      }
      if (res.thumbnailUrl) {
        formData.append("profilePictureThumbnailUrl", res.thumbnailUrl);
      }
        }
        // Call the user creation action
        await createUser(initialState, formData);
        console.log("User created successfully!");
        // Handle success (e.g., show a success message or reset form)
      }
       catch (error) {
      console.error("Error creating user:", error);
    }
  };
 

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
          <div className="h-[6px] w-44 border rounded overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Insert your name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Insert your surname" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Insert your address" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Insert your email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Insert your phone number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USER">USER</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="MANAGER">MANAGER</SelectItem>
                  <SelectItem value="WORKER">WORKER</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Insert your password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="Repeat your password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
