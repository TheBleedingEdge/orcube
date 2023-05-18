import React, { useEffect, useRef, useState } from "react";
import { Chart } from 'chart.js/auto';
import axios from "../../../config/axios";

function MonthlyIncome() {

    const canvasRef = useRef(null);
    const [incomeData, setIncomeData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const userinfoString = localStorage.getItem('userInfo');
            if (userinfoString) {
                const userinfo = JSON.parse(userinfoString);
                const {token} = userinfo;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data } = await axios.post('/api/admin/getmonthlyincome', {} ,config)
                if (data) {
                    const result = new Array(12).fill(0); // Initialize an array of 12 elements filled with 0s
                    data.forEach(item => {
                        const monthIndex = item._id.month - 1; // No subtraction needed
                        result[monthIndex] = item.totalIncome;
                    });

                    if (result) {
                        setIncomeData(result);
                    }
                }
            }
        }
        fetchData()
    },[]);

    useEffect(() => {
        var config = {
            type: "bar",
            data: {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ],
                datasets: [
                    {
                        label: new Date().getFullYear(),
                        backgroundColor: "#b5285e",
                        borderColor: "#3182ce",
                        data: incomeData,
                        fill: false,
                        tension: 0.4,
                    },
                    // {
                    //     label: new Date().getFullYear() - 1,
                    //     fill: false,
                    //     backgroundColor: "#ed64a6",
                    //     borderColor: "#ed64a6",
                    //     data: [50, 68, 86, 74, 56, 60, 87],
                    // },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Sales Charts",
                    fontColor: "white",
                },
                legend: {
                    labels: {
                        fontColor: "white",
                    },
                    align: "end",
                    position: "bottom",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Month",
                                fontColor: "white",
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(0, 0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                                fontColor: "white",
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: "rgba(255, 255, 255, 0.15)",
                                zeroLineColor: "rgba(33, 37, 41, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };

        if (window.myBar && typeof window.myBar.destroy === 'function') {
            window.myBar.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        window.myBar = new Chart(ctx, config);
    }, [incomeData]);



    return (
        <>
            <div className="relative bg-slate-50 mt-16 xl:w-1/2 flex flex-col min-w-0 break-words mb-6 shadow-lg rounded bg-blueGray-700">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            {/* <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                                Overview
                            </h6> */}
                            <h2 className="text-black text-xl font-semibold">Total Income per Month</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px">
                        <canvas ref={canvasRef} id="bar-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MonthlyIncome;