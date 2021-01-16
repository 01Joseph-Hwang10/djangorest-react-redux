import React from 'react';

function ToDoCardInput(props) {

    const notAvailable = () => {
        alert("Currently not available... Sorry :/");
    }
    if (window.matchMedia("screen and (min-width: 640px)").matches) {
        return (
            <div className="p-2 h-32 w-52 lg:h-48 lg:w-64 shadow-md bg-pink-200 rounded-lg pt-0">
                <div className="flex justify-center items-center h-1/6 pt-0 mt-0">
                    <div className="w-3/12"></div>
                    <div className="w-6/12 md:-mt-1 lg:-mt-2 bg-pink-400 border border-pink-500 flex justify-center rounded rounded-t-none"><span className="text-center text-gray-700">|||</span></div>
                    <div className="w-3/12"></div>
                </div>
                <div className="flex justify-center h-5/6">
                    <form className="w-11/12 flex flex-col items-center justify-between">
                        <div className="p-2 flex flex-col w-full items-center">
                            <input className="input2 w-full text-left p-1" placeholder="To-Do"></input>
                            <input className="input2 w-full text-left p-1" placeholder="Description"></input>
                        </div>
                        <div className="-mt-1 w-full flex justify-center items-center">
                            <button className="rounded bg-blue-400 text-white font-bold p-1 w-1/2 mt-2" onClick={notAvailable}>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div className="bg-pink-300 rounded-lg shadow-md w-full flex justify-start items-center">
                <div className="bg-pink-400 rounded-l-lg h-full w-1/12">-<br></br>-<br></br>-</div>
                <form className="w-10/12 p-2"><input className="text-left input2" placeholder="To-Do"></input></form>
            </div>
        );
    }


};

export default ToDoCardInput;