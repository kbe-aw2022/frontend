import { component } from "../store/components-context";
import { product } from "../store/products-context";

const productTypeKeyWords = ["mainboard","ram","gpu","cpu","ssd", "mouse", "keyboard"];
const powerSupplyKeyWords = ["power supply", "power"];
const coolingFanKeyWords =  ["cooling", "fan", "cooling fan"];
const driveKeyWords = ["blueray", "drive"];
const caseKeyWords = ["pc case", "computer case", "case"];

export const filterByNameAndKeyWords = (components:component[], searchFilter:string) =>{
    return components.filter((component)=>{
      if(searchFilter===""){
          return component;
      }
      if(component.name.toLowerCase().includes(searchFilter.toLowerCase())){
          return component;
      }
      if(productTypeKeyWords.includes(searchFilter.toLowerCase())){
          if(component.productGroup.toLowerCase()===searchFilter.toLowerCase()){
              return component;
          }
      }
      if(powerSupplyKeyWords.includes(searchFilter.toLowerCase())){
          if(component.productGroup==="power-supply"){
              return component;
          }
      }
      if(coolingFanKeyWords.includes(searchFilter.toLowerCase())){
          if(component.productGroup==="Cooling fan"){
              return component;
          }
      }
      if(driveKeyWords.includes(searchFilter.toLowerCase())){
          if(component.productGroup==="Blueray-drive"){
              return component;
          }
      }
      if(caseKeyWords.includes(searchFilter.toLowerCase())){
          if(component.productGroup==="PC Case"){
              return component;
          }
      }
      return null;
    })
  }

  export const filterByName = (array:(product|component)[], searchFilter:string) =>{

    return array.filter((element)=>{
      if(searchFilter===""){
        return element;
      }
      if(element.name.toLowerCase().includes(searchFilter.toLowerCase())){
          return element;
      }
      return null;
    })
  }

  const functions = {filterByNameAndKeyWords:filterByNameAndKeyWords,filterByName:filterByName};
  

  export default functions;