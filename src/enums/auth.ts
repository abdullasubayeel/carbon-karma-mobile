export type FormState = {
  fullname: string;
  location: string;
  phone: string;
  email: string;
  organisationName: string;
  designation: string;
  password: string;
  employeeCount: string;
  sector: string;
  address: string;
  logo?: {
    fileName?: string;
    fileSize?: number;
    height?: number;
    originalPath?: string;
    type?: string;
    uri?: string;
    width?: number;
  };
};

export type FormAction = {
  type: string;
  payload: string;
};
