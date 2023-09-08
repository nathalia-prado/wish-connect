import { useState } from 'react'
import { Item } from '../../models/item'

interface Props {
  items: Item[]
  handleDelete: (index: number) => void
}

export default function Calculator({ items, handleDelete }: Props) {
  const [savingAmount, setSavingsAmount] = useState('')
  const [weeks, setWeeks] = useState<null | number>(null)

  const listItems = items.map((item, index) => (
    <li key={item.id} className="flex justify-between calc-list-border">
      <div>
        <p className="calc-list">
          {item.item} | ${item.price}
        </p>
      </div>
      <button
        onClick={() => handleDelete(index)}
        className="text-right calc-list"
      >
        ❌
      </button>
    </li>
  ))

  const itemPriceArr = items.map((item) => item.price)
  const totalPrice = itemPriceArr.reduce(
    (accumulator, current) => accumulator + current,
    0
  )

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavingsAmount(e.target.value)
  }

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const weeks = Math.ceil(totalPrice / Number(savingAmount))
    setWeeks(weeks)
  }

  return (
    <div className="flex justify-around bg-gray-100">
      <div className="w-2/5">
        <h1>Calculator</h1>
        <h2>Items:</h2>
        <div>
          <ul>{listItems}</ul>
          <p>Total cost: ${totalPrice}</p>
        </div>
      </div>
      <div>
        <h2>Savings Timeframe:</h2>
        <form onSubmit={handleCalculate}>
          <label htmlFor="savings">Enter weekly savings $ </label>
          <input
            type="number"
            onChange={handleFormChange}
            name="savings"
            id="savings"
            value={savingAmount}
          ></input>
          <button className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
            Calculate
          </button>
        </form>
        {weeks !== null && (
          <h3>
            It will take <strong>{weeks}</strong> weeks to save for these items
          </h3>
        )}
      </div>
    </div>
  )
}

// Add button to wishlist to add item to calculator
// Reveal calculator button?
// List of the items in calculator
// Remove item from calculator

// Calculator div that shows total cost
// input for weekly savings
// calculate button that shows weeks until you saved enough
{
  /* <div class="mx-auto grid max-w-4xl grid-cols-12 gap-4 bg-zinc-50 p-1">
  <div class="header col-span-12 rounded-lg border border-gray-300 bg-gray-600 py-8">
    <!-- Header content -->
  </div>
  <div class="col-span-12 rounded-lg border border-gray-500 bg-gray-200 p-32 sm:col-span-8">
    <!-- Main Content -->
  </div>
  <div class="col-span-12 rounded-lg border border-gray-400 bg-gray-200 p-16 sm:col-span-4">
    <!-- Sidebar -->
  </div>
  <div class="footer col-span-12 rounded-lg border border-gray-800 bg-gray-700 p-6">
    <!-- Footer content -->
  </div>
</div> */
}
