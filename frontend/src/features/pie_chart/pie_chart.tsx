import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    ChartData,
    Legend,
} from 'chart.js';
import { FC, useState } from 'react';
import { useCategories } from '../../entities';
import { getRandomHexColor } from './utils';
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    paymentByCategory: Record<string, number>;
};

export const PieChart: FC<Props> = ({ paymentByCategory }) => {
    const [hiddenSections, setHiddenSections] = useState<{
        [index: string]: () => void;
    }>({});

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

    console.log('hiddenSections: ', hiddenSections);

    return (
        <div style={{ height: 200 }}>
            <Pie
                data={dataset}
                options={{
                    onClick: (event, elements, chart) => {
                        console.log(elements);
                        chart.hide(elements[0].datasetIndex, elements[0].index);
                        setHiddenSections((prev) => {
                            return {
                                ...prev,
                                [String(elements[0].index)]: () =>
                                    chart.show(
                                        elements[0].datasetIndex,
                                        elements[0].index,
                                    ),
                            };
                        });
                    },
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                filter: (item) => {
                                    if (item.index === undefined) {
                                        return false;
                                    }
                                    return item.index in hiddenSections;
                                },
                            },
                            onClick: (e, item) => {
                                console.log('item: ', item);
                                const index = item.index;

                                index && hiddenSections[String(index)]();
                                setHiddenSections((prev) => {
                                    delete prev[String(index)];
                                    return { ...prev };
                                });
                            },
                        },
                    },
                }}
            />
        </div>
    );
};
