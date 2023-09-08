import React from 'react'
import { Item } from '../../models/item.ts'
import { useState } from 'react'
// import { GridForm, ColOne, ColTwoText, Button } from './styled.tsx'

interface Props {
  item: Item
  onUpdate: (item: Item) => void
  onDelete: (id: number) => void
  onClose: () => void
}

export function SelectedItemForm({ item, onUpdate, onDelete, onClose }: Props) {
  const handleUpdate = () => {
    onUpdate(item)
  }

  const handleDelete = () => {
    onDelete(item.id)
  }

  return (
    <div>
      <h2>Update Item</h2>
      <button onClick={handleUpdate}>Update Item</button>
      <button onClick={handleDelete}>Delete Item</button>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export function EditingItemForm({ item, onUpdate, onDelete, onClose }: Props) {
  const [updatedItem, setUpdatedItem] = useState(item)

  const {
    item: editingName,
    priority: editingPriority,
    price: editingPrice,
    purchased: editingBoolean,
  } = updatedItem
  const { item: currentName } = item

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUpdatedItem({
      ...updatedItem,
      [name]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onUpdate(updatedItem)
  }

  const handleDeleteButtonClick = () => {
    onDelete(item.id)
  }
  ////////////////////////////////////check this is called item.id

  return (
    <>
      <h2>Selected: {currentName}</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="item"> Edit item:</label>
        <input
            type="text"
            name="name"
            id="name"
        value={editingName}
        onChange={handleTextChange}
        ></input>

<label htmlFor="price"> Edit price:</label>
        <input
            type="text"
            name="name"
            id="name"
        value={editingPrice}
        onChange={handleTextChange}
        ></input>

<label htmlFor="purchased"> Purchased:</label>
        <input
          type="checkbox"
          name="purchased"
          id="purchased"
          value={'false'}
          onChange={handleTextChange}
        ><input/>

<label htmlFor="priority"> Priority:</label>
        <input
          type="number"
          name="purchased"
          id="purchased"
          value={editingPriority}
          onChange={handleTextChange}
        ><input/>
        
         <button onSubmit={handleSubmit}> Finish Editing </button> 
</form>
</>

)
       


