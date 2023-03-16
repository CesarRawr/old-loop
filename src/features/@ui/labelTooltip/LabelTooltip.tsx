import {forwardRef, ForwardedRef} from 'react';
import Tooltip from '@mui/material/Tooltip';
import Label, {LabelProps} from '../label/Label';

export default function LabelTooltip(props: LabelTooltipProps) {
  const CustomComponent = forwardRef<HTMLSpanElement, LabelProps>(function MyComponent(props, ref) {
    return (
      <Label ref={ref} {...props} />
    );
  });

  return (
    <Tooltip 
      title={props.text} 
      placement="top-start" 
      arrow 
      disableInteractive>
      <CustomComponent text={!!props.text ? props.text.slice(0, props.visibleWords)+"...": ""} />
    </Tooltip>
  );
}

interface LabelTooltipProps {
  visibleWords: number;
  text?: string;
}
