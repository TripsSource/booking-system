import {
  AsyncThunkPayloadCreator,
  AsyncThunkPayloadCreatorReturnValue,
  GetThunkAPI,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppDispatch, RootState } from "@/store";

export type AsyncThunkConfig = {
  rejectValue: RejectedValue;
  getState: () => RootState;
  dispatch: AppDispatch;
};

export type RejectedValue = {
  message?: string;
  errors?: {
    [name: string]: { message: string; type: string }[];
  };
};

export default function errorHandler<Returned, DataParam>(
  actionAsync: (
    data: DataParam,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => Promise<Returned>
): AsyncThunkPayloadCreator<Returned, DataParam, AsyncThunkConfig> {
  const callback: (
    arg: DataParam,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => AsyncThunkPayloadCreatorReturnValue<Returned, AsyncThunkConfig> = async (
    data: DataParam,
    thunkApi: GetThunkAPI<AsyncThunkConfig>
  ) => {
    const { rejectWithValue } = thunkApi;
    return actionAsync(data, thunkApi).catch(
      (error: AxiosError<RejectedValue>) => {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({
            message: error.message,
          });
        }
      }
    );
  };
  return callback;
}
