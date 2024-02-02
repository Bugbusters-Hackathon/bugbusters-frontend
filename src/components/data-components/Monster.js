import Monsters from "../../assets/img/monster.png";

const Monster = ({data}) => {
/*     if (data === null) {
        return <p>Loading data...</p>;
    } */

    return (
        <div className="monster-img">
            <img src={Monsters} alt="Monster logo" />
        </div>
    );
};

export default Monster;