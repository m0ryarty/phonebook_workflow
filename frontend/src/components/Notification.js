const Notification = ({ message, error }) => {


    const colorMessage = error ? 'red' : 'green'

    const notificationStyle = {
        color: colorMessage,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }


    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification