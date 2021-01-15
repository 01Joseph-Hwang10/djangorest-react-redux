import React from 'react';

function ToDoCard(props) {

    const notAvailable = () => {
        alert("Currently not available... Sorry :/");
    }

    return (
        <div className="w-full bg-pink-200 flex flex-col rounded-lg p-2 pt-0">
            <div className="flex justify-center items-center">
                <div className="w-3/12"><button className="text-left" onClick={notAvailable}>Del</button></div>
                <div className="w-6/12 bg-pink-400 flex justify-center rounded rounded-t-none"><span className="text-center text-gray-700">|||</span></div>
                <div className="w-3/12"></div>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-2/12"></div>
                <div className="w-8/12 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold">{props.to_do_name}</span>
                    <span>{props.to_do_description}</span>
                    <button className="rounded bg-blue-400 text-white font-bold p-1 w-1/2 mt-2" onClick={notAvailable}>Detail</button>
                </div>
                <div className="w-2/12 flex justify-center items-center">
                    <button className="font-bold text-2xl text-gray-400 mr-2">=></button>
                </div>
            </div>
        </div>
    );

};

export default ToDoCard;