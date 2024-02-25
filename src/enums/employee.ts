interface CarbonEmissionData {
  carbonEmission: number;
  date: string;
}

interface KarmaPointsData {
  karmaPointsGained: number;
  date: string;
}

interface OffsetContributedData {
  date: string;
  offsetContributed: number;
}

interface CarbonEmissionGraphData {
  date: string;
  vehicle: number;
  electricity: number;
  house: number;
}

export type EmployeeDashboardType = {
  carbonEmission: CarbonEmissionData[];
  prevCarbonEmissionPercentChange: number;
  karmaPointsGained: KarmaPointsData[];
  offsetContributed: number;
  totalKarmaPoints: number;
  totalCarbonEmission: number;
  carbonEmissionGraphData: CarbonEmissionGraphData[];
};

export type EmpSurveyDetails = {
  _id: string;
  employeeId: string;
  date: string;
  karmaGained: number;
  offsetContributed: number;
  carbonEmitted: number;
  trips: string[];
  electricity?: {
    date: string;
    carbonEmission: number;
    unitsConsumed: number;
    _id: string;
  };
  household?: {
    date: string;
    kitchenEmission: number;
    totalTripsEmission: number;
    trips: string[];
    _id: string;
  };
  __v: number;
};

type EmployeeSurveyType = {
  date: string;
  surveyDetails: EmpSurveyDetails;
};

type PaginatedData = {
  page: number;
  limit: number;
  totalResults: number;
};

export type EmployeeSurveysResponse = {
  empSurveys: EmployeeSurveyType[];
  paginated: PaginatedData;
};

//survey data by date

interface ElectricityData {
  date: string;
  carbonEmission: number;
  unitsConsumed: number;
  _id: string;
}

interface HouseholdData {
  date: string;
  kitchenEmission: number;
  totalTripsEmission: number;
  trips: string[];
  _id: string;
}

interface EmployeeData {
  _id: string;
  employeeId: string;
  date: string;
  electricity: ElectricityData;
  karmaGained: number;
  offsetContributed: number;
  carbonEmitted: number;
  trips: string[];
  __v: number;
  household: HouseholdData;
}

export type EmpSurveyByDatePayload = {empId: string; date: string};
export type EmpSurveyDataResponse = EmployeeData[];

export type EmpDashboardPayload = {
  fromDate: string;
  employeeId: string;
  toDate: string;
};

//Vehicles
export type EmpVehicleType = {
  _id: string;
  manufactureYear: number;
  company: string;
  mileage?: number;
  carbonEmissionFactor: number;
  fuelType: string;
  countryOfOrigin: string;
  model: string;
  derivative: string;
  engineSize: number;
  transmissionType: string;
  weight: number;
  fuelEfficiency?: number;
  createdAt: string;
  updatedAt: string;

  __v?: number;
};

export type EmpVehicleResponse = EmpVehicleType[];

export type TripDataPayload = {
  distance: number;
  dates: string[];
  drivingConditionFactor: number;
  vehicleId: string;
  noOfPeople: number;
  employeeId: string;
};

export type ElectricDataPayload = {
  residence: string;
  country: string;
  state: string;
  year: number;
  month: number;
  billAmount: number;
  noOfPeople: number;
  employeeId: string;
  units: number;
};

export type HousholdDataType = {
  heatingOil: number;
  lpg: number;
  coal: number;
  wood: number;
  noOfPeople: number;
  year: number;
  month: number;
  trips: Trip[];
  employeeId: string;
};

type Trip = {
  distance: string;
  drivingConditionFactor: number;
  noOfPeople: string;
  dates: string[];
  vehicleId: string;
};
