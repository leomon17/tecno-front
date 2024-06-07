import { ResponseApi } from "@/kernel/types";
import { Unit } from "../entities/Unit";
import { UnitRepository } from "../use-cases/ports/unit.repository";
import axios, { AxiosResponse } from 'axios';
import { ConsultUnit } from "./dtos/UnitDtos";


export class UnitStorageGateway implements UnitRepository {
    
    //Función de Consulta Unidades
    async getUnits(unit: ConsultUnit): Promise<ResponseApi<Unit>> {
       
        try {
            //Envios de petición hacia el Back
            const url = `http://localhost:3100/unidades/searchunidad/${unit.startdate}/${unit.enddate}/${unit.idgps}`;
            const response: AxiosResponse<{ total: number, unidades: Array<any> }> = await axios.post(url);
            //Asignar Datos de respuesta            
            return {
                status: response.status,
                entities: response.data.unidades,
                total: response.data.total,
                result : true
            };
        } catch (error) {
            // Manejo de Errores
            console.error("Error al realizar la solicitud:", error);
            return {
                status: 500,
                result: false,
            };
        }
    }

    //Función de Registro
    async addUnit(unit: Unit): Promise<ResponseApi<Unit>> {
        //Estructura de Datos para petición
        const url = "http://localhost:3100/unidades/registerunidad";
        const headers = {};
        try {
            //Ejecuta POST
            const response: AxiosResponse<{ registered: boolean }> = await axios.post(url, unit, { headers });
            return {
                status: response.status,
                result: response.data.registered,
            };
        } catch (error) {
            
            console.error("Error al realizar la solicitud:", error);
            return {
                status: 500,
                result: false,
            }; 
        }
    }

}