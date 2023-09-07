import { UpdatedItem } from '../../models/item.ts'

import { useState } from 'react'

import { GridForm, ColOne, ColTwoText, Button } from './styled.tsx'

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
      <GridForm onSubmit={handleSubmit}>
        <ColOne htmlFor="name">Item:</ColOne>
        <ColTwoText
          type="text"
          name="item"
          id="item"
          value={addingName}
          onChange={handleChange}
        />

        <ColOne htmlFor="addingPrice">Price:</ColOne>
        <ColTwoText
          type="number"
          name="price"
          id="price"
          value={addingPrice}
          onChange={addingPrice}
        />

        <ColOne htmlFor="addingBoolean">Purchased:</ColOne>
        <ColTwoText
          type="boolean"
          name="purchased"
          id="purchased"
          value={addingBoolean}
          onChange={addingBoolean}
        />

        <ColOne htmlFor="addingPriority">Priority:</ColOne>
        <ColTwoText
          type="string"
          name="priority"
          id="priority"
          value={addingPriority}
          onChange={addingPriority}
        />

        <Button
          type="submit"
          disabled={
            addingName === '' || addingPrice === 0 || addingPriority === ''
          }
        >
          Add item
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </GridForm>
    </>
  )
}

export default AddItemForm
