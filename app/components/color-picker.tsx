import { Color } from '@/stores/color-store';

import { Input } from '@/ui/input';
import clsx from 'clsx';

interface ColorPickerProps
    extends Omit<
        React.ComponentPropsWithoutRef<'input'>,
        'value' | 'onChange' | 'type'
    > {
    value: Color;
    onChange: (newValue: Color) => void;
    injectStyle?: boolean;
}

export const ColorPicker = (props: ColorPickerProps) => {
    const { value, onChange, className, ...rest } = props;

    return (
        <Input
            type="color"
            value={value.toHex()}
            onChange={(e) => onChange(Color.fromHex(e.target.value))}
            className={clsx('h-12 w-24 p-0 border-none', className)}
            {...rest}
        />
    );
};
