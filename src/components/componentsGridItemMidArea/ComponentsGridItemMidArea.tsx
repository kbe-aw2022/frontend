import { Fragment } from "react"
import { component } from "../../store/components-context"
import shortenedStyle from "./ComponentsGridItemMidAreaShortened.module.css"
import detailedStyle from "./ComponentsGridItemMidAreaDetailed.module.css"


const ComponentsGridItemMidArea:React.FC<{componentProps:component, isDetailedView:boolean}> = (props) => {
  
  let midAreaStyle = props.isDetailedView ? detailedStyle : shortenedStyle;
  
  const shortenedContent = <Fragment>
    <p className={midAreaStyle['product-group']}>{props.componentProps.product_group}</p>
    <p className={midAreaStyle.property}><span className={midAreaStyle['property-name']}>Status: </span> {props.componentProps.status}</p>
    <p className={midAreaStyle.property}><span className={midAreaStyle['property-name']}>Vendor: </span>{props.componentProps.vendor}</p>
    <p className={midAreaStyle.description}><span className={midAreaStyle['property-name']}>Description: </span>{props.componentProps.description + "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."}</p>
  </Fragment> 

  const detailedContent = <Fragment>
    <p className={midAreaStyle.property}><span className={midAreaStyle['property-name']}>Type: </span>{props.componentProps.product_group}</p>
    <p className={midAreaStyle.property}><span className={midAreaStyle['property-name']}>Status: </span>{props.componentProps.status}</p>
    <p className={midAreaStyle.property}><span className={midAreaStyle['property-name']}>Weight: </span>{props.componentProps.weight}</p>
    <p className={midAreaStyle.property}><span className={midAreaStyle['property-name']}>Vendor: </span>{props.componentProps.vendor}</p>
    <p className={midAreaStyle.manufacturer}><span className={midAreaStyle['property-name']}>Manufacturer: </span>{props.componentProps.manufacturer}</p>
    <p className={midAreaStyle.property}><span className={midAreaStyle['property-name']}>Ean-number: </span>{props.componentProps.ean_number}</p>
    <p className={midAreaStyle.description}><span className={midAreaStyle['property-name']}>Description: </span>{props.componentProps.description + "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."}</p>
  </Fragment> 


  
  return (
    <div className={midAreaStyle['componentsGridItemMidArea']}>
       {props.isDetailedView ? detailedContent : shortenedContent}
    </div>
  )
}
export default ComponentsGridItemMidArea