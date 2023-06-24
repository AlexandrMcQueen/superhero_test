import React, {useState} from 'react';
import axios from "axios";
import {Navigate} from "react-router-dom";

const CreateHero = () => {
    const [nickname,setNickname] = useState('');
    const [realname,setRealName] = useState('');
    const [description,setDescription] = useState('');
    const [superpowers,setSuperpowers] = useState('');
    const [phrase,setPhrase] = useState('');
    const [images,setImages] = useState([]);
    const [redirect,setRedirect] = useState(false);


    const onSelectFiles = (e) => {

        e.preventDefault()

        const selectedFiles = e.target.files
        const selectedFilesArray = Array.from(selectedFiles);


        setImages((prevImage) => prevImage.concat(selectedFilesArray));
    }

    const sendHero = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.set('nickname',nickname);
        formData.set('realname',realname);
        formData.set('description',description);
        formData.set('superpowers',superpowers);
        formData.set('phrase',phrase);


        for (let i=0; i<images.length; i++) {
            formData.append('files', images[i]);
        }


        if (!nickname || !realname || !description || !superpowers || !phrase || !images) {
            alert(`To create a hero you need to fill in every input field`);
            return;
        }


        try {
            const response = await axios({
                method:"POST",
                data:formData,
                headers:{"Content-Type": "multipart/form-data"},
                url:'http://localhost:4000/api/v1/hero',

            })
            alert(`Success`);

            setRedirect(true);

        } catch (err) {
            console.error(err)
            alert(`Error while uploading`);
        } finally {
            setNickname('');
            setRealName('');
            setDescription('');
            setPhrase('');
            setSuperpowers('');
        }





    }
    if (redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className='create_herro_section'>
            <form id='hero_form' className='form' onSubmit={sendHero}>
                <h3>Ok,you want to create a hero,let's do it.</h3>

                    <input
                        value={nickname}
                        name='nickname'
                        onChange={(e) => setNickname(e.target.value)}
                        type="text"
                        placeholder='nickname'
                    />

                    <input
                        value={realname}
                        name='realname'
                        onChange={(e) => setRealName(e.target.value)}
                        type="text"
                        placeholder='realname'
                    />

                    <textarea
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='description'
                    />

                    <textarea
                        name='superpowers'
                        value={superpowers}
                        onChange={(e) => setSuperpowers(e.target.value)}
                        id='superpowers'
                        placeholder='superpowers'
                    />

                    <textarea
                        name='phrase'
                        value={phrase}
                        onChange={(e) => setPhrase(e.target.value)}
                        id='phrase'
                        placeholder='catch phrase'
                    />


                <label className='file_label' htmlFor="file">
                    Add a {images.length ? images.length : ''} photo
                    <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"/>
                    </svg>

                </label>

                <input
                    name='images[]'
                    id='file'
                    onChange={onSelectFiles}
                    className='file_input'
                    multiple
                    type="file"
                    accept='image/*'

                />

                <div className='selected_images'>
                    {
                        images && images.map((img,index) => {
                            return ( <div  key={index}>
                                <img width={150} height={200} src={URL.createObjectURL(img)} alt="Image" className='single_image_from_select'/>

                                <svg
                                    onClick={() => setImages(images.filter((e) => e !== img))} width={20} height={20}
                                    style={{cursor:'pointer'}}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                </svg>

                            </div>)
                        })
                    }
                </div>



            </form>

            <button form='hero_form' className='btn' type='submit'>
                Send hero
                <svg  width={30} height={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                </svg>
            </button>
        </div>
    );
};

export default CreateHero;