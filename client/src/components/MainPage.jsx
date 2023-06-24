import React, {useEffect, useState} from 'react';
import TypewriterComponent from "typewriter-effect";
import SingleHero from "./SingleHero";
import axios, {post} from "axios";
const MainPage = () => {

    const [heroes,setHeroes] = useState([]);
    const [loading,setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = heroes.slice(indexOfFirstItem, indexOfLastItem);


    useEffect(() => {
        async function getHeroes(){
            try {
                setLoading(true)
                const {data} = await axios.get(`http://localhost:4000/api/v1/hero`);
                setHeroes(data);

            } catch (err) {
                alert(`Error while loading a page `)
            } finally {
                setLoading(false);
            }
        }

        getHeroes()
    },[])


    if (!heroes) {
        return <h1>Unknown error occured</h1>
    }

    if (loading) {
        return <h1 style={{textAlign:'center'}}>Loading....</h1>
    }




    return (
        <>
                <section className='start'>
                    <p className='start_stranger'>Hello Stranger :)</p>
                    <TypewriterComponent
                        options={{
                            delay:'30'

                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString('<strong>Nice to see you here)<strong/>')
                                .pauseFor(2000)
                                .deleteAll()
                                .typeString('<b>In a world filled with ordinary people, there exists a special breed of individuals known as superheroes</b>')
                                .start()
                        }}
                    />
                </section>

            <section className='heroes'>
                <div className='heroes_list'>
                    {
                        currentItems.map((hero) => (
                            <SingleHero
                                key={hero._id}
                                {...hero}
                            />
                        ))
                    }
                </div>

                <div  className='btn_group'>
                    <button className='btn' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <button className='btn' onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= heroes.length}>Next</button>
                </div>

            </section>


            {
                heroes.length < 0 && <h3 style={{textAlign:"center"}}>You can create a hero,but for now there is no one</h3>
            }
       </>

    );
};

export default MainPage;