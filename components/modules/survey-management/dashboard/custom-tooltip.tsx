import React from 'react'

type PieChartDataType = {
    name: string;
    value: number;
    fill: string;
};

type CustomPieTooltipProps = {
    active?: boolean;
    payload?: Array<{
        payload: PieChartDataType;
    }>;
};

export const CustomTooltip: React.FC<CustomPieTooltipProps> = ({ active, payload }) => {

    if (!active || !payload || !payload[0] || !payload[0].payload) {
        return null;
    }

    const { name, value, fill } = payload[0].payload;

    return (
        <div className='bg-card border p-1.5 text-xs rounded-lg'>
            <div className='flex items-center gap-2'>
                <span className='size-4 rounded' style={{ backgroundColor: fill }} />
                {name}
                <span>{value}</span>
            </div>
        </div>
    );
}
