import React from 'react';
import {Link} from "react-router-dom";

const SingleHero = ({_id,nickname,images}) => {

    let files = []
    images.forEach((img) =>{
        files.push(img.filename);

    })
    return (
            <div className='heroes_item'>
                <Link to={`hero/${_id}`} className='hero_image_cover'>
                    <img src={`http://localhost:4000/uploads/` + files[0]} className='hero_image'  width={250} height={350}  alt={nickname}/>
                </Link>
                <h4 className='nickname'>{nickname}</h4>
            </div>
    );
};

export default SingleHero;