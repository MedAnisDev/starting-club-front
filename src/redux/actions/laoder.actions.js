import { LoaderTypes } from "../types";

export const toggleLoader = (status) => {
  return {
    type: LoaderTypes.TOGGLE_LOADER,
    playload: status,
  };
};
