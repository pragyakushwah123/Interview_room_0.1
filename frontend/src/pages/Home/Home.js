import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    return (
        <>
            <div className='col-12 background herosection py-5'>
                <div className='container'>
                    <div className='row justify-content-center align-items-center'>
                        <div className='col-12 text-center mt-5'>
                            <div className='mb-5'>
                                <section>
                                    <div class="loading loading05">
                                        <span>I</span>
                                        <span>N</span>
                                        <span>T</span>
                                        <span>E</span>
                                        <span>R</span>
                                        <span>V</span>
                                        <span>I</span>
                                        <span>E</span>
                                        <span>W</span>
                                        <span class="space">&nbsp;</span>
                                        <span>W</span>
                                        <span>A</span>
                                        <span>R</span>
                                        <span>M</span>
                                        <span>U</span>
                                        <span>P</span>
                                    </div>
                                </section>

                            </div>
                            <div className='whitecolor mb-5'>
                                <h5>A quick way to  prepare for your next interview  in </h5>
                                <h5>Various Fields</h5>
                                <h5>Practice key questions  , get insights about your answers and get more comfortable interviewings</h5>
                            </div>
                            <div>
                                <Link to={'/login'}>
                                    <button className='btn btn-primary'>Start Practicing</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
