"use client";
import { User, Webinar, WebinarStatus } from "@prisma/client";

import React, { useEffect } from "react";
import WebinarUpcomingState from "./UpcomingWebinar/WebinarUpcomingState";
import { usePathname, useRouter } from "next/navigation";
import { useAttendeeStore } from "@/store/useAttendeeStore";
import { toast } from "sonner";
import LiveStreamState from "./LiveWebinarState/LiveStreamState";
import { WebinarWithPresenter } from "@/lib/type";

type Props = {
  error: string | undefined;
  user: User | null;
  webinar: WebinarWithPresenter;
  apiKey: string;
  token: string;
  callId: string;
};

const RenderWebinar = ({
  error,
  user,
  webinar,
  apiKey,
  token,
  callId,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { attendee } = useAttendeeStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
      router.push(pathname);
    }
  }, [error]);

  return (
    // TODO: Build Waiting room and live webinar

    <React.Fragment>
      {webinar.webinarStatus === WebinarStatus.SCHEDULED ? (
        <WebinarUpcomingState webinar={webinar} currentUser={user || null} />
      ) : webinar.webinarStatus === WebinarStatus.WAITING_ROOM ? (
        <WebinarUpcomingState webinar={webinar} currentUser={user || null} />
      ) : webinar.webinarStatus === WebinarStatus.LIVE ? (
        // "TODO: ADD live Stream component & webinar stuffs"
        <React.Fragment>
            {user?.id === webinar.presenterId? (
                <LiveStreamState apiKey={apiKey} token={token} callId={callId} webinar ={webinar} user={user} /> 
            ) : attendee? (
                // <Participant apiKey={apiKey} token={token} callId={callId} /> 
                "Live Stream for participant"
            ) : (
                <WebinarUpcomingState webinar={webinar} currentUser={user || null} />
                
            )}
        </React.Fragment>
      ) : webinar.webinarStatus === WebinarStatus.CANCELLED?(
        <div className="flex justify-center items-center h-full w-full">
            <div className="text-center space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{webinar?.title}</h3>
                <p className="text-muted-foreground text-xs">This webinar has been cancelled.</p>
            </div>
        </div>
      ): (
        <WebinarUpcomingState webinar={webinar} currentUser={user || null} /> 
      ) }
    </React.Fragment>
  );
};

export default RenderWebinar;
