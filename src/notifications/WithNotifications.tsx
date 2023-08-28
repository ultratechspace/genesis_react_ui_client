import React from "react";
import { SnackbarProvider } from "notistack";
import { Notification } from "./Notification";

type Props = { children: React.ReactNode };

export function WithNotifications({ children }: Props): React.ReactElement {
  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      {children}
      <Notification />
    </SnackbarProvider>
  );
}
