'use client'

import { useState } from 'react';
import { Modal } from '../components/Modal';

export default function Page() {
 const [modalOpen, setModalOpen] = useState(false)




    return (
<>

<button onClick={()=>{setModalOpen(!modalOpen)}}>Show/hide</button>

<Modal isOpen={modalOpen} onClose={()=>{setModalOpen(!modalOpen)}}> Here's some text </Modal>


</>

    );
};
