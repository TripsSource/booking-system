import { reportState } from "@/types/app/report";
import { api } from "@/utils/api";

export const createReport = async (data: reportState) => {
  const formData = new FormData();

  formData.append(
    "productId",
    typeof data.productId === "string"
      ? data.productId
      : JSON.stringify(data.productId)
  );
  formData.append("bookingId", JSON.stringify(data.bookingId));
  formData.append("earn", `${data.earn}`);
  formData.append("break", `${data.break}`);
  formData.append("startTime", data.startTime);
  formData.append("endTime", data.endTime);
  data.files.map((file: File) => {
    formData.append("files", file);
  });
  formData.append("feedback", data.feedback);
  return await api.post("/api/reports", formData).then((res) => res.data);
};

export const readAllReports = async () => {
  return await api.get("/api/reports").then((res) => res.data);
};

export const readReport = async (id: string) => {
  return await api.get(`/api/reports/${id}`).then((res) => res.data);
};
