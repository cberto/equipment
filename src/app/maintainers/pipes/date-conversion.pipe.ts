import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConversion'
})
export class DateConversionPipe implements PipeTransform {

  transform(value: string): string {

    // Pipe personalizado para convertir una fecha obtenida del input date
    // La convierte desde formato yyyy-mm-dd a formato dd-mm-yyyy

    let dateArray: string[] = [];
    let dateConversion: string = '';

    dateArray = value.split('-');
    dateConversion = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;

    return dateConversion;
  }

}
