import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, Navigate, useParams} from "react-router-dom";

const FullHeroInfo = ({}) => {

    const {id} = useParams();
    const [heroInfo,setHeroInfo] = useState([]);
    const [loading,setLoading] = useState(false);
    const [redirect,setRedirect] = useState(false);

    const {nickname,realname,description,superpowers,phrase,images = []} = heroInfo;

    useEffect(() => {
        async function getHero(){
            try{
                setLoading(true)
                const {data} = await axios.get(`http://localhost:4000/api/v1/hero/${id}`);
                setHeroInfo(data);
            } catch (err) {
                alert(`Error while loading a page`);
                setRedirect(true);

            } finally {
                setLoading(false);
            }
        }
        getHero()
    },[])

    const deleteHero =  async () => {
        try {
            const hero = await axios.delete(`http://localhost:4000/api/v1/hero/${id}`);
            alert(`Hero deleted successfully!`);
            setRedirect(true);
        } catch (err) {
            alert(`Error while deleting a hero`);
            console.error(err);

        }
    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }

    if (loading) {
        return <h1 style={{textAlign:'center'}}>Loading...</h1>
    }
    return (
            <div className='FullHeroInfo'>
                <Link className='link_back' to={'/'} >

                    <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
                    </svg>

                    return

                </Link>
                <h3 ><span className='info_kind'>Hero:</span>  {nickname}</h3>
                <h3><span className='info_kind'>Real name:</span>  {realname}</h3>
                <p className='description_hero'><span className='info_kind'>Desription:</span> {description}</p>
                <p className='description_hero'><span className='info_kind'>Superpowers:</span> {superpowers}</p>
                <p className='description_hero'><span className='info_kind phrase'>Catch phrase:</span> {phrase}</p>

                <h3 style={{paddingTop:'20px'}}>Photos of {nickname}</h3>

                <div className='images'>
                    {
                        images.map((img) => {
                            return   <div className='single_image'>
                                         <img src={`http://localhost:4000/uploads/`+ img.filename} alt=""/>
                                     </div>
                        })
                    }



                </div>

                <div className='links'>
                    <Link className='btn' to={`/edit/${id}`}>Edit a hero</Link>
                    <Link onClick={deleteHero} className='btn' to href="">Delete a hero</Link>
                </div>

            </div>
        );
};

export default FullHeroInfo;