
export type UserType = "Student" | "Customer" | "Other";

export type EnquiryStatus =
  | "New"
  | "Contacted"
  | "In Progress"
  | "Closed";

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateEnquiryInput {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
