import type { MetaDispositivo, DispositivosProps } from "@models/interfaces";

export default function DispositivosList({ dispositivos }: DispositivosProps) {
  // Obtener lista de los nombres de los dispositivos
  const deviceList: string[] = dispositivos.map(
    (dispositivo: MetaDispositivo) => {
      return `- ${dispositivo.nombre} (${dispositivo.localPrestado}) -`;
    }
  );

  return (
    <ul>
      {deviceList.map((device: string, index: number) => (
        <li key={index}>{device}</li>
      ))}
    </ul>
  );
}
