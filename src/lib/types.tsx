export type Person = {
  id: string;
  role: Role;
  ticketCode: string;
  firstName: string;
  lastName: string;
  nickname: string;
  gender: string;
  email: string;
  mobile: string;
  birthMonth: number;
  birthYear: number;
  civilStatus: string;
  profession: string;
  workplace: string;
  contactPerson_name: string;
  contactPerson_mobile: string;
  contactPerson_relationship: string;

  carpoolCar?: string;
  carpoolRole?: string;

  embarkation_temp?: string;
  embarkation_status: EmbarkationStatus;
  embarkation_checkInTime?: Date;

  rideToVenue: string;
  rideToVenue_name?: string;
  rideToVenue_Id?: string;

  // rideFromVenue?: string;
  // rideFromVenue_Id?: string;

  medicalCondition?: string;
  foodRestriction?: string;
  dgroup_leader: string;
  dgroup_leader_mobile: string;
  satellite_loc: string;
  age: number;
  workshop1: string;
  workshop2: string;
  teamName: string;
  room: string;
  devo: string;
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

type Role = "PARTICIPANT" | "VOLUNTEER";
type EmbarkationStatus = "PENDING" | "CHECKED_IN" | "IN_TRANSIT" | "ARRIVED";

export type Bus = {
  id: string;
  name: string;
  status: string;
  maxCapacity: number;
  currCapacity: number;
};
