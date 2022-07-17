import "./ComponentsGridItemMidArea.css"

const ComponentsGridItemMidArea:React.FC<{description:string}> = (props) => {
  return (
    <div className="componentsGridItemMidArea">
        {props.description}
    </div>
  )
}
export default ComponentsGridItemMidArea