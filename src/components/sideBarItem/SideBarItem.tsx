import { useContext } from "react";
import { authContext } from "../../store/auth-context";
import { viewContext } from "../../store/view-context";
import styles from "./SideBarItem.module.css";


const SideBarItem:React.FC<{imgLink:string, viewName:string}> = (props) => {

  const viewCtx = useContext(viewContext);
  const authCtx = useContext(authContext);

  const onClickHandler = () =>{
    viewCtx.setView(props.viewName);
  }
  
  let bgColor = {}

  if(!authCtx.isLoggedIn && props.viewName!=="components"){
    bgColor = {"backgroundColor":"rgb(100,100,100)"};
  }else if(viewCtx.view===props.viewName){
    bgColor = {"backgroundColor":"rgb(190,190,190)"};
  }

  return (
    <button className={styles["sidebar-item"]} style={bgColor} onClick={onClickHandler} disabled={!authCtx.isLoggedIn}>
      <img src={props.imgLink} alt="not loaded" ></img>
      <div className={styles["tooltip"]}>{ !authCtx.isLoggedIn && props.viewName!=="components" ? `Please login to use ${props.viewName}` : props.viewName }</div>
    </button>
  )
}

export default SideBarItem