import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    ChartData,
    Legend,
} from 'chart.js';
import { FC } from 'react';
import { useCategories } from '../../entities';
import { getRandomHexColor } from './utils';
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    paymentByCategory: Record<string, number>;
};

export const PieChart: FC<Props> = ({ paymentByCategory }) => {
    const { categoriesById } = useCategories();
    const labels = Object.keys(paymentByCategory);
    const data = labels.map((label) => paymentByCategory[label]);

    const backgroundColor = labels.map(getRandomHexColor);

    const dataset: ChartData<'pie', number[], string> = {
        labels: labels.map((id) => categoriesById[id]?.name),
        datasets: [
            {
                data: data,
                backgroundColor: backgroundColor,
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div style={{ height: 200 }}>
            <Pie
                data={dataset}
                options={{
                    plugins: {
                        legend: {
                            position: 'right',
                        },
                    },
                }}
            />
        </div>
    );
};
