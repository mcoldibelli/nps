import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [npsData, setNpsData] = useState([]);
    const [totalVotes, setTotalVotes] = useState(0);
    const [npsValue, setNpsValue] = useState(0);

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
                            <h3 className="text-lg font-semibold mb-4">Análise de NPS</h3>
                            <p>Total de votos: {totalVotes}</p>
                            <p>NPS: {npsValue}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
