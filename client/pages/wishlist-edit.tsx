// import { UpdatedItem, Item } from '../../models/item.ts'
// import { useState } from 'react'
// import AddItemForm from './wishlist-item-form.tsx'
// import { SelectedItemForm } from './selected-item-form.tsx'
// // import { ErrorMessage } from './styled.tsx'
// import { useItems } from '../hooks.ts'

// type FormState =
//   | {
//       selectedItem: Item
//       show: 'selected'
//     }
//   | {
//       selectedItem: null
//       show: 'add' | 'none'
//     }

// function Items() {
//   const [error, setError] = useState('')
//   const [form, setForm] = useState<FormState>({
//     selectedItem: null,
//     show: 'none',
//   })
//   const items = useItems()

//   const handleMutationSuccess = () => {
//     handleCloseForm()
//     setError('')
//   }

//   const handleError = (error: unknown) => {
//     if (error instanceof Error) {
//       setError(error.message)
//     } else {
//       setError('Unknown error')
//     }
//   }

//   const mutationOptions = {
//     onSuccess: handleMutationSuccess,
//     onError: handleError,
//   }

//   const handleAdd = (item: UpdatedItem) => {
//     items.add.mutate({ item, token: 'token' }, mutationOptions)
//   }

//   const handleUpdate = (item: Item) => {
//     items.update.mutate({ item, token: 'token' }, mutationOptions)
//   }

//   const handleDeleteItem = (id: number) => {
//     items.delete.mutate({ id, token: 'token' }, mutationOptions)
//   }

//   const hideError = () => {
//     setError('')
//   }

//   const handleOpenAddForm = () => {
//     setForm({ show: 'add', selectedItem: null })
//   }

//   const handleCloseForm = () => {
//     setForm({ show: 'none', selectedItem: null })
//   }

//   const handleSelectItem = (item: Item) => {
//     setForm({ show: 'selected', selectedItem: item })
//   }

//   if (items.isLoading) {
//     let failures = ''
//     if (items.failureCount > 0) {
//       failures = ` (failed ${items.failureCount} times)`
//     }
//     return <div>Loading... {failures}</div>
//   }

//   let fetchStatus = ''
//   if (items.add.isLoading) fetchStatus = 'Adding...'
//   if (items.update.isLoading) fetchStatus = 'Updating...'
//   if (items.delete.isLoading) fetchStatus = 'Deleting...'
//   if (items.isRefetching) fetchStatus = 'Refreshing...'

//   if (items.error instanceof Error) {
//     return (
//       <ErrorMessage>Failed to load items: {items.error.message}</ErrorMessage>
//     )
//   }

//   return (
//     <>
//       {error !== '' && (
//         <ErrorMessage onClick={hideError}>Error: {error}</ErrorMessage>
//       )}
//       {fetchStatus !== '' && <div>{fetchStatus}</div>}
//       <ul>
//         {items.status === 'success' &&
//           items.data.map((item) => (
//             <li key={item.id}>
//               <button onClick={() => handleSelectItem(item)}>
//                 {item.name}
//               </button>
//             </li>
//           ))}
//       </ul>
//       {form.show === 'add' ? (
//         <AddItemForm onAdd={handleAdd} onClose={handleCloseForm} />
//       ) : (
//         <button onClick={handleOpenAddForm}>Add an Item</button>
//       )}
//       {form.show === 'selected' && (
//         <SelectedItemForm
//           key={form.selectedItem.id}
//           item={form.selectedItem}
//           onUpdate={handleUpdate}
//           onDelete={handleDeleteItem}
//           onClose={handleCloseForm}
//         />
//       )}
//     </>
//   )
// }

// export default Items
