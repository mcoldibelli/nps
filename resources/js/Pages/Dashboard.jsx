import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [npsData, setNpsData] = useState([]);
    const [totalVotes, setTotalVotes] = useState(0);
    const [npsValue, setNpsValue] = useState(0);
    const chartRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/nps/show');
            const data = await response.json();
            setNpsData(data);
            calculateAnalysis(data);
        };
        fetchData();
    }, []);

    const calculateAnalysis = (data) => {
        const total = data.length;
        setTotalVotes(total);

        const promoters = data.filter(item => item.score === 1).length;
        const detractors = data.filter(item => item.score === -1).length;
        const nps = ((promoters - detractors) / total) * 100;
        setNpsValue(nps.toFixed(2));
    };

    useEffect(() => {
        if (npsData.length > 0) {
            createChart();
        }
    }, [npsData]);

    const createChart = () => {
        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Promotores', 'Passivos', 'Detratores'],
                datasets: [{
                    label: 'Distribuição NPS',
                    data: [
                        npsData.filter(item => item.score === -1).length,
                        npsData.filter(item => item.score === 0).length,
                        npsData.filter(item => item.score === 1).length
                    ],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.6)',
                        'rgba(252, 211, 77, 0.6)',
                        'rgba(52, 211, 153, 0.6)'
                    ],
                    borderColor: [
                        'rgba(239, 68, 68, 1)',
                        'rgba(252, 211, 77, 1)',
                        'rgba(52, 211, 153, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Análise de Net Promoter Score (NPS)</h3>
                            <>NPS: {npsValue}</>
                            <canvas ref={chartRef}></canvas>
                            <p>Total de Votos: {totalVotes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
