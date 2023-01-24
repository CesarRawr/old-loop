import React from 'react';
import './InputLoading.css';

export default function InputLoading(props: InputLoadingProps) {
  return (
    <div className="main-item" style={props.width ? {width: props.width}: undefined}>
      <div className="static-background" style={{height: props.height}}>
      </div>
    </div>
  );
}

interface InputLoadingProps {
  width?: string;
  height: string;
}
