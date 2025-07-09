export interface OperationBookingState {
  closeDate: string;
  exceptGuide: [];
  bookings: {
    _id: string;
    client: string;
    source: string;
    tour: string;
    timeBooked: string;
    PAX: string;
    tourStart: string;
    meetingLocation: string;
    guide: string;
    driver: string;
    status: string;
    privateTour: boolean;
  }[];
}

export interface OperationSearchState {
  type: string;
  year: string;
  quarter: string;
  month: string;
  week: string;
  day: string;
  guider: string;
  sortField: string;
  sortOrder: string;
}

export type OperationScheduleState = {
  year: number;
  month: number;
  day?: number;
  assign?: number;
};

export type ReportState = {
  feedback: string;
  startTime: string;
  endTime: string;
  breakTime: number;
  earnAmount: number;
  files: File[];
};

export type GuideAndDriverState = {
  _id: string;
  guide?: string | null;
  driver?: string | null;
};

type Person = {
  _id: string;
  name: string;
};

export type GuideAndDriver = {
  guide: Person[];
  driver: Person[];
};

export type Event = {
  total?: boolean;
  assign?: boolean;
  text: string;
  start: string;
  end: string;
};

export interface Details {
  assign: any[];
  unassign: {
    unAssignBookings?: { tourName: string; leadTraveller: string }[];
    available?: {
      guide?: { name: string; _id: string }[];
      driver?: { name: string; _id: string }[];
    };
  };
}
