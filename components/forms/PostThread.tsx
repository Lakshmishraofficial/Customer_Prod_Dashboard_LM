"use client";
import { useTheme } from "../../app/themes/themeContext";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Suspense } from "react";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { useState } from "react";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode } = useTheme();
  const { organization } = useOrganization();
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setisLoading(true);
    try {
      // Add a validation check before submitting
      await ThreadValidation.parseAsync(values);

      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
      });
      router.push("/");
    } catch (error:any) {
      console.error("Validation error:", error);

      // Handle validation error by setting an error message in the form
      form.setError("thread", {
        type: "manual",
        message: "Validation error: Please check your input.",
      });
    }
    setisLoading(false);
  };

  return (
    <Suspense
      fallback={
        <h1 className="text-light-1 text-heading3-bold">
          Preparing Your Experience...
        </h1>
      }
    >
      <Form {...form}>
        <form
          className="mt-10 flex flex-col justify-start gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Content
                </FormLabel>
                <FormControl
                  className={
                    isDarkMode
                      ? "no-focus border border-dark-4 bg-dark-3 text-light-1 transition duration-400 ease-in"
                      : "no-focus border border-light-4 bg-light-1 text-dark-1 transition duration-400 ease-in"
                  }
                >
                  <Textarea rows={15} {...field} />
                </FormControl>
                {form.formState.errors.thread && (
                  <p className="text-red-500">
                    {form.formState.errors.thread.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-primary-500">
            {isLoading === false ? "Post Announcement" : "Posting..."}
          </Button>
        </form>
      </Form>
    </Suspense>
  );
}

export default PostThread;
