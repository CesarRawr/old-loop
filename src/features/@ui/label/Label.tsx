import {useRef, forwardRef, CSSProperties} from 'react';

const Label = forwardRef<HTMLSpanElement, LabelProps>((props, ref) => {
  const {text, size = "16px", className, styles, ...other} = props;
  
  return (
    <span 
      ref={ref} 
      className={className} 
      style={{
        fontSize: size,
        ...styles,
      }}
      {...other} >
      {text}
    </span>
  );
});

export default Label;

export interface LabelProps {
  text: string;
  size?: string;
  className?: string;
  styles?: CSSProperties;
  other?: any;
}

