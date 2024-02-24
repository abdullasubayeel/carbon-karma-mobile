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
