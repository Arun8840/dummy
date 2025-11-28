"use client";

import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Spinner } from "@/components/ui/spinner";
import { createOuUserSchema } from "../../schemas";
import { useGetRoles } from "@/hooks/use-get-roles";
import { RoleData } from "@/types/client-management/client-types";

type CreateFormType = z.infer<typeof createOuUserSchema>;
type CreateUserFormProps = {
  publihsedRoles: {
    loading: boolean;
    data: RoleData[];
  };
};
export const CreateUserForm = ({ publihsedRoles }: CreateUserFormProps) => {
  const create = trpc.clients.create.useMutation();
  const form = useForm<CreateFormType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      roleIds: [],
      userGroupId: "",
      username: "",
    },
    resolver: zodResolver(createOuUserSchema),
  });

  const onCreate: SubmitHandler<CreateFormType> = async (data) => {
    console.log("data", data);
  };

  if (publihsedRoles?.loading) {
    return (
      <div className="grid h-full place-items-center">
        <Spinner />
      </div>
    );
  }
  console.log("data", publihsedRoles?.data);
  return (
    <Form {...form}>
      <form
        className="h-full flex flex-col gap-4 justify-between"
        onSubmit={form.handleSubmit(onCreate)}
      >
        <div className="flex flex-col gap-4 flex-1">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* User Group */}
          <FormField
            control={form.control}
            name="userGroupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Group</FormLabel>
                <FormControl>
                  <Input {...field} />
                  {/* Optionally replace Input with a Select if you have groups */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Roles (Multi-select, but for now use Textarea/comma separated) */}
          <FormField
            control={form.control}
            name="roleIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Roles (Comma separated IDs)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((item) => item.trim())
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? <Spinner /> : "Create Client"}
        </Button>
      </form>
    </Form>
  );
};
