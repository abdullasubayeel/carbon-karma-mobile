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
