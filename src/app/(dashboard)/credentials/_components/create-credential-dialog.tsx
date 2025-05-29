"use client";

import { CreateCredential } from "@/actions/credentials/create-credential";
import CustomDialogHeader from "@/components/global/custom-dialog-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
  CreateCredentialSchema,
  CreateCredentialSchemaType,
} from "@/types/credentials/create-credential-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ShieldEllipsis } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = { triggerText?: string };

function CreateCredentialDialog({ triggerText }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateCredentialSchemaType>({
    defaultValues: {
      name: "",
      value: "",
    },
    resolver: zodResolver(CreateCredentialSchema),
  });

  const {
    isPending,
    data: newCredentialData,
    mutate,
  } = useMutation({
    mutationFn: CreateCredential,
    onSuccess: () => {
      toast.success("Credential created successfully!", {
        id: "create-credential",
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to create credential. Please try again.", {
        id: "create-credential",
      });
    },
  });

  const submitHandler = useCallback(
    (data: CreateCredentialSchemaType) => {
      try {
        toast.loading("Creating credential...", {
          id: "create-credential",
        });
        mutate(data);
        form.reset();
        toast.dismiss("create-credential");
        setOpen(false);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [mutate, form, setOpen]
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant={"default"}>
          {triggerText ? triggerText : "Create Credential"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CustomDialogHeader
          icon={ShieldEllipsis}
          title="Create Credential"
          subTitle="Add details below to create your Credential"
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Credential Name
                    <span className="text-sm text-red-600 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Credential name..." />
                  </FormControl>
                  <FormDescription>
                    Enter a unique name for your credential
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Value<span className="text-sm text-red-600 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter the value of your credential..."
                      className="resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Ensure the value is secure and not shared publicly.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Credential"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCredentialDialog;
