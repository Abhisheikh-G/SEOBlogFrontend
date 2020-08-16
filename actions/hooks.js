import { useEffect, useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleClickOpen, handleClose };
};

export const useLinkDisable = (actualPath, path) => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (actualPath === path) setIsDisabled(true);
  }, []);

  return { isDisabled, path };
};
