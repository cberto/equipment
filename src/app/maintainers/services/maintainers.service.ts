import { Injectable } from '@angular/core';
import { Communes, Regions, EquipmentType, Behaviour, Contract, Crossroad, CrossroadEquipment, Branchs, CommunesBranch, TasksInExecution, AssociatedAttentions, EquipmentContract, Applicant, Responsable, Technical, Group, Mobile, FunctionArrival, FunctionFinished, ListCrossroadEquipment } from '../interface/maintainers';


@Injectable({
  providedIn: 'root'
})
export class MaintainersService {

  private crossroads: Crossroad[] = [
    { crossroadId: 1, streetOne: 'Miguel Claro', streetTwo: 'Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [100, 200, 300, 360], relTasksInExecution: [1, 2] },
    { crossroadId: 2, streetOne: 'Manuel Montt', streetTwo: 'Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [100, 300], relTasksInExecution: [3, 5] },
    { crossroadId: 3, streetOne: 'Manuel Montt', streetTwo: 'Nueva Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [], relTasksInExecution: [2, 4] },
    { crossroadId: 4, streetOne: 'Antonio Varas', streetTwo: 'Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [100, 360], relTasksInExecution: [3] },
    { crossroadId: 5, streetOne: 'La Concepción - C. Antu', streetTwo: 'Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [360], relTasksInExecution: [1, 3, 5] },
    { crossroadId: 6, streetOne: 'Marchant Pereira', streetTwo: 'Nueva Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [300], relTasksInExecution: [2, 5] },
    { crossroadId: 7, streetOne: 'Seminario', streetTwo: 'Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [200, 360], relTasksInExecution: [4] },
    { crossroadId: 8, streetOne: 'Condell N.', streetTwo: 'Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [100, 300], relTasksInExecution: [3, 4] },
    { crossroadId: 9, streetOne: 'Salvador', streetTwo: 'Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [200], relTasksInExecution: [1, 2] },
    { crossroadId: 10, streetOne: 'Eliodoro Yañez', streetTwo: 'Nueva Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [100, 360], relTasksInExecution: [2, 3] },
    { crossroadId: 11, streetOne: 'Pedro de Valdivia', streetTwo: 'Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [100, 200, 360], relTasksInExecution: [2] },
    { crossroadId: 12, streetOne: 'Pedro de Valdivia', streetTwo: 'Nueva Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [100, 300, 360], relTasksInExecution: [] },
    { crossroadId: 13, streetOne: 'Las Urbinas - Guardia Vieja', streetTwo: 'Nueva Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [100], relTasksInExecution: [3] },
    { crossroadId: 14, streetOne: 'Guardia Vieja', streetTwo: 'Nueva Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [200], relTasksInExecution: [1] },
    { crossroadId: 15, streetOne: 'Ricardo Lyon', streetTwo: 'Providencia', commune: 'Providencia', relCommuneId: 2, region: 'Metropolitana', relCrossroadEquipments: [200, 300], relTasksInExecution: [1] },
  ]

  private crossroadEquipments: CrossroadEquipment[] = [
    { crossroadEquipmentId: 100, relEquipmentTypeId: 1, equipmentTypeName: 'Instalación', equipmentCode: 5426, equipmentStart: '1998-06-30', equipmentEnd: '2500-01-01', equipmentDirect: 1, equipmentContracts: [32, 33, 34] },
    { crossroadEquipmentId: 200, relEquipmentTypeId: 2, equipmentTypeName: 'Controlador', equipmentCode: 1254, equipmentStart: '2021-06-24', equipmentEnd: '2050-08-24', equipmentDirect: 1, equipmentContracts: [32, 33, 34] },
    { crossroadEquipmentId: 300, relEquipmentTypeId: 0, equipmentTypeName: 'OTU', equipmentCode: 8742, equipmentStart: '2010-06-15', equipmentEnd: '2021-09-05', equipmentDirect: 1, equipmentContracts: [32, 33, 34] },
    { crossroadEquipmentId: 360, relEquipmentTypeId: 0, equipmentTypeName: 'UPS', equipmentCode: 2564, equipmentStart: '1990-04-08', equipmentEnd: '2021-10-24', equipmentDirect: 1, equipmentContracts: [32, 33, 34] }
  ]

  private communes: Communes[] = [
    { communeId: 1, communeName: 'Internacional', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 2, communeName: 'Providencia', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 3, communeName: 'Las Condes', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 4, communeName: 'La Reina', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 5, communeName: 'Macul', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 6, communeName: 'Peñalolen', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 7, communeName: 'La Florida', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 8, communeName: 'Conchali', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 9, communeName: 'Independencia', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 10, communeName: 'Lo Prado', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 11, communeName: 'Est. Central', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 12, communeName: 'Cerrillos', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 13, communeName: 'Maipu', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 14, communeName: 'Recoleta', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 15, communeName: 'Santiago', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 16, communeName: 'Cerro Navia', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 17, communeName: 'Quinta Normal', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 18, communeName: 'Pe. A. Cerda', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 19, communeName: 'San Joaquín', regionName: [{ regionId: 1, regionName: "Metropolitana" }] },
    { communeId: 20, communeName: 'Las Condes', regionName: [{ regionId: 2, regionName: "Región 2" }] },
    { communeId: 21, communeName: 'Santiago', regionName: [{ regionId: 2, regionName: "Región 2" }] },
    { communeId: 22, communeName: 'Providencia', regionName: [{ regionId: 2, regionName: "Región 2" }] },
    { communeId: 23, communeName: 'Cerrillos', regionName: [{ regionId: 2, regionName: "Región 2" }] },
    { communeId: 24, communeName: 'La Reina', regionName: [{ regionId: 2, regionName: "Región 2" }] },
    { communeId: 25, communeName: 'Internacional', regionName: [{ regionId: 2, regionName: "Región 2" }] },
    { communeId: 26, communeName: 'Peñalolen', regionName: [{ regionId: 2, regionName: "Región 2" }] },
    { communeId: 27, communeName: 'La Florida', regionName: [{ regionId: 2, regionName: "Región 2" }] },
    { communeId: 28, communeName: 'Conchali', regionName: [{ regionId: 2, regionName: "Región 2" }] },
    { communeId: 29, communeName: 'Independencia', regionName: [{ regionId: 2, regionName: "Región 2" }] },
    { communeId: 30, communeName: 'Cerrillos', regionName: [{ regionId: 3, regionName: "Región 3" }] },
    { communeId: 31, communeName: 'Internacional', regionName: [{ regionId: 3, regionName: "Región 3" }] },
    { communeId: 32, communeName: 'Providencia', regionName: [{ regionId: 3, regionName: "Región 3" }] },
    { communeId: 33, communeName: 'Las Condes', regionName: [{ regionId: 3, regionName: "Región 3" }] },
    { communeId: 34, communeName: 'La Reina', regionName: [{ regionId: 3, regionName: "Región 3" }] },
    { communeId: 35, communeName: 'Macul', regionName: [{ regionId: 3, regionName: "Región 3" }] },
    { communeId: 36, communeName: 'Peñalolen', regionName: [{ regionId: 3, regionName: "Región 3" }] },
    { communeId: 37, communeName: 'La Florida', regionName: [{ regionId: 3, regionName: "Región 3" }] },
    { communeId: 38, communeName: 'Conchali', regionName: [{ regionId: 3, regionName: "Región 3" }] },
    { communeId: 39, communeName: 'Independencia', regionName: [{ regionId: 3, regionName: "Región 3" }] },
    { communeId: 40, communeName: 'La Florida', regionName: [{ regionId: 4, regionName: "Región 4" }] },
    { communeId: 41, communeName: 'Conchali', regionName: [{ regionId: 4, regionName: "Región 4" }] },
    { communeId: 42, communeName: 'Independencia', regionName: [{ regionId: 4, regionName: "Región 4" }] }
  ]

  private regions: Regions[] = [
    { regionId: 1, regionName: "Metropolitana" },
    { regionId: 2, regionName: "Región 2" },
    { regionId: 3, regionName: "Región 3" },
    { regionId: 4, regionName: "Región 4" },
    { regionId: 5, regionName: "Región 5" }
  ]

  private equipmentTypes: EquipmentType[] = [
    { equipmentTypeId: 6, equipmentTypeName: 'Letrero VMS', equipmentTypeDescription: 'Letreros de Señales Variables' },
    { equipmentTypeId: 1, equipmentTypeName: 'Instalación', equipmentTypeDescription: '' },
    { equipmentTypeId: 2, equipmentTypeName: 'Controlador', equipmentTypeDescription: 'Descripción opcional..' },
    { equipmentTypeId: 3, equipmentTypeName: 'OTU', equipmentTypeDescription: '' },
    { equipmentTypeId: 4, equipmentTypeName: 'Hito Luminoso 220Vac', equipmentTypeDescription: '' },
    { equipmentTypeId: 5, equipmentTypeName: 'Señal Solo', equipmentTypeDescription: 'Descripción opcional..' },
    { equipmentTypeId: 7, equipmentTypeName: 'Cámara CCTV', equipmentTypeDescription: '' },
    { equipmentTypeId: 8, equipmentTypeName: 'Hito Retractil', equipmentTypeDescription: '' },
    { equipmentTypeId: 9, equipmentTypeName: 'Detector', equipmentTypeDescription: '' },
    { equipmentTypeId: 10, equipmentTypeName: 'Espira', equipmentTypeDescription: '' },
    { equipmentTypeId: 11, equipmentTypeName: 'Baliza Zebra Safe 220V', equipmentTypeDescription: '' },
    { equipmentTypeId: 12, equipmentTypeName: 'Señal Oculta', equipmentTypeDescription: '' },
    { equipmentTypeId: 30, equipmentTypeName: 'Camara', equipmentTypeDescription: '' },
    { equipmentTypeId: 35, equipmentTypeName: 'Bollard', equipmentTypeDescription: '' },
    { equipmentTypeId: 31, equipmentTypeName: 'Poste', equipmentTypeDescription: '' },
    { equipmentTypeId: 32, equipmentTypeName: 'Lámpara', equipmentTypeDescription: '' },
    { equipmentTypeId: 33, equipmentTypeName: 'Botonera', equipmentTypeDescription: '' },
    { equipmentTypeId: 34, equipmentTypeName: 'Empalme', equipmentTypeDescription: '' },
    { equipmentTypeId: 35, equipmentTypeName: 'PC', equipmentTypeDescription: '' },
    { equipmentTypeId: 36, equipmentTypeName: 'UPS', equipmentTypeDescription: '' },
  ];

  private behaviours: Behaviour[] = [
    { behaviourId: 56, behaviourName: 'K-TRABAJANDO', behaviourNormalState: true, relatedEquipmentTypeId: 6, equipmentTypeName: 'Letrero VMS' },
    { behaviourId: 57, behaviourName: 'D-CON DERRIBO', behaviourNormalState: false, relatedEquipmentTypeId: 6, equipmentTypeName: 'Letrero VMS' },
    { behaviourId: 58, behaviourName: 'TRABAJA CON DERRIBO', behaviourNormalState: false, relatedEquipmentTypeId: 6, equipmentTypeName: 'Letrero VMS' },
    { behaviourId: 59, behaviourName: 'A-APAGADO', behaviourNormalState: false, relatedEquipmentTypeId: 6, equipmentTypeName: 'Letrero VMS' },
    { behaviourId: 79, behaviourName: 'M-MAL FUNCIONAMIENTO', behaviourNormalState: false, relatedEquipmentTypeId: 6, equipmentTypeName: 'Letrero VMS' },
    { behaviourId: 142, behaviourName: 'TRABAJANDO/INSPECCION', behaviourNormalState: true, relatedEquipmentTypeId: 6, equipmentTypeName: 'Letrero VMS' },
    { behaviourId: 251, behaviourName: 'N-PREVENTIVA', behaviourNormalState: false, relatedEquipmentTypeId: 6, equipmentTypeName: 'Letrero VMS' },
    { behaviourId: 54, behaviourName: 'D-CON DERRIBO', behaviourNormalState: false, relatedEquipmentTypeId: 2, equipmentTypeName: 'Controlador' },
    { behaviourId: 53, behaviourName: 'K-TRABAJANDO', behaviourNormalState: true, relatedEquipmentTypeId: 2, equipmentTypeName: 'Controlador' },
    { behaviourId: 55, behaviourName: 'TRABAJA CON DERRIBO', behaviourNormalState: false, relatedEquipmentTypeId: 2, equipmentTypeName: 'Controlador' },
    { behaviourId: 21, behaviourName: 'N-PREVENTIVA', behaviourNormalState: false, relatedEquipmentTypeId: 5, equipmentTypeName: 'Señal Solo' },
    { behaviourId: 22, behaviourName: 'D-CON DERRIBO', behaviourNormalState: false, relatedEquipmentTypeId: 5, equipmentTypeName: 'Señal Solo' },
    { behaviourId: 23, behaviourName: 'K-TRABAJANDO', behaviourNormalState: true, relatedEquipmentTypeId: 5, equipmentTypeName: 'Señal Solo' },
  ]

  private contracts: Contract[] = [
    { contractId: 32, contractName: 'AGCU', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [1, 2, 3] },
    { contractId: 33, contractName: 'Alsacia S.A.', contractStart: '2021-06-24', contractEnd: '1950-01-01', relatedCrossroadId: [2, 3, 4] },
    { contractId: 34, contractName: 'Auter', contractStart: '2010-06-15', contractEnd: '1950-01-01', relatedCrossroadId: [5, 6, 7] },
    { contractId: 35, contractName: 'Macul', contractStart: '1990-04-08', contractEnd: '1950-01-01', relatedCrossroadId: [8, 9, 10] },
    { contractId: 36, contractName: 'Peñalolen', contractStart: '2021-05-25', contractEnd: '1950-01-01', relatedCrossroadId: [1, 5, 3] },
    { contractId: 37, contractName: 'La Florida', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [12, 15] },
    { contractId: 38, contractName: 'Conchali', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [] },
    { contractId: 39, contractName: 'Independencia', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [4, 9, 12] },
    { contractId: 40, contractName: 'Lo Prado', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [10, 12, 14] },
    { contractId: 41, contractName: 'Est. Central', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [1, 3, 5] },
    { contractId: 42, contractName: 'Cerrillos', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [1, 6, 9] },
    { contractId: 43, contractName: 'Maipu', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [7, 8, 9] },
    { contractId: 44, contractName: 'Recoleta', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [5, 9, 12] },
    { contractId: 46, contractName: 'Cerro Navia', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [13, 15] },
    { contractId: 47, contractName: 'Quinta Normal', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [] },
    { contractId: 49, contractName: 'P. A. Cerda', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [3, 5, 6] },
    { contractId: 50, contractName: 'San Joaquín', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [2, 4] },
    { contractId: 51, contractName: 'San Miguel', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [5, 9, 13] },
    { contractId: 52, contractName: 'La Cisterna', contractStart: '1998-06-30', contractEnd: '1950-01-01', relatedCrossroadId: [12, 15] },
  ]

  private communesBranch: CommunesBranch[] = [
    { communeId: 1, communeName: 'Internacional', branchName: [{ branchId: 1, branchName: "Metropolitana", branchDirection: "Av. José Pedro Alessandri 1166" }] },
    { communeId: 2, communeName: 'Providencia', branchName: [{ branchId: 1, branchName: "Metropolitana", branchDirection: "Av. José Pedro Alessandri 1166" }] },
    { communeId: 3, communeName: 'Las Condes', branchName: [{ branchId: 2, branchName: "Sucursal 2", branchDirection: "Av. Ossa 655" }] },
    { communeId: 4, communeName: 'La Reina', branchName: [{ branchId: 2, branchName: "Sucursal 2", branchDirection: "Av. Ossa 655" }] },
    { communeId: 5, communeName: 'Macul', branchName: [{ branchId: 2, branchName: "Sucursal 2", branchDirection: "Av. Ossa 655" }] },
    { communeId: 6, communeName: 'Peñalolen', branchName: [{ branchId: 1, branchName: "Metropolitana", branchDirection: "Av. José Pedro Alessandri 1166" }] },
    { communeId: 7, communeName: 'La Florida', branchName: [{ branchId: 3, branchName: "Sucursal 3", branchDirection: "Av. Condell 1029" }] },
    { communeId: 8, communeName: 'Conchali', branchName: [{ branchId: 1, branchName: "Metropolitana", branchDirection: "Av. José Pedro Alessandri 1166" }] },
    { communeId: 9, communeName: 'Independencia', branchName: [{ branchId: 1, branchName: "Metropolitana", branchDirection: "Av. José Pedro Alessandri 1166" }] },
    { communeId: 10, communeName: 'Lo Prado', branchName: [{ branchId: 3, branchName: "Sucursal 3", branchDirection: "Av. Condell 1029" }] },
    { communeId: 11, communeName: 'Est. Central', branchName: [{ branchId: 3, branchName: "Sucursal 3", branchDirection: "Av. Condell 1029" }] },
    { communeId: 12, communeName: 'Cerrillos', branchName: [{ branchId: 1, branchName: "Metropolitana", branchDirection: "Av. José Pedro Alessandri 1166" }] },
    { communeId: 13, communeName: 'Maipu', branchName: [{ branchId: 3, branchName: "Sucursal 3", branchDirection: "Av. Condell 1029" }] },
    { communeId: 14, communeName: 'Recoleta', branchName: [{ branchId: 4, branchName: "Sucursal 4", branchDirection: "Av Libertador Bernardo O'Higgins 3470" }] },
    { communeId: 15, communeName: 'Santiago', branchName: [{ branchId: 4, branchName: "Sucursal 4", branchDirection: "Av Libertador Bernardo O'Higgins 3470" }] },
    { communeId: 16, communeName: 'Cerro Navia', branchName: [{ branchId: 4, branchName: "Sucursal 4", branchDirection: "Av Libertador Bernardo O'Higgins 3470" }] },
    { communeId: 17, communeName: 'Quinta Normal', branchName: [{ branchId: 4, branchName: "Sucursal 4", branchDirection: "Av Libertador Bernardo O'Higgins 3470" }] }
  ]

  private branchs: Branchs[] = [
    { branchId: 1, branchName: "Metropolitana", branchDirection: "Av. José Pedro Alessandri 1166" },
    { branchId: 2, branchName: "Sucursal 2", branchDirection: "Av. Ossa 655" },
    { branchId: 3, branchName: "Sucursal 3", branchDirection: "Av. Condell 1029" },
    { branchId: 4, branchName: "Sucursal 4", branchDirection: "Av Libertador Bernardo O'Higgins 3470" },
    { branchId: 5, branchName: "Sucursal 5", branchDirection: "Av. Independencia 595" }
  ]

  private tasksInExecution: TasksInExecution[] = [
    { tasksInExecutionId: 1, tasksInExecutionStart: "1998-06-30", tasksInExecutionEnd: "1950-01-01", tasksInExecutionName: "Instalación", tasksInExecutionTypeName: "K-TRABAJANDO", associatedAttentionsName: [{ associatedAttentionsId: 1, associatedAttentionsName: "Instalación", associatedAttentionsTypeName: "D-CON DERRIBO", associatedAttentionsState: true, associatedAttentionsGroup: "" }] },
    { tasksInExecutionId: 2, tasksInExecutionStart: "2021-06-24", tasksInExecutionEnd: "1950-01-01", tasksInExecutionName: "UPS", tasksInExecutionTypeName: "D-CON DERRIBO", associatedAttentionsName: [{ associatedAttentionsId: 2, associatedAttentionsName: "UPS", associatedAttentionsTypeName: "TRABAJA CON DERRIBO", associatedAttentionsState: false, associatedAttentionsGroup: "" }] },
    { tasksInExecutionId: 3, tasksInExecutionStart: "2010-06-15", tasksInExecutionEnd: "1950-01-01", tasksInExecutionName: "Controlador", tasksInExecutionTypeName: "TRABAJA CON DERRIBO", associatedAttentionsName: [{ associatedAttentionsId: 3, associatedAttentionsName: "Controlador", associatedAttentionsTypeName: "A-APAGADO", associatedAttentionsState: true, associatedAttentionsGroup: "" }] },
    { tasksInExecutionId: 4, tasksInExecutionStart: "1990-04-08", tasksInExecutionEnd: "1950-01-01", tasksInExecutionName: "OTU", tasksInExecutionTypeName: "A-APAGADO", associatedAttentionsName: [{ associatedAttentionsId: 4, associatedAttentionsName: "OTU", associatedAttentionsTypeName: "N-PREVENTIVA", associatedAttentionsState: false, associatedAttentionsGroup: "" }] },
    { tasksInExecutionId: 5, tasksInExecutionStart: "2021-05-25", tasksInExecutionEnd: "1950-01-01", tasksInExecutionName: "UPS", tasksInExecutionTypeName: "TRABAJANDO/INSPECCION", associatedAttentionsName: [{ associatedAttentionsId: 5, associatedAttentionsName: "UPS", associatedAttentionsTypeName: "K-TRABAJANDO", associatedAttentionsState: true, associatedAttentionsGroup: "" }] }
  ]

  private associatedAttentions: AssociatedAttentions[] = [
    { associatedAttentionsId: 1, associatedAttentionsName: "Instalación", associatedAttentionsTypeName: "D-CON DERRIBO", associatedAttentionsState: true, associatedAttentionsGroup: "" },
    { associatedAttentionsId: 2, associatedAttentionsName: "UPS", associatedAttentionsTypeName: "TRABAJA CON DERRIBO", associatedAttentionsState: false, associatedAttentionsGroup: "" },
    { associatedAttentionsId: 3, associatedAttentionsName: "Controlador", associatedAttentionsTypeName: "A-APAGADO", associatedAttentionsState: true, associatedAttentionsGroup: "" },
    { associatedAttentionsId: 4, associatedAttentionsName: "OTU", associatedAttentionsTypeName: "N-PREVENTIVA", associatedAttentionsState: false, associatedAttentionsGroup: "" },
    { associatedAttentionsId: 5, associatedAttentionsName: "UPS", associatedAttentionsTypeName: "K-TRABAJANDO", associatedAttentionsState: true, associatedAttentionsGroup: "" },
  ]

  private equipmentContract: EquipmentContract[] = [
    { contractId: 1, contractName: "Barisco 16", contractStart: "1998-06-30", contractEnd: "1950-01-01" },
    { contractId: 2, contractName: "Sector 4a", contractStart: "2021-06-24", contractEnd: "1950-01-01" },
    { contractId: 3, contractName: "GRP BUIN", contractStart: "2010-06-15", contractEnd: "1950-01-01" },
    { contractId: 4, contractName: "GRP COLINA", contractStart: "1990-04-08", contractEnd: "1950-01-01" },
    { contractId: 5, contractName: "Sector 6a", contractStart: "2010-06-15", contractEnd: "1950-01-01" }
  ]

  private applicants: Applicant[] = [
    { applicantId: 1, applicantName: "PersonalAUTER" },
    { applicantId: 2, applicantName: "Municipalidad" },
    { applicantId: 3, applicantName: "Caberinos" },
    { applicantId: 4, applicantName: "Min. Transporte" },
    { applicantId: 5, applicantName: "M.O.P" }
  ]

  private responsables: Responsable[] = [
    { responsableId: 1, responsableName: "Abraham Muñoz" },
    { responsableId: 2, responsableName: "Adrain Raio" },
    { responsableId: 3, responsableName: "Alan Paredes" },
    { responsableId: 4, responsableName: "Min. Transporte" },
    { responsableId: 5, responsableName: "M.O.P" }
  ]

  private technicals: Technical[] = [
    { technicalId: 1, technicalName: "Daniel Varas" },
    { technicalId: 2, technicalName: "Daniel Barreras" },
    { technicalId: 3, technicalName: "Carlos Astorga" },
    { technicalId: 4, technicalName: "Carlos Astorga" },

  ]

  private groups: Group[] = [
    { groupId: 1, groupDate: '2021-05-01', groupName: 'Básico 3', relatedMobileId: '170 BYJF-81' },
    { groupId: 2, groupDate: '2021-05-01', groupName: 'Básico 3', relatedMobileId: '172 CJHV-79' },
    { groupId: 3, groupDate: '2021-05-01', groupName: 'Básico 4', relatedMobileId: '176 CSGY-30' },
    { groupId: 4, groupDate: '2021-05-01', groupName: 'Básico 5', relatedMobileId: '283 HWKD-98' },
    { groupId: 5, groupDate: '2021-05-01', groupName: 'Básico 6', relatedMobileId: '298 JPVT-75' },
    { groupId: 6, groupDate: '2021-05-01', groupName: 'Básico 6', relatedMobileId: '356 PPRV-31' },
    { groupId: 7, groupDate: '2021-05-01', groupName: 'Básico 7A', relatedMobileId: '313 JTSH-61' },
    { groupId: 8, groupDate: '2021-05-01', groupName: 'Básico 10', relatedMobileId: '307 JSLV-65' },
    { groupId: 3, groupDate: '2021-05-01', groupName: 'Básico 11', relatedMobileId: '298 JPVT-75' },
    { groupId: 3, groupDate: '2021-05-01', groupName: 'Básico 12', relatedMobileId: '326 KYCV-63' },
    { groupId: 3, groupDate: '2021-05-01', groupName: 'Básico 14', relatedMobileId: '326 KYCV-63' },
    { groupId: 3, groupDate: '2021-05-01', groupName: 'Básico 16', relatedMobileId: '317 KFSC-89' },
    { groupId: 3, groupDate: '2021-05-01', groupName: 'Básico 1A', relatedMobileId: '313 JTSH-61' },
    { groupId: 3, groupDate: '2021-05-01', groupName: 'Básico 5B', relatedMobileId: '326 KYCV-63' }
  ]

  private mobiles: Mobile[] = [
    { mobileId: '170 BYJF-81', description: '170 BYJF-81', state: true },
    { mobileId: '172 CJHV-79', description: '172 CJHV-79', state: true },
    { mobileId: '176 CSGY-30', description: '176 CSGY-30', state: false },
    { mobileId: '283 HWKD-98', description: '283 HWKD-98', state: true },
    { mobileId: '298 JPVT-75', description: '298 JPVT-75', state: true },
    { mobileId: '356 PPRV-31', description: '356 PPRV-31', state: true },
    { mobileId: '307 JSLV-65', description: '307 JSLV-65', state: false },
    { mobileId: '298 JPVT-75', description: '298 JPVT-75', state: true },
    { mobileId: '326 KYCV-63', description: '326 KYCV-63', state: false },
    { mobileId: '317 KFSC-89', description: '317 KFSC-89', state: true },
  ]

  private functionArrival: FunctionArrival[] = [
    { functionArrivalId: 1, functionArrivalName: "G-DESCONOCIDO" },
    { functionArrivalId: 2, functionArrivalName: "A-APAGADO" },
    { functionArrivalId: 3, functionArrivalName: "I-LUCES INTERMIT." },

  ]

  private functionFinished: FunctionFinished[] = [
    { functionFinishedId: 1, functionFinishedName: "I-LUCES INTERMIT." },
    { functionFinishedId: 2, functionFinishedName: "K-TRABAJANDO" },
    { functionFinishedId: 3, functionFinishedName: "S-LUCES EN SERIE" },
  ]


  private listCrossroadEquipment: ListCrossroadEquipment[] = [
    { equipmentTypeName: 'Poste', serialNumber: 1 },
    { equipmentTypeName: 'Empalme', serialNumber: 3 },
    { equipmentTypeName: 'PC', serialNumber: 5 },
    { equipmentTypeName: 'UPS', serialNumber: 6 },
    { equipmentTypeName: 'Letrero VMS', serialNumber: 11 },
    { equipmentTypeName: 'Botonera', serialNumber: 12 },
    { equipmentTypeName: 'Instalación', serialNumber: 22 },
    { equipmentTypeName: 'Lámpara', serialNumber: 23 },
    { equipmentTypeName: 'Controlador', serialNumber: 33 },
    { equipmentTypeName: 'Señal Oculta', serialNumber: 33 },
    { equipmentTypeName: 'Bollard', serialNumber: 35 },






  ]




  constructor() { }


  // Obtener todos los grupos
  getGroups(): Group[] {
    return this.groups;
  }

  // Obtener todos los grupos
  getMobiles(): Mobile[] {
    return this.mobiles;
  }

  // Obtener todas las regiones del servicio
  getCrossroads(): Crossroad[] {
    return this.crossroads;
  }


  // Obtener un array de cruces específicos por id
  getCrossroadsById(ids: number[] | undefined): Crossroad[] {
    let match: Crossroad[] = [];

    this.crossroads.forEach(item => {

      ids?.forEach(id => {

        if (item.crossroadId === id) {
          match.push(item);
        }

      })
    })
    return match;
  }


  // Agregar nueva región al servicio
  addCrossroad(newCrossroad: Crossroad) {
    this.crossroads.push(newCrossroad);
  }

  // Agregar nuevo tipo de equipo al cruce
  addCrossroadEquipment(crossroadEquipment: CrossroadEquipment) {
    this.crossroadEquipments.push(crossroadEquipment);
  }

  // Obtener todos los equipos de un cruce
  getCrossroadEquipments(relCrossroadEquipments: number[]): CrossroadEquipment[] | null {
    let match: CrossroadEquipment[] = []; // crea un nuevo array de comunas vacío (match)

    relCrossroadEquipments.forEach(relCrossEquipmentId => {

      this.crossroadEquipments.forEach(crossroadEquipment => {

        if (crossroadEquipment.crossroadEquipmentId === relCrossEquipmentId) {
          match.push(crossroadEquipment);

        }
      })
    })

    // si la cantidad de registros dentro del array match es 0 returna null
    if (match.length === 0) {
      return null;
    }
    // sino, devuelve el array match con todas las comunas coincidentes
    else {
      return match;
    }

  }


  getTasksInExecution(relTasksInExecution: number[]): TasksInExecution[] | null {

    let match: TasksInExecution[] = []; // crea un nuevo array de comunas vacío (match)

    relTasksInExecution.forEach(relTasksInExecutionId => {

      this.tasksInExecution.forEach(tasksInExecution => {

        if (tasksInExecution.tasksInExecutionId === relTasksInExecutionId) {
          match.push(tasksInExecution);

        }
      })
    })

    // si la cantidad de registros dentro del array match es 0 returna null
    if (match.length === 0) {
      return null;
    }
    // sino, devuelve el array match con todas las comunas coincidentes
    else {
      return match;
    }

  }



  addRelCrossroadEquipments(crossroadIdSelected: number, newEquipment: number) {
    let newRelCrossroadEquipments: any = [];
    this.crossroads.forEach((item, index) => {
      if (crossroadIdSelected === item.crossroadId) {
        this.crossroads[index].relCrossroadEquipments?.push(newEquipment);
        newRelCrossroadEquipments = this.crossroads[index].relCrossroadEquipments;
      }
    })
    return newRelCrossroadEquipments;
  }

  // Obtener todas las regiones del servicio
  getEquipmentTypes(): EquipmentType[] {
    return this.equipmentTypes;
  }


  getEquipmentContracts(): EquipmentContract[] {
    return this.equipmentContract;
  }


  getBehaviours(relatedEquipmentTypeId: number): Behaviour[] | null {

    let match: Behaviour[] = []; // crea un nuevo array de comunas vacío (match)

    // recorre el array de objetos (comunas) del servicio
    this.behaviours.forEach(item => {
      // si el nombre de región de ese objeto comuna coincide
      // con el nombre de región (string) enviado via parámetro lo agrega al array (match)
      if (item.relatedEquipmentTypeId === relatedEquipmentTypeId) {
        match.push(item); // agrega el item (la comuna) al nuevo array de comunas (match)
      }
    });

    // si la cantidad de registros dentro del array match es 0 returna null
    if (match.length === 0) {
      return null;
    }
    // sino, devuelve el array match con todas las comunas coincidentes
    else {
      return match;
    }
  }


  getAssociatedAttentions(): AssociatedAttentions[] {
    return this.associatedAttentions;
  }

  // Obtiene todos los contratos del servicio
  getContracts(): Contract[] {
    return this.contracts;
  }

  // Obtener todas las regiones del servicio
  getRegions(): Regions[] {
    return this.regions;
  }

  // obtener TODAS las Comunas
  getCommunes(): Communes[] {
    return this.communes;
  }


  getBranchs(): Branchs[] {
    return this.branchs;
  }


  getCommunesBranch(): CommunesBranch[] {
    return this.communesBranch;
  }


  getBehaviour(): Behaviour[] {
    return this.behaviours;
  }


  getApplicant(): Applicant[] {
    return this.applicants;
  }


  getResponsable(): Responsable[] {
    return this.responsables;
  }

  getTechnical(): Technical[] {
    return this.technicals;
  }


  getFunctionArrival(): FunctionArrival[] {
    return this.functionArrival;
  }


  getFunctionFinished(): FunctionFinished[] {
    return this.functionFinished;
  }


  getListCrossroadEquipment(): ListCrossroadEquipment[] {
    return this.listCrossroadEquipment;
  }

  // obtener Comunas por Id de Comuna
  getCommunesById(id: number | undefined): Communes[] {

    let match: Communes[] = []; // crea un nuevo array de comunas vacío (match)

    // recorre el array de objetos (comunas) del servicio
    this.communes.forEach(item => {
      // si el nombre de región de ese objeto comuna coincide
      // con el nombre de región (string) enviado via parámetro lo agrega al array (match)
      if (item.communeId === id) {
        match.push(item); // agrega el item (la comuna) al nuevo array de comunas (match)
      }
    });

    return match;
  }

  // obtener Comunas por Region
  getCommunesByRegion(region: string): Communes[] | null {

    let match: Communes[] = []; // crea un nuevo array de comunas vacío (match)

    // recorre el array de objetos (comunas) del servicio
    this.communes.forEach(item => {
      // si el nombre de región de ese objeto comuna coincide
      // con el nombre de región (string) enviado via parámetro lo agrega al array (match)
      if (item.regionName[0].regionName === region) {
        match.push(item); // agrega el item (la comuna) al nuevo array de comunas (match)
      }
    });

    // si la cantidad de registros dentro del array match es 0 returna null
    if (match.length === 0) {
      return null;
    }
    // sino, devuelve el array match con todas las comunas coincidentes
    else {
      return match;
    }
  }


  getCommunesByBranch(branch: string): CommunesBranch[] | null {

    let match: CommunesBranch[] = []; // crea un nuevo array de comunas vacío (match)

    // recorre el array de objetos (comunas) del servicio
    this.communesBranch.forEach(item => {

      if (item.branchName[0].branchName === branch) {
        match.push(item);
      }
    });


    if (match.length === 0) {
      return null;
    }

    else {
      return match;
    }
  }


  getAssociatedAttention(id: number | undefined): AssociatedAttentions[] {

    let match: AssociatedAttentions[] = []; // crea un nuevo array de comunas vacío (match)

    // recorre el array de objetos (comunas) del servicio
    this.associatedAttentions.forEach(item => {
      // si el nombre de región de ese objeto comuna coincide
      // con el nombre de región (string) enviado via parámetro lo agrega al array (match)
      if (item.associatedAttentionsId === id) {
        match.push(item); // agrega el item (la comuna) al nuevo array de comunas (match)
      }
    });

    return match;
  }


  // Agregar nueva región al servicio
  addRegion(newRegion: Regions) {
    this.regions.push(newRegion);
  }

  // Agregar nueva región al servicio
  addEquipmentType(newEquipmentType: EquipmentType) {
    this.equipmentTypes.push(newEquipmentType);
  }

  // Agregar nueva comuna al servicio
  addBehaviour(newBehaviour: Behaviour) {
    this.behaviours.push(newBehaviour);
  }


  // Agregar nueva comuna al servicio
  addCommune(newCommune: Communes) {
    this.communes.push(newCommune);
  }


  // Agregar nuevo contrato al servicio
  addContract(newContract: Contract) {
    this.contracts.push(newContract);
  }


  addBranch(newBranch: Branchs) {
    this.branchs.push(newBranch);
  }


  addCommuneBranch(newCommuneBranch: CommunesBranch) {
    this.communesBranch.push(newCommuneBranch);
  }


}
