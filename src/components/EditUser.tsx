"use client";

// Form and validation imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// UI component imports
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form validation schema
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(50),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().min(10).max(15),
  location: z.string().min(2),
  role: z.enum(["admin", "user"]),
});

// Type for our form values
type FormValues = z.infer<typeof formSchema>;

// Field configuration for reusability
type FieldConfig = {
  name: keyof FormValues;
  label: string;
  description: string;
  type: "text" | "select";
  options?: { value: string; label: string }[];
};

const EditUser = () => {
    
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "rajasva",
      email: "rajasva@gmail.com",
      phone: "+1 234 5678",
      location: "New York, NY",
      role: "admin",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    // Add your API call or state update logic here
  };

  // Form fields configuration
  const formFields: FieldConfig[] = [
    {
      name: "username",
      label: "Username",
      description: "This is your public display username.",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      description: "Only admin can display email.",
      type: "text",
    },
    {
      name: "phone",
      label: "Phone",
      description: "This is your public display phone.",
      type: "text",
    },
    {
      name: "location",
      label: "Location",
      description: "This is your public display location.",
      type: "text",
    },
    {
      name: "role",
      label: "Role",
      description: "Only verified users can display role.",
      type: "select",
      options: [
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
      ],
    },
  ];

  // Reusable form field component
  const FormFieldItem = ({ fieldConfig }: { fieldConfig: FieldConfig }) => {
    return (
      <FormField
        control={form.control}
        name={fieldConfig.name}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel>{fieldConfig.label}</FormLabel>
            <FormControl>
              {fieldConfig.type === "text" ? (
                <Input {...formField} />
              ) : (
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={fieldConfig.label} />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldConfig.options?.map((option: { value: string; label: string }) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormControl>
            <FormDescription>{fieldConfig.description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Edit User</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {formFields.map((fieldConfig) => (
                <FormFieldItem key={fieldConfig.name} fieldConfig={fieldConfig} />
              ))}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default EditUser;
