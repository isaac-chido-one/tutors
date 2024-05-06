import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { tutors_backend } from 'declarations/tutors_backend';
import accounting from 'accounting';
import { Trash } from 'react-bootstrap-icons';

const Table = forwardRef((props, ref) => {
    const [tutors, setTutors] = useState([]);

    function requestIndex() {
        tutors_backend.index().then((tutors) => {
            setTutors(tutors);
        });
    }

    const requestDestroy = async (id) => {
        await tutors_backend.destroy(id);
        requestIndex();
    };

    useImperativeHandle(ref, () => ({
        reload() {
            requestIndex();
        }
    }));

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
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tbody">
                {tutors.map((tutor) => {
                    return (
                    <tr key={tutor.id}>
                        <td>{tutor.name}</td>
                        <td>{tutor.category in props.categories ? props.categories[tutor.category] : tutor.category}</td>
                        <td>{tutor.subject}</td>
                        <td>{accounting.formatMoney(tutor.cost)}</td>
                        <td>{tutor.phone}</td>
                        <td>
                            <a title="Delete" onClick={() => requestDestroy(`${tutor.id}`)}>
                                <Trash />
                            </a>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
});

export default Table;
