"use client";

import z from "zod";
import { createClientSchema, createOrganizationalUnitSchema } from "./schema";
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
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

type CreateFormType = z.infer<typeof createOrganizationalUnitSchema>;

type CreateClientOrganizationalUnitFormPropType = {
  clientId: string;
};
export const CreateClientOrganizationalUnitForm = ({
  clientId,
}: CreateClientOrganizationalUnitFormPropType) => {
  const createOu = trpc.organizationalUnits.createOu.useMutation();
  const utils = trpc.useUtils();
  const { isLoading: isPlanLoading, data: plans } =
    trpc.clients.getPublishedPlan.useQuery();

  const form = useForm<CreateFormType>({
    defaultValues: {
      name: "",
      planId: "",
      clientId: clientId,
      active: false,
      ouId: "0",
      thirdpartyId: "0",
    },
    resolver: zodResolver(createOrganizationalUnitSchema),
  });

  if (isPlanLoading) {
    return (
      <div className="grid h-full place-items-center">
        <Spinner />
      </div>
    );
  }

  const planitems = plans?.data || [];

  const onCreate: SubmitHandler<CreateFormType> = (data) => {
    createOu.mutate(
      { ...data },
      {
        onSuccess(data) {
          toast.success(data?.message, {
            position: "top-center",
          });
          utils.organizationalUnits.getOus.invalidate();
        },
        onError(error) {
          toast(error?.message, {
            position: "top-center",
          });
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form
        className="h-full flex flex-col gap-4 justify-between"
        onSubmit={form.handleSubmit(onCreate)}
      >
        <div className="flex flex-col gap-4 flex-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter organizational unit name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ouId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ou-ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thirdpartyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thirdparty-ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ✅ FIXED Select integrated with React Hook Form */}
          <FormField
            control={form.control}
            name="planId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {planitems.length > 0 &&
                      planitems.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Active</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={createOu.isPending}>
          {createOu.isPending ? <Spinner /> : "Create Organizationl Unit"}
        </Button>
      </form>
    </Form>
  );
};
