
const Persons = ({ persons, personFilter, handleClick }) => {    

    return <>
        <h2>Numbers</h2>


        {
            persons.map(person => {

                const filter = person.name.toLowerCase().includes(`${personFilter.toLowerCase()}`)


                return filter && 
                    <div key={person.id}>
                        {person.name}: {person.number}{'      '}
                        <button id={person.id} name={person.name} onClick={handleClick}>delete</button>
                    </div>


            })
        }

    </>
}

export default Persons