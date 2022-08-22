import React from "react"
import Modal from "../../layout/Modal/Modal"
import { component } from "../../store/components-context"
import ComponentsGridItemMidArea from "../componentsGridItemMidArea/ComponentsGridItemMidArea"
import GridItem from "../gridItem/GridItem"

const ComponentDetailViewModal:React.FC<{onClose:()=>void, componentProps:component, imgLink:string, itemId:string}> = (props) => {
    
    const midArea = <ComponentsGridItemMidArea componentProps={props.componentProps} isDetailedView={true}/>
 
    return (
      <Modal onClose={props.onClose}>
          {/* <div className={styles['component-detail-view']}> */}
            <GridItem isDetailedView={true} onClose={props.onClose} imgLink={props.imgLink} itemProps={props.componentProps} itemId={props.itemId} midArea={midArea}></GridItem>
          {/* </div> */}
      </Modal>
  )
}
export default ComponentDetailViewModal