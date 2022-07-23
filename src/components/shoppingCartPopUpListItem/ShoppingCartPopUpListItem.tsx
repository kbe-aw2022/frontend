import "./ShoppingCartPopUpListItem.css"

const ShoppingCartPopUpListItem:React.FC<{itemKey:string, itemName:string, itemAmount:number, price:number}> = (props) => {
  return (
    <li key={props.itemKey} className="shopping-cart-list-item" >
      <p className="shopping-cart-list-item-name">{props.itemName}</p>
      <div className="shopping-cart-list-item-price-amount-detail-bar">
        <p className="shopping-cart-list-item-price-tag">{props.price}&euro;</p>
        <button>{'<'}</button>
        <input type="text" className="shopping-cart-list-item-amount" value={props.itemAmount}></input>
        <button>{'>'}</button>
      </div>
    </li>
   
  )
}
export default ShoppingCartPopUpListItem