import "./SideBarItem.css";

const SideBarItem:React.FC<{imgLink:string}> = (props) => {
  return (
    <div className="sidebar-item">
      <img src={props.imgLink} alt="not loaded"></img>
    </div>
  )
}

export default SideBarItem