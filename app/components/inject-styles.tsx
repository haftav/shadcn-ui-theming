import type { Color } from '@/stores/color-store';

interface VariableMap {
    [key: string]: {
        light: Color;
        dark: Color;
    };
}

interface InjectStylesProps {
    themeVariables: VariableMap;
}

function buildVariables(
    themeVariables: VariableMap,
    themeColor: 'light' | 'dark'
) {
    const variableNames = Object.keys(themeVariables);

    return variableNames
        .map((variableName) => {
            const color = themeVariables[variableName][themeColor];

            let variableString = `${variableName}: ${color.toHSL()};`;

            return variableString;
        })
        .join('\n');
}

export const InjectStyles = (props: InjectStylesProps) => {
    const { themeVariables } = props;

    const lightVariables = buildVariables(themeVariables, 'light');
    const darkVariables = buildVariables(themeVariables, 'dark');

    return (
        <style>
            {`
html {
    ${lightVariables}
}

.dark {
    ${darkVariables}
}
`}
        </style>
    );
};
