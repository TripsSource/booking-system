import { Response } from "@/types/api";
import {
  GuideAndDriver,
  GuideAndDriverState,
  OperationScheduleState,
  OperationSearchState,
  ReportState,
} from "@/types/app/operation";
import { ProductDetailState } from "@/types/app/product";
import { api } from "@/utils/api";

export interface SetGuideAndDriverSuccess {
  message: string;
  _id: string;
}

export interface SetGuideAndDriverFailure {
  error: string;
}

export interface OperationScheduleSuccess {
  date: string;
  available: number;
  pending: number;
  cancel: number;
}

export interface OperationScheduleByDaySuccess {
  working: GuideAndDriver;
  except: GuideAndDriver;
  available: GuideAndDriver;
}

export interface OperationScheduleFailure {
  error: string;
}

export interface CreateReportSuccess {
  message: string;
}

export interface CreateReportFailure {
  error: string;
}

export interface OperationSearch extends OperationSearchState {
  page: number;
  limit: number;
}

export const getOperaionBookings = async (data: OperationSearch) => {
  return await api
    .get("/api/operations/overview", {
      params: {
        year: data.year,
        quarter: data.quarter,
        month: data.month,
        week: data.week,
        day: data.day,
        page: data.page,
        guider: data.guider,
        limit: data.limit,
        sortField: data.sortField,
        sortOrder: data.sortOrder,
      },
    })
    .then((res) => res.data);
};

export const setGuideAndDriver = async (
  data: GuideAndDriverState
): Promise<Response<SetGuideAndDriverSuccess | SetGuideAndDriverFailure>> => {
  return api
    .put(`/api/operations/overview/${data._id}`, {
      guide: data.guide,
      driver: data.driver,
    })
    .then((res) => res.data);
};

export const getOperationSchedule = async (data: OperationScheduleState) => {
  return api
    .get(`/api/operations/schedule`, {
      params: {
        year: data.year,
        month: data.month,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const getOperationScheduleByDay = async (
  data: OperationScheduleState
): Promise<
  Response<OperationScheduleByDaySuccess[] | OperationScheduleFailure>
> => {
  return api
    .get(`/api/operations/schedule`, {
      params: {
        year: data.year,
        month: data.month,
        day: data.day,
        assign: data.assign,
      },
    })
    .then((res) => res.data);
};

export const createReport = async (
  data: ReportState
): Promise<Response<CreateReportSuccess | CreateReportFailure>> => {
  const formData = new FormData();
  formData.append("feedback", data.feedback);
  formData.append("startTime", data.startTime);
  formData.append("endTime", data.endTime);
  formData.append("breakTime", `${data.breakTime}`);
  formData.append("earnAmount", `${data.earnAmount}`);
  data.files.map((file: File) => {
    formData.append("files", file);
  });

  return api
    .post(`/api/operations/reporting`, formData)
    .then((res) => res.data);
};
