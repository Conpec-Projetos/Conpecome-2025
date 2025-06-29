import React from "react";
import ReactExport from "react-data-export";
import Image from "next/image";
import adicionar from "@/assets/images/Adicionar.png"
import { useState } from 'react';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

interface Item {
  cliente: string;
  produto: string;
  valor: number;
}
interface Mes {
  label: string;
  ano: number;
  itens: Item[];
}

const [meses] = useState<Mes[]>([
    {
      label: 'Fevereiro',
      ano: 2025,
      itens: [
        { cliente: 'João',  produto: 'Paçoquinha',    valor: 0.85 },
        { cliente: 'João',  produto: 'Sonho de Valsa', valor: 1.50 },
        { cliente: 'João',  produto: 'Toddynho',       valor: 0.89 },
        { cliente: 'Maria', produto: 'KitKat',         valor: 1.20 },
      ],
    },
    {
      label: 'Janeiro',
      ano: 2025,
      itens: [
        { cliente: 'Maria', produto: 'KitKat',   valor: 1.20 },
        { cliente: 'João',  produto: 'Toddynho', valor: 0.89 },
      ],
    }
])
const ExportToExcellButton = () => {

    const ExportButtonElement = (
        <button>
            <Image 
              src={adicionar}
              alt="adicionar"
              className="py-16"
              width={80}
              height={80}
            />
          </button>
    )
    return (
        <ExcelFile element={ExportButtonElement}>
             <ExcelSheet data={[meses]} name="meses">
                <ExcelColumn label="Nome" value="clientes"  />
             </ExcelSheet>
        </ExcelFile>

    )
}

export default ExportToExcellButton;