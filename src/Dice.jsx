export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391': 'white'
    }

    return(
        <button 
            className='dice'
            style={styles}
            onClick={props.hold}
        >
            {props.value}
        
        </button>
    )
}