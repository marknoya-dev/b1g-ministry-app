export type Participant = {
  id: string;
  ticketCode: string;
  firstName: string;
  lastName: string;
  nickname: string;
  gender: string;
  email: string;
  mobileNum: string;
  birthMonth: number;
  birthYear: number;
  civilStatus: string;
  profession: string;
  workplace: string;
  contactPerson_name: string;
  contactPerson_mobile: string;
  contactPerson_relationship: string;
  rideToVenue?: string;
  rideToVenue_name?: string;
  rideToVenue_temp?: string;
  rideFromVenue?: string;
  rideFromVenue_name?: string;
  rideFromVenue_temp?: string;
  embarkation_status: EmbarkationStatus;
  embarkation_checkInTime?: Date;
  medicalCondition?: string;
  foodRestriction?: string;
  dgroup_leader: string;
  dgroup_leader_mobile: string;
  satellite: string;
  satellite_loc: string;
  age: number;
  workshop1: string;
  workshop2: string;
  teamName: string;
  room?: string;
};

type Month =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

type CivilStatus = "Single" | "Married" | "Single Parent" | "Widow/Widower";

type TransportationMode = "Bus" | "Car";

type EmbarkationStatus = "Awaiting" | "Checked In" | "In Transit";

export type Bus = {
  busName: string;
  maxCapacity: number;
  currCapacity: number;
};
