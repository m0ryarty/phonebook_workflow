
const PersonForm = ({ addName, handleChangeName, handleChangeNumber, newNumber, newName }) => {
    return (
        <>
            <h2>add a new</h2>
            <form onSubmit={addName}>

                <div>
                    name: <input value={newName} onChange={handleChangeName} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleChangeNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm