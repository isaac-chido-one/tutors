import { useRef } from 'react';
import Table from './components/Table'
import ModalCreate from './components/ModalCreate';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const ref = useRef();

    const handleReload = () => {
        ref.current.reload();
    };

    const categories = {
        1: 'Dancing',
        2: 'Driving',
        3: 'Kitchen',
        4: 'Languages',
        5: 'Programing',
        6: 'Science',
        7: 'Sports'
    };

    return (
        <div className="container">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 class="h2">Tutores</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <ModalCreate categories={categories} handler={handleReload} />
                </div>
            </div>
            <Table categories={categories} ref={ref} />
        </div>
    );
}

export default App;
