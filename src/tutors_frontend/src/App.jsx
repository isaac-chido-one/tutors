import { useState } from 'react';
import { tutors_backend } from 'declarations/tutors_backend';
import Table from './components/Table'
import ModalCreate from './components/ModalCreate';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    const [greeting, setGreeting] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        tutors_backend.greet(name).then((greeting) => {
            setGreeting(greeting);
        });
        return false;
    }

    function loadModal(event) {
        event.preventDefault();
        const modalCreate = document.getElementById('modal_create');
        console.log(modalCreate);
        const modal = new bootstrap.Modal(modalCreate);
        console.log(modal);
    }

    return (
        <div className="container">
    <main>
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>

            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 class="h2">Tutores</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <button class="btn btn-sm btn-outline-secondary" onClick={loadModal}>Registrar</button>
                </div>
            </div>
            <Table />
            <ModalCreate />
        </div>
    );
}

export default App;
