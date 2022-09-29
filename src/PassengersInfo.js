import React, { useEffect, useState } from 'react';
import axios from 'axios';


function PassengersInfo() {

    const [passengerList, setPassengerList] = useState([]);
    const [page, setPage] = useState(1);
    const [passengerListNew, setPassengerListNew] = useState([]);
    const [modalList, setModelList] = useState([]);
    const [isVisible, toggles] = useState(false)





    //-----------------------------------------------s pagination Logic---------------------------------------------
    const recordsPerPage = 20;
    const lastIndex = page * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const paginationCount = Math.ceil((passengerList.length) / recordsPerPage);

    const handlePaginationChange = (value) => {
        if (value == 0) {
            value = 1;
        }
        let check = Math.ceil((passengerList.length) / recordsPerPage);
        if (value > check) {
            value = check;
        }
        setPage(value);
        const lastIndex = value * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        setPassengerListNew(passengerList.slice(firstIndex, lastIndex));
    };

    const fetchData = () => {
        axios.get("https://api.instantwebtools.net/v1/passenger?page=0&size=80")
            .then((result) => {
                const list = result.data.data;
                // console.log(typeof (list))
                // console.log((list))
                for (var i in list) {
                    // console.log("list of...", list[i])
                    // console.log("...........", typeof (list[i]))
                    for (var j in list[i]) {
                        // console.log("...........", list[i].airline)
                        // console.log("...........", typeof (list[i].airline));
                        setModelList(list[i].airline);
                        for (var k in list[i]["airline"]) {
                            // console.log("...........", list[i].airline[k])
                            // console.log("...........", typeof (list[i].airline[k]))
                        }
                    }
                }
                // console.log("lists", lists);
                setPassengerList(list);
                setPassengerListNew(list.slice(firstIndex, lastIndex));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const pageLength = (num) => {
        var array = [];
        for (var i = 1; i <= num; i++) {
            array.push(i);
        }
        return array
    };

    const paginationButtons = pageLength(Math.ceil(passengerList.length / recordsPerPage));

    const toggleModal = (id) => {
        toggles((state) => !state)
    }

    useEffect(() => {
        fetchData();
    }, [])

    // console.log("first", passengerList);
    // console.log("ModelList...,.", modalList);

    return (
        <>
            <div>
                <h2>Passenger Information List</h2>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" style={{ cursor: "pointer" }}>
                            <a className="page-link" onClick={() => handlePaginationChange(page - 1)}>
                                Previous
                            </a>
                        </li>
                        {paginationButtons && paginationButtons.map((t, i) => {
                            return (
                                <li key={i} className={`page-item ${page === t ? "active" : ""}`} style={{ cursor: "pointer" }}>
                                    <a className="page-link " onClick={() => handlePaginationChange(i + 1)}>
                                        {i + 1}
                                    </a>
                                </li>
                            );
                        })}
                        <li className="page-item" style={{ cursor: "pointer" }}>
                            <a className="page-link" onClick={() => handlePaginationChange(page + 1)} >
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>

                <div style={{ display: isVisible ? "block" : "none", opacity: isVisible ? 1 : 0 }} className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Airline Details</h5>
                                <button type="button" onClick={() => toggles(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="modal-body table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">country</th>
                                            <th scope="col">Website</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            modalList && modalList.map((row, ind) => {
                                                // console.log("check.......", row);
                                                return <tr >
                                                    <th scope="row">{row.name}</th>
                                                    <th >{row.country}</th>
                                                    <th >{row.website}</th>
                                                    <td>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => toggles(false)}>Continue</button>
                                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">Total Number of Trips</th>
                            <th scope="col">Empty Column</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            passengerListNew && passengerListNew.map((list, index) => {
                                return <tr key={list.id}>
                                    <th scope="row">{list.name}</th>
                                    <th >{list.trips}</th>
                                    <td>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" aria-expanded="false" onClick={() => toggleModal()}>
                                            Check the Airline
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PassengersInfo;