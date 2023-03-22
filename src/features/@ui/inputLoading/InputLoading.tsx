import './InputLoading.css';
import type {InputLoadingProps} from '@models/interfaces';

export default function InputLoading(props: InputLoadingProps) {
  return (
    <div className="main-item" style={props.width ? {width: props.width}: undefined}>
      <div className="static-background" style={{height: props.height}}>
      </div>
    </div>
  );
}
