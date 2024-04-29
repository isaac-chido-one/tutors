import { useEffect, useState } from 'react';
import { tutors_backend } from 'declarations/tutors_backend';
import accounting from 'accounting';


function Table() {
    const [tutors, setTutors] = useState([]);

    function requestIndex() {
        tutors_backend.index().then((tutors) => {
            console.log(tutors);
            setTutors(tutors);
        });
    }

    useEffect(() => {
        requestIndex();
    }, []);

    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">Instructor</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Curso</th>
                        <th scope="col">Costo por hora</th>
                        <th scope="col">Teléfono</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                {tutors.map((tutor) => {
                    return (
                    <tr key={tutor.id}>
                        <td>{tutor.name}</td>
                        <td>{tutor.category}</td>
                        <td>{tutor.subject}</td>
                        <td>{accounting.formatMoney(tutor.cost)}</td>
                        <td>{tutor.phone}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
