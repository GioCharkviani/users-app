import { useNavigate } from 'react-router-dom';

import './EachUser.css';

const EachUser = (props) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/user/${props["id"]}`);
    }
    
    return (
        <div className='each-user-container'>
            <div className='each-user-inner' onClick={clickHandler}>
                <div>
                    <img src={props.imageUrl} alt="img" />
                </div>
                <div>
                    <h3>{props.prefix} {props.name} {props.lastName}</h3>
                </div>
                <div>
                    <p>{props.title}</p>
                </div>
            </div>
        </div>
    )
}

export default EachUser;