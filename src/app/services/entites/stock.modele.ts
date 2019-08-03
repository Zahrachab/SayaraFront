import {StockVehicule} from './stockVehicule.model';

export interface StockVersion {
  Nombre: number;
  CodeVersion: string;
  NomVersion: string
  Update: string;
  Stock: StockVehicule [];
}

