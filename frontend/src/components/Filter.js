const Filter = ({ handleChangeFilter }) => {
  return (
    <>
      <h2>Phonebook</h2>

      <div>
                filter shown with <input onChange={handleChangeFilter} />
      </div>
    </>
  )
}

export default Filter
