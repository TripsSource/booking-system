import { marginsState, otaState } from "../app/financial";

export interface TRTagType {
  type: string;
  module: marginsState;
  string1: string;
  string2: string;
  value1: number;
  state: Dispatch<SetStateAction<marginsState>>;
}

export interface MarginSettingsType {
  saveMargins: (data: marginsState) => void;
  createOTA: (data: otaState) => void;
  saveOTA: (data: otaState) => void;
  deleteOTA: (id: string) => void;
}
