import PacmanLoader from "react-spinners/PacmanLoader";

const Spinner = ({loader}) =>{

    return     <PacmanLoader
    color="red"
    loading={loader}
    size={70}
    aria-label="Loading Spinner"
    data-testid="loader"
/>
}

export default Spinner;