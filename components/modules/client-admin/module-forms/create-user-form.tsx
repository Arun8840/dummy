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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Spinner } from "@/components/ui/spinner";
import { RoleData } from "@/types/client-management/client-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { createOuUserSchema } from "../../client-management/clients/ou-templates/schemas";

type CreateFormType = z.infer<typeof createOuUserSchema>;
type CreateUserFormProps = {
  publihsedRoles: {
    loading: boolean;
    data: RoleData[];
  };
  clientId: string;
  ouId: string;
};
export const CreateUserForm = ({
  publihsedRoles,
  clientId,
  ouId,
}: CreateUserFormProps) => {
  const create = trpc.organizationalUnits.createOuUsers.useMutation();
  const utils = trpc.useUtils();
  const form = useForm<CreateFormType>({
    defaultValues: {
      clientId: clientId,
      ouId: ouId,
      firstName: "",
      lastName: "",
      password: "",
      roleIds: [],
      username: "",
      userGroupId: "",
    },
    resolver: zodResolver(createOuUserSchema),
  });

  const onCreate: SubmitHandler<CreateFormType> = async (data) => {
    const requestData = {
      ...data,
      filterIds: [],
      defaultLanguage: "en-us",
      currentLanguage: "en-us",
      provider: "local",
      userType: "ClientUser",
    };
    create.mutate(requestData, {
      onSuccess: async (data) => {
        toast.success(data?.message, {
          position: "top-center",
        });
        await utils.clientAdmin.users.getAllUsers.invalidate();
      },
      onError(error) {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });
  };

  if (publihsedRoles?.loading) {
    return (
      <div className="grid h-full place-items-center">
        <Spinner />
      </div>
    );
  }
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
                  <Input {...field} placeholder="example@gmail.com" />
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
          {/* Roles (Multi-select, but for now use Textarea/comma separated) */}
          <FormField
            control={form.control}
            name="roleIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add User Roles</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="justify-between">
                        Select
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[220px]">
                      <DropdownMenuLabel>Published Roles</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {publihsedRoles?.data?.length === 0 && (
                        <DropdownMenuItem disabled>
                          No roles available.
                        </DropdownMenuItem>
                      )}
                      {publihsedRoles?.data?.map((role) => {
                        const checked = field.value?.includes(role.id);
                        return (
                          <DropdownMenuItem
                            key={role.id}
                            className="flex items-center gap-2"
                            onSelect={(e) => {
                              e.preventDefault();
                              if (checked) {
                                field.onChange(
                                  field.value.filter(
                                    (id: string) => id !== role.id
                                  )
                                );
                              } else {
                                field.onChange([
                                  ...(field.value || []),
                                  role.id,
                                ]);
                              }
                            }}
                          >
                            {checked && <Check color="green" />}
                            {role.name}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* User Group */}
          {/* <FormField
            control={form.control}
            name="userGroupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Group</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? <Spinner /> : "Create Client"}
        </Button>
      </form>
    </Form>
  );
};
