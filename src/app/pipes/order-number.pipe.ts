import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderNumber'
})
export class OrderNumberPipe implements PipeTransform {

  transform(value: unknown, desiredLength: number): string {
    let valueString: string = '';
    try
    {
      valueString = value.toString();
    }
    catch(error) {
      return error.message;
    }

    if(valueString.length >= desiredLength) 
    {
      return valueString;
    }
    else {     
      for(var i=valueString.length ; i<desiredLength ; i++)
      {
        valueString = '0'+valueString;
      }
      return valueString;
    } 
  }

}
