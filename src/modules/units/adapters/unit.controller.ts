import { ResponseApi } from "@/kernel/types";
//import { Unit } from "../entities/Unit";
import { AddUnitInteractor } from "../use-cases/add-unit.interactor";
import { UnitRepository } from "../use-cases/ports/unit.repository";
import { UnitStorageGateway } from "./unit-storage.gateway";
import { ConsultUnit } from "./dtos/UnitDtos";
import { GetUnitsInteractor } from "../use-cases/get-units.interactor";

export class UnitController {
    
    //Registro de una Unidad
    async addUnit(unit: { idgps: number; brand: string; model: string; plate: string; serie: string; year: string; color: string; line: string; unit_name: string; group_name: string; }) {
        try {
            //Instancia Storage
            const repository: UnitRepository = new UnitStorageGateway();
            const addUnitInteractor: AddUnitInteractor = new AddUnitInteractor(repository);
            //Envio de datos a Interactor
            return await addUnitInteractor.execute(unit)
        } catch (error) {
            console.log(error);
            return {
                status: 400,
                result: false,
            } as ResponseApi<any>;
        }
    }

    //Consulta unidades
    async getUnits(consult: ConsultUnit) {
        //Instancia Storage

        const unitRepository: UnitRepository = new UnitStorageGateway();
        const unitInteractor: GetUnitsInteractor = new GetUnitsInteractor(unitRepository);
        try {
            //Envio de datos a Interactor
            const resp: ResponseApi<any> = await unitInteractor.execute(consult);
            return resp;

        } catch (error) {
            console.log(error);
            const resp: ResponseApi<any> = {
                status: 400,
                result: false,
                entities: [],
            };
            return resp;
        }
    }
}