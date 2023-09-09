import { UpdatedItem } from '../../models/item.ts'

import { useState } from 'react'

interface Props {
  onAdd: (item: UpdatedItem) => void
  onClose: () => void
}

const emptyItem: UpdatedItem = {
  item: '',
  priority: '',
  price: 0,
  purchased: false,
}

function AddItemForm({ onAdd, onClose }: Props) {
  const [newItem, setNewItem] = useState(emptyItem)

  const {
    item: addingName,
    priority: addingPriority,
    price: addingPrice,
    purchased: addingBoolean,
  } = newItem

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewItem({
      ...newItem,
      [name]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onAdd(newItem)
  }

  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="addingItem">Item:</label>
        <input
          type="text"
          name="item"
          id="item"
          value={addingName}
          onChange={handleChange}
        />

        <label htmlFor="addingPrice">Price:</label>
        <input
          type="number"
          name="price"
          id="price"
          value={addingPrice}
          onChange={handleChange}
        />

        <label htmlFor="addingBoolean">Purchased:</label>
        <input
          type="checkbox"
          name="purchased"
          id="purchased"
          value={'false'}
          onChange={handleChange}
        />

        <label htmlFor="addingPriority">Priority:</label>
        <input
          type="string"
          name="priority"
          id="priority"
          value={addingPriority}
          onChange={handleChange}
        />
        <button> Add an item</button>
      </form>
    </>
  )
}

export default AddItemForm
