import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import { selectNotify } from "../app-redux/settings/settingsSlice";
import { useAppSelector } from "../app-redux/hooks";

type Props = {};

export function Notification({}: Props): React.ReactElement {
  const notify = useAppSelector(selectNotify);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (notify)
      enqueueSnackbar(notify.message, {
        ...notify.options,
        preventDuplicate: true,
      });
  }, [notify]);
  return <></>;
}
