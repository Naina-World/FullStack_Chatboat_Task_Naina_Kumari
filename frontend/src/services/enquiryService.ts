
import api from "./api";

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userType: "Student" | "Customer" | "Other";
  interest: string;
  message: string;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  createdAt: string;
  updatedAt?: string;
}

export interface EnquiryFilters {
  userType?: string;
  status?: string;
  search?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Submit a new enquiry (public endpoint)
export const createEnquiry = async (
  enquiry: Omit<Enquiry, "_id" | "status" | "createdAt" | "updatedAt">
): Promise<Enquiry> => {
  const response = await api.post<ApiResponse<Enquiry>>(
    "/enquiries",
    enquiry
  );

  return response.data.data;
};

// Fetch all enquiries (admin endpoint)
export const getEnquiries = async (
  filters: EnquiryFilters = {}
): Promise<Enquiry[]> => {
  const params: Record<string, string> = {};

  if (filters.userType?.trim()) {
    params.userType = filters.userType.trim();
  }

  if (filters.status?.trim()) {
    params.status = filters.status.trim();
  }

  if (filters.search?.trim()) {
    params.search = filters.search.trim();
  }

  const response = await api.get<ApiResponse<Enquiry[]>>(
    "/enquiries",
    { params }
  );

  return response.data.data;
};

// Fetch one enquiry by ID (admin endpoint)
export const getEnquiry = async (id: string): Promise<Enquiry> => {
  const response = await api.get<ApiResponse<Enquiry>>(
    `/enquiries/${id}`
  );

  return response.data.data;
};

// Update an enquiry's status (admin endpoint)
export const updateEnquiryStatus = async (
  id: string,
  status: Enquiry["status"]
): Promise<Enquiry> => {
  const response = await api.patch<ApiResponse<Enquiry>>(
    `/enquiries/${id}`,
    { status }
  );

  return response.data.data;
};

// Delete an enquiry (admin endpoint)
export const deleteEnquiry = async (id: string): Promise<void> => {
  await api.delete(`/enquiries/${id}`);
};


