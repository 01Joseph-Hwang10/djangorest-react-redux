import React from 'react';

function ToDoCard(props) {

    const notAvailable = () => {
        alert("Currently not available... Sorry :/");
    }
    if (window.matchMedia("screen and (min-width: 640px)").matches) {
        return (
            <div className="p-2 h-32 lg:h-48 w-52 lg:w-64 shadow-md bg-pink-200 rounded-lg pt-0">
                <div className="flex justify-center items-center h-1/6 pt-0 mt-0">
                    <div className="w-3/12"><button className="text-left" onClick={notAvailable}>Del</button></div>
                    <div className="w-6/12 md:-mt-1 lg:-mt-2 bg-pink-400 border border-pink-500 flex justify-center rounded rounded-t-none"><span className="text-center text-gray-700">|||</span></div>
                    <div className="w-3/12"></div>
                </div>
                <div className="flex justify-center h-5/6">
                    <div className="w-2/12"></div>
                    <div className="w-8/12 flex flex-col items-center justify-between">
                        <div className="p-2 flex flex-col w-full items-center">
                            <span className="text-lg md:text-2xl font-bold">{props.to_do_name}</span>
                            <span className="md:text-xl">{props.to_do_description}</span>
                        </div>
                        <div className="-mt-1 w-full flex justify-center items-center">
                            <button className="rounded bg-blue-400 text-white font-bold p-1 w-1/2 mt-2" onClick={notAvailable}>Detail</button>
                        </div>
                    </div>
                    <div className="w-2/12 flex justify-center items-center">
                        <button className="font-bold text-2xl text-gray-400 mr-2"></button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="bg-pink-300 rounded-lg shadow-md w-full flex justify-center items-center">
                <div className="bg-pink-400 rounded-l-lg h-full w-1/12">-<br></br>-<br></br>-</div>
                <div className="w-6/12 p-2"><span className="text-2xl">{props.to_do_name}</span></div>
                <div className="flex justify-center w-5/12 mr-2">
                    <div className="flex justify-center items-center mx-1 font-bold text-gray-600 bg-blue-400 rounded-3xl w-10 h-10">I</div>
                    <div className="flex justify-center items-center mx-1 font-bold text-gray-600 bg-red-400 rounded-3xl w-10 h-10">X</div>
                    <div className="flex justify-center items-center mx-1 font-bold text-gray-600 bg-green-400 rounded-3xl w-10 h-10">V</div>
                </div>
            </div>
        );
    }


};

export default ToDoCard;