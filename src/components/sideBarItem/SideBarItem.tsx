import { useContext } from "react";
import { viewContext } from "../../store/view-context";
import "./SideBarItem.css";


const SideBarItem:React.FC<{imgLink:string, viewName:string}> = (props) => {

  const viewCtx = useContext(viewContext);

  const onClickHandler = () =>{
    viewCtx.setView(props.viewName);
  }
  

  return (
    <div className="sidebar-item" onClick={onClickHandler}>
      <img src={props.imgLink} alt="not loaded" ></img>
      <div className="tooltip">{props.viewName}</div>
    </div>
  )
}

export default SideBarItem