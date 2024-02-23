type CarbonEmissionByMonth = {
  date: string;
  totalCarbonEmission: number;
};

type CarbonEmissionGraphData = {
  date: string;
  electricity: number;
  machine: number;
  transport: number;
  utility: number;
};

type CarbonNeutrality = {
  carbonNuetral: boolean;
  date: string;
  message: string;
};

type KarmaPoints = {
  date: string;
  totalKarmaGained: number;
};

type OffsetContribution = {
  date: string;
  totalOffsetContribution: number;
};

export type OrgDashboardPayload = {
  fromDate: string;
  organizationId: string;
  toDate: string;
};
export type OrgDashboardResponse = {
  carbonEmissionByMonth: CarbonEmissionByMonth[];
  carbonEmissionGraphData: CarbonEmissionGraphData[];
  carbonNuetrality: CarbonNeutrality;
  karmaPoints: KarmaPoints[];
  offsetContribution: OffsetContribution[];
  totalCarbonEmission: number;
  totalEmployeeCarbonEmission: number;
  totalKarmaPoints: number;
  totalOffsetContribution: number;
  totalOrgCarbonEmission: number;
};

export type NotificationType = {
  __v: number;
  _id: string;
  date: string;
  is_read: boolean;
  message: string;
  title: string;
  type: string;
  userID: string;
};

export type NotificationPayloadType = {
  response: NotificationType[];
};

export type OrganizationProfileType = {
  _id: string;
  location: string;
  organisationName: string;
  employeeCount: number;
  sector: string;
  address: string;
  logo: string;
  departments: any[];
  questionid: any[];
  carbon_neutralized: number;
  karma_points: number;
  carbon_emission: number;
  __v: number;
};
export type OrganizationVehiclesPayloadType = {
  response: OrganizationVehiclesType[];
  valid: boolean;
};
export type OrganizationVehiclesType = {
  _id: string;
  manufactureYear: number;
  company: string;
  vehicleName: string;
  fuelEfficiency: number;
  fuelType: string;
  countryOfOrigin: string;
  model: string;
  derivative: string;
  engineSize: number;
  transmissionType: string;
  weight: number;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type EmpProfileType = {
  _id: string;
  fullname: string;
  Phone: string;
  location: string;
  about: string;
  is_delete: boolean;
  role: string;
  email: string;
  organisationID: string;
  karma_points: number;
  carbon_emission: number;
  __v: number;
  resetToken: string;
  resetTokenExpiration: string;
  profile: string;
};
