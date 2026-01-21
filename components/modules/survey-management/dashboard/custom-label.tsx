import React, { FC } from 'react';
import { PieLabelRenderProps } from 'recharts';

export const CustomLabel: FC<PieLabelRenderProps> = ({ x, y, name, value }) => {
    // Don't show label for 0 or undefined/null values
    if (typeof value !== "number" || value <= 0) return null;

    return (
        <text
            x={x}
            y={y}
            fill="var(--secondaryForeground)"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight={500}
        >
            {name}
        </text>
    );
};

export default CustomLabel;
