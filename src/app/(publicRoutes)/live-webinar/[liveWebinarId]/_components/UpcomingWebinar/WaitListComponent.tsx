"use client";
import { registerAttendee } from "@/actions/attendace";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAttendeeStore } from "@/store/useAttendeeStore";
import { WebinarStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  webinarId: string;
  webinarStatus: WebinarStatus;
  onRegistered?: () => void;
};

const WaitListComponent = ({
  webinarId,
  webinarStatus,
  onRegistered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { setAttendee } = useAttendeeStore();

  const buttonText = () => {
    switch (webinarStatus) {
      case WebinarStatus.SCHEDULED:
        return "Get Reminder";
      case WebinarStatus.WAITING_ROOM:
        return "Get Reminder";
      case WebinarStatus.LIVE:
        return "Join Webinar";
      default:
        return "Register";
    }
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await registerAttendee({
        email,
        name,
        webinarId,
        phone,
      });

      if (!res.success) {
        throw new Error(res.message || "Something went wrong");
      }

      if (res.data?.user) {
        setAttendee({
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          callStatus: "PENDING",
        });
      }

      toast.success(
        webinarStatus === WebinarStatus.LIVE
          ? "Successfully joined the webinar"
          : "Successfully registered for Webinar",
      );
      setEmail("");
      setName("");
      setSubmitted(true);

      setTimeout(() => {
        setIsOpen(false);

        if (webinarStatus === WebinarStatus.LIVE) {
          router.refresh();
        }
        if (onRegistered) onRegistered();
      }, 1500);
    } catch (error) {
      console.log("Error submitting waitlist form", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          className={`${
            webinarStatus === WebinarStatus.LIVE
              ? "bg-red-600 hover:bg-red-700"
              : "bg-primary hover:bg-primary/90"
          } rounded-md px-4 py-2 text-primary-foreground text-sm font-semibold `}
        >
          {webinarStatus === WebinarStatus.LIVE && (
            <span className="mr-2 h-2 w-2 bg-white rounded-full animate-pulse"></span>
          )}
          {buttonText()}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="border-0 bg-transparent"
        isHideCloseButton={true}
      >
        <DialogHeader className="justify-center items-center border border-input rounded-xl p-4 bg-background">
          <DialogTitle className="text-center text-lg font-semibold mb-4">
            {webinarStatus === WebinarStatus.LIVE
              ? "Join the Webinar"
              : "Join the Waitlist"}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {!submitted && (
              <React.Fragment>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </React.Fragment>
            )} 
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || submitted}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" />{" "}
                  {webinarStatus === WebinarStatus.LIVE
                    ? "Joining..."
                    : "Registering..."}
                </>
              ) : submitted ? (
                webinarStatus === WebinarStatus.LIVE ? (
                  "You're all set to join!"
                ) : (
                  "You've successfully joined the waitlist!"
                )
              ) : webinarStatus === WebinarStatus.LIVE ? (
                "Join Now"
              ) : (
                "Join Waitlist"
              )}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WaitListComponent;
