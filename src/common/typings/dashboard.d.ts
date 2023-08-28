export interface IDashboard {
  startDate: string;
  endDate: string;
  terminalId: string;
}

export interface IDashboardVehicleBar {
  startDate: string;
  endDate: string;
  consignmentType: string;
  terminalId: string;
}

export interface IDashboardCargoBar {
  startDate: string;
  endDate: string;
  cargoType: string;
  terminalId: string;
}

export interface IDashboardRevenueBar {
  startDate: string;
  endDate: string;
  consignmentType: string;
  terminalId: string;
}

export interface IDashboardYardBar {
  startDate: string;
  endDate: string;
  yardName: string;
  terminalId: string;
}

export interface IDashboardSettings {
  currentUserId: number;
  userSectionSetting: ISettingsSection[];
}

export interface ISettingsSection {
  name: string;
  sortOrder: number;
  visibility: boolean;
}

export interface IDashboardVehicleComparison {
  startDate: string;
  endDate: string;
  terminalId: string;
}

export interface IDashboardLevel4Data {
  startDate: string;
  endDate: string;
  isVehicleType: boolean;
  type: string;
  terminalId: string;
  headerType: string;
}
