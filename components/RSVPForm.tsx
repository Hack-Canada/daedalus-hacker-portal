"use client";

import {
  DIETARY_RESTRICTIONS,
  TSHIRT_SIZES,
} from "@/lib/validations/rsvp-form";
import { useRsvpForm } from "@/hooks/useRsvpForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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

import { Input } from "./ui/input";

const RSVPForm = () => {
  const { form, isPending, onSubmit } = useRsvpForm();

  const dietaryRestrictions = form.watch("dietaryRestrictions.value");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-lg border-border sm:border sm:p-6 sm:shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <FormField
            control={form.control}
            name="emergencyContactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Emergency Contact Name <span className="text-error">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="relationshipToParticipant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Relationship to Participant{" "}
                  <span className="text-error">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Parent, Sibling, Friend"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="emergencyContactPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Emergency Contact Phone Number{" "}
                  <span className="text-error">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="1234567890 (min. 10 digits)"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alternativePhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alternative Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="1234567890 (min. 10 digits)"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="dietaryRestrictions.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietary Restrictions</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your dietary restrictions" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DIETARY_RESTRICTIONS.map((restriction) => (
                      <SelectItem key={restriction} value={restriction}>
                        {restriction}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  This helps us ensure we can accommodate your dietary needs
                  during the event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {dietaryRestrictions.includes("please specify") && (
            <FormField
              control={form.control}
              name="dietaryRestrictions.customValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Please specify your{" "}
                    {dietaryRestrictions === "Other (please specify)"
                      ? "dietary restrictions"
                      : "allergies"}{" "}
                    <span className="text-error">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder={
                        dietaryRestrictions === "Other (please specify)"
                          ? "Enter your dietary restrictions"
                          : "Enter your food allergies"
                      }
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="tshirtSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                T-Shirt Size <span className="text-error">*</span>
              </FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your t-shirt size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TSHIRT_SIZES.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Please select your t-shirt size for the event swag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <div className="space-y-1.5 pt-0.5 leading-none">
                <FormLabel>
                  I agree to the terms and conditions{" "}
                  <span className="text-error">*</span>
                </FormLabel>
                <FormDescription>
                  I understand and agree that the emergency contact information
                  provided will only be used in case of emergencies during the
                  event. I also confirm that I have informed the listed contact
                  that their information has been provided.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mediaConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <div className="pt-0.5 leading-none">
                <FormLabel>
                  I agree to be subjected to photos and filming during the
                  duration of the event. <span className="text-error">*</span>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          variant="primary"
          className="w-full"
        >
          {isPending ? "Submitting..." : "Confirm Attendance"}
        </Button>
      </form>
    </Form>
  );
};

export default RSVPForm;
