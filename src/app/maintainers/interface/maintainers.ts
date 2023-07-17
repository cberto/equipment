export interface Crossroad {
  crossroadId: number;
  streetOne: string;
  streetTwo: string;
  commune?: string;
  relCommuneId?: number;
  region?: string;
  relCrossroadEquipments?: number[] //CrossroadEquipment[]; -------> rel: [crossroadEquipmentId's]
  relTasksInExecution?: number[]  //TasksInExecutiont[]; -------> rel: [tasksInExecutionId's]
}

export interface CrossroadEquipment {
  crossroadEquipmentId: number;
  relEquipmentTypeId: number; // -----> equipmentTypeId: number;
  equipmentTypeName: string;
  equipmentCode: number;
  equipmentStart: string;
  equipmentEnd: string;
  equipmentDirect: number;
  equipmentContracts?: any; //EquipmentContract[]; -------> rel: [equipmentContractId's]
}

export interface EquipmentContract {
  contractId: number;
  contractName: string; // ---> relContractId: number;
  contractStart: string;
  contractEnd: string;
}

export interface Communes {
  communeId: number;
  communeName: string;
  regionName: Regions[];
}

export interface Regions {
  regionId: number;
  regionName: string;
}

export interface Behaviour {
  behaviourId: number;
  behaviourName: string;
  behaviourNormalState: boolean;
  relatedEquipmentTypeId: number;
  equipmentTypeName: string;
}

export interface EquipmentType {
  equipmentTypeId: number;
  equipmentTypeName: string;
  equipmentTypeDescription?: string;
}

export interface Contract {
  contractId: number;
  contractName: string;
  contractStart: string;
  contractEnd: string;
  relatedCrossroadId: number[];
}

export interface CommunesBranch {
  communeId: number;
  communeName: string;
  branchName: Branchs[];
}
export interface Branchs {
  branchId: number;
  branchName: string;
  branchDirection: string;
}

export interface TasksInExecution {
  tasksInExecutionId: number;
  tasksInExecutionStart: string;
  tasksInExecutionEnd: string;
  tasksInExecutionName: string;
  tasksInExecutionTypeName: string;
  associatedAttentionsName: AssociatedAttentions[]
}

export interface AssociatedAttentions {
  associatedAttentionsId: number;
  associatedAttentionsName: string;
  associatedAttentionsTypeName: string;
  associatedAttentionsState: boolean;
  associatedAttentionsGroup: string;
}


export interface Applicant {
  applicantId: number;
  applicantName: string;
}


export interface Responsable {
  responsableId: number;
  responsableName: string;
}


export interface Technical {
  technicalId: number;
  technicalName: string;
}

export interface Group {
  groupId: number;
  groupDate: string;
  groupName: string;
  relatedMobileId: string;
}

export interface Mobile {
  mobileId: string;
  description: string;
  state: boolean;
}


export interface FunctionArrival {

  functionArrivalId: number;
  functionArrivalName: string;

}

export interface FunctionFinished {

  functionFinishedId: number;
  functionFinishedName: string;

}

export interface ListCrossroadEquipment {
  equipmentTypeName: string;
  serialNumber: number;

}
